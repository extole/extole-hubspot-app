/**
 * Extole Settings Function
 *
 * Handles all settings page operations via an `action` parameter:
 *   - createProperties: ensure extole_advocate_code Contact property exists
 *   - testConnection: verify Extole API token is valid
 */

const HS_API_BASE = 'https://api.hubapi.com';
const EXTOLE_API_BASE = 'https://api.extole.io';
const EXTOLE_APP_TYPE_HEADER = { 'x-extole-app-type': 'extole-hubspot-app' };
const BATCH_SIZE = 50;
// Workaround: Extole v5 shareables API currently requires a label even though it shouldn't.
// Set to null once the API is fixed (ticket open). See: exhsappd = extole hubspot app default.
const DEFAULT_SHARE_LABEL = 'exhsappd';
const EXTOLE_WORKFLOW_PREFIX = 'Extole — ';

async function testConnection(token) {
  const response = await fetch(`${EXTOLE_API_BASE}/v4/tokens`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, ...EXTOLE_APP_TYPE_HEADER },
  });
  return { ok: response.ok, status: response.status };
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
    case 'getContactCard':
      return handleGetContactCard(hsToken, params);
    case 'getAppSettings':
      return handleGetAppSettings(hsToken);
    case 'saveAppSettings':
      return handleSaveAppSettings(hsToken, params);

    case 'checkEventUsage':
      return handleCheckEventUsage(extoleToken, params);

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

    case 'getAdvocateSyncConfig':
      return handleGetAdvocateSyncConfig(hsToken);

    case 'regenerateAdvocateSyncSecret':
      return handleRegenerateAdvocateSyncSecret(hsToken, params);

    case 'setAdvocateSyncEnabled':
      return handleSetAdvocateSyncEnabled(hsToken, params);

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

// Note: always checks contact properties — all callers currently check contact properties only.
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

