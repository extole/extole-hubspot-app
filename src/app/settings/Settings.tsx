import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  LoadingSpinner,
  Select,
  Text,
  TextArea,
  hubspot,
} from '@hubspot/ui-extensions';
import { useState } from 'react';

hubspot.extend(() => <ExtoleSettings />);

const DEFAULT_HUBSPOTUTK_PROPERTY = 'extole_hubspotutk';
const DEFAULT_ADVOCATE_CODE_PROPERTY = 'extole_advocate_code';
const DEFAULT_REFERRAL_URL_PARAM = 'extole_ref';

function ExtoleSettings() {
  // Connection
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'ok' | 'error'>('unknown');
  const [connectionTesting, setConnectionTesting] = useState(false);

  // Form Configurator settings
  const [hubspotutkProperty, setHubspotutkProperty] = useState(DEFAULT_HUBSPOTUTK_PROPERTY);
  const [includeAdvocateCode, setIncludeAdvocateCode] = useState(true);
  const [advocateCodeProperty, setAdvocateCodeProperty] = useState(DEFAULT_ADVOCATE_CODE_PROPERTY);
  const [referralUrlParam, setReferralUrlParam] = useState(DEFAULT_REFERRAL_URL_PARAM);
  const [formTargeting, setFormTargeting] = useState<'all' | 'specific'>('all');
  const [formIds, setFormIds] = useState('');
  const [propertiesCreated, setPropertiesCreated] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [propertiesResult, setPropertiesResult] = useState<string | null>(null);

  // Backfill
  const [contactTotal, setContactTotal] = useState<number | null>(null);
  const [backfillRunning, setBackfillRunning] = useState(false);
  const [backfillProgress, setBackfillProgress] = useState<{ enrolled: number; skipped: number; errors: number } | null>(null);
  const [backfillDone, setBackfillDone] = useState(false);

  // ─── Derived snippet ───────────────────────────────────────────────────────

  const formIdsArray = formTargeting === 'specific'
    ? formIds.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const snippet = generateSnippet({
    hubspotutkProperty,
    advocateCodeProperty: includeAdvocateCode ? advocateCodeProperty : '',
    referralUrlParam,
    formIds: formIdsArray,
  });

  // ─── Handlers ─────────────────────────────────────────────────────────────

  function handleTestConnection() {
    setConnectionTesting(true);
    hubspot.runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'testConnection' },
      propertiesToSend: [],
    }).then((res) => {
      setConnectionStatus(res.response?.connected ? 'ok' : 'error');
    }).catch(() => {
      setConnectionStatus('error');
    }).finally(() => {
      setConnectionTesting(false);
    });
  }

  function handleCreateProperties() {
    setPropertiesLoading(true);
    setPropertiesResult(null);
    hubspot.runServerlessFunction({
      name: 'extole_settings',
      parameters: {
        action: 'createProperties',
        hubspotutkProperty,
        advocateCodeProperty: includeAdvocateCode ? advocateCodeProperty : '',
      },
      propertiesToSend: [],
    }).then((res) => {
      const { created = [], errors = [] } = res.response || {};
      if (errors.length === 0) {
        setPropertiesCreated(true);
        setPropertiesResult(`Created: ${created.map((c: any) => c.property).join(', ') || 'all properties already existed'}`);
      } else {
        setPropertiesResult(`Errors: ${errors.map((e: any) => `${e.property}: ${e.error}`).join('; ')}`);
      }
    }).catch((err) => {
      setPropertiesResult(`Error: ${err.message}`);
    }).finally(() => {
      setPropertiesLoading(false);
    });
  }

  function handleLoadContactCount() {
    hubspot.runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getContactCount' },
      propertiesToSend: [],
    }).then((res) => {
      setContactTotal(res.response?.total ?? null);
    });
  }

  async function handleRunBackfill() {
    setBackfillRunning(true);
    setBackfillDone(false);
    setBackfillProgress({ enrolled: 0, skipped: 0, errors: 0 });

    let cursor: string | null = null;
    let totalEnrolled = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    while (true) {
      const res = await hubspot.runServerlessFunction({
        name: 'extole_settings',
        parameters: {
          action: 'runBackfillBatch',
          cursor,
          hubspotutkProperty,
        },
        propertiesToSend: [],
      });

      const batch = res.response || {};
      totalEnrolled += batch.enrolled || 0;
      totalSkipped += batch.skipped || 0;
      totalErrors += (batch.errors || []).length;
      cursor = batch.cursor || null;

      setBackfillProgress({ enrolled: totalEnrolled, skipped: totalSkipped, errors: totalErrors });

      if (batch.done || !cursor) break;
    }

    setBackfillRunning(false);
    setBackfillDone(true);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Form>
      {/* ── Connection Status ── */}
      <Text format={{ fontWeight: 'bold' }}>Extole Connection</Text>
      <Flex direction="row" gap="small" alignItems="center">
        <Button onClick={handleTestConnection} disabled={connectionTesting}>
          {connectionTesting ? 'Testing...' : 'Test Connection'}
        </Button>
        {connectionStatus === 'ok' && <Text>Connected</Text>}
        {connectionStatus === 'error' && <Text>Connection failed — check EXTOLE_API_TOKEN secret</Text>}
      </Flex>

      <Divider />

      {/* ── Form Configurator ── */}
      <Text format={{ fontWeight: 'bold' }}>Form Configurator</Text>
      <Text>
        Configure the properties to capture at form submission, then copy the generated snippet
        to your site. Load it after the HubSpot tracking script.
      </Text>

      <Input
        label="hubspotutk Contact property"
        name="hubspotutkProperty"
        value={hubspotutkProperty}
        onChange={(val) => setHubspotutkProperty(val)}
        description="Contact property that stores the HubSpot visitor cookie for Extole lookup."
      />

      <Select
        label="Capture advocate code (optional)"
        name="includeAdvocateCode"
        value={includeAdvocateCode ? 'yes' : 'no'}
        onChange={(val) => setIncludeAdvocateCode(val === 'yes')}
        options={[
          { label: 'Yes — inject advocate code into Contact', value: 'yes' },
          { label: 'No — skip advocate code field', value: 'no' },
        ]}
        description="If enabled, reads the referral code from the URL param and stores it on the Contact for HubSpot reporting."
      />

      {includeAdvocateCode && (
        <>
          <Input
            label="Advocate code Contact property"
            name="advocateCodeProperty"
            value={advocateCodeProperty}
            onChange={(val) => setAdvocateCodeProperty(val)}
          />
          <Input
            label="Referral URL parameter name"
            name="referralUrlParam"
            value={referralUrlParam}
            onChange={(val) => setReferralUrlParam(val)}
            description="URL param Extole uses for the referral code (confirm with Extole implementation team)."
          />
        </>
      )}

      <Select
        label="Form targeting"
        name="formTargeting"
        value={formTargeting}
        onChange={(val) => setFormTargeting(val as 'all' | 'specific')}
        options={[
          { label: 'All HubSpot forms', value: 'all' },
          { label: 'Specific form IDs', value: 'specific' },
        ]}
      />

      {formTargeting === 'specific' && (
        <Input
          label="Form IDs (comma-separated)"
          name="formIds"
          value={formIds}
          onChange={(val) => setFormIds(val)}
          placeholder="abc123, def456"
        />
      )}

      <Flex direction="row" gap="small">
        <Button onClick={handleCreateProperties} disabled={propertiesLoading}>
          {propertiesLoading ? 'Creating...' : 'Create Contact Properties'}
        </Button>
      </Flex>
      {propertiesResult && <Text>{propertiesResult}</Text>}

      <Text format={{ fontWeight: 'bold' }}>Generated Snippet</Text>
      <Text>Copy this snippet and embed it on your site, after the HubSpot tracking script.</Text>
      <TextArea
        label=""
        name="snippet"
        value={snippet}
        readOnly
        rows={12}
      />

      <Divider />

      {/* ── Event Configuration ── */}
      <Text format={{ fontWeight: 'bold' }}>Event Configuration</Text>
      <Text>
        To send HubSpot CRM events to Extole, create HubSpot Workflows with the built-in
        "Send a webhook" action (requires Data Hub Professional or higher).
      </Text>
      <Text format={{ fontWeight: 'bold' }}>Minimum required workflows:</Text>
      <Text>1. Contact Created → POST to Extole with email, contact ID, and hubspotutk property</Text>
      <Text>2. Deal Closed Won → POST to Extole with deal ID and associated contact email</Text>
      <Text>
        Extole event endpoint: https://api.extole.io/v5/events{'\n'}
        Authorization header: Bearer {'<'}EXTOLE_API_TOKEN{'>'}
      </Text>
      <Text>
        Contact your Extole implementation team for the exact payload format and event names
        to use for your program configuration.
      </Text>

      <Divider />

      {/* ── Backfill ── */}
      <Text format={{ fontWeight: 'bold' }}>Backfill Existing Contacts</Text>
      <Text>
        Enroll your existing HubSpot contacts into Extole. Run this once at install time.
        Safe to re-run — Extole's register call is idempotent.
      </Text>

      <Flex direction="row" gap="small" alignItems="center">
        <Button onClick={handleLoadContactCount} disabled={backfillRunning}>
          Count Contacts
        </Button>
        {contactTotal !== null && (
          <Text>{contactTotal.toLocaleString()} contacts to enroll</Text>
        )}
      </Flex>

      <Button
        onClick={handleRunBackfill}
        disabled={backfillRunning}
        variant="primary"
      >
        {backfillRunning ? 'Running...' : 'Start Backfill'}
      </Button>

      {backfillRunning && <LoadingSpinner label="Enrolling contacts..." showLabel />}

      {backfillProgress && (
        <Text>
          Enrolled: {backfillProgress.enrolled} | Skipped: {backfillProgress.skipped} | Errors: {backfillProgress.errors}
        </Text>
      )}

      {backfillDone && <Text>Backfill complete.</Text>}
    </Form>
  );
}

