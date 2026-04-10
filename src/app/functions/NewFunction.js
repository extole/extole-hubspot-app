// Uses native fetch (Node 18) — no npm deps needed
exports.main = async (context) => {
  const token = context.secrets.PRIVATE_APP_TOKEN;
  const results = {
    hubspot_crm_api: null,
    extole_external_api: null,
  };

  // Test 1: HubSpot CRM API
  try {
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts?limit=1',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    results.hubspot_crm_api = {
      ok: response.ok,
      status: response.status,
      count: data.results?.length ?? 0,
    };
  } catch (err) {
    results.hubspot_crm_api = { ok: false, error: err.message };
  }

  // Test 2: Extole external API
  // Validates that serverless functions can make outbound calls to non-HubSpot hosts
  try {
    const tokenResponse = await fetch('https://api.extole.io/v4/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: 'spike-test', grant_type: 'client_credentials' }),
    });
    // We expect a 4xx (no real creds) — what matters is we got a response at all
    results.extole_external_api = {
      ok: tokenResponse.status < 500,
      status: tokenResponse.status,
      reachable: true,
    };
  } catch (err) {
    results.extole_external_api = { ok: false, reachable: false, error: err.message };
  }

  return results;
};
