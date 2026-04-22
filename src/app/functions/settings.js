/**
 * Extole Settings Function
 *
 * Handles all settings page operations via an `action` parameter:
 *   - createProperties: ensure extole_hubspotutk (+ optional extole_advocate_code) Contact properties exist
 *   - testConnection: verify Extole API token is valid
 *   - getContactCount: count contacts for backfill estimate
 *   - runBackfillBatch: process one batch of contacts, return cursor + progress
 */

const HS_API_BASE = 'https://api.hubapi.com';
const EXTOLE_API_BASE = 'https://api.extole.io';
const BATCH_SIZE = 50;
// Workaround: Extole v5 shareables API currently requires a label even though it shouldn't.
// Set to null once the API is fixed (ticket open). See: exhsappd = extole hubspot app default.
const DEFAULT_SHARE_LABEL = 'exhsappd';

async function testConnection(token) {
  const res = await fetch(`${EXTOLE_API_BASE}/v4/tokens`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { ok: res.ok, status: res.status };
}

async function fireEvent(token, eventName, data) {
  const res = await fetch(`${EXTOLE_API_BASE}/v5/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name: eventName, data: { ...data, app_type: 'hubspot_crm' } }),
  });
  let body;
  try { body = await res.json(); } catch { body = null; }
  return { ok: res.ok, status: res.status, body };
}


exports.main = async (context) => {
  const hsToken = process.env.PRIVATE_APP_ACCESS_TOKEN;
  const extoleToken = context.secrets?.EXTOLE_API_TOKEN || process.env.EXTOLE_API_TOKEN;
  const { action, ...params } = context.parameters || {};

  switch (action) {
    case 'testConnection':
      return handleTestConnection(extoleToken);

    case 'createProperties':
      return handleCreateProperties(hsToken, params);

    case 'validateProperty':
      return handleValidateProperty(hsToken, params);

    case 'getContactCount':
      return handleGetContactCount(hsToken);

    case 'runBackfillBatch':
      return handleRunBackfillBatch(hsToken, extoleToken, params);

    case 'getObjectTypes':
      return handleGetObjectTypes(hsToken);

    case 'getWorkflows':
      return handleGetWorkflows(hsToken);

    case 'getWorkflowConfig':
      return handleGetWorkflowConfig(hsToken, params);

    case 'deleteWorkflow':
      return handleDeleteWorkflow(hsToken, params);

    case 'createWorkflow':
      return handleCreateWorkflow(hsToken, extoleToken, params);

    case 'updateWorkflow':
      return handleUpdateWorkflow(hsToken, extoleToken, params);

    case 'toggleWorkflow':
      return handleToggleWorkflow(hsToken, params);

    case 'checkProperties':
      return handleCheckProperties(hsToken, params);

    case 'getObjectProperties':
      return handleGetObjectProperties(hsToken, params);

    case 'probeEnrollment':
      return handleProbeEnrollment(hsToken, params);

    case 'getCampaigns':
      return handleGetCampaigns(extoleToken);

    case 'getForms':
      return handleGetForms(hsToken);

    case 'createShareLinkProperty':
      return handleCreateShareLinkProperty(hsToken, params);

    case 'runShareLinkBackfillBatch':
      return handleRunShareLinkBackfillBatch(hsToken, extoleToken, params);

    case 'getAutoShareLinkStatus':
      return handleGetAutoShareLinkStatus(hsToken);

    case 'toggleAutoShareLink':
      return handleToggleAutoShareLink(hsToken, extoleToken, params);

    case 'createLogSchema':
      return handleCreateLogSchema(hsToken);

    case 'getLogEntries':
      return handleGetLogEntries(hsToken, params);

    case 'clearLog':
      return handleClearLog(hsToken);

    default:
      return { error: `Unknown action: ${action}` };
  }
};

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handleTestConnection(extoleToken) {
  if (!extoleToken) {
    return { connected: false, error: 'EXTOLE_API_TOKEN secret not configured' };
  }
  const result = await testConnection(extoleToken);
  return {
    connected: result.ok || result.status === 401, // 401 means reachable but token may need scope
    status: result.status,
    tokenPrefix: extoleToken.slice(0, 4),
  };
}

async function handleCheckProperties(hsToken, { propertyNames }) {
  const results = {};
  for (const name of (propertyNames || [])) {
    const res = await hsGet(hsToken, `/crm/v3/properties/contacts/${name}`);
    if (res.ok) {
      const data = await res.json();
      results[name] = { exists: true, createdAt: data.createdAt };
    } else {
      results[name] = { exists: false };
    }
  }
  return { properties: results };
}

async function handleCreateProperties(hsToken, { hubspotutkProperty, advocateCodeProperty }) {
  const created = [];
  const errors = [];

  const toCreate = [];
  if (hubspotutkProperty) {
    toCreate.push({
      name: hubspotutkProperty,
      label: 'Extole HubSpot Visitor ID',
      description: 'HubSpot visitor cookie (hubspotutk) captured at form submission for Extole referral attribution.',
      groupName: 'contactinformation',
    });
  }

  if (advocateCodeProperty) {
    toCreate.push({
      name: advocateCodeProperty,
      label: 'Extole Advocate Code',
      description: 'Extole referral/advocate code captured at form submission.',
      groupName: 'contactinformation',
    });
  }

  for (const prop of toCreate) {
    const result = await ensureContactProperty(hsToken, prop);
    if (result.error) {
      errors.push({ property: prop.name, error: result.error });
    } else {
      created.push({ property: prop.name, action: result.action });
    }
  }

  for (const c of created) {
    await writeLogEntry(hsToken, {
      action: 'property_created',
      actor: '',
      details: c.property,
      status: 'success',
    });
  }

  return { created, errors };
}

async function handleValidateProperty(hsToken, { objectType, propertyName }) {
  if (!propertyName) return { valid: false };
  const crmType = objectType === 'deal' ? 'deals' : 'contacts';
  const res = await hsGet(hsToken, `/crm/v3/properties/${crmType}/${propertyName}`);
  return { valid: res.ok };
}

async function handleGetContactCount(hsToken) {
  // List endpoint doesn't return total — use search which does
  const response = await hsPost(hsToken, '/crm/v3/objects/contacts/search', {
    filterGroups: [],
    properties: ['email'],
    limit: 1,
  });
  if (!response.ok) {
    return { error: `HubSpot API error: ${response.status}` };
  }
  const data = await response.json();
  return { total: data.total ?? 0 };
}

async function handleRunBackfillBatch(hsToken, extoleToken, { cursor, hubspotutkProperty }) {
  const property = hubspotutkProperty || 'extole_hubspotutk';
  let url = `/crm/v3/objects/contacts?limit=${BATCH_SIZE}&properties=email,${property},extole_advocate_code`;
  if (cursor) url += `&after=${cursor}`;

  const response = await hsGet(hsToken, url);
  if (!response.ok) {
    return { error: `HubSpot API error: ${response.status}` };
  }

  const data = await response.json();
  const contacts = data.results || [];
  const nextCursor = data.paging?.next?.after || null;

  let enrolled = 0;
  let skipped = 0;
  const errors = [];

  for (const contact of contacts) {
    const email = contact.properties?.email;
    if (!email) { skipped++; continue; }

    const contactData = {
      contact_id: String(contact.id),
      email,
    };
    if (contact.properties?.[property]) contactData.hubspotutk = contact.properties[property];
    if (contact.properties?.extole_advocate_code) contactData.advocate_code = contact.properties.extole_advocate_code;

    const result = await fireEvent(extoleToken, 'hubspot_contact_enrolled', contactData);
    if (result.ok) {
      enrolled++;
    } else {
      errors.push({ contactId: contact.id, status: result.status });
    }
  }

  return {
    enrolled,
    skipped,
    errors,
    cursor: nextCursor,
    done: !nextCursor,
    batchSize: contacts.length,
  };
}


async function handleGetWorkflows(hsToken) {
  // Use v4 flows API — returns all types (CONTACT_FLOW + PLATFORM_FLOW) with v4 IDs
  // that are compatible with the delete/update endpoints.
  const res = await fetch('https://api.hubapi.com/automation/v4/flows?limit=100', {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!res.ok) {
    return { error: `HubSpot API error: ${res.status}`, workflows: [] };
  }
  const data = await res.json();
  const extoleWorkflows = (data.results || [])
    .filter(w => w.name && w.name.startsWith('Extole'))
    .map(w => ({
      id: String(w.id),
      name: w.name,
      eventName: w.name.replace(/^Extole\s*[—-]\s*/, ''),
      enabled: w.isEnabled,
      status: w.status || (w.isEnabled ? 'ACTIVE' : 'INACTIVE'),
      objectTypeId: w.objectTypeId || '0-1',
      createdAt: w.createdAt || null,
    }));
  return { workflows: extoleWorkflows };
}

// HubSpot v4 Flows event type IDs for "record created" per object type.
// 4-1463224 confirmed for contact; HubSpot UI also assigns it for deal/company
// PLATFORM_FLOW workflows with "Record created" trigger (2026-04).
// PLATFORM_FLOW enrollment processes with a longer delay than CONTACT_FLOW.
const RECORD_CREATED_EVENT_TYPE_IDS = {
  contact: '4-1463224',
  deal:    '4-1463224',
  company: '4-1463224',
  ticket:  '4-1463224',
  quote:   '4-1463224',
};

// Object type → CRM API path and flow type
const OBJECT_CONFIG = {
  contact: { crmPath: 'contacts',  objectTypeId: '0-1',  flowType: 'CONTACT_FLOW' },
  deal:    { crmPath: 'deals',     objectTypeId: '0-3',  flowType: 'PLATFORM_FLOW' },
  company: { crmPath: 'companies', objectTypeId: '0-2',  flowType: 'PLATFORM_FLOW' },
  ticket:  { crmPath: 'tickets',   objectTypeId: '0-5',  flowType: 'PLATFORM_FLOW' },
  quote:   { crmPath: 'quotes',    objectTypeId: '0-14', flowType: 'PLATFORM_FLOW' },
};

// For custom objects, triggerObject IS the objectTypeId (e.g. '2-1234567')
function getObjConfig(triggerObject) {
  if (OBJECT_CONFIG[triggerObject]) return OBJECT_CONFIG[triggerObject];
  return { crmPath: triggerObject, objectTypeId: triggerObject, flowType: 'PLATFORM_FLOW' };
}

async function handleGetObjectTypes(hsToken) {
  const standard = [
    { value: 'contact', label: 'Contact',  objectTypeId: '0-1' },
    { value: 'deal',    label: 'Deal',     objectTypeId: '0-3' },
    { value: 'company', label: 'Company',  objectTypeId: '0-2' },
    { value: 'ticket',  label: 'Ticket',   objectTypeId: '0-5' },
    { value: 'quote',   label: 'Quote',    objectTypeId: '0-14' },
  ];

  const res = await hsGet(hsToken, '/crm/v3/schemas');
  if (!res.ok) return { objectTypes: standard };

  const data = await res.json();
  const custom = (data.results || []).map(s => ({
    value: s.objectTypeId,
    label: s.labels?.singular || s.name,
    objectTypeId: s.objectTypeId,
  }));

  return { objectTypes: [...standard, ...custom] };
}

// ─── Enrollment criteria builders ────────────────────────────────────────────

function buildEnrollmentCriteria(obj, triggerType, triggerProperty, triggerToValue) {
  const type = triggerType || 'RECORD_CREATED';

  if (type === 'RECORD_CREATED') {
    const eventTypeId = RECORD_CREATED_EVENT_TYPE_IDS[obj] || RECORD_CREATED_EVENT_TYPE_IDS['contact'];
    return {
      type: 'EVENT_BASED',
      shouldReEnroll: false,
      eventFilterBranches: [{
        filterBranches: [],
        filters: [],
        eventTypeId,
        operator: 'HAS_COMPLETED',
        filterBranchType: 'UNIFIED_EVENTS',
        filterBranchOperator: 'AND',
      }],
      listMembershipFilterBranches: [],
    };
  }

  if (type === 'FIELD_CHANGED') {
    return {
      type: 'LIST_BASED',
      shouldReEnroll: true,
      listFilterBranch: {
        filterBranchType: 'AND',
        filterBranchOperator: 'AND',
        filters: [],
        filterBranches: [],
      },
    };
  }

  if (type === 'FIELD_VALUE') {
    return {
      type: 'LIST_BASED',
      shouldReEnroll: false,
      listFilterBranch: {
        filterBranchType: 'AND',
        filterBranchOperator: 'AND',
        filters: [{
          filterType: 'PROPERTY',
          property: triggerProperty,
          operation: {
            operationType: 'ENUMERATION',
            operator: 'IS_ANY_OF',
            includeObjectsWithNoValueSet: false,
            values: [triggerToValue],
          },
        }],
        filterBranches: [],
      },
    };
  }

  return null;
}

function parseTriggerConfig(enrollmentCriteria) {
  if (!enrollmentCriteria) return { triggerType: 'RECORD_CREATED' };

  if (enrollmentCriteria.type === 'EVENT_BASED') {
    return { triggerType: 'RECORD_CREATED' };
  }

  // Legacy v3 format — read-only, created before v4 migration
  if (enrollmentCriteria.type === 'PROPERTY_FILTER') {
    const trigger = enrollmentCriteria.reEnrollmentTriggerSets?.[0]?.triggers?.[0];
    if (!trigger) return { triggerType: 'FIELD_CHANGED' };
    if (trigger.operator === 'HAS_CHANGED_TO') {
      return {
        triggerType: 'FIELD_VALUE',
        triggerProperty: trigger.property,
        triggerToValue: trigger.value,
      };
    }
    return {
      triggerType: 'FIELD_CHANGED',
      triggerProperty: trigger.property,
    };
  }

  // v4 LIST_BASED — infer trigger type from filter presence
  if (enrollmentCriteria.type === 'LIST_BASED') {
    const filter = enrollmentCriteria.listFilterBranch?.filters?.[0];
    if (!filter) return { triggerType: 'FIELD_CHANGED' };
    return {
      triggerType: 'FIELD_VALUE',
      triggerProperty: filter.property,
      triggerToValue: filter.operation?.values?.[0],
    };
  }

  return { triggerType: 'RECORD_CREATED' };
}

async function handleCreateWorkflow(hsToken, extoleToken, { eventName, triggerObject, triggerType, triggerProperty, triggerToValue, fieldMappings, enabled, actor }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = getObjConfig(obj);
  const sourceCode = buildWorkflowSourceCode(hsToken, extoleToken, eventName, objConfig.crmPath, fieldMappings);

  const flow = {
    name: `Extole — ${eventName}`,
    flowType: 'WORKFLOW',
    isEnabled: enabled !== false,
    objectTypeId: objConfig.objectTypeId,
    type: objConfig.flowType,
    startActionId: '1',
    actions: [{
      actionId: '1',
      type: 'CUSTOM_CODE',
      runtime: 'NODE20X',
      inputFields: [],
      sourceCode,
    }],
    enrollmentCriteria: buildEnrollmentCriteria(obj, triggerType, triggerProperty, triggerToValue),
  };

  const res = await fetch('https://api.hubapi.com/automation/v4/flows', {
    method: 'POST',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(flow),
  });
  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: responseData.message || `HTTP ${res.status}`, details: responseData };
  }

  await writeLogEntry(hsToken, {
    action: 'workflow_created',
    actor: actor || '',
    details: responseData.name || eventName || '',
    status: 'success',
  });

  return { workflowId: responseData.id, name: responseData.name };
}

async function handleToggleWorkflow(hsToken, { flowId, enabled, actor }) {
  if (!flowId) return { error: 'flowId is required' };

  const getRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!getRes.ok) return { error: `Failed to fetch workflow: HTTP ${getRes.status}` };
  const existing = await getRes.json();

  const putBody = {
    name: existing.name,
    revisionId: existing.revisionId,
    flowType: existing.flowType,
    isEnabled: enabled,
    objectTypeId: existing.objectTypeId,
    type: existing.type,
    startActionId: existing.startActionId,
    actions: existing.actions,
    enrollmentCriteria: existing.enrollmentCriteria,
    timeWindows: existing.timeWindows || [],
    blockedDates: existing.blockedDates || [],
    suppressionListIds: existing.suppressionListIds || [],
    canEnrollFromSalesforce: existing.canEnrollFromSalesforce || false,
  };

  const putRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(putBody),
  });
  const responseData = await putRes.json().catch(() => ({}));
  if (!putRes.ok) return { error: responseData.message || `HTTP ${putRes.status}` };
  const workflowName = existing.name || flowId;
  await writeLogEntry(hsToken, {
    action: 'workflow_toggled',
    actor: actor || '',
    details: `${workflowName} → ${enabled ? 'enabled' : 'disabled'}`,
    status: 'success',
  });
  return { enabled: responseData.isEnabled };
}

async function handleDeleteWorkflow(hsToken, { flowId, workflowName, actor }) {
  if (!flowId) return { error: 'flowId is required' };
  const res = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  // Treat 404 as success — workflow was already deleted externally
  const deleted = res.ok || res.status === 404;
  if (deleted) {
    await writeLogEntry(hsToken, {
      action: 'workflow_deleted',
      actor: actor || '',
      details: workflowName || flowId,
      status: 'success',
    });
  }
  return { deleted, status: res.status };
}

async function handleGetWorkflowConfig(hsToken, { flowId }) {
  if (!flowId) return { error: 'flowId is required' };
  const res = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  const config = parseWorkflowConfig(data.actions?.[0]?.sourceCode || '');
  const triggerConfig = parseTriggerConfig(data.enrollmentCriteria);
  return { config: config ? { ...config, ...triggerConfig } : null };
}

async function handleUpdateWorkflow(hsToken, extoleToken, { flowId, eventName, triggerObject, triggerType, triggerProperty, triggerToValue, fieldMappings }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!flowId) return { error: 'flowId is required' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = getObjConfig(obj);
  const sourceCode = buildWorkflowSourceCode(hsToken, extoleToken, eventName, objConfig.crmPath, fieldMappings);

  // GET current flow to preserve mutable fields not included in the edit form
  const getRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!getRes.ok) {
    return { error: `Failed to fetch workflow: HTTP ${getRes.status}` };
  }
  const existing = await getRes.json();

  // If a triggerType was supplied, rebuild enrollment criteria; otherwise preserve existing.
  const enrollmentCriteria = triggerType
    ? buildEnrollmentCriteria(obj, triggerType, triggerProperty, triggerToValue)
    : existing.enrollmentCriteria;

  const updatedActions = (existing.actions || []).map((a, i) =>
    i === 0 ? { ...a, sourceCode } : a
  );

  const putBody = {
    name: `Extole — ${eventName}`,
    revisionId: existing.revisionId,
    flowType: existing.flowType,
    isEnabled: existing.isEnabled,
    objectTypeId: existing.objectTypeId,
    type: existing.type,
    startActionId: existing.startActionId,
    actions: updatedActions,
    enrollmentCriteria,
    timeWindows: existing.timeWindows || [],
    blockedDates: existing.blockedDates || [],
    suppressionListIds: existing.suppressionListIds || [],
    canEnrollFromSalesforce: existing.canEnrollFromSalesforce || false,
  };

  const putRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${hsToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(putBody),
  });
  const responseData = await putRes.json().catch(() => ({}));

  if (!putRes.ok) {
    return { error: responseData.message || `HTTP ${putRes.status}`, details: responseData };
  }

  return { workflowId: responseData.id, name: responseData.name };
}

const DEFAULT_PROPERTIES = {
  contact: [
    { value: 'email',           label: 'Email' },
    { value: 'firstname',       label: 'First Name' },
    { value: 'lastname',        label: 'Last Name' },
    { value: 'lifecyclestage',  label: 'Lifecycle Stage' },
    { value: 'hs_lead_status',  label: 'Lead Status' },
    { value: 'phone',           label: 'Phone Number' },
    { value: 'company',         label: 'Company Name' },
  ],
  deal: [
    { value: 'dealstage',       label: 'Deal Stage' },
    { value: 'dealname',        label: 'Deal Name' },
    { value: 'amount',          label: 'Amount' },
    { value: 'closedate',       label: 'Close Date' },
    { value: 'pipeline',        label: 'Pipeline' },
    { value: 'hs_is_closed_won', label: 'Is Closed Won' },
  ],
  company: [
    { value: 'name',            label: 'Company Name' },
    { value: 'industry',        label: 'Industry' },
    { value: 'annualrevenue',   label: 'Annual Revenue' },
    { value: 'hs_lead_status',  label: 'Lead Status' },
  ],
  ticket: [
    { value: 'subject',         label: 'Ticket Name' },
    { value: 'hs_pipeline_stage', label: 'Ticket Status' },
    { value: 'hs_ticket_priority', label: 'Priority' },
  ],
};

function getDefaultProperties(objectType) {
  return DEFAULT_PROPERTIES[objectType] || [];
}

async function handleGetObjectProperties(hsToken, { objectType }) {
  if (!objectType) return { error: 'objectType is required' };
  const crmPathMap = { contact: 'contacts', deal: 'deals', company: 'companies', ticket: 'tickets', quote: 'quotes' };
  const crmPath = crmPathMap[objectType] || objectType;

  const res = await hsGet(hsToken, `/crm/v3/properties/${crmPath}`);
  if (!res.ok) {
    // Fall back to common properties so the UI stays functional
    return { properties: getDefaultProperties(objectType) };
  }
  const data = await res.json();
  const all = data.results || [];
  const props = all
    .filter(p => !p.hidden && !p.calculated && p.fieldType !== 'file')
    .map(p => ({ value: p.name, label: p.label, fieldType: p.fieldType, type: p.type, options: (p.options || []).filter(o => !o.hidden).map(o => ({ label: o.label, value: o.value })) }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return { properties: props.length > 0 ? props : getDefaultProperties(objectType) };
}

// Temporary probe: create a minimal PLATFORM_FLOW deal workflow with a given
// enrollmentCriteria shape, read it back to get the canonical structure, then delete it.
async function handleProbeEnrollment(hsToken, { enrollmentCriteria }) {
  const probeFlow = {
    name: '__extole_probe_delete_me',
    flowType: 'WORKFLOW',
    isEnabled: false,
    objectTypeId: '0-3',
    type: 'PLATFORM_FLOW',
    startActionId: '1',
    actions: [{
      actionId: '1',
      type: 'CUSTOM_CODE',
      runtime: 'NODE20X',
      inputFields: [],
      sourceCode: "exports.main = async (event) => ({ outputFields: {} });",
    }],
    enrollmentCriteria,
  };

  const createRes = await fetch('https://api.hubapi.com/automation/v4/flows', {
    method: 'POST',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(probeFlow),
  });
  const createBody = await createRes.json().catch(() => ({}));
  if (!createRes.ok) {
    return { error: createBody.message || `HTTP ${createRes.status}`, details: createBody };
  }

  const id = createBody.id;

  // Read it back to get canonical shape
  const getRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${id}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  const canonical = await getRes.json().catch(() => ({}));

  // Clean up
  await fetch(`https://api.hubapi.com/automation/v4/flows/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${hsToken}` },
  });

  return { canonical: canonical.enrollmentCriteria };
}

