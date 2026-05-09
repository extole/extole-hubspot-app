/**
 * Extole Event Dispatch Function
 *
 * Called by HubSpot as the actionUrl for the "Send to Extole" Custom Workflow Action.
 * Receives the workflow action callback payload, extracts the configured fields,
 * and fires the event to Extole.
 *
 * HubSpot workflow action callback shape:
 * {
 *   object: { objectId, objectType, properties: { ... } },
 *   inputFields: { eventName: "...", ...additional fields }
 * }
 */

const EXTOLE_API_BASE = 'https://api.extole.io';

async function fireEvent(token, eventName, data) {
  const payload = {
    event_name: eventName,
    data: { ...data, app_type: 'extole-hubspot-app' },
  };
  const response = await fetch(`${EXTOLE_API_BASE}/v5/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-extole-app-type': 'extole-hubspot-app',
    },
    body: JSON.stringify(payload),
  });
  let body;
  try { body = await response.json(); } catch { body = null; }
  return { ok: response.ok, status: response.status, body };
}

exports.main = async (context) => {
  const token = context.secrets.EXTOLE_API_TOKEN;
  if (!token) {
    return { status: 'ERROR', message: 'EXTOLE_API_TOKEN secret not configured' };
  }

  const body = context.body || {};

  // Extract the event name configured by the admin in the workflow action
  const eventName = body.inputFields?.eventName;
  if (!eventName) {
    return { status: 'ERROR', message: 'eventName input field is required' };
  }

  // Build the data payload from the object's properties
  const objectId = body.object?.objectId;
  const objectType = body.object?.objectType || 'contact';
  const properties = body.object?.properties || {};

  // Map HubSpot properties into Extole data fields
  // Core identity fields are always included if present
  const data = {
    [`${objectType}_id`]: String(objectId || ''),
  };

  // Include email (primary Extole identity key)
  if (properties.email) data.email = properties.email;

  // Include advocate code if already captured on the contact
  if (properties.extole_advocate_code) data.advocate_code = properties.extole_advocate_code;

  // Include any additional fields from inputFields (admin-configured extras)
  const inputFields = body.inputFields || {};

  // Optional guard: if the workflow action specifies skipIfPropertySet=<propertyName>,
  // skip the dispatch when that property is already populated on the contact.
  // Use case: Auto Generate Share Link workflow firing on a contact that was just
  // created by the anonymous advocate sync (which already wrote extole_share_link).
  const skipIfPropertySet = inputFields.skipIfPropertySet;
  if (skipIfPropertySet && properties[skipIfPropertySet]) {
    return {
      status: 'SUCCESS',
      skipped: true,
      reason: `${skipIfPropertySet} already set on contact; skipping dispatch.`,
    };
  }

  for (const [key, value] of Object.entries(inputFields)) {
    if (key !== 'eventName' && key !== 'skipIfPropertySet' && value != null) {
      data[key] = value;
    }
  }

  const result = await fireEvent(token, eventName, data);

  if (!result.ok) {
    return {
      status: 'ERROR',
      message: `Extole API returned ${result.status}`,
      extoleResponse: result.body,
    };
  }

  return {
    status: 'SUCCESS',
    eventName,
    extoleStatus: result.status,
  };
};
