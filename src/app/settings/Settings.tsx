import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Link,
  LoadingSpinner,
  Select,
  Text,
  TextArea,
  hubspot,
} from '@hubspot/ui-extensions';
import { useState, useEffect } from 'react';

hubspot.extend(({ runServerlessFunction, context }) => (
  <ExtoleSettings runServerlessFunction={runServerlessFunction} portalId={context.portal.id} />
));

const DEFAULT_HUBSPOTUTK_PROPERTY = 'extole_hubspotutk';
const DEFAULT_ADVOCATE_CODE_PROPERTY = 'extole_advocate_code';
const DEFAULT_REFERRAL_URL_PARAM = 'extole_ref';

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldMapping = { extoleKey: string; source: 'property' | 'static'; value: string };

type EventFormState = {
  eventName: string;
  triggerObject: 'contact' | 'deal';
  fieldMappings: FieldMapping[];
};

type WorkflowInfo = { id: string; name: string; enabled: boolean };

// ─── Default field mappings ───────────────────────────────────────────────────

const CONTACT_DEFAULTS: FieldMapping[] = [
  { extoleKey: 'email', source: 'property', value: 'email' },
  { extoleKey: 'contact_id', source: 'property', value: 'hs_object_id' },
  { extoleKey: 'first_name', source: 'property', value: 'firstname' },
  { extoleKey: 'last_name', source: 'property', value: 'lastname' },
  { extoleKey: 'hubspotutk', source: 'property', value: 'extole_hubspotutk' },
];

const DEAL_DEFAULTS: FieldMapping[] = [
  { extoleKey: 'deal_id', source: 'property', value: 'hs_object_id' },
  { extoleKey: 'deal_name', source: 'property', value: 'dealname' },
  { extoleKey: 'amount', source: 'property', value: 'amount' },
  { extoleKey: 'close_date', source: 'property', value: 'closedate' },
];

const BLANK_EVENT_FORM: EventFormState = {
  eventName: '',
  triggerObject: 'contact',
  fieldMappings: [...CONTACT_DEFAULTS],
};

// ─── Main component ───────────────────────────────────────────────────────────