function parseWorkflowConfig(sourceCode) {
  if (!sourceCode) return null;
  try {
    const eventName = sourceCode.match(/const EVENT_NAME = '([^']+)'/)?.[1];
    const crmType = sourceCode.match(/const CRM_TYPE = '([^']+)'/)?.[1];
    const mappingsMatch = sourceCode.match(/const FIELD_MAPPINGS = (\[[\s\S]*?\]);/);
    const fieldMappings = mappingsMatch ? JSON.parse(mappingsMatch[1]) : [];
    if (!eventName) return null;
    // Reverse-map CRM path back to trigger object key
    const crmPathToKey = { contacts: 'contact', deals: 'deal', companies: 'company', tickets: 'ticket', quotes: 'quote' };
    const triggerObject = crmPathToKey[crmType] || crmType; // custom objects: crmType IS the objectTypeId
    return { eventName, triggerObject, fieldMappings };
  } catch {
    return null;
  }
}

function buildWorkflowSourceCode(hsToken, extoleToken, eventName, crmObjectType, fieldMappings) {
  // Escape tokens for safe embedding in JS string literals
  const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  return `
const HS_TOKEN = '${escape(hsToken)}';
const EXTOLE_TOKEN = '${escape(extoleToken)}';
const EVENT_NAME = '${escape(eventName)}';
const CRM_TYPE = '${crmObjectType}';
const FIELD_MAPPINGS = ${JSON.stringify(fieldMappings || [])};

exports.main = async (event) => {
  const objectId = event.object.objectId;

  // Fetch object properties from HubSpot CRM
  const propNames = [...new Set(
    FIELD_MAPPINGS.filter(m => m.source === 'property' && m.value).map(m => m.value)
  )];
  const propsQuery = propNames.map(p => 'properties=' + encodeURIComponent(p)).join('&');

  const hsRes = await fetch(
    'https://api.hubapi.com/crm/v3/objects/' + CRM_TYPE + '/' + objectId + (propsQuery ? '?' + propsQuery : ''),
    { headers: { Authorization: 'Bearer ' + HS_TOKEN } }
  );
  const hsBody = await hsRes.json().catch(() => ({}));
  const props = hsBody.properties || {};

  // Build Extole event data from field mappings
  const data = { app_type: 'hubspot_crm' };
  for (const m of FIELD_MAPPINGS) {
    if (!m.extoleKey) continue;
    const value = m.source === 'static' ? m.value : props[m.value];
    if (value != null && value !== '') data[m.extoleKey] = value;
  }

  // Fire event to Extole
  const extoleRes = await fetch('https://api.extole.io/v5/events', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name: EVENT_NAME, data })
  });

  let extoleBody;
  try { extoleBody = await extoleRes.json(); } catch { extoleBody = null; }

  return {
    outputFields: {
      status: extoleRes.ok ? 'SUCCESS' : 'ERROR',
      extoleId: (extoleBody && extoleBody.id) || null,
      httpStatus: String(extoleRes.status)
    }
  };
};
`.trim();
}

