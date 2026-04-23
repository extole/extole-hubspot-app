import {
  Box,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Link,
  LoadingSpinner,
  Dropdown,
  Spacer,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  TextArea,
  Heading,
  StatusTag,
  Toggle,
  hubspot,
} from '@hubspot/ui-extensions';
import { useState, useEffect } from 'react';

hubspot.extend(({ runServerlessFunction, context }) => (
  <ExtoleSettings
    runServerlessFunction={runServerlessFunction}
    portalId={context.portal.id}
    locale={context.user?.locale}
    actor={context.user?.email ?? ''}
  />
));

const DEFAULT_ADVOCATE_CODE_PROPERTY = 'extole_advocate_code';
const DEFAULT_REFERRAL_URL_PARAMS = 'extole_shareable_code';
const DEFAULT_SHARE_LINK_PROPERTY = 'extole_share_link';

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldMapping = { extoleKey: string; source: 'property' | 'static'; value: string };

type EventFormState = {
  eventName: string;
  triggerObject: string;
  triggerType: string;    // 'RECORD_CREATED' | 'FIELD_CHANGED' | 'FIELD_VALUE'
  triggerProperty: string;
  triggerToValue: string;
  fieldMappings: FieldMapping[];
};

type ObjectTypeOption = { value: string; label: string; objectTypeId: string };

type WorkflowInfo = { id: string; name: string; eventName: string; enabled: boolean; status?: string; objectTypeId?: string; createdAt?: string };

type PropertyStatus = { exists: boolean | null; createdAt?: string };

type LogEntry = { id: string; timestamp: string; action: string; actor: string; details: string; status: 'success' | 'error' };

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

const COMPANY_DEFAULTS: FieldMapping[] = [
  { extoleKey: 'company_id', source: 'property', value: 'hs_object_id' },
  { extoleKey: 'company_name', source: 'property', value: 'name' },
  { extoleKey: 'domain', source: 'property', value: 'domain' },
];

const TICKET_DEFAULTS: FieldMapping[] = [
  { extoleKey: 'ticket_id', source: 'property', value: 'hs_object_id' },
  { extoleKey: 'subject', source: 'property', value: 'subject' },
  { extoleKey: 'status', source: 'property', value: 'hs_pipeline_stage' },
];

const QUOTE_DEFAULTS: FieldMapping[] = [
  { extoleKey: 'quote_id', source: 'property', value: 'hs_object_id' },
  { extoleKey: 'quote_name', source: 'property', value: 'hs_title' },
  { extoleKey: 'amount', source: 'property', value: 'hs_total_amount' },
  { extoleKey: 'status', source: 'property', value: 'hs_status' },
];

const DEFAULT_MAPPINGS: Record<string, FieldMapping[]> = {
  contact: CONTACT_DEFAULTS,
  deal: DEAL_DEFAULTS,
  company: COMPANY_DEFAULTS,
  ticket: TICKET_DEFAULTS,
  quote: QUOTE_DEFAULTS,
};

const OBJECT_TYPE_LABELS: Record<string, string> = {
  '0-1': 'Contact', '0-3': 'Deal', '0-2': 'Company', '0-5': 'Ticket', '0-14': 'Quote',
};

const LOG_ACTION_LABELS: Record<string, string> = {
  property_created:             'Property Created',
  share_link_property_created:  'Share Link Property Created',
  share_link_backfill_completed: 'Share Link Backfill',
  share_link_backfill_error:     'Share Link Backfill Error',
  auto_share_link_enabled:       'Auto Share Link Enabled',
  auto_share_link_disabled:      'Auto Share Link Disabled',
  workflow_created:              'Workflow Created',
  workflow_deleted:              'Workflow Deleted',
  workflow_toggled:              'Workflow Toggled',
};

const COMMON_PROPERTIES: Record<string, { value: string; label: string }[]> = {
  contact: [
    { value: 'lifecyclestage',   label: 'Lifecycle Stage' },
    { value: 'hs_lead_status',   label: 'Lead Status' },
    { value: 'email',            label: 'Email' },
    { value: 'jobtitle',         label: 'Job Title' },
    { value: 'hs_buying_role',   label: 'Buying Role' },
  ],
  deal: [
    { value: 'dealstage',        label: 'Deal Stage' },
    { value: 'pipeline',         label: 'Pipeline' },
    { value: 'amount',           label: 'Amount' },
    { value: 'closedate',        label: 'Close Date' },
    { value: 'dealtype',         label: 'Deal Type' },
    { value: 'hubspot_owner_id', label: 'Deal Owner' },
  ],
  company: [
    { value: 'lifecyclestage',   label: 'Lifecycle Stage' },
    { value: 'industry',         label: 'Industry' },
    { value: 'annualrevenue',    label: 'Annual Revenue' },
    { value: 'numberofemployees',label: 'Number of Employees' },
    { value: 'hs_lead_status',   label: 'Lead Status' },
  ],
  ticket: [
    { value: 'hs_pipeline_stage',label: 'Ticket Status' },
    { value: 'hs_pipeline',      label: 'Pipeline' },
    { value: 'hs_ticket_priority',label: 'Priority' },
    { value: 'subject',          label: 'Subject' },
  ],
  quote: [
    { value: 'hs_status',        label: 'Quote Status' },
    { value: 'hs_expiration_date',label: 'Expiration Date' },
  ],
};