// ─── Snippet Generator ────────────────────────────────────────────────────────

function generateSnippet({
  hubspotutkProperty,
  advocateCodeProperty,
  referralUrlParam,
  formIds,
}: {
  hubspotutkProperty: string;
  advocateCodeProperty: string;
  referralUrlParam: string;
  formIds: string[];
}): string {
  const formIdsJson = formIds.length > 0
    ? JSON.stringify(formIds)
    : '[]';

  return `<!-- Extole Form Configurator — load after HubSpot tracking script -->
<script>
(function() {
  var HUBSPOTUTK_PROPERTY = '${hubspotutkProperty}';
  var ADVOCATE_CODE_PROPERTY = '${advocateCodeProperty}';
  var REFERRAL_URL_PARAM = '${referralUrlParam}';
  var FORM_IDS = ${formIdsJson}; // empty = all forms

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }

  function getUrlParam(name) {
    var match = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : '';
  }

  function injectField(form, propertyName, value) {
    if (!propertyName || !value) return;
    var existing = form.querySelector('input[name="' + propertyName + '"]');
    if (existing) {
      existing.value = value;
    } else {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = propertyName;
      input.value = value;
      form.appendChild(input);
    }
  }

  function shouldInstrument(formId) {
    return FORM_IDS.length === 0 || FORM_IDS.indexOf(formId) !== -1;
  }

  function instrumentForm(form, formId) {
    if (!shouldInstrument(formId)) return;
    injectField(form, HUBSPOTUTK_PROPERTY, getCookie('hubspotutk'));
    if (ADVOCATE_CODE_PROPERTY) {
      injectField(form, ADVOCATE_CODE_PROPERTY, getUrlParam(REFERRAL_URL_PARAM));
    }
  }

  // Hook into HubSpot form events
  window.addEventListener('message', function(event) {
    if (!event.data || event.data.type !== 'hsFormCallback') return;
    if (event.data.eventName === 'onFormReady') {
      var form = document.querySelector('form[data-form-id="' + event.data.id + '"]');
      if (form) instrumentForm(form, event.data.id);
    }
  });

  // Handle forms already present on page load
  window.hsFormsOnReady = window.hsFormsOnReady || [];
  window.hsFormsOnReady.push(function() {
    document.querySelectorAll('form[data-form-id]').forEach(function(form) {
      instrumentForm(form, form.getAttribute('data-form-id'));
    });
  });
})();
</script>`;
}
