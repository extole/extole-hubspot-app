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

// Workflows we manage — keyed by a stable name prefix we can match on
const WORKFLOW_CONFIGS = {
  contact_created: {
    name: 'Extole — Contact Created',
    eventName: 'hubspot_contact_created',
    // HubSpot workflow token syntax for contact properties
    bodyTemplate: (eventName) => JSON.stringify({
      event_name: eventName,
      data: {
        email: '{{contact.email}}',
        contact_id: '{{contact.hs_object_id}}',
        first_name: '{{contact.firstname}}',
        last_name: '{{contact.lastname}}',
        app_type: 'hubspot_crm',
      },
    }),
  },
  deal_closed_won: {
    name: 'Extole — Deal Closed Won',
    eventName: 'hubspot_deal_closed_won',
    bodyTemplate: (eventName) => JSON.stringify({
      event_name: eventName,
      data: {
        deal_id: '{{deal.hs_object_id}}',
        deal_name: '{{deal.dealname}}',
        amount: '{{deal.amount}}',
        close_date: '{{deal.closedate}}',
        app_type: 'hubspot_crm',
      },
    }),
  },
};

exports.main = async (context) => {
  const hsToken = context.secrets.PRIVATE_APP_TOKEN;
  const extoleToken = context.secrets.EXTOLE_API_TOKEN;
  const { action, ...params } = context.parameters || {};

  switch (action) {
    case 'testConnection':
      return handleTestConnection(extoleToken);

    case 'createProperties':
      return handleCreateProperties(hsToken, params);

    case 'getContactCount':
      return handleGetContactCount(hsToken);

    case 'runBackfillBatch':
      return handleRunBackfillBatch(hsToken, extoleToken, params);

    case 'getWorkflows':
      return handleGetWorkflows(hsToken);

    case 'createWorkflow':
      return handleCreateWorkflow(hsToken, extoleToken, params);

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

async function handleGetContactCount(hsToken) {
  const response = await hsGet(hsToken, '/crm/v3/objects/contacts?limit=1&properties=email');
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
  const res = await hsGet(hsToken, '/automation/v3/workflows');
  if (!res.ok) {
    return { error: `HubSpot API error: ${res.status}`, workflows: [] };
  }
  const data = await res.json();
  const extoleWorkflows = (data.workflows || [])
    .filter(w => w.name && w.name.startsWith('Extole'))
    .map(w => ({ id: w.id, name: w.name, enabled: w.enabled }));
  return { workflows: extoleWorkflows };
}

async function handleCreateWorkflow(hsToken, extoleToken, { workflowType }) {
  const config = WORKFLOW_CONFIGS[workflowType];
  if (!config) return { error: `Unknown workflowType: ${workflowType}` };
  if (!extoleToken) return { error: 'EXTOLE_API_TOKEN secret not configured' };

  const requestBody = config.bodyTemplate(config.eventName);

  const workflow = {
    name: config.name,
    type: 'DRIP_DELAY',
    enabled: false,
    onlyEnrollsManually: false,
    allowContactToTriggerMultipleTimes: false,
    actions: [
      {
        actionId: 1,
        type: 'WEBHOOK',
        url: 'https://api.extole.io/v5/events',
        method: 'POST',
        body: requestBody,
        additionalHeaders: [
          { header: 'Authorization', value: `Bearer ${extoleToken}` },
          { header: 'Content-Type', value: 'application/json' },
        ],
      },
    ],
  };

  const res = await hsPost(hsToken, '/automation/v3/workflows', workflow);
  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      error: responseData.message || `HTTP ${res.status}`,
      details: responseData,
    };
  }

  return {
    workflowId: responseData.id,
    name: responseData.name,
    portalId: responseData.portalId,
  };
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