function ExtoleSettings({ runServerlessFunction, portalId }: { runServerlessFunction: (opts: any) => Promise<any>; portalId: number }) {
  // Connection
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'ok' | 'error'>('unknown');
  const [connectionDetail, setConnectionDetail] = useState<string>('');
  const [connectionTesting, setConnectionTesting] = useState(false);

  // Form Configurator settings
  const [hubspotutkProperty, setHubspotutkProperty] = useState(DEFAULT_HUBSPOTUTK_PROPERTY);
  const [includeAdvocateCode, setIncludeAdvocateCode] = useState(true);
  const [advocateCodeProperty, setAdvocateCodeProperty] = useState(DEFAULT_ADVOCATE_CODE_PROPERTY);
  const [referralUrlParam, setReferralUrlParam] = useState(DEFAULT_REFERRAL_URL_PARAM);
  const [formTargeting, setFormTargeting] = useState<'all' | 'specific'>('all');
  const [formIds, setFormIds] = useState('');
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [propertiesResult, setPropertiesResult] = useState<string | null>(null);

  // Event Configurator
  const [workflows, setWorkflows] = useState<WorkflowInfo[]>([]);
  const [workflowsLoaded, setWorkflowsLoaded] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<EventFormState>(BLANK_EVENT_FORM);
  const [creatingWorkflow, setCreatingWorkflow] = useState(false);
  const [createResult, setCreateResult] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'testConnection' },
      propertiesToSend: [],
    }).then((res) => {
      const r = res.response;
      setConnectionStatus(r?.connected ? 'ok' : 'error');
      setConnectionDetail(r?.connected ? '' : `status=${r?.status ?? 'unknown'} error=${r?.error ?? 'none'} prefix=${r?.tokenPrefix ?? 'n/a'}`);
    }).catch((err: any) => {
      setConnectionStatus('error');
      setConnectionDetail(err?.message ?? 'function call failed');
    }).finally(() => {
      setConnectionTesting(false);
    });
  }

  function handleCreateProperties() {
    setPropertiesLoading(true);
    setPropertiesResult(null);
    runServerlessFunction({
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
    runServerlessFunction({
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
      const res = await runServerlessFunction({
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

  function handleLoadWorkflows() {
    setWorkflowsLoaded(false);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getWorkflows' },
      propertiesToSend: [],
    }).then((res) => {
      setWorkflows(res.response?.workflows ?? []);
      setWorkflowsLoaded(true);
    }).catch(() => {
      setWorkflowsLoaded(true);
    });
  }

  function handleDeleteWorkflow(flowId: string) {
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'deleteWorkflow', flowId },
      propertiesToSend: [],
    }).then(() => {
      setConfirmDeleteId(null);
      handleLoadWorkflows();
    });
  }

  function handleEditWorkflow(w: WorkflowInfo) {
    setEditingWorkflowId(w.id);
    setShowEventForm(true);
    setCreateResult('Loading...');
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getWorkflowConfig', flowId: w.id },
      propertiesToSend: [],
    }).then((res) => {
      const config = res.response?.config;
      setEventForm(config ?? {
        eventName: w.name.replace(/^Extole\s*[—-]\s*/, ''),
        triggerObject: 'contact',
        fieldMappings: [...CONTACT_DEFAULTS],
      });
      setCreateResult('');
    }).catch(() => {
      setEventForm({
        eventName: w.name.replace(/^Extole\s*[—-]\s*/, ''),
        triggerObject: 'contact',
        fieldMappings: [...CONTACT_DEFAULTS],
      });
      setCreateResult('');
    });
  }

  function closeEventForm() {
    setShowEventForm(false);
    setEditingWorkflowId(null);
    setEventForm(BLANK_EVENT_FORM);
    setCreateResult('');
  }

  function handleCreateEventWorkflow() {
    setCreatingWorkflow(true);
    setCreateResult('');
    runServerlessFunction({
      name: 'extole_settings',
      parameters: {
        action: 'createWorkflow',
        eventName: eventForm.eventName,
        triggerObject: eventForm.triggerObject,
        fieldMappings: eventForm.fieldMappings,
      },
      propertiesToSend: [],
    }).then((res) => {
      if (res.response?.error) {
        setCreateResult(`Error: ${res.response.error}`);
      } else {
        const { workflowId, name } = res.response || {};
        setCreateResult(`Created and enabled "${name}" (ID ${workflowId}).`);
        closeEventForm();
        handleLoadWorkflows();
      }
    }).catch((err) => {
      setCreateResult(`Error: ${err.message}`);
    }).finally(() => {
      setCreatingWorkflow(false);
    });
  }

  function handleUpdateEventWorkflow() {
    if (!editingWorkflowId) return;
    setCreatingWorkflow(true);
    setCreateResult('');
    runServerlessFunction({
      name: 'extole_settings',
      parameters: {
        action: 'updateWorkflow',
        flowId: editingWorkflowId,
        eventName: eventForm.eventName,
        triggerObject: eventForm.triggerObject,
        fieldMappings: eventForm.fieldMappings,
      },
      propertiesToSend: [],
    }).then((res) => {
      if (res.response?.error) {
        setCreateResult(`Error: ${res.response.error}`);
      } else {
        const { name } = res.response || {};
        setCreateResult(`Saved "${name}".`);
        closeEventForm();
        handleLoadWorkflows();
      }
    }).catch((err) => {
      setCreateResult(`Error: ${err.message}`);
    }).finally(() => {
      setCreatingWorkflow(false);
    });
  }

  useEffect(() => {
    handleLoadWorkflows();
  }, []);

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
        {connectionStatus === 'error' && <Text>Connection failed — {connectionDetail || 'check EXTOLE_API_TOKEN secret'}</Text>}
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
        Create HubSpot Workflows that fire events to Extole. Choose any event name your
        Extole program expects, pick a trigger object, and map HubSpot properties to
        Extole data fields. Workflows are pre-wired with the correct endpoint and auth.
      </Text>

      {!workflowsLoaded && <LoadingSpinner label="Loading workflows..." showLabel />}

      {workflowsLoaded && (
        <>
          {workflows.map((w) => (
            <Flex direction="row" gap="small" alignItems="center" justifyContent="space-between">
              <Flex direction="column" gap="extra-small">
                <Text format={{ fontWeight: 'bold' }}>{w.name}</Text>
                <Text>{w.enabled ? 'Active' : 'Not enabled'} · ID {w.id}</Text>
              </Flex>
              <Flex direction="row" gap="extra-small" alignItems="center" alignSelf="center">
                <Button onClick={() => handleEditWorkflow(w)} disabled={showEventForm}>
                  Edit
                </Button>
                {confirmDeleteId === w.id ? (
                  <>
                    <Button onClick={() => handleDeleteWorkflow(w.id)} variant="destructive">
                      Confirm delete
                    </Button>
                    <Button onClick={() => setConfirmDeleteId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setConfirmDeleteId(w.id)} disabled={showEventForm}>
                    Delete
                  </Button>
                )}
                <Link href={`https://app.hubspot.com/workflows/${portalId}/flow/${w.id}/edit`}>
                  Open in HubSpot
                </Link>
              </Flex>
            </Flex>
          ))}

          {workflows.length > 0 && !showEventForm && <Divider />}

          {!showEventForm ? (
            <>
              {createResult && <Text>{createResult}</Text>}
              <Button onClick={() => { setShowEventForm(true); setCreateResult(''); }}>
                + Add Event
              </Button>
            </>
          ) : (
            <EventForm
              form={eventForm}
              onChange={setEventForm}
              onSubmit={editingWorkflowId ? handleUpdateEventWorkflow : handleCreateEventWorkflow}
              onCancel={closeEventForm}
              creating={creatingWorkflow}
              createResult={createResult}
              isEditing={!!editingWorkflowId}
              onValidateProperty={(objectType, propertyName) =>
                runServerlessFunction({
                  name: 'extole_settings',
                  parameters: { action: 'validateProperty', objectType, propertyName },
                  propertiesToSend: [],
                }).then((res) => res.response?.valid ?? false).catch(() => false)
              }
            />
          )}
        </>
      )}

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
        <Button onClick={handleRunBackfill} disabled={backfillRunning} variant="primary">
          {backfillRunning ? 'Running...' : 'Start Backfill'}
        </Button>
        {contactTotal !== null && (
          <Text>{contactTotal.toLocaleString()} contacts to enroll</Text>
        )}
      </Flex>

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

