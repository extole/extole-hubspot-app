/**
 * Extole Advocate Sync — public endpoint webhook
 *
 * Receives a POST from Extole when an anonymous advocate identifies themselves
 * (provides email, gets a share link). Upserts a HubSpot contact by email and
 * writes the share link to the configured contact property. The advocate code
 * is intentionally NOT written — that property is reserved for friend-side
 * "was referred by" tracking, set by a different flow.
 *
 * Auth: shared secret in the request body as `shared_secret`, validated against
 * the value stored in app settings. Rotating the secret in HubSpot Settings
 * invalidates old requests immediately. (Custom headers are stripped by
 * HubSpot's serverless gateway, so secrets travel in the body.)
 *
 * Expected request body:
 *   {
 *     "shared_secret": "<value>",             // required
 *     "email": "advocate@example.com",        // required
 *     "share_link": "https://...",            // optional
 *     "first_name": "Jane",                   // optional
 *     "last_name": "Doe"                      // optional
 *   }
 */

const HS_API_BASE = 'https://api.hubapi.com';
const APP_SETTINGS_OBJECT_NAME = 'extole_app_settings';

exports.main = async (context = {}) => {
  const hsToken = process.env.PRIVATE_APP_ACCESS_TOKEN;
  if (!hsToken) return respond(500, { error: 'PRIVATE_APP_ACCESS_TOKEN not available' });

  const rawBody = context.body || context.request?.body;
  const body = parseBody(rawBody);
  if (!body || typeof body !== 'object') return respond(400, { error: 'invalid request body' });
  const { shared_secret, email, share_link, first_name, last_name } = body;
  if (!shared_secret) return respond(401, { error: 'missing shared_secret in body' });
  if (!email || typeof email !== 'string') return respond(400, { error: 'email is required' });

  const settings = await readAppSettings(hsToken);
  if (!settings) return respond(500, { error: 'unable to read app settings' });
  if (!settings.advocateSyncEnabled) return respond(403, { error: 'advocate sync is disabled' });
  if (!settings.advocateSyncSecret) return respond(403, { error: 'advocate sync is not configured' });
  if (settings.advocateSyncSecret !== shared_secret) return respond(401, { error: 'invalid shared secret' });

  const shareLinkProp = settings.shareLinkProperty || 'extole_share_link';

  const props = {};
  if (first_name) props.firstname = first_name;
  if (last_name) props.lastname = last_name;
  if (share_link) props[shareLinkProp] = share_link;

  const upsertRes = await fetch(`${HS_API_BASE}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ properties: { email, ...props } }),
  });

  if (upsertRes.status === 404) {
    const createRes = await fetch(`${HS_API_BASE}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties: { email, ...props } }),
    });
    const createBody = await createRes.json().catch(() => ({}));
    if (!createRes.ok) return respond(createRes.status, { error: createBody.message || 'create failed' });
    await logSync(hsToken, email, 'created');
    return respond(200, { contactId: createBody.id, action: 'created' });
  }

  const upsertBody = await upsertRes.json().catch(() => ({}));
  if (!upsertRes.ok) return respond(upsertRes.status, { error: upsertBody.message || 'update failed' });
  await logSync(hsToken, email, 'updated');
  return respond(200, { contactId: upsertBody.id, action: 'updated' });
};

function parseBody(body) {
  if (!body) return null;
  if (typeof body === 'object') return body;
  try { return JSON.parse(body); } catch { return null; }
}

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

async function readAppSettings(hsToken) {
  const schemasRes = await fetch(`${HS_API_BASE}/crm/v3/schemas`, {
    headers: { Authorization: `Bearer ${hsToken}` },
  });
  if (!schemasRes.ok) return null;
  const schemasData = await schemasRes.json().catch(() => ({}));
  const schema = (schemasData.results || []).find(s => s.name === APP_SETTINGS_OBJECT_NAME);
  if (!schema) return null;

  const searchRes = await fetch(`${HS_API_BASE}/crm/v3/objects/${schema.objectTypeId}/search`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'eas_name', operator: 'EQ', value: 'default' }] }],
      properties: ['eas_config'],
      limit: 1,
    }),
  });
  if (!searchRes.ok) return null;
  const searchData = await searchRes.json().catch(() => ({}));
  const record = searchData.results?.[0];
  if (!record) return null;
  try {
    return JSON.parse(record.properties?.eas_config || '{}');
  } catch {
    return null;
  }
}

async function logSync(hsToken, email, action) {
  try {
    const schemasRes = await fetch(`${HS_API_BASE}/crm/v3/schemas`, {
      headers: { Authorization: `Bearer ${hsToken}` },
    });
    if (!schemasRes.ok) return;
    const schemasData = await schemasRes.json().catch(() => ({}));
    const schema = (schemasData.results || []).find(s => s.name === 'extole_app_log');
    if (!schema) return;
    await fetch(`${HS_API_BASE}/crm/v3/objects/${schema.objectTypeId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${hsToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          eal_timestamp: new Date().toISOString(),
          eal_action: 'advocate_sync_from_extole',
          eal_actor: 'extole webhook',
          eal_details: `${email} (${action})`,
          eal_status: 'success',
        },
      }),
    });
  } catch {
    // best effort
  }
}
