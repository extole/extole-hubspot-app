/**
 * Extole API client — shared module for all serverless functions.
 *
 * Endpoint: POST https://api.extole.io/v5/events
 * Auth: Bearer token from EXTOLE_API_TOKEN secret
 * Payload: { event_name, data: { ...fields, app_type: "hubspot_crm" } }
 */

const EXTOLE_API_BASE = 'https://api.extole.io';

/**
 * Fire an event to Extole.
 *
 * @param {string} token - Extole bearer token
 * @param {string} eventName - Extole event name (e.g. "contact_created")
 * @param {Object} data - Event data fields (merged with app_type automatically)
 * @returns {{ ok: boolean, status: number, body: any }}
 */
async function fireEvent(token, eventName, data) {
  const payload = {
    event_name: eventName,
    data: { ...data, app_type: 'hubspot_crm' },
  };

  const response = await fetch(`${EXTOLE_API_BASE}/v5/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let body;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return { ok: response.ok, status: response.status, body };
}

/**
 * Verify the token is valid by making a lightweight API call.
 * Returns { ok: boolean, status: number }
 */
async function testConnection(token) {
  const response = await fetch(`${EXTOLE_API_BASE}/v4/tokens`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return { ok: response.ok, status: response.status };
}

module.exports = { fireEvent, testConnection };