// ─── Form Instrumentation handlers ───────────────────────────────────────────

async function handleGetForms(hsToken) {
  try {
    const res = await fetch(
      'https://api.hubapi.com/marketing/v3/forms?formTypes=hubspot&limit=100',
      { headers: { Authorization: `Bearer ${hsToken}` } }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { error: `HubSpot API ${res.status}: ${body.slice(0, 200)}`, forms: [] };
    }
    const data = await res.json();
    const forms = (data.results || []).map(f => ({ id: f.id, name: f.name || f.id }));
    return { forms };
  } catch (e) {
    return { error: e.message, forms: [] };
  }
}

// ─── Share Link handlers ──────────────────────────────────────────────────────

async function handleGetCampaigns(extoleToken) {
  try {
    if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured', campaigns: [] };
    const res = await fetch(`${EXTOLE_API_BASE}/v2/campaign-summaries`, {
      headers: { Authorization: `Bearer ${extoleToken}` },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { error: `Extole API ${res.status}: ${body.slice(0, 200)}`, campaigns: [] };
    }
    const data = await res.json();
    const all = Array.isArray(data) ? data : [];
    const campaigns = all
      .filter(c => !(c.tags || []).includes('hidden'))
      .map(c => ({ id: c.campaign_id, name: c.name, programLabel: c.program_label }));
    return { campaigns };
  } catch (e) {
    return { error: `getCampaigns exception: ${e && e.message || String(e)}`, campaigns: [] };
  }
}

async function handleCreateShareLinkProperty(hsToken, { propertyName, actor }) {
  const name = propertyName || 'extole_share_link';
  const result = await ensureContactProperty(hsToken, {
    name,
    label: 'Extole Share Link',
    description: "Personal Extole share link URL for this contact, used for referral programs.",
    groupName: 'contactinformation',
  });
  if (result.error) return { created: [], errors: [{ property: name, error: result.error }] };
  await writeLogEntry(hsToken, {
    action: 'share_link_property_created',
    actor: actor || '',
    details: `Property: ${name}`,
    status: 'success',
  });
  return { created: [{ property: name, action: result.action }], errors: [] };
}

async function handleRunShareLinkBackfillBatch(hsToken, extoleToken, { cursor, programLabel, shareLinkProperty, actor }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };

  const property = shareLinkProperty || 'extole_share_link';
  let url = `/crm/v3/objects/contacts?limit=${BATCH_SIZE}&properties=email`;
  if (cursor) url += `&after=${cursor}`;

  const response = await hsGet(hsToken, url);
  if (!response.ok) return { error: `HubSpot API error: ${response.status}` };

  const data = await response.json();
  const contacts = data.results || [];
  const nextCursor = data.paging?.next?.after || null;

  let created = 0, existing = 0, skipped = 0;
  const errors = [];

  for (const contact of contacts) {
    const email = contact.properties?.email;
    if (!email) { skipped++; continue; }

    // Look up person in Extole by email
    const lookupRes = await fetch(
      `${EXTOLE_API_BASE}/v5/persons?identity_key_value=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${extoleToken}` } }
    );
    if (!lookupRes.ok) {
      errors.push({ email, error: `lookup ${lookupRes.status}` });
      continue;
    }
    let persons = await lookupRes.json().catch(() => []);
    if (!Array.isArray(persons) || !persons.length) {
      // Person doesn't exist in Extole — create directly
      const createRes = await fetch(`${EXTOLE_API_BASE}/v5/persons`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${extoleToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity_key_value: email }),
      });
      const createBody = await createRes.json().catch(() => ({}));
      if (!createRes.ok) {
        errors.push({ email, error: `person create ${createRes.status}: ${createBody.message || createBody.code || ''}` });
        continue;
      }
      persons = [createBody];
    }

    const personId = persons[0].id;
    let link = null;

    // Create shareable for this campaign
    const shareCreateRes = await fetch(`${EXTOLE_API_BASE}/v5/persons/${personId}/shareables`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${extoleToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: programLabel || DEFAULT_SHARE_LABEL }),
    });
    const shareCreateBody = await shareCreateRes.json().catch(() => ({}));

    if (shareCreateRes.ok) {
      link = shareCreateBody.link;
      created++;
    } else if (shareCreateBody.code === 'shareable_key_taken') {
      // Shareable already exists — fetch and use the existing link
      const getRes = await fetch(`${EXTOLE_API_BASE}/v5/persons/${personId}/shareables`, {
        headers: { Authorization: `Bearer ${extoleToken}` },
      });
      if (getRes.ok) {
        const shareables = await getRes.json().catch(() => []);
        const match = (Array.isArray(shareables) ? shareables : []).find(s => s.label === (programLabel || DEFAULT_SHARE_LABEL));
        if (match) { link = match.link; existing++; }
        else { skipped++; continue; }
      } else {
        errors.push({ email, error: `get shareables ${getRes.status}` });
        continue;
      }
    } else {
      errors.push({ email, error: shareCreateBody.message || `shareable create ${shareCreateRes.status}` });
      continue;
    }

    // Write the share link back to the HubSpot contact property
    if (link) {
      const patchRes = await fetch(`${HS_API_BASE}/crm/v3/objects/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: { [property]: link } }),
      });
      if (!patchRes.ok) {
        errors.push({ email, error: `writeback ${patchRes.status}` });
      }
    }
  }

  const isDone = !nextCursor;
  if (isDone) {
    await writeLogEntry(hsToken, {
      action: 'share_link_backfill_completed',
      actor: actor || '',
      details: `Created: ${created}, Existing: ${existing}, Skipped: ${skipped}, Errors: ${errors.length}`,
      status: errors.length > 0 && created === 0 ? 'error' : 'success',
    });
    for (const e of errors) {
      await writeLogEntry(hsToken, {
        action: 'share_link_backfill_error',
        actor: actor || '',
        details: `${e.email}: ${e.error}`,
        status: 'error',
      });
    }
  }

  return {
    created,
    existing,
    skipped,
    errors,
    cursor: nextCursor,
    done: isDone,
    batchSize: contacts.length,
  };
}

const AUTO_SHARE_LINK_WORKFLOW_NAME = 'Extole — Auto Share Link';

async function handleGetAutoShareLinkStatus(hsToken) {
  const res = await fetch('https://api.hubapi.com/automation/v4/flows?limit=100', {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!res.ok) return { workflow: null };
  const data = await res.json();
  const w = (data.results || []).find(w => w.name === AUTO_SHARE_LINK_WORKFLOW_NAME);
  if (!w) return { workflow: null };
  return { workflow: { id: String(w.id), enabled: w.isEnabled } };
}

async function handleToggleAutoShareLink(hsToken, extoleToken, { programLabel, enable, actor }) {
  const statusRes = await handleGetAutoShareLinkStatus(hsToken);

  if (!enable) {
    if (!statusRes.workflow) return { enabled: false };
    const r = await handleToggleWorkflow(hsToken, { flowId: statusRes.workflow.id, enabled: false });
    if (r.error) return { error: r.error };
    await writeLogEntry(hsToken, {
      action: 'auto_share_link_disabled',
      actor: actor || '',
      details: '',
      status: 'success',
    });
    return { enabled: false };
  }

  if (statusRes.workflow) {
    if (statusRes.workflow.enabled) return { enabled: true };
    const r = await handleToggleWorkflow(hsToken, { flowId: statusRes.workflow.id, enabled: true });
    if (r.error) return { error: r.error };
    await writeLogEntry(hsToken, {
      action: 'auto_share_link_enabled',
      actor: actor || '',
      details: '',
      status: 'success',
    });
    return { enabled: true };
  }

  // Create the workflow
  const objConfig = getObjConfig('contact');
  const flow = {
    name: AUTO_SHARE_LINK_WORKFLOW_NAME,
    flowType: 'WORKFLOW',
    isEnabled: true,
    objectTypeId: objConfig.objectTypeId,
    type: objConfig.flowType,
    startActionId: '1',
    actions: [{
      actionId: '1',
      type: 'CUSTOM_CODE',
      runtime: 'NODE20X',
      inputFields: [],
      sourceCode: buildAutoShareLinkSourceCode(hsToken, extoleToken, programLabel || ''),
    }],
    enrollmentCriteria: buildEnrollmentCriteria('contact', 'RECORD_CREATED', null, null),
  };

  const createRes = await fetch('https://api.hubapi.com/automation/v4/flows', {
    method: 'POST',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(flow),
  });
  const createBody = await createRes.json().catch(() => ({}));
  if (!createRes.ok) return { error: createBody.message || `HTTP ${createRes.status}` };
  await writeLogEntry(hsToken, {
    action: 'auto_share_link_enabled',
    actor: actor || '',
    details: '',
    status: 'success',
  });
  return { enabled: true, workflowId: String(createBody.id) };
}

function buildAutoShareLinkSourceCode(hsToken, extoleToken, programLabel) {
  const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const resolvedLabel = programLabel || DEFAULT_SHARE_LABEL;
  const labelExpr = resolvedLabel ? `'${escape(resolvedLabel)}'` : 'null';

  return `
const HS_TOKEN = '${escape(hsToken)}';
const EXTOLE_TOKEN = '${escape(extoleToken)}';
const PROGRAM_LABEL = ${labelExpr};
const SHARE_LINK_PROPERTY = 'extole_share_link';
const EXTOLE_API = 'https://api.extole.io';
const HS_API = 'https://api.hubapi.com';

exports.main = async (event) => {
  const contactId = event.object.objectId;

  const hsRes = await fetch(HS_API + '/crm/v3/objects/contacts/' + contactId + '?properties=email', {
    headers: { Authorization: 'Bearer ' + HS_TOKEN }
  });
  const contact = await hsRes.json().catch(() => ({}));
  const email = contact.properties && contact.properties.email;
  if (!email) return { outputFields: { status: 'SKIPPED', reason: 'no_email' } };

  // Look up person in Extole
  const lookupRes = await fetch(EXTOLE_API + '/v5/persons?identity_key_value=' + encodeURIComponent(email), {
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN }
  });
  const persons = await lookupRes.json().catch(() => []);

  let personId;
  if (Array.isArray(persons) && persons.length > 0) {
    personId = persons[0].id;
  } else {
    // Person doesn't exist — create directly
    const createRes = await fetch(EXTOLE_API + '/v5/persons', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity_key_value: email })
    });
    if (!createRes.ok) return { outputFields: { status: 'ERROR', reason: 'person_create_failed' } };
    const created = await createRes.json().catch(() => ({}));
    personId = created.id;
    if (!personId) return { outputFields: { status: 'ERROR', reason: 'person_create_no_id' } };
  }

  // Create shareable
  const shareRes = await fetch(EXTOLE_API + '/v5/persons/' + personId + '/shareables', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ label: PROGRAM_LABEL })
  });
  const shareBody = await shareRes.json().catch(() => ({}));

  let link;
  if (shareRes.ok) {
    link = shareBody.link;
  } else if (shareBody.code === 'shareable_key_taken') {
    const getRes = await fetch(EXTOLE_API + '/v5/persons/' + personId + '/shareables', {
      headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN }
    });
    const shareables = await getRes.json().catch(() => []);
    const match = Array.isArray(shareables) ? shareables.find(function(s) { return s.label === PROGRAM_LABEL; }) : null;
    if (match) link = match.link;
  }

  if (!link) return { outputFields: { status: 'ERROR', reason: 'no_link' } };

  await fetch(HS_API + '/crm/v3/objects/contacts/' + contactId, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer ' + HS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ properties: { [SHARE_LINK_PROPERTY]: link } })
  });

  return { outputFields: { status: 'SUCCESS', shareLink: link } };
};
`.trim();
}

// ─── Activity Log ─────────────────────────────────────────────────────────────

const LOG_OBJECT_NAME = 'extole_app_log';

async function getLogObjectTypeId(hsToken) {
  const res = await hsGet(hsToken, '/crm/v3/schemas');
  if (!res.ok) return null;
  const data = await res.json();
  const schema = (data.results || []).find(s => s.name === LOG_OBJECT_NAME);
  return schema ? schema.objectTypeId : null;
}

async function handleCreateLogSchema(hsToken) {
  // Check if already exists
  const existingId = await getLogObjectTypeId(hsToken);
  if (existingId) return { created: false, objectTypeId: existingId };

  // Create the custom object schema
  const schemaBody = {
    name: LOG_OBJECT_NAME,
    labels: { singular: 'Extole App Log', plural: 'Extole App Logs' },
    primaryDisplayProperty: 'eal_action',
    properties: [
      {
        name: 'eal_timestamp',
        label: 'Timestamp',
        type: 'datetime',
        fieldType: 'date',
        groupName: 'extole_app_log_information',
      },
      {
        name: 'eal_action',
        label: 'Action',
        type: 'enumeration',
        fieldType: 'select',
        groupName: 'extole_app_log_information',
        options: [
          { label: 'Property Created', value: 'property_created', hidden: false, displayOrder: 0 },
          { label: 'Share Link Property Created', value: 'share_link_property_created', hidden: false, displayOrder: 1 },
          { label: 'Share Link Backfill Completed', value: 'share_link_backfill_completed', hidden: false, displayOrder: 1 },
          { label: 'Share Link Backfill Error', value: 'share_link_backfill_error', hidden: false, displayOrder: 2 },
          { label: 'Auto Share Link Enabled', value: 'auto_share_link_enabled', hidden: false, displayOrder: 2 },
          { label: 'Auto Share Link Disabled', value: 'auto_share_link_disabled', hidden: false, displayOrder: 3 },
          { label: 'Workflow Created', value: 'workflow_created', hidden: false, displayOrder: 4 },
          { label: 'Workflow Deleted', value: 'workflow_deleted', hidden: false, displayOrder: 5 },
          { label: 'Workflow Toggled', value: 'workflow_toggled', hidden: false, displayOrder: 6 },
        ],
      },
      {
        name: 'eal_actor',
        label: 'Actor',
        type: 'string',
        fieldType: 'text',
        groupName: 'extole_app_log_information',
      },
      {
        name: 'eal_details',
        label: 'Details',
        type: 'string',
        fieldType: 'text',
        groupName: 'extole_app_log_information',
      },
      {
        name: 'eal_status',
        label: 'Status',
        type: 'enumeration',
        fieldType: 'select',
        groupName: 'extole_app_log_information',
        options: [
          { label: 'Success', value: 'success', hidden: false, displayOrder: 0 },
          { label: 'Error', value: 'error', hidden: false, displayOrder: 1 },
        ],
      },
    ],
    associatedObjects: [],
  };

  const createRes = await hsPost(hsToken, '/crm/v3/schemas', schemaBody);
  const createData = await createRes.json().catch(() => ({}));
  if (!createRes.ok) {
    return { error: createData.message || `HTTP ${createRes.status}`, details: createData };
  }
  return { created: true, objectTypeId: createData.objectTypeId };
}

async function writeLogEntry(hsToken, { action, actor, details, status }) {
  let objectTypeId = await getLogObjectTypeId(hsToken);
  if (!objectTypeId) {
    // Schema doesn't exist yet — attempt to create it, then retry once
    await handleCreateLogSchema(hsToken);
    objectTypeId = await getLogObjectTypeId(hsToken);
    if (!objectTypeId) return; // Give up silently — log writes are best-effort
  }

  await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}`, {
    properties: {
      eal_timestamp: new Date().toISOString(),
      eal_action: action || '',
      eal_actor: actor || '',
      eal_details: details || '',
      eal_status: status || 'success',
    },
  });

  // Trim log to MAX_LOG_ENTRIES — archive oldest entries beyond the limit
  await trimLog(hsToken, objectTypeId);
}