// ─── Event Form ───────────────────────────────────────────────────────────────

function EventForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  creating,
  createResult,
  isEditing,
  onValidateProperty,
}: {
  form: EventFormState;
  onChange: (f: EventFormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
  creating: boolean;
  createResult: string;
  isEditing?: boolean;
  onValidateProperty?: (objectType: string, propertyName: string) => Promise<boolean>;
}) {
  const [propErrors, setPropErrors] = useState<Record<number, boolean>>({});

  function setEventName(v: string) {
    onChange({ ...form, eventName: v });
  }

  function setTriggerObject(v: string) {
    const obj = v as 'contact' | 'deal';
    onChange({
      ...form,
      triggerObject: obj,
      fieldMappings: obj === 'deal' ? [...DEAL_DEFAULTS] : [...CONTACT_DEFAULTS],
    });
    setPropErrors({});
  }

  function updateMapping(index: number, field: keyof FieldMapping, value: string) {
    const updated = form.fieldMappings.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    onChange({ ...form, fieldMappings: updated });
    // Clear error when source changes to static or value is cleared
    if (field === 'source' || (field === 'value' && !value)) {
      setPropErrors(prev => { const n = { ...prev }; delete n[index]; return n; });
    }
  }

  function addMapping() {
    onChange({
      ...form,
      fieldMappings: [...form.fieldMappings, { extoleKey: '', source: 'property', value: '' }],
    });
  }

  function removeMapping(index: number) {
    onChange({
      ...form,
      fieldMappings: form.fieldMappings.filter((_, i) => i !== index),
    });
    setPropErrors(prev => {
      const n: Record<number, boolean> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const ki = Number(k);
        if (ki < index) n[ki] = v;
        else if (ki > index) n[ki - 1] = v;
      });
      return n;
    });
  }

  async function validatePropertyAt(index: number, propertyName: string) {
    if (!onValidateProperty || !propertyName.trim()) return;
    const valid = await onValidateProperty(form.triggerObject, propertyName.trim());
    setPropErrors(prev => ({ ...prev, [index]: !valid }));
  }

  const canSubmit = !!form.eventName.trim() && !creating;

  return (
    <>
      <Input
        label="Event name"
        name="eventName"
        value={form.eventName}
        onChange={setEventName}
        placeholder="e.g. purchase, referral_sent, account_upgrade"
        description="The exact Extole event name your program expects."
      />

      <Select
        label="Trigger object"
        name="triggerObject"
        value={form.triggerObject}
        onChange={setTriggerObject}
        options={[
          { label: 'Contact', value: 'contact' },
          { label: 'Deal', value: 'deal' },
        ]}
        description="Set the workflow enrollment trigger in HubSpot to match (e.g. Contact is created, Deal stage = Closed Won)."
      />

      <Text format={{ fontWeight: 'bold' }}>Field Mappings</Text>
      <Text>
        Map Extole parameter names to HubSpot property internal names.
        Use the internal name exactly as it appears in HubSpot (e.g. email, firstname, hs_object_id).
        Static values are passed through as literals.
      </Text>

      {form.fieldMappings.map((mapping, i) => (
        <Flex direction="row" gap="small" alignItems="flex-end">
          <Flex flex={2} direction="column">
            <Input
              label="Extole parameter"
              name={`ek_${i}`}
              value={mapping.extoleKey}
              onChange={(v) => updateMapping(i, 'extoleKey', v)}
              placeholder="e.g. email"
            />
          </Flex>
          <Flex flex={1} direction="column">
            <Select
              label="Source"
              name={`src_${i}`}
              value={mapping.source}
              onChange={(v) => updateMapping(i, 'source', v as 'property' | 'static')}
              options={[
                { label: 'Property', value: 'property' },
                { label: 'Static', value: 'static' },
              ]}
            />
          </Flex>
          <Flex flex={2} direction="column">
            <Input
              label={mapping.source === 'property' ? 'HubSpot property' : 'Static value'}
              name={`val_${i}`}
              value={mapping.value}
              onChange={(v) => updateMapping(i, 'value', v)}
              onBlur={(v) => { if (mapping.source === 'property') validatePropertyAt(i, v); }}
              placeholder={mapping.source === 'property' ? 'e.g. email' : 'e.g. hubspot_crm'}
              error={mapping.source === 'property' && !!propErrors[i]}
              validationMessage={mapping.source === 'property' && propErrors[i] ? 'Property not found in HubSpot' : undefined}
            />
          </Flex>
          <Button onClick={() => removeMapping(i)}>−</Button>
        </Flex>
      ))}

      {createResult && <Text>{createResult}</Text>}

      <Flex direction="row" gap="small" alignItems="center">
        <Button onClick={addMapping}>+ Add field</Button>
        <Button onClick={onSubmit} disabled={!canSubmit} variant="primary">
          {creating ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Workflow')}
        </Button>
        <Button onClick={onCancel} disabled={creating}>
          Cancel
        </Button>
      </Flex>
    </>
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