async function handleCreateProperties(hsToken, { advocateCodeProperty }) {
  const created = [];
  const errors = [];

  const toCreate = [];
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

const CRM_PROPERTY_TYPE_MAP = {
  contact: 'contacts', deal: 'deals', company: 'companies', ticket: 'tickets', quote: 'quotes',
};

async function handleValidateProperty(hsToken, { objectType, propertyName }) {
  if (!propertyName) return { valid: false };
  const crmType = CRM_PROPERTY_TYPE_MAP[objectType] || 'contacts';
  const res = await hsGet(hsToken, `/crm/v3/properties/${crmType}/${propertyName}`);
  return { valid: res.ok };
}

async function handleGetWorkflows(hsToken) {
  // Use v4 flows API — returns all types (CONTACT_FLOW + PLATFORM_FLOW) with v4 IDs
  // that are compatible with the delete/update endpoints. Paginate to catch all workflows.
  const allResults = [];
  let after = null;
  do {
    const url = 'https://api.hubapi.com/automation/v4/flows?limit=100' + (after ? `&after=${after}` : '');
    const res = await fetch(url, { headers: { Authorization: `Bearer ${hsToken}` } });
    if (!res.ok) return { error: `HubSpot API error: ${res.status}`, workflows: [] };
    const data = await res.json();
    allResults.push(...(data.results || []));
    after = data.paging?.next?.after || null;
  } while (after);

  const extoleWorkflows = allResults
    .filter(w => w.name && w.name.startsWith(EXTOLE_WORKFLOW_PREFIX))
    .map(w => ({
      id: String(w.id),
      name: w.name,
      eventName: w.name.slice(EXTOLE_WORKFLOW_PREFIX.length),
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
  const custom = (data.results || [])
    .filter(s => s.name !== LOG_OBJECT_NAME && s.name !== APP_SETTINGS_OBJECT_NAME)
    .map(s => ({
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
        filters: [{
          filterType: 'PROPERTY',
          property: triggerProperty,
          operation: {
            operationType: 'ALL_PROPERTY',
            operator: 'IS_KNOWN',
          },
        }],
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

async function handleCreateWorkflow(hsToken, extoleToken, { eventName, triggerObject, triggerType, triggerProperty, triggerToValue, fieldMappings, enabled, actor, includeContactData }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = getObjConfig(obj);
  const sourceCode = buildWorkflowSourceCode(eventName, objConfig.crmPath, fieldMappings, extoleToken, hsToken, includeContactData !== false);

  const flow = {
    name: EXTOLE_WORKFLOW_PREFIX + eventName,
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
    await writeLogEntry(hsToken, {
      action: 'workflow_created',
      actor: actor || '',
      details: responseData.message || `HTTP ${res.status}`,
      status: 'error',
    });
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

async function handleUpdateWorkflow(hsToken, extoleToken, { flowId, eventName, triggerObject, triggerType, triggerProperty, triggerToValue, fieldMappings, includeContactData }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!flowId) return { error: 'flowId is required' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = getObjConfig(obj);
  const sourceCode = buildWorkflowSourceCode(eventName, objConfig.crmPath, fieldMappings, extoleToken, hsToken, includeContactData !== false);

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
    name: EXTOLE_WORKFLOW_PREFIX + eventName,
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
    await writeLogEntry(hsToken, {
      action: 'workflow_created',
      actor: '',
      details: responseData.message || `HTTP ${putRes.status}`,
      status: 'error',
    });
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

async function handleGetContactCard(hsToken, { objectId }) {
  if (!objectId) return { advocateCode: null, shareLink: null, error: 'missing objectId' };
  if (!hsToken) return { advocateCode: null, shareLink: null, error: 'missing hsToken' };
  const settingsResult = await handleGetAppSettings(hsToken);
  const { advocateCodeProperty = 'extole_advocate_code', shareLinkProperty = 'extole_share_link' } = settingsResult.settings || {};
  const res = await hsGet(hsToken, `/crm/v3/objects/contacts/${objectId}?properties=${encodeURIComponent(advocateCodeProperty)},${encodeURIComponent(shareLinkProperty)}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { advocateCode: null, shareLink: null, error: `HS API ${res.status}: ${body.slice(0, 120)}` };
  }
  const data = await res.json();
  return {
    advocateCode: data.properties?.[advocateCodeProperty] || null,
    shareLink: data.properties?.[shareLinkProperty] || null,
  };
}

async function handleGetObjectProperties(hsToken, { objectType }) {
  if (!objectType) return { error: 'objectType is required' };
  const crmPath = CRM_PROPERTY_TYPE_MAP[objectType] || objectType;

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

function parseWorkflowConfig(sourceCode) {
  if (!sourceCode) return null;
  try {
    const eventName = sourceCode.match(/const EVENT_NAME = '([^']+)'/)?.[1];
    const crmType = sourceCode.match(/const CRM_TYPE = '([^']+)'/)?.[1];
    const mappingsMatch = sourceCode.match(/const FIELD_MAPPINGS = (\[[\s\S]*?\]);/);
    const fieldMappings = mappingsMatch ? JSON.parse(mappingsMatch[1]) : [];
    const includeContactDataMatch = sourceCode.match(/const INCLUDE_CONTACT_DATA = (true|false)/);
    const includeContactData = includeContactDataMatch ? includeContactDataMatch[1] === 'true' : true;
    if (!eventName) return null;
    // Reverse-map CRM path back to trigger object key
    const crmPathToKey = { contacts: 'contact', deals: 'deal', companies: 'company', tickets: 'ticket', quotes: 'quote' };
    const triggerObject = crmPathToKey[crmType] || crmType;
    return { eventName, triggerObject, fieldMappings, includeContactData };
  } catch {
    return null;
  }
}

function buildWorkflowSourceCode(eventName, crmObjectType, fieldMappings, extoleToken, hsToken, includeContactData) {
  const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '');
  const addContactLookup = includeContactData && crmObjectType !== 'contacts';

  const contactLookupCode = !addContactLookup ? '' : `
  // Look up primary associated contact and merge their identity into the event
  const assocRes = await fetch(
    'https://api.hubapi.com/crm/v4/objects/' + CRM_TYPE + '/' + objectId + '/associations/contacts',
    { headers: { Authorization: 'Bearer ' + HS_TOKEN } }
  );
  if (assocRes.ok) {
    const assocBody = await assocRes.json().catch(() => ({}));
    const results = assocBody.results || [];
    const primary = results.find(r => r.associationTypes && r.associationTypes.some(t => t.label === 'Primary')) || results[0];
    if (primary) {
      const contactRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts/' + primary.toObjectId + '?properties=email,firstname,lastname,extole_advocate_code',
        { headers: { Authorization: 'Bearer ' + HS_TOKEN } }
      );
      if (contactRes.ok) {
        const cp = (await contactRes.json().catch(() => ({}))).properties || {};
        if (cp.email && !data.email) data.email = cp.email;
        if (cp.firstname && !data.first_name) data.first_name = cp.firstname;
        if (cp.lastname && !data.last_name) data.last_name = cp.lastname;
        if (cp.extole_advocate_code && !data.advocate_code) data.advocate_code = cp.extole_advocate_code;
      }
    }
  }`;

  return `
const EVENT_NAME = '${escape(eventName)}';
const CRM_TYPE = '${crmObjectType}';
const FIELD_MAPPINGS = ${JSON.stringify(fieldMappings || [])};
const EXTOLE_TOKEN = '${escape(extoleToken || '')}';
const HS_TOKEN = '${escape(hsToken || '')}';
const INCLUDE_CONTACT_DATA = ${addContactLookup ? 'true' : 'false'};

exports.main = async (event) => {
  const objectId = event.object.objectId;

  // Always fetch email + any field-mapping properties
  const mappedProps = [...new Set(
    FIELD_MAPPINGS.filter(m => m.source === 'property' && m.value).map(m => m.value)
  )];
  const allProps = [...new Set(['email', ...mappedProps])];
  const propsQuery = allProps.map(p => 'properties=' + encodeURIComponent(p)).join('&');

  const hsRes = await fetch(
    'https://api.hubapi.com/crm/v3/objects/' + CRM_TYPE + '/' + objectId + '?' + propsQuery,
    { headers: { Authorization: 'Bearer ' + HS_TOKEN } }
  );
  const hsBody = await hsRes.json().catch(() => ({}));
  const props = hsBody.properties || {};

  // Build Extole event data — email is always included as identity
  const data = { app_type: 'extole-hubspot-app' };
  if (props.email) data.email = props.email;
  for (const m of FIELD_MAPPINGS) {
    if (!m.extoleKey) continue;
    const value = m.source === 'static' ? m.value : props[m.value];
    if (value != null && value !== '') data[m.extoleKey] = value;
  }
${contactLookupCode}
  // Fire event to Extole
  const extoleRes = await fetch('https://api.extole.io/v5/events', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json', 'x-extole-app-type': 'extole-hubspot-app' },
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

// ─── Manage Advocate Codes handlers ──────────────────────────────────────────

async function handleGetForms(hsToken) {
  try {
    const allForms = [];
    let after = null;
    do {
      const url = 'https://api.hubapi.com/marketing/v3/forms?formTypes=hubspot&limit=100' + (after ? `&after=${after}` : '');
      const res = await fetch(url, { headers: { Authorization: `Bearer ${hsToken}` } });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        return { error: `HubSpot API ${res.status}: ${body.slice(0, 200)}`, forms: [] };
      }
      const data = await res.json();
      allForms.push(...(data.results || []).map(f => ({ id: f.id, name: f.name || f.id })));
      after = data.paging?.next?.after || null;
    } while (after);
    return { forms: allForms };
  } catch (e) {
    return { error: e.message, forms: [] };
  }
}

// ─── Share Link handlers ──────────────────────────────────────────────────────

async function handleGetCampaigns(extoleToken) {
  try {
    if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured', campaigns: [] };
    const res = await fetch(`${EXTOLE_API_BASE}/v2/campaign-summaries`, {
      headers: { Authorization: `Bearer ${extoleToken}`, ...EXTOLE_APP_TYPE_HEADER },
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

async function handleCheckEventUsage(extoleToken, { eventName }) {
  if (!eventName) return { status: 'NOT_FOUND' };
  if (!extoleToken) return { status: 'UNKNOWN', reason: 'EXTOLE_API_TOKEN not configured' };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${EXTOLE_API_BASE}/v2/campaign-summaries`, {
      headers: { Authorization: `Bearer ${extoleToken}`, ...EXTOLE_APP_TYPE_HEADER },
      signal: controller.signal,
    });
    if (!res.ok) return { status: 'UNKNOWN', reason: `Extole API ${res.status}` };
    const data = await res.json();
    const summaries = Array.isArray(data) ? data : [];
    const active = summaries.filter(c => ['PUBLISHED', 'ACTIVE', 'LIVE'].includes((c.state || '').toUpperCase()));
    const details = await Promise.all(
      active.map(c =>
        fetch(`${EXTOLE_API_BASE}/v2/campaigns/${c.campaign_id}`, {
          headers: { Authorization: `Bearer ${extoleToken}`, ...EXTOLE_APP_TYPE_HEADER },
          signal: controller.signal,
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );
    if (controller.signal.aborted) return { status: 'UNKNOWN', reason: 'timeout' };
    for (const campaign of details) {
      if (!campaign) continue;
      if (campaignReferencesEvent(campaign, eventName)) {
        return { status: 'FOUND', campaignName: campaign.name || campaign.campaign_id || 'unknown' };
      }
    }
    return { status: 'NOT_FOUND' };
  } catch (e) {
    const reason = e && e.name === 'AbortError' ? 'timeout' : (e && e.message || String(e));
    return { status: 'UNKNOWN', reason };
  } finally {
    clearTimeout(timeout);
  }
}

function campaignReferencesEvent(campaign, eventName) {
  const name = eventName.toLowerCase();
  // Shape 1: campaign.event_names[]
  if (Array.isArray(campaign.event_names)) {
    if (campaign.event_names.some(n => String(n).toLowerCase() === name)) return true;
  }
  // Shape 2: campaign.triggers[].event_name or triggers[].event_names[]
  if (Array.isArray(campaign.triggers)) {
    for (const t of campaign.triggers) {
      if (t.event_name && String(t.event_name).toLowerCase() === name) return true;
      if (Array.isArray(t.event_names) && t.event_names.some(n => String(n).toLowerCase() === name)) return true;
    }
  }
  // Shape 3: campaign.builds[].triggers[].event_name or nested event_names[]
  if (Array.isArray(campaign.builds)) {
    for (const b of campaign.builds) {
      if (Array.isArray(b.triggers)) {
        for (const t of b.triggers) {
          if (t.event_name && String(t.event_name).toLowerCase() === name) return true;
          if (Array.isArray(t.event_names) && t.event_names.some(n => String(n).toLowerCase() === name)) return true;
        }
      }
    }
  }
  // Shape 4: campaign.steps[].triggers[].event_names[] (v2 /campaigns/{id} format)
  if (Array.isArray(campaign.steps)) {
    for (const step of campaign.steps) {
      if (Array.isArray(step.triggers)) {
        for (const t of step.triggers) {
          if (t.event_name && String(t.event_name).toLowerCase() === name) return true;
          if (Array.isArray(t.event_names) && t.event_names.some(n => String(n).toLowerCase() === name)) return true;
        }
      }
    }
  }
  return false;
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
      { headers: { Authorization: `Bearer ${extoleToken}`, ...EXTOLE_APP_TYPE_HEADER } }
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
        headers: { Authorization: `Bearer ${extoleToken}`, 'Content-Type': 'application/json', ...EXTOLE_APP_TYPE_HEADER },
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
      headers: { Authorization: `Bearer ${extoleToken}`, 'Content-Type': 'application/json', ...EXTOLE_APP_TYPE_HEADER },
      body: JSON.stringify({ label: programLabel || DEFAULT_SHARE_LABEL }),
    });
    const shareCreateBody = await shareCreateRes.json().catch(() => ({}));

    if (shareCreateRes.ok) {
      link = shareCreateBody.link;
      created++;
    } else if (shareCreateBody.code === 'shareable_key_taken') {
      // Shareable already exists — fetch and use the existing link
      const getRes = await fetch(`${EXTOLE_API_BASE}/v5/persons/${personId}/shareables`, {
        headers: { Authorization: `Bearer ${extoleToken}`, ...EXTOLE_APP_TYPE_HEADER },
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

const AUTO_SHARE_LINK_WORKFLOW_NAME = EXTOLE_WORKFLOW_PREFIX + 'Auto Share Link';

async function handleGetAutoShareLinkStatus(hsToken) {
  let after = null;
  do {
    const url = 'https://api.hubapi.com/automation/v4/flows?limit=100' + (after ? `&after=${after}` : '');
    const res = await fetch(url, { headers: { Authorization: `Bearer ${hsToken}` } });
    if (!res.ok) return { workflow: null };
    const data = await res.json();
    const w = (data.results || []).find(w => w.name === AUTO_SHARE_LINK_WORKFLOW_NAME);
    if (w) return { workflow: { id: String(w.id), enabled: w.isEnabled } };
    after = data.paging?.next?.after || null;
  } while (after);
  return { workflow: null };
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
      details: AUTO_SHARE_LINK_WORKFLOW_NAME,
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
      details: AUTO_SHARE_LINK_WORKFLOW_NAME,
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
      sourceCode: buildAutoShareLinkSourceCode(programLabel || '', extoleToken, hsToken),
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

function buildAutoShareLinkSourceCode(programLabel, extoleToken, hsToken) {
  const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '');
  const resolvedLabel = programLabel || DEFAULT_SHARE_LABEL;
  const labelExpr = resolvedLabel ? `'${escape(resolvedLabel)}'` : 'null';

  return `
const PROGRAM_LABEL = ${labelExpr};
const SHARE_LINK_PROPERTY = 'extole_share_link';
const EXTOLE_API = 'https://api.extole.io';
const HS_API = 'https://api.hubapi.com';
const EXTOLE_TOKEN = '${escape(extoleToken || '')}';
const HS_TOKEN = '${escape(hsToken || '')}';

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
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'x-extole-app-type': 'extole-hubspot-app' }
  });
  const persons = await lookupRes.json().catch(() => []);

  let personId;
  if (Array.isArray(persons) && persons.length > 0) {
    personId = persons[0].id;
  } else {
    // Person doesn't exist — create directly
    const createRes = await fetch(EXTOLE_API + '/v5/persons', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json', 'x-extole-app-type': 'extole-hubspot-app' },
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
    headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'Content-Type': 'application/json', 'x-extole-app-type': 'extole-hubspot-app' },
    body: JSON.stringify({ label: PROGRAM_LABEL })
  });
  const shareBody = await shareRes.json().catch(() => ({}));

  let link;
  if (shareRes.ok) {
    link = shareBody.link;
  } else if (shareBody.code === 'shareable_key_taken') {
    const getRes = await fetch(EXTOLE_API + '/v5/persons/' + personId + '/shareables', {
      headers: { Authorization: 'Bearer ' + EXTOLE_TOKEN, 'x-extole-app-type': 'extole-hubspot-app' }
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

// ─── App Settings ────────────────────────────────────────────────────────────

const APP_SETTINGS_OBJECT_NAME = 'extole_app_settings';

function getDefaultAppSettings() {
  return {
    advocateCodeProperty: 'extole_advocate_code',
    shareLinkProperty: 'extole_share_link',
    referralUrlParam: 'extole_shareable_code',
    includeAdvocateCode: true,
    formTargeting: 'all',
    selectedFormIds: [],
    advocateSyncEnabled: false,
    advocateSyncSecret: '',
    advocateSyncSecretRotatedAt: null,
  };
}

async function getAppSettingsObjectTypeId(hsToken) {
  const res = await hsGet(hsToken, '/crm/v3/schemas');
  if (!res.ok) return null;
  const data = await res.json();
  const schema = (data.results || []).find(s => s.name === APP_SETTINGS_OBJECT_NAME);
  return schema ? schema.objectTypeId : null;
}

async function ensureAppSettingsSchema(hsToken) {
  const existing = await getAppSettingsObjectTypeId(hsToken);
  if (existing) {
    await hsPatch(hsToken, `/crm/v3/schemas/${existing}`, { showInMenuAndBoardView: false });
    return existing;
  }
  const createRes = await hsPost(hsToken, '/crm/v3/schemas', {
    name: APP_SETTINGS_OBJECT_NAME,
    labels: { singular: 'Extole App Settings', plural: 'Extole App Settings' },
    primaryDisplayProperty: 'eas_name',
    showInMenuAndBoardView: false,
    properties: [
      { name: 'eas_name',       label: 'Name',       type: 'string',   fieldType: 'text',     groupName: 'extole_app_settings_information' },
      { name: 'eas_config',     label: 'Config',     type: 'string',   fieldType: 'textarea', groupName: 'extole_app_settings_information' },
      { name: 'eas_updated_at', label: 'Updated At', type: 'datetime', fieldType: 'date',     groupName: 'extole_app_settings_information' },
    ],
    associatedObjects: [],
  });
  if (!createRes.ok) return null;
  const data = await createRes.json();
  return data.objectTypeId || null;
}

async function handleGetAppSettings(hsToken) {
  if (!hsToken) return { settings: getDefaultAppSettings(), updatedAt: null };
  const objectTypeId = await getAppSettingsObjectTypeId(hsToken);
  if (!objectTypeId) return { settings: getDefaultAppSettings(), updatedAt: null };
  const res = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, {
    filterGroups: [{ filters: [{ propertyName: 'eas_name', operator: 'EQ', value: 'default' }] }],
    properties: ['eas_config', 'eas_updated_at'],
    limit: 1,
  });
  if (!res.ok) return { settings: getDefaultAppSettings(), updatedAt: null };
  const data = await res.json();
  const record = data.results?.[0];
  if (!record) return { settings: getDefaultAppSettings(), updatedAt: null };
  try {
    const stored = JSON.parse(record.properties.eas_config || '{}');
    return {
      settings: { ...getDefaultAppSettings(), ...stored },
      updatedAt: record.properties.eas_updated_at || null,
    };
  } catch {
    return { settings: getDefaultAppSettings(), updatedAt: null };
  }
}

async function handleSaveAppSettings(hsToken, { settings }) {
  if (!hsToken) return { error: 'missing hsToken' };
  const objectTypeId = await ensureAppSettingsSchema(hsToken);
  if (!objectTypeId) return { error: 'Could not initialize settings schema' };
  const now = new Date().toISOString();
  const props = {
    eas_name: 'default',
    eas_config: JSON.stringify(settings || {}),
    eas_updated_at: now,
  };
  // Upsert: find existing record, patch if found, create if not
  const searchRes = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, {
    filterGroups: [{ filters: [{ propertyName: 'eas_name', operator: 'EQ', value: 'default' }] }],
    properties: ['eas_name'],
    limit: 1,
  });
  if (searchRes.ok) {
    const searchData = await searchRes.json();
    const existing = searchData.results?.[0];
    if (existing) {
      const patchRes = await fetch(`${HS_API_BASE}/crm/v3/objects/${objectTypeId}/${existing.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: props }),
      });
      if (!patchRes.ok) {
        const errBody = await patchRes.json().catch(() => ({}));
        return { error: errBody.message || `HTTP ${patchRes.status}` };
      }
      return { saved: true, updatedAt: now };
    }
  }
  const createRes = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}`, { properties: props });
  if (!createRes.ok) {
    const errBody = await createRes.json().catch(() => ({}));
    return { error: errBody.message || `HTTP ${createRes.status}` };
  }
  return { saved: true, updatedAt: now };
}

// ─── Advocate Sync (anonymous advocate webhook) ──────────────────────────────

const ADVOCATE_SYNC_ENDPOINT_PATH = '/api/advocate-sync';

async function handleGetAdvocateSyncConfig(hsToken) {
  const result = await handleGetAppSettings(hsToken);
  const s = result.settings || {};
  return {
    enabled: !!s.advocateSyncEnabled,
    secret: s.advocateSyncSecret || '',
    rotatedAt: s.advocateSyncSecretRotatedAt || null,
    endpointPath: ADVOCATE_SYNC_ENDPOINT_PATH,
  };
}

async function handleRegenerateAdvocateSyncSecret(hsToken, { actor }) {
  const result = await handleGetAppSettings(hsToken);
  const settings = { ...(result.settings || {}) };
  const newSecret = generateSharedSecret();
  settings.advocateSyncSecret = newSecret;
  settings.advocateSyncSecretRotatedAt = new Date().toISOString();
  const saveRes = await handleSaveAppSettings(hsToken, { settings });
  if (saveRes.error) return { error: saveRes.error };
  await writeLogEntry(hsToken, {
    action: 'advocate_sync_secret_rotated',
    actor: actor || '',
    details: '',
    status: 'success',
  });
  return { secret: newSecret, rotatedAt: settings.advocateSyncSecretRotatedAt };
}

async function handleSetAdvocateSyncEnabled(hsToken, { enabled, actor }) {
  const result = await handleGetAppSettings(hsToken);
  const settings = { ...(result.settings || {}) };
  settings.advocateSyncEnabled = !!enabled;
  if (enabled && !settings.advocateSyncSecret) {
    settings.advocateSyncSecret = generateSharedSecret();
    settings.advocateSyncSecretRotatedAt = new Date().toISOString();
  }
  const saveRes = await handleSaveAppSettings(hsToken, { settings });
  if (saveRes.error) return { error: saveRes.error };
  await writeLogEntry(hsToken, {
    action: enabled ? 'advocate_sync_enabled' : 'advocate_sync_disabled',
    actor: actor || '',
    details: '',
    status: 'success',
  });
  return {
    enabled: settings.advocateSyncEnabled,
    secret: settings.advocateSyncSecret || '',
    rotatedAt: settings.advocateSyncSecretRotatedAt || null,
  };
}

function generateSharedSecret() {
  // 32 bytes of random hex = 64 chars, sufficient entropy for a shared secret
  const bytes = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
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
  if (existingId) {
    await hsPatch(hsToken, `/crm/v3/schemas/${existingId}`, { showInMenuAndBoardView: false });
    return { created: false, objectTypeId: existingId };
  }

  // Create the custom object schema
  const schemaBody = {
    name: LOG_OBJECT_NAME,
    labels: { singular: 'Extole App Log', plural: 'Extole App Logs' },
    showInMenuAndBoardView: false,
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
          { label: 'Advocate Sync', value: 'advocate_sync', hidden: false, displayOrder: 7 },
          { label: 'Advocate Sync Enabled', value: 'advocate_sync_enabled', hidden: false, displayOrder: 8 },
          { label: 'Advocate Sync Disabled', value: 'advocate_sync_disabled', hidden: false, displayOrder: 9 },
          { label: 'Advocate Sync Secret Rotated', value: 'advocate_sync_secret_rotated', hidden: false, displayOrder: 10 },
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
    limit: MAX_LOG_ENTRIES * 3, // fetch well beyond limit so trim catches any reasonable overflow
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

  // Page through all entries and archive in batches — HubSpot batch/archive limit is 100
  let after = null;
  let totalCleared = 0;
  do {
    const body = { filterGroups: [], properties: ['eal_action'], limit: 100 };
    if (after) body.after = after;
    const res = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/search`, body);
    if (!res.ok) return { error: 'Failed to fetch log entries', cleared: totalCleared };
    const data = await res.json();
    const inputs = (data.results || []).map(r => ({ id: r.id }));
    if (inputs.length === 0) break;
    const archiveRes = await hsPost(hsToken, `/crm/v3/objects/${objectTypeId}/batch/archive`, { inputs });
    if (!archiveRes.ok) return { error: 'Failed to archive log entries', cleared: totalCleared };
    totalCleared += inputs.length;
    after = data.paging?.next?.after || null;
  } while (after);

  return { cleared: totalCleared };
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

function hsPatch(token, path, body) {
  return fetch(`${HS_API_BASE}${path}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

// ─── Test exports (not used in production) ───────────────────────────────────
if (process.env.NODE_ENV === 'test') {
  module.exports._test = {
    buildWorkflowSourceCode,
    buildAutoShareLinkSourceCode,
    parseWorkflowConfig,
    handleGetWorkflows,
    handleDeleteWorkflow,
    handleClearLog,
    handleRunShareLinkBackfillBatch,
    handleCreateProperties,
    handleValidateProperty,
    handleGetForms,
    handleGetAutoShareLinkStatus,
    handleCheckEventUsage,
    campaignReferencesEvent,
  };
}