const MAX_LOG_ENTRIES = 200;

async function trimLog(hsToken, objectTypeId) {
  const res = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, {
    filterGroups: [],
    properties: ['eal_timestamp'],
    sorts: [{ propertyName: 'eal_timestamp', direction: 'DESCENDING' }],
    limit: MAX_LOG_ENTRIES + 50, // fetch a bit beyond limit to catch overflow
  });
  if (!res.ok) return;
  const data = await res.json();
  const all = data.results || [];
  if (all.length <= MAX_LOG_ENTRIES) return;
  const toArchive = all.slice(MAX_LOG_ENTRIES).map(r => ({ id: r.id }));
  await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/batch/archive`, { inputs: toArchive });
}

const LOG_PAGE_SIZE = 25;

async function handleGetLogEntries(hsToken, { after } = {}) {
  const objectTypeId = await getLogObjectTypeId(hsToken);
  if (!objectTypeId) return { entries: [], hasMore: false, nextAfter: null };

  const body = {
    filterGroups: [],
    properties: ['eal_timestamp', 'eal_action', 'eal_actor', 'eal_details', 'eal_status'],
    sorts: [{ propertyName: 'eal_timestamp', direction: 'DESCENDING' }],
    limit: LOG_PAGE_SIZE,
  };
  if (after) body.after = after;

  const res = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, body);
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    return { error: errBody.message || `HTTP ${res.status}`, entries: [], hasMore: false, nextAfter: null };
  }
  const data = await res.json();
  const entries = (data.results || []).map(r => ({
    id: r.id,
    timestamp: r.properties?.eal_timestamp || '',
    action: r.properties?.eal_action || '',
    actor: r.properties?.eal_actor || '',
    details: r.properties?.eal_details || '',
    status: r.properties?.eal_status || 'success',
  }));
  const nextAfter = data.paging?.next?.after || null;
  return { entries, hasMore: !!nextAfter, nextAfter };
}

async function handleClearLog(hsToken) {
  const objectTypeId = await getLogObjectTypeId(hsToken);
  if (!objectTypeId) return { cleared: 0 };

  const res = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, {
    filterGroups: [],
    properties: ['eal_action'],
    limit: 100,
  });
  if (!res.ok) return { error: 'Failed to fetch log entries' };
  const data = await res.json();
  const inputs = (data.results || []).map(r => ({ id: r.id }));
  if (inputs.length === 0) return { cleared: 0 };

  const archiveRes = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/batch/archive`, { inputs });
  if (!archiveRes.ok) return { error: 'Failed to archive log entries' };
  return { cleared: inputs.length };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function ensureContactProperty(hsToken, { name, label, description, groupName }) {
  // Check if property already exists
  const existing = await hsGet(hsToken, `/crm/v3/properties/contacts/${name}`);
  if (existing.ok) return { action: 'already_exists' };

  // Create the property
  const body = {
    name,
    label,
    description,
    groupName,
    type: 'string',
    fieldType: 'text',
    formField: true,
  };

  const created = await hsPost(hsToken, '/crm/v3/properties/contacts', body);
  if (!created.ok) {
    const errBody = await created.json().catch(() => ({}));
    return { error: errBody.message || `HTTP ${created.status}` };
  }

  return { action: 'created' };
}

function hsGet(token, path) {
  return fetch(`${HS_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function hsPost(token, path, body) {
  return fetch(`${HS_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