const BLANK_EVENT_FORM: EventFormState = {
  eventName: '',
  triggerObject: 'contact',
  triggerType: 'RECORD_CREATED',
  triggerProperty: '',
  triggerToValue: '',
  fieldMappings: [...CONTACT_DEFAULTS],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DATE_FORMAT_OPTS: Intl.DateTimeFormatOptions = {
  month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
};

function formatDate(isoString: string | undefined, locale?: string): string {
  if (!isoString) return '—';
  return new Intl.DateTimeFormat(locale || undefined, DATE_FORMAT_OPTS).format(new Date(isoString));
}

// ─── Main component ───────────────────────────────────────────────────────────

function ExtoleSettings({ runServerlessFunction, portalId, locale, actor }: {
  runServerlessFunction: (opts: any) => Promise<any>;
  portalId: number;
  locale?: string;
  actor?: string;
}) {
  // ── Connection ──
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'ok' | 'error'>('unknown');
  const [connectionDetail, setConnectionDetail] = useState('');
  const [connectionTesting, setConnectionTesting] = useState(false);

  // ── Event Configuration ──
  const [workflows, setWorkflows] = useState<WorkflowInfo[]>([]);
  const [workflowsError, setWorkflowsError] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<EventFormState>(BLANK_EVENT_FORM);
  const [creatingWorkflow, setCreatingWorkflow] = useState(false);
  const [createResult, setCreateResult] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // ── Navigation ──
  type NavTab = 'events' | 'forms' | 'sharelinks' | 'log';
  const [activeTab, setActiveTab] = useState<NavTab>('events');

  // Workflow table sort
  type SortCol = 'name' | 'object' | 'status' | 'created';
  const [sortCol, setSortCol] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<'ascending' | 'descending'>('ascending');

  // ── Share Links ──
  const [campaigns, setCampaigns] = useState<{ id: string; name: string; programLabel: string }[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);
  const [selectedProgramLabel, setSelectedProgramLabel] = useState('');
  const [shareLinkPropertyStatus, setShareLinkPropertyStatus] = useState<PropertyStatus>({ exists: null });
  const [shareLinkPropertyCreating, setShareLinkPropertyCreating] = useState(false);
  const [shareLinkPropertyCreateResult, setShareLinkPropertyCreateResult] = useState<string | null>(null);
  const [shareLinkBackfillRunning, setShareLinkBackfillRunning] = useState(false);
  const [shareLinkBackfillProgress, setShareLinkBackfillProgress] = useState<{ created: number; existing: number; skipped: number; errors: number } | null>(null);
  const [shareLinkBackfillDone, setShareLinkBackfillDone] = useState(false);
  const [autoShareEnabled, setAutoShareEnabled] = useState<boolean | null>(null);
  const [autoShareLoading, setAutoShareLoading] = useState(false);
  const [autoShareProgramLabel, setAutoShareProgramLabel] = useState('');
  const [autoShareError, setAutoShareError] = useState<string | null>(null);

  // ── Activity Log ──
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [logLoading, setLogLoading] = useState(false);
  const [logError, setLogError] = useState<string | null>(null);
  const [logPageStack, setLogPageStack] = useState<string[]>([]); // stack of `after` cursors for prev
  const [logNextAfter, setLogNextAfter] = useState<string | null>(null);
  const [logHasMore, setLogHasMore] = useState(false);
  const [clearLogConfirm, setClearLogConfirm] = useState(false);
  const [clearLogLoading, setClearLogLoading] = useState(false);

  // ── Form Instrumentation ──
  const [includeAdvocateCode, setIncludeAdvocateCode] = useState(true);
  const [advocateCodeProperty, setAdvocateCodeProperty] = useState(DEFAULT_ADVOCATE_CODE_PROPERTY);
  const [referralUrlParam, setReferralUrlParam] = useState(DEFAULT_REFERRAL_URL_PARAMS);
  const [formTargeting, setFormTargeting] = useState<'all' | 'specific'>('all');
  const [availableForms, setAvailableForms] = useState<{ id: string; name: string }[]>([]);
  const [availableFormsLoading, setAvailableFormsLoading] = useState(false);
  const [selectedFormIds, setSelectedFormIds] = useState<string[]>([]);
  const [advocateCodePropertyStatus, setAdvocateCodePropertyStatus] = useState<PropertyStatus>({ exists: null });
  const [advocateCodeCreating, setAdvocateCodeCreating] = useState(false);
  const [advocateCodeCreateResult, setAdvocateCodeCreateResult] = useState<string | null>(null);

  // ── Derived snippet ──
  const snippet = generateSnippet({
    advocateCodeProperty: includeAdvocateCode ? advocateCodeProperty : '',
    referralUrlParams: referralUrlParam.split(',').map(s => s.trim()).filter(Boolean),
    formIds: formTargeting === 'specific' ? selectedFormIds : [],
  });

  // ── Sorted workflows ──
  const sortedWorkflows = sortCol === null ? workflows : [...workflows].sort((a, b) => {
    let aVal: string, bVal: string;
    if (sortCol === 'name')        { aVal = a.eventName; bVal = b.eventName; }
    else if (sortCol === 'object') { aVal = OBJECT_TYPE_LABELS[a.objectTypeId ?? ''] ?? a.objectTypeId ?? ''; bVal = OBJECT_TYPE_LABELS[b.objectTypeId ?? ''] ?? b.objectTypeId ?? ''; }
    else if (sortCol === 'status') { aVal = a.enabled ? 'Active' : 'Inactive'; bVal = b.enabled ? 'Active' : 'Inactive'; }
    else                           { aVal = a.createdAt ?? ''; bVal = b.createdAt ?? ''; }
    const cmp = aVal.localeCompare(bVal);
    return sortDir === 'ascending' ? cmp : -cmp;
  });

  // ── On mount ── (calls serialized — HubSpot dev can't handle concurrent calls)
  useEffect(() => {
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getWorkflows' },
      propertiesToSend: [],
    }).then((res) => {
      const r = res.response || {};
      if (r.error) setWorkflowsError(r.error);
      setWorkflows(r.workflows ?? []);
    }).catch(() => {});
  }, []);

  // Load campaigns + check share link property when share links tab is first opened
  useEffect(() => {
    if (activeTab !== 'sharelinks') return;
    if (campaigns.length > 0 || campaignsLoading) return;
    setCampaignsLoading(true);
    setCampaignsError(null);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getCampaigns' },
      propertiesToSend: [],
    }).then((res) => {
      if (!res.response) { setCampaignsError('Failed to load campaigns'); return; }
      const r = res.response;
      if (r.error) { setCampaignsError(r.error); setCampaigns([]); return; }
      const seen = new Set<string>();
      const camps = (r.campaigns ?? []).filter((c: { programLabel: string }) => {
        if (seen.has(c.programLabel)) return false;
        seen.add(c.programLabel);
        return true;
      });
      setCampaigns(camps);
      return runServerlessFunction({
        name: 'extole_settings',
        parameters: { action: 'checkProperties', propertyNames: [DEFAULT_SHARE_LINK_PROPERTY] },
        propertiesToSend: [],
      });
    }).then((res2: any) => {
      const status = res2?.response?.properties?.[DEFAULT_SHARE_LINK_PROPERTY];
      setShareLinkPropertyStatus(status ?? { exists: false });
      return runServerlessFunction({
        name: 'extole_settings',
        parameters: { action: 'getAutoShareLinkStatus' },
        propertiesToSend: [],
      });
    }).then((res3: any) => {
      const w = res3?.response?.workflow;
      setAutoShareEnabled(w ? w.enabled : false);
    }).catch(() => {
      setShareLinkPropertyStatus({ exists: false });
      setAutoShareEnabled(false);
    }).finally(() => {
      setCampaignsLoading(false);
    });
  }, [activeTab]);

  // Check advocate code property + load available forms when form instrumentation tab is first opened
  useEffect(() => {
    if (activeTab !== 'forms') return;
    if (advocateCodePropertyStatus.exists === null) {
      runServerlessFunction({
        name: 'extole_settings',
        parameters: { action: 'checkProperties', propertyNames: [advocateCodeProperty] },
        propertiesToSend: [],
      }).then((res: any) => {
        const status = res?.response?.properties?.[advocateCodeProperty];
        setAdvocateCodePropertyStatus(status ?? { exists: false });
      }).catch(() => {
        setAdvocateCodePropertyStatus({ exists: false });
      });
    }
    if (availableForms.length === 0 && !availableFormsLoading) {
      setAvailableFormsLoading(true);
      runServerlessFunction({
        name: 'extole_settings',
        parameters: { action: 'getForms' },
        propertiesToSend: [],
      }).then((res: any) => {
        setAvailableForms(res?.response?.forms ?? []);
      }).catch(() => {
        setAvailableForms([]);
      }).finally(() => {
        setAvailableFormsLoading(false);
      });
    }
  }, [activeTab]);

  // Load log entries when log tab is first opened
  function fetchLogPage(after?: string) {
    setLogLoading(true);
    setLogError(null);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'createLogSchema' },
      propertiesToSend: [],
    }).then((res) => {
      const r = res.response || {};
      if (r.error) { setLogError(`Schema init failed: ${r.error}`); return null; }
      return runServerlessFunction({
        name: 'extole_settings',
        parameters: { action: 'getLogEntries', ...(after ? { after } : {}) },
        propertiesToSend: [],
      });
    }).then((res: any) => {
      if (!res) return;
      const r = res.response || {};
      if (r.error) { setLogError(r.error); return; }
      setLogEntries(r.entries ?? []);
      setLogHasMore(r.hasMore ?? false);
      setLogNextAfter(r.nextAfter ?? null);
    }).catch((e: any) => {
      setLogError(e?.message ?? 'Failed to load log');
    }).finally(() => {
      setLogLoading(false);
    });
  }

  useEffect(() => {
    if (activeTab !== 'log') return;
    if (logLoading) return;
    setLogPageStack([]);
    fetchLogPage();
  }, [activeTab]);

  function handleLogNextPage() {
    if (!logNextAfter) return;
    setLogPageStack(s => [...s, logNextAfter]);
    fetchLogPage(logNextAfter);
  }

  function handleLogPrevPage() {
    const stack = [...logPageStack];
    stack.pop(); // remove current page cursor
    const prev = stack[stack.length - 1]; // cursor for previous page (undefined = first page)
    setLogPageStack(stack);
    fetchLogPage(prev);
  }

  function handleClearLog() {
    setClearLogLoading(true);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'clearLog' },
      propertiesToSend: [],
    }).then((res) => {
      const r = res.response || {};
      if (r.error) { setLogError(r.error); return; }
      setLogEntries([]);
      setLogPageStack([]);
      setLogHasMore(false);
      setLogNextAfter(null);
      setClearLogConfirm(false);
    }).catch((e: any) => {
      setLogError(e?.message ?? 'Failed to clear log');
    }).finally(() => {
      setClearLogLoading(false);
    });
  }


  // ─── Handlers ─────────────────────────────────────────────────────────────

  function handleCreateAdvocateCodeProperty() {
    setAdvocateCodeCreating(true);
    setAdvocateCodeCreateResult(null);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'createProperties', hubspotutkProperty: '', advocateCodeProperty },
      propertiesToSend: [],
    }).then((res) => {
      const { created = [], errors = [] } = res.response || {};
      if (errors.length === 0) {
        return runServerlessFunction({
          name: 'extole_settings',
          parameters: { action: 'checkProperties', propertyNames: [advocateCodeProperty] },
          propertiesToSend: [],
        }).then((res2: any) => {
          const status = res2?.response?.properties?.[advocateCodeProperty];
          setAdvocateCodePropertyStatus(status ?? { exists: true });
        });
      } else {
        setAdvocateCodeCreateResult(`Error: ${errors[0].error}`);
      }
    }).catch((err) => {
      setAdvocateCodeCreateResult(`Error: ${err.message}`);
    }).finally(() => {
      setAdvocateCodeCreating(false);
    });
  }

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

  function handleCreateShareLinkProperty() {
    setShareLinkPropertyCreating(true);
    setShareLinkPropertyCreateResult(null);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'createShareLinkProperty', propertyName: DEFAULT_SHARE_LINK_PROPERTY, actor },
      propertiesToSend: [],
    }).then((res) => {
      const { created = [], errors = [] } = res.response || {};
      if (errors.length === 0) {
        setShareLinkPropertyCreateResult(created.length ? 'Property created.' : 'Property already exists.');
        runServerlessFunction({
          name: 'extole_settings',
          parameters: { action: 'checkProperties', propertyNames: [DEFAULT_SHARE_LINK_PROPERTY] },
          propertiesToSend: [],
        }).then((res2: any) => {
          const status = res2?.response?.properties?.[DEFAULT_SHARE_LINK_PROPERTY];
          setShareLinkPropertyStatus(status ?? { exists: false });
        });
      } else {
        setShareLinkPropertyCreateResult(`Error: ${errors[0].error}`);
      }
    }).catch((err) => {
      setShareLinkPropertyCreateResult(`Error: ${err.message}`);
    }).finally(() => {
      setShareLinkPropertyCreating(false);
    });
  }

  function handleToggleAutoShare(enable: boolean) {
    setAutoShareLoading(true);
    setAutoShareError(null);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'toggleAutoShareLink', enable, programLabel: autoShareProgramLabel, actor },
      propertiesToSend: [],
    }).then((res) => {
      if (res.response?.error) { setAutoShareError(res.response.error); return; }
      setAutoShareEnabled(res.response?.enabled ?? enable);
    }).catch((e) => setAutoShareError(String(e)))
      .finally(() => setAutoShareLoading(false));
  }

  async function handleRunShareLinkBackfill() {
    setShareLinkBackfillRunning(true);
    setShareLinkBackfillDone(false);
    setShareLinkBackfillProgress({ created: 0, existing: 0, skipped: 0, errors: 0 });
    let cursor: string | null = null;
    let totalCreated = 0, totalExisting = 0, totalSkipped = 0, totalErrors = 0;
    while (true) {
      const res = await runServerlessFunction({
        name: 'extole_settings',
        parameters: {
          action: 'runShareLinkBackfillBatch',
          cursor,
          programLabel: selectedProgramLabel,
          shareLinkProperty: DEFAULT_SHARE_LINK_PROPERTY,
          actor,
        },
        propertiesToSend: [],
      });
      const batch = res.response || {};
      totalCreated += batch.created || 0;
      totalExisting += batch.existing || 0;
      totalSkipped += batch.skipped || 0;
      const batchErrors = batch.errors || [];
      totalErrors += batchErrors.length;
      cursor = batch.cursor || null;
      setShareLinkBackfillProgress({ created: totalCreated, existing: totalExisting, skipped: totalSkipped, errors: totalErrors });
      if (batch.done || !cursor) break;
    }
    setShareLinkBackfillRunning(false);
    setShareLinkBackfillDone(true);
  }

  function handleLoadWorkflows() {
    setWorkflowsError(null);
    setWorkflows([]);
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getWorkflows' },
      propertiesToSend: [],
    }).then((res) => {
      const r = res.response || {};
      if (r.error) setWorkflowsError(r.error);
      setWorkflows(r.workflows ?? []);
    }).catch(() => {
      setWorkflowsError('Failed to load workflows');
    });
  }

  function handleToggleWorkflow(flowId: string, enabled: boolean) {
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'toggleWorkflow', flowId, enabled, actor },
      propertiesToSend: [],
    }).then(() => handleLoadWorkflows());
  }

  function handleDeleteWorkflow(flowId: string, workflowName?: string) {
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'deleteWorkflow', flowId, workflowName, actor },
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
      const cfg = res.response?.config;
      setEventForm({
        eventName: cfg?.eventName ?? w.eventName,
        triggerObject: cfg?.triggerObject ?? 'contact',
        triggerType: cfg?.triggerType ?? 'RECORD_CREATED',
        triggerProperty: cfg?.triggerProperty ?? '',
        triggerToValue: cfg?.triggerToValue ?? '',
        fieldMappings: cfg?.fieldMappings ?? [...CONTACT_DEFAULTS],
      });
      setCreateResult('');
    }).catch(() => {
      setEventForm({ ...BLANK_EVENT_FORM, eventName: w.eventName });
      setCreateResult('');
    });
  }

  function closeEventForm() {
    setShowEventForm(false);
    setEditingWorkflowId(null);
    setEventForm(BLANK_EVENT_FORM);
    setCreateResult('');
  }

  function handleCreateEventWorkflow(enabled: boolean) {
    setCreatingWorkflow(true);
    setCreateResult('');
    runServerlessFunction({
      name: 'extole_settings',
      parameters: {
        action: 'createWorkflow',
        eventName: eventForm.eventName,
        triggerObject: eventForm.triggerObject,
        triggerType: eventForm.triggerType,
        triggerProperty: eventForm.triggerProperty || undefined,
        triggerToValue: eventForm.triggerToValue || undefined,
        fieldMappings: eventForm.fieldMappings,
        enabled,
        actor,
      },
      propertiesToSend: [],
    }).then((res) => {
      if (res.response?.error) {
        setCreateResult(`Error: ${res.response.error}`);
      } else {
        setCreateResult(`Created "${res.response?.name}".`);
        closeEventForm();
        handleLoadWorkflows();
      }
    }).catch((err) => setCreateResult(`Error: ${err.message}`))
      .finally(() => setCreatingWorkflow(false));
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
        triggerType: eventForm.triggerType,
        triggerProperty: eventForm.triggerProperty || undefined,
        triggerToValue: eventForm.triggerToValue || undefined,
        fieldMappings: eventForm.fieldMappings,
      },
      propertiesToSend: [],
    }).then((res) => {
      if (res.response?.error) {
        setCreateResult(`Error: ${res.response.error}`);
      } else {
        setCreateResult(`Saved "${res.response?.name}".`);
        closeEventForm();
        handleLoadWorkflows();
      }
    }).catch((err) => setCreateResult(`Error: ${err.message}`))
      .finally(() => setCreatingWorkflow(false));
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Form>
      {/* ── Navigation ── */}
      <Flex direction="row" gap="extra-small">
        <Button variant={activeTab === 'events' ? undefined : 'transparent'} onClick={() => setActiveTab('events')}>Event Configuration</Button>
        <Button variant={activeTab === 'forms' ? undefined : 'transparent'} onClick={() => setActiveTab('forms')}>Form Instrumentation</Button>
        <Button variant={activeTab === 'sharelinks' ? undefined : 'transparent'} onClick={() => setActiveTab('sharelinks')}>Share Links</Button>
        <Button variant={activeTab === 'log' ? undefined : 'transparent'} onClick={() => setActiveTab('log')}>Settings Log</Button>
      </Flex>
      <Divider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — EVENT CONFIGURATION
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'events' && (<>

          {/* ── Connection ── */}
          <Heading>Extole Connection</Heading>
          <Text>Verify your Extole API token is configured and reachable.</Text>
          <Flex direction="row" gap="small" align="center">
            <Button onClick={handleTestConnection} disabled={connectionTesting}>
              {connectionTesting ? 'Testing...' : 'Test Connection'}
            </Button>
            {connectionStatus === 'ok' && (
              <StatusTag variant="success">Connection functioning properly</StatusTag>
            )}
            {connectionStatus === 'error' && (
              <StatusTag variant="danger">{connectionDetail || 'Check EXTOLE_API_TOKEN secret'}</StatusTag>
            )}
          </Flex>

          <Divider />

          {/* ── Workflows ── */}
          <Heading>Workflows</Heading>
          <Text>
            Create HubSpot Workflows that fire events to Extole. Choose any event name your
            Extole program expects, pick a trigger object, and map HubSpot properties to
            Extole data fields. Workflows are pre-wired with the correct endpoint and auth.
          </Text>

          {workflowsError && (
            <StatusTag variant="danger">{workflowsError}</StatusTag>
          )}
          <Flex direction="row" gap="small" align="center">
            {!workflowsError && workflows.length === 0 && <Text>No Extole workflows found.</Text>}
            <Button onClick={handleLoadWorkflows} variant="transparent">Refresh</Button>
          </Flex>
          {workflows.length > 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader
                        sortDirection={sortCol === 'name' ? sortDir : 'none'}
                        onSortChange={(dir) => { setSortCol('name'); setSortDir(dir as 'ascending' | 'descending'); }}
                      >Extole Event</TableHeader>
                      <TableHeader
                        sortDirection={sortCol === 'object' ? sortDir : 'none'}
                        onSortChange={(dir) => { setSortCol('object'); setSortDir(dir as 'ascending' | 'descending'); }}
                      >Object</TableHeader>
                      <TableHeader
                        sortDirection={sortCol === 'status' ? sortDir : 'none'}
                        onSortChange={(dir) => { setSortCol('status'); setSortDir(dir as 'ascending' | 'descending'); }}
                      >Status</TableHeader>
                      <TableHeader
                        sortDirection={sortCol === 'created' ? sortDir : 'none'}
                        onSortChange={(dir) => { setSortCol('created'); setSortDir(dir as 'ascending' | 'descending'); }}
                      >Created</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedWorkflows.map((w) => (
                      <TableRow key={w.id}>
                        <TableCell>{w.eventName}</TableCell>
                        <TableCell>
                          {OBJECT_TYPE_LABELS[w.objectTypeId ?? ''] ?? w.objectTypeId ?? 'Unknown'}
                        </TableCell>
                        <TableCell>{w.status === 'DRAFT' ? 'Draft' : w.enabled ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell>{formatDate(w.createdAt, locale)}</TableCell>
                        <TableCell>
                          {confirmDeleteId === w.id ? (
                            <Flex direction="row" gap="extra-small" align="center">
                              <Button onClick={() => handleDeleteWorkflow(w.id, w.name)} variant="destructive">
                                Confirm delete
                              </Button>
                              <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                            </Flex>
                          ) : (
                            <Dropdown variant="transparent">
                              <Dropdown.ButtonItem onClick={() => handleEditWorkflow(w)}>
                                Edit
                              </Dropdown.ButtonItem>
                              <Dropdown.ButtonItem>
                                <Link href={{ url: `https://app.hubspot.com/workflows/${portalId}/platform/flow/${w.id}/edit`, external: true }}>
                                  Open Workflow
                                </Link>
                              </Dropdown.ButtonItem>
                              {w.enabled ? (
                                <Dropdown.ButtonItem onClick={() => handleToggleWorkflow(w.id, false)}>
                                  Deactivate
                                </Dropdown.ButtonItem>
                              ) : (
                                <Dropdown.ButtonItem onClick={() => handleToggleWorkflow(w.id, true)}>
                                  Activate
                                </Dropdown.ButtonItem>
                              )}
                              <Dropdown.ButtonItem onClick={() => setConfirmDeleteId(w.id)}>
                                Delete
                              </Dropdown.ButtonItem>
                            </Dropdown>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {!showEventForm ? (
                <>
                  {createResult && <Text>{createResult}</Text>}
                  <Spacer />
                  <Button onClick={() => { setShowEventForm(true); setCreateResult(''); }}>
                    + Add Event
                  </Button>
                </>
              ) : (
                <EventForm
                  form={eventForm}
                  onChange={setEventForm}
                  onSubmit={editingWorkflowId ? () => handleUpdateEventWorkflow() : handleCreateEventWorkflow}
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
                  onLoadObjectTypes={() =>
                    runServerlessFunction({
                      name: 'extole_settings',
                      parameters: { action: 'getObjectTypes' },
                      propertiesToSend: [],
                    }).then((res) => res.response?.objectTypes ?? []).catch(() => [])
                  }
                  onLoadObjectProperties={(objectType) =>
                    runServerlessFunction({
                      name: 'extole_settings',
                      parameters: { action: 'getObjectProperties', objectType },
                      propertiesToSend: [],
                    }).then((res) => {
                      if (res.response?.error) throw new Error(res.response.error);
                      return res.response?.properties ?? [];
                    })
                  }
                />
              )}

      </>)}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — FORM INSTRUMENTATION
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'forms' && (<>

          <Heading>Form Instrumentation</Heading>
          <Text>
            Captures the referral advocate code at form submission and stores it on the Contact
            for Extole attribution. Before deploying the snippet, add extole_advocate_code as a
            hidden field on each form you want to instrument in HubSpot's form builder.
            Skip this section if you're using server-side identity resolution or don't need
            form-based attribution.
          </Text>

          <Toggle
            name="includeAdvocateCode"
            label="Capture advocate code"
            checked={includeAdvocateCode}
            onChange={(val) => setIncludeAdvocateCode(val)}
          />
          <Text>Reads the referral code from the URL param and stores it on the Contact for HubSpot reporting.</Text>

          {includeAdvocateCode && (
            <Flex direction="row">
              <Box flex="none"><Text>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</Text></Box>
              <Box flex={1}>
                <Input
                  label="Advocate code Contact property"
                  name="advocateCodeProperty"
                  value={advocateCodeProperty}
                  onChange={(val) => setAdvocateCodeProperty(val)}
                />
                <Input
                  label="Advocate code URL parameter(s)"
                  name="referralUrlParam"
                  value={referralUrlParam}
                  onChange={(val) => setReferralUrlParam(val)}
                  description="Comma-separated URL params to check, in order. First match wins. Confirm with your Extole implementation team."
                />
              </Box>
            </Flex>
          )}

          {includeAdvocateCode && (
            <>
              <Spacer />
              {advocateCodePropertyStatus.exists === null ? (
                <Text>Checking property...</Text>
              ) : advocateCodePropertyStatus.exists ? (
                <Text>
                  {advocateCodeProperty} — Created {formatDate(advocateCodePropertyStatus.createdAt, locale)}
                </Text>
              ) : (
                <>
                  <Button onClick={handleCreateAdvocateCodeProperty} disabled={advocateCodeCreating}>
                    {advocateCodeCreating ? 'Creating...' : 'Create Property'}
                  </Button>
                  {advocateCodeCreateResult && <Text>{advocateCodeCreateResult}</Text>}
                </>
              )}
            </>
          )}

          <Select
            label="Form targeting"
            name="formTargeting"
            value={formTargeting}
            onChange={(val) => setFormTargeting(val as 'all' | 'specific')}
            options={[
              { label: 'All Embedded Forms', value: 'all' },
              { label: 'Specific forms', value: 'specific' },
            ]}
          />

          {formTargeting === 'specific' && (
            <>
              {availableFormsLoading ? (
                <Text>Loading forms...</Text>
              ) : (
                <Select
                  label="Add a form"
                  name="addForm"
                  value=""
                  onChange={(val) => {
                    if (val && !selectedFormIds.includes(val)) {
                      setSelectedFormIds([...selectedFormIds, val]);
                    }
                  }}
                  options={[
                    { label: '— select a form —', value: '' },
                    ...availableForms
                      .filter(f => !selectedFormIds.includes(f.id))
                      .map(f => ({ label: f.name, value: f.id })),
                  ]}
                />
              )}
              {selectedFormIds.length > 0 && (
                <Box>
                  {selectedFormIds.map(id => {
                    const form = availableForms.find(f => f.id === id);
                    return (
                      <Flex key={id} direction="row" justify="between" align="center">
                        <Text>{form ? form.name : id} <Text format={{ color: 'medium' }}>({id})</Text></Text>
                        <Button
                          variant="transparent"
                          onClick={() => setSelectedFormIds(selectedFormIds.filter(fid => fid !== id))}
                        >
                          Remove
                        </Button>
                      </Flex>
                    );
                  })}
                </Box>
              )}
              {selectedFormIds.length === 0 && !availableFormsLoading && (
                <Text format={{ color: 'medium' }}>No forms selected — snippet will not instrument any forms.</Text>
              )}
            </>
          )}

          <Divider />
          <Text format={{ fontWeight: 'bold' }}>Generated Snippet</Text>
          <Text>Copy this snippet and embed it on your site, after the HubSpot tracking script. Works with both classic (v2) and new form builder (v3) embeds.</Text>
          <TextArea
            label=""
            name="snippet"
            value={snippet}
            readOnly
            rows={12}
          />

      </>)}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — SHARE LINKS
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'sharelinks' && (<>

          {/* ── Step 1: Share link property ── */}
          <Heading>Create Share Link Property</Heading>
          <Text>
            Creates the Extole Share Link property on Contacts. Share links are written here
            after generation and can be used in HubSpot emails and reporting.
          </Text>
          <Spacer />
          {shareLinkPropertyStatus.exists === null ? (
            <LoadingSpinner label="Checking..." showLabel />
          ) : shareLinkPropertyStatus.exists ? (
            <StatusTag variant="success">
              {DEFAULT_SHARE_LINK_PROPERTY} — Created {formatDate(shareLinkPropertyStatus.createdAt, locale)}
            </StatusTag>
          ) : (
            <>
              <Button onClick={handleCreateShareLinkProperty} disabled={shareLinkPropertyCreating}>
                {shareLinkPropertyCreating ? 'Creating...' : 'Create Property'}
              </Button>
              {shareLinkPropertyCreateResult && <Text>{shareLinkPropertyCreateResult}</Text>}
            </>
          )}

          <Divider />

          {/* ── Auto-generate for new contacts ── */}
          <Heading>Auto-generate Share Links for New Contacts</Heading>
          <Text>
            Generate a share link using Extole whenever a new contact is created in HubSpot,
            and save that link to the Extole Share Link property automatically.
          </Text>
          <Spacer />

          {autoShareEnabled === null ? (
            <LoadingSpinner label="Checking status..." showLabel />
          ) : (
            <Toggle
              label={autoShareEnabled ? 'Enabled' : 'Disabled'}
              name="autoShare"
              checked={autoShareEnabled}
              onChange={(val) => handleToggleAutoShare(val)}
              disabled={autoShareLoading}
            />
          )}
          {autoShareError && <StatusTag variant="danger">{autoShareError}</StatusTag>}

          {autoShareEnabled && (
            <>
              <Spacer />
              {campaignsLoading ? (
                <LoadingSpinner label="Loading..." showLabel />
              ) : campaignsError ? (
                <StatusTag variant="danger">{campaignsError}</StatusTag>
              ) : (
                <Select
                  label="Campaign Targeting Label (optional)"
                  name="autoShareCampaign"
                  value={autoShareProgramLabel}
                  onChange={(val) => setAutoShareProgramLabel(val)}
                  options={[{ label: 'None', value: '' }, ...campaigns.map(c => ({ label: c.name, value: c.programLabel }))]}
                />
              )}
            </>
          )}

          <Divider />

          {/* ── Generate for existing contacts ── */}
          <Heading>Generate Share Links for Existing HubSpot Contacts</Heading>
          <Text>
            Run once to generate share links for contacts already in HubSpot.
            Safe to re-run — contacts who already have a link are updated in place.
          </Text>
          <Spacer />

          {campaignsLoading ? null : campaignsError ? null : (
            <Select
              label="Campaign Targeting Label (optional)"
              name="backfillCampaign"
              value={selectedProgramLabel}
              onChange={(val) => setSelectedProgramLabel(val)}
              options={[{ label: 'None', value: '' }, ...campaigns.map(c => ({ label: c.name, value: c.programLabel }))]}
            />
          )}

          <Spacer />
          <Button
            onClick={handleRunShareLinkBackfill}
            disabled={shareLinkBackfillRunning}
            variant="primary"
          >
            {shareLinkBackfillRunning ? 'Generating...' : 'Generate Share Links'}
          </Button>

          {shareLinkBackfillRunning && <LoadingSpinner label="Generating share links..." showLabel />}

          {shareLinkBackfillProgress && (
            <>
              <Text>
                Created: {shareLinkBackfillProgress.created} | Already had link: {shareLinkBackfillProgress.existing} | Skipped: {shareLinkBackfillProgress.skipped} | Errors: {shareLinkBackfillProgress.errors}
              </Text>
            </>
          )}

          {shareLinkBackfillDone && <Text>Share link generation complete.</Text>}

      </>)}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — ACTIVITY LOG
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'log' && (<>

          <Heading>Settings Log</Heading>
          <Text>Configuration changes made in this app, newest first.</Text>
          <Spacer />

          {logLoading ? (
            <LoadingSpinner label="Loading..." showLabel />
          ) : logError ? (
            <StatusTag variant="danger">{logError}</StatusTag>
          ) : logEntries.length === 0 ? (
            <Text>No activity logged yet.</Text>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>When</TableHeader>
                    <TableHeader>Action</TableHeader>
                    <TableHeader>User</TableHeader>
                    <TableHeader>Details</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{formatDate(entry.timestamp, locale)}</TableCell>
                      <TableCell>{LOG_ACTION_LABELS[entry.action] ?? entry.action}</TableCell>
                      <TableCell>{entry.actor}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                      <TableCell>
                        <StatusTag variant={entry.status === 'success' ? 'success' : 'danger'}>
                          {entry.status === 'success' ? 'Success' : 'Error'}
                        </StatusTag>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Spacer />
              <Flex direction="row" gap="small">
                <Button variant="secondary" onClick={handleLogPrevPage} disabled={logPageStack.length === 0 || logLoading}>← Prev</Button>
                <Button variant="secondary" onClick={handleLogNextPage} disabled={!logHasMore || logLoading}>Next →</Button>
                {clearLogConfirm ? (
                  <>
                    <Button variant="destructive" onClick={handleClearLog} disabled={clearLogLoading}>
                      {clearLogLoading ? 'Clearing...' : 'Confirm Clear'}
                    </Button>
                    <Button variant="secondary" onClick={() => setClearLogConfirm(false)} disabled={clearLogLoading}>Cancel</Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={() => setClearLogConfirm(true)}>Clear Log</Button>
                )}
              </Flex>
            </>
          )}

      </>)}
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
  onLoadObjectTypes,
  onLoadObjectProperties,
}: {
  form: EventFormState;
  onChange: (f: EventFormState) => void;
  onSubmit: (enabled: boolean) => void;
  onCancel: () => void;
  creating: boolean;
  createResult: string;
  isEditing?: boolean;
  onValidateProperty?: (objectType: string, propertyName: string) => Promise<boolean>;
  onLoadObjectTypes?: () => Promise<ObjectTypeOption[]>;
  onLoadObjectProperties?: (objectType: string) => Promise<{ value: string; label: string; fieldType?: string; options?: { label: string; value: string }[] }[]>;
}) {
  const [propErrors, setPropErrors] = useState<Record<number, boolean>>({});
  const [triggerFieldError, setTriggerFieldError] = useState(false);
  const [objectTypes, setObjectTypes] = useState<ObjectTypeOption[]>([
    { value: 'contact', label: 'Contact', objectTypeId: '0-1' },
    { value: 'deal',    label: 'Deal',    objectTypeId: '0-3' },
  ]);
  useEffect(() => {
    if (onLoadObjectTypes) {
      onLoadObjectTypes().then(types => { if (types.length) setObjectTypes(types); }).catch(() => {});
    }
  }, []);

  const [objectProperties, setObjectProperties] = useState<{ value: string; label: string; fieldType?: string; options?: { label: string; value: string }[] }[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [propertiesError, setPropertiesError] = useState('');

  useEffect(() => {
    const needsProperty = form.triggerType === 'FIELD_CHANGED' || form.triggerType === 'FIELD_VALUE';
    if (!needsProperty || !onLoadObjectProperties || !form.triggerObject) return;
    setPropertiesLoading(true);
    setPropertiesError('');
    onLoadObjectProperties(form.triggerObject)
      .then(props => setObjectProperties(props))
      .catch((e) => { setObjectProperties([]); setPropertiesError(String(e)); })
      .finally(() => setPropertiesLoading(false));
  }, [form.triggerObject, form.triggerType]);

  function setTriggerObject(v: string) {
    const defaults = DEFAULT_MAPPINGS[v] ? [...DEFAULT_MAPPINGS[v]] : [];
    onChange({ ...form, triggerObject: v, triggerProperty: '', fieldMappings: defaults });
    setPropErrors({});
    setTriggerFieldError(false);
  }

  function setTriggerType(v: string) {
    onChange({ ...form, triggerType: v, triggerProperty: '', triggerToValue: '' });
    setTriggerFieldError(false);
  }

  async function validateTriggerField(propertyName: string) {
    if (!onValidateProperty || !propertyName.trim()) return;
    const valid = await onValidateProperty(form.triggerObject, propertyName.trim());
    setTriggerFieldError(!valid);
  }

  function updateMapping(index: number, field: keyof FieldMapping, value: string) {
    const updated = form.fieldMappings.map((m, i) => i === index ? { ...m, [field]: value } : m);
    onChange({ ...form, fieldMappings: updated });
    if (field === 'source' || (field === 'value' && !value)) {
      setPropErrors(prev => { const n = { ...prev }; delete n[index]; return n; });
    }
  }

  function addMapping() {
    onChange({ ...form, fieldMappings: [...form.fieldMappings, { extoleKey: '', source: 'property', value: '' }] });
  }

  function removeMapping(index: number) {
    onChange({ ...form, fieldMappings: form.fieldMappings.filter((_, i) => i !== index) });
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
        onChange={(v) => onChange({ ...form, eventName: v })}
        placeholder="e.g. purchase, referral_sent, account_upgrade"
        description="The exact Extole event name your program expects."
      />

      <Select
        label="Trigger object"
        name="triggerObject"
        value={form.triggerObject}
        onChange={setTriggerObject}
        options={objectTypes.map(o => ({ label: o.label, value: o.value }))}
      />

      <Select
        label="Trigger"
        name="triggerType"
        value={form.triggerType}
        onChange={setTriggerType}
        options={[
          { label: 'Record created', value: 'RECORD_CREATED' },
          { label: 'Field changed', value: 'FIELD_CHANGED' },
          { label: 'Field changed to value', value: 'FIELD_VALUE' },
        ]}
        description={
          form.triggerType === 'RECORD_CREATED' ? 'Fires once when a new record is created.' :
          form.triggerType === 'FIELD_CHANGED'  ? 'Fires each time the selected property changes to any value.' :
          'Fires when the selected property changes to a specific value (e.g. dealstage → closedwon).'
        }
      />

      {(form.triggerType === 'FIELD_CHANGED' || form.triggerType === 'FIELD_VALUE') && (
        <>
          <Spacer />
          {propertiesLoading ? (
            <LoadingSpinner label="Loading fields..." />
          ) : propertiesError ? (
            <>
              <Input
                label="Field"
                name="triggerProperty"
                value={form.triggerProperty}
                onChange={(v) => { onChange({ ...form, triggerProperty: v }); setTriggerFieldError(false); }}
                onBlur={(v) => validateTriggerField(v)}
                placeholder={form.triggerObject === 'deal' ? 'e.g. dealstage' : form.triggerObject === 'contact' ? 'e.g. lifecyclestage' : 'e.g. hs_pipeline_stage'}
                error={triggerFieldError}
                validationMessage={triggerFieldError ? 'Field not found in HubSpot' : undefined}
              />
            </>
          ) : objectProperties.length > 0 ? (
            <Select
              label="Field"
              name="triggerProperty"
              value={form.triggerProperty}
              onChange={(v) => { onChange({ ...form, triggerProperty: v }); setTriggerFieldError(false); }}
              options={objectProperties.map(p => ({ label: `${p.label} (${p.value})`, value: p.value }))}
            />
          ) : (
            <Input
              label="Field"
              name="triggerProperty"
              value={form.triggerProperty}
              onChange={(v) => { onChange({ ...form, triggerProperty: v }); setTriggerFieldError(false); }}
              onBlur={(v) => validateTriggerField(v)}
              placeholder={form.triggerObject === 'deal' ? 'e.g. dealstage' : form.triggerObject === 'contact' ? 'e.g. lifecyclestage' : 'e.g. hs_pipeline_stage'}
              error={triggerFieldError}
              validationMessage={triggerFieldError ? 'Field not found in HubSpot' : undefined}
            />
          )}
        </>
      )}

      {form.triggerType === 'FIELD_VALUE' && (() => {
        const selectedProp = objectProperties.find(p => p.value === form.triggerProperty);
        const opts = selectedProp?.options ?? [];
        return (
          <>
            <Spacer />
            {opts.length > 0 ? (
              <Select
                label="Value"
                name="triggerToValue"
                value={form.triggerToValue}
                onChange={(v) => onChange({ ...form, triggerToValue: v })}
                options={opts}
              />
            ) : (
              <Input
                label="Value"
                name="triggerToValue"
                value={form.triggerToValue}
                onChange={(v) => onChange({ ...form, triggerToValue: v })}
                placeholder="e.g. closedwon"
              />
            )}
          </>
        );
      })()}

      <Divider />
      <Text format={{ fontWeight: 'bold' }}>Field Mappings</Text>
      <Text>
        Map Extole parameter names to HubSpot property internal names.
        Use the internal name exactly as it appears in HubSpot (e.g. email, firstname, hs_object_id).
        Static values are passed through as literals.
      </Text>

      {form.fieldMappings.map((mapping, i) => (
        <Flex direction="row" gap="small" align="end" key={i}>
          <Box flex={2}>
            <Input
              label="Extole parameter"
              name={`ek_${i}`}
              value={mapping.extoleKey}
              onChange={(v) => updateMapping(i, 'extoleKey', v)}
              placeholder="e.g. email"
            />
          </Box>
          <Box flex={1}>
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
          </Box>
          <Box flex={2}>
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
          </Box>
          <Button onClick={() => removeMapping(i)}>Delete</Button>
        </Flex>
      ))}

      <Divider />

      {createResult && <Text>{createResult}</Text>}

      <Spacer />
      <Flex direction="row" gap="small" align="center">
        <Button onClick={addMapping}>+ Add field</Button>
        {isEditing ? (
          <Button onClick={() => onSubmit(true)} disabled={!canSubmit} variant="primary">
            {creating ? 'Saving...' : 'Save Changes'}
          </Button>
        ) : (
          <>
            <Button onClick={() => onSubmit(true)} disabled={!canSubmit} variant="primary">
              {creating ? 'Creating...' : 'Create Workflow'}
            </Button>
            <Button onClick={() => onSubmit(false)} disabled={!canSubmit}>
              {creating ? 'Creating...' : 'Save as Draft'}
            </Button>
          </>
        )}
        <Button onClick={onCancel} disabled={creating}>Cancel</Button>
      </Flex>
    </>
  );
}

// ─── Snippet Generator ────────────────────────────────────────────────────────

function generateSnippet({ advocateCodeProperty, referralUrlParams, formIds }: {
  advocateCodeProperty: string;
  referralUrlParams: string[];
  formIds: string[];
}): string {
  const paramsJson = referralUrlParams.length > 0 ? JSON.stringify(referralUrlParams) : JSON.stringify(['extole_shareable_code']);
  const formIdsJson = JSON.stringify(formIds);
  return `<!-- Extole Form Configurator — place anywhere on the page, before forms load -->
<script>
(function() {
  var ADVOCATE_CODE_PROPERTY = '${advocateCodeProperty}';
  var REFERRAL_URL_PARAMS = ${paramsJson}; // first match wins
  var FORM_IDS = ${formIdsJson}; // empty = all forms
  var STORAGE_KEY = 'extole_advocate_code';
  var COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

  function getFirstUrlParam(names) {
    for (var i = 0; i < names.length; i++) {
      var match = window.location.search.match(new RegExp('[?&]' + names[i] + '=([^&]+)'));
      if (match) return decodeURIComponent(match[1]);
    }
    return '';
  }

  function isValidCode(value) {
    return typeof value === 'string' && value.length > 0 && value.length <= 128 &&
      /^[A-Za-z0-9._-]+$/.test(value);
  }

  function setCookie(value) {
    document.cookie = STORAGE_KEY + '=' + encodeURIComponent(value) +
      '; path=/; max-age=' + COOKIE_MAX_AGE + '; SameSite=Lax';
  }

  function getCookie() {
    var match = document.cookie.match(new RegExp('(^|;\\s*)' + STORAGE_KEY + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : '';
  }

  function setLocalStorage(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch(e) {}
  }

  function getLocalStorage() {
    try { return window.localStorage.getItem(STORAGE_KEY) || ''; } catch(e) { return ''; }
  }

  // On landing: persist advocate code to cookie + localStorage so it survives navigation and tab changes
  (function() {
    var code = getFirstUrlParam(REFERRAL_URL_PARAMS);
    if (isValidCode(code)) {
      setCookie(code);
      setLocalStorage(code);
    }
  })();

  // Inject advocate code as URL param — HubSpot reads URL params at form init time and
  // pre-populates hidden fields natively. Must run before hbspt.forms.create loads.
  // Blocking <script> in <head> guarantees correct timing.
  (function() {
    var code = getAdvocateCode();
    if (!code || !ADVOCATE_CODE_PROPERTY) return;
    try {
      var url = new URL(window.location.href);
      if (!url.searchParams.get(ADVOCATE_CODE_PROPERTY)) {
        url.searchParams.set(ADVOCATE_CODE_PROPERTY, code);
        window.history.replaceState(null, '', url.toString());
      }
    } catch(e) {}
  })();

  function getAdvocateCode() {
    var fromUrl = getFirstUrlParam(REFERRAL_URL_PARAMS);
    if (isValidCode(fromUrl)) return fromUrl;
    var fromCookie = getCookie();
    if (isValidCode(fromCookie)) return fromCookie;
    var fromStorage = getLocalStorage();
    if (isValidCode(fromStorage)) return fromStorage;
    return '';
  }

  function shouldInstrument(formId) {
    return !FORM_IDS.length || FORM_IDS.indexOf(formId) !== -1;
  }

  // ── v2 classic forms (hbspt.forms.create) ──
  // DOM fallback: sets the hidden field value in case replaceState ran too late.
  // replaceState (above) is the primary mechanism; this is belt-and-suspenders.
  // Add ADVOCATE_CODE_PROPERTY as a hidden field in HubSpot's form builder for each form.
  function updateDataField(data, name, value) {
    if (!name || !value) return;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) { data[i].value = value; return; }
    }
  }

  function setField(el, value) {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function makeWrappedCreate(orig) {
    return function(options) {
      if (!shouldInstrument(options && options.formId)) return orig.call(this, options);
      var opts = {};
      for (var k in options) { if (options.hasOwnProperty(k)) opts[k] = options[k]; }
      var origOnReady = opts.onFormReady;
      var origOnBeforeSubmit = opts.onBeforeFormSubmit;
      opts.onFormReady = function($form) {
        var code = getAdvocateCode();
        if (code && ADVOCATE_CODE_PROPERTY) {
          // $form[0] may be an INPUT — walk up to the enclosing <form>
          var rawEl = ($form && $form[0]) ? $form[0] : $form;
          var form = rawEl ? (rawEl.tagName === 'FORM' ? rawEl : (rawEl.form || rawEl.closest('form'))) : null;
          if (form) {
            var el = form.querySelector('[name="' + ADVOCATE_CODE_PROPERTY + '"]');
            if (el) {
              setField(el, code);
            } else {
              // Field not yet in DOM — observe until it appears
              var observer = new MutationObserver(function() {
                var el2 = form.querySelector('[name="' + ADVOCATE_CODE_PROPERTY + '"]');
                if (el2) { setField(el2, code); observer.disconnect(); }
              });
              observer.observe(form, { childList: true, subtree: true });
            }
          }
        }
        if (origOnReady) origOnReady.apply(this, arguments);
      };
      opts.onBeforeFormSubmit = function($form, data) {
        var code = getAdvocateCode();
        if (code) updateDataField(data, ADVOCATE_CODE_PROPERTY, code);
        if (origOnBeforeSubmit) origOnBeforeSubmit.apply(this, arguments);
      };
      return orig.call(this, opts);
    };
  }

  function wrapForms(forms) {
    if (forms._extoleWrapped) return;
    forms._extoleWrapped = true;
    if (forms.create) {
      forms.create = makeWrappedCreate(forms.create);
    } else {
      var _create;
      Object.defineProperty(forms, 'create', {
        configurable: true,
        get: function() { return _create; },
        set: function(fn) { _create = fn ? makeWrappedCreate(fn) : fn; }
      });
    }
  }

  function watchHbspt(hbspt) {
    if (hbspt.forms) { wrapForms(hbspt.forms); return; }
    var _forms;
    Object.defineProperty(hbspt, 'forms', {
      configurable: true,
      get: function() { return _forms; },
      set: function(f) { _forms = f; if (f) wrapForms(f); }
    });
  }

  if (window.hbspt) { watchHbspt(window.hbspt); }
  else {
    var _hbspt;
    Object.defineProperty(window, 'hbspt', {
      configurable: true,
      get: function() { return _hbspt; },
      set: function(val) { _hbspt = val; if (val) watchHbspt(val); }
    });
  }

  // ── v3 new form builder (HubSpotFormsV4 API) ──
  // Add ADVOCATE_CODE_PROPERTY as a hidden field in HubSpot's form builder for each form.
  window.addEventListener('hs-form-event:on-ready', function(event) {
    var code = getAdvocateCode();
    if (!code || !ADVOCATE_CODE_PROPERTY) return;
    var detail = event.detail || {};
    if (!shouldInstrument(detail.formId)) return;
    try {
      var hsForm = window.HubSpotFormsV4 && window.HubSpotFormsV4.getFormFromEvent(event);
      if (hsForm) hsForm.setFieldValue('0-1/' + ADVOCATE_CODE_PROPERTY, code);
    } catch(e) {}
  });
})();
</script>`;
}
