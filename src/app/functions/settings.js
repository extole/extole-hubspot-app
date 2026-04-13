/**
 * Extole Settings Function
 *
 * Handles all settings page operations via an `action` parameter:
 *   - createProperties: ensure extole_hubspotutk (+ optional extole_advocate_code) Contact properties exist
 *   - testConnection: verify Extole API token is valid
 *   - getContactCount: count contacts for backfill estimate
 *   - runBackfillBatch: process one batch of contacts, return cursor + progress
 */

const { testConnection, fireEvent } = require('./extole');

const HS_API_BASE = 'https://api.hubapi.com';
const BATCH_SIZE = 50;


exports.main = async (context) => {
  const hsToken = context.secrets.PRIVATE_APP_TOKEN || process.env.PRIVATE_APP_TOKEN;
  const extoleToken = context.secrets.EXTOLE_API_TOKEN || process.env.EXTOLE_API_TOKEN;
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

async function handleCreateProperties(hsToken, { hubspotutkProperty, advocateCodeProperty }) {
  const created = [];
  const errors = [];

  const toCreate = [
    {
      name: hubspotutkProperty || 'extole_hubspotutk',
      label: 'Extole HubSpot Visitor ID',
      description: 'HubSpot visitor cookie (hubspotutk) captured at form submission for Extole referral attribution.',
      groupName: 'contactinformation',
    },
  ];

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
  // Use v4 flows API — covers both v3-migrated and natively v4-created workflows.
  const res = await fetch('https://api.hubapi.com/automation/v4/flows?objectTypeId=0-1&limit=100', {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!res.ok) {
    return { error: `HubSpot API error: ${res.status}`, workflows: [] };
  }
  const data = await res.json();
  const extoleWorkflows = (data.results || [])
    .filter(w => w.name && w.name.startsWith('Extole'))
    .map(w => ({ id: w.id, name: w.name, enabled: w.isEnabled }));
  return { workflows: extoleWorkflows };
}

// HubSpot v4 Flows event type IDs for "record created" per object type.
// Verified as consistent across portals in testing (2026-04).
const RECORD_CREATED_EVENT_TYPE_IDS = {
  contact: '4-1463224',
};

// Object type → CRM API path and flow type
const OBJECT_CONFIG = {
  contact: { crmPath: 'contacts', objectTypeId: '0-1', flowType: 'CONTACT_FLOW' },
  deal:    { crmPath: 'deals',    objectTypeId: '0-3', flowType: 'DEAL_FLOW' },
};

async function handleCreateWorkflow(hsToken, extoleToken, { eventName, triggerObject, fieldMappings }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = OBJECT_CONFIG[obj] || OBJECT_CONFIG.contact;
  const sourceCode = buildWorkflowSourceCode(hsToken, extoleToken, eventName, objConfig.crmPath, fieldMappings);

  const flow = {
    name: `Extole — ${eventName}`,
    flowType: 'WORKFLOW',
    isEnabled: true,
    objectTypeId: objConfig.objectTypeId,
    type: objConfig.flowType,
    startActionId: '1',
    actions: [
      {
        actionId: '1',
        type: 'CUSTOM_CODE',
        runtime: 'NODE20X',
        inputFields: [],
        sourceCode,
      },
    ],
  };

  // Set auto-enrollment trigger if we have a known "record created" event type ID.
  const eventTypeId = RECORD_CREATED_EVENT_TYPE_IDS[obj];
  if (eventTypeId) {
    flow.enrollmentCriteria = {
      shouldReEnroll: false,
      type: 'EVENT_BASED',
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

  const res = await fetch('https://api.hubapi.com/automation/v4/flows', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${hsToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flow),
  });
  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: responseData.message || `HTTP ${res.status}`, details: responseData };
  }

  return { workflowId: responseData.id, name: responseData.name };
}

async function handleDeleteWorkflow(hsToken, { flowId }) {
  if (!flowId) return { error: 'flowId is required' };
  const res = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  return { deleted: res.ok, status: res.status };
}

async function handleGetWorkflowConfig(hsToken, { flowId }) {
  if (!flowId) return { error: 'flowId is required' };
  const res = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  const config = parseWorkflowConfig(data.actions?.[0]?.sourceCode || '');
  return { config };
}

async function handleUpdateWorkflow(hsToken, extoleToken, { flowId, eventName, triggerObject, fieldMappings }) {
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };
  if (!flowId) return { error: 'flowId is required' };
  if (!eventName) return { error: 'eventName is required' };

  const obj = triggerObject || 'contact';
  const objConfig = OBJECT_CONFIG[obj] || OBJECT_CONFIG.contact;
  const sourceCode = buildWorkflowSourceCode(hsToken, extoleToken, eventName, objConfig.crmPath, fieldMappings);

  // GET current flow to preserve enrollment criteria and enabled state
  const getRes = await fetch(`https://api.hubapi.com/automation/v4/flows/${flowId}`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!getRes.ok) {
    return { error: `Failed to fetch workflow: HTTP ${getRes.status}` };
  }
  const existing = await getRes.json();

  // Build a clean PUT body — only include mutable fields.
  // The v4 API rejects read-only fields (revisionId, uuid, createdAt, etc.) if sent back.
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
    enrollmentCriteria: existing.enrollmentCriteria,
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

function parseWorkflowConfig(sourceCode) {
  if (!sourceCode) return null;
  try {
    const eventName = sourceCode.match(/const EVENT_NAME = '([^']+)'/)?.[1];
    const crmType = sourceCode.match(/const CRM_TYPE = '([^']+)'/)?.[1];
    const mappingsMatch = sourceCode.match(/const FIELD_MAPPINGS = (\[[\s\S]*?\]);/);
    const fieldMappings = mappingsMatch ? JSON.parse(mappingsMatch[1]) : [];
    if (!eventName) return null;
    return {
      eventName,
      triggerObject: crmType === 'deals' ? 'deal' : 'contact',
      fieldMappings,
    };
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
    formField: false,
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
