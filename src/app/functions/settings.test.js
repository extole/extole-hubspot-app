'use strict';

process.env.NODE_ENV = 'test';

global.fetch = jest.fn();

const { _test: t } = require('./settings');

// mockReset clears both calls AND implementations between tests,
// preventing mock state from leaking across test cases.
beforeEach(() => {
  global.fetch.mockReset();
});

// Helper: set a catch-all default so schema lookups and log writes
// in handlers under test don't crash when not explicitly mocked.
// (writeLogEntry is best-effort — silently gives up if schema not found)
function allowLogWrites() {
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
}

// ─── buildWorkflowSourceCode ──────────────────────────────────────────────────

describe('buildWorkflowSourceCode', () => {
  const mappings = [
    { extoleKey: 'email',      source: 'property', value: 'email' },
    { extoleKey: 'contact_id', source: 'property', value: 'hs_object_id' },
    { extoleKey: 'campaign',   source: 'static',   value: 'winter_promo' },
  ];

  it('embeds EVENT_NAME, CRM_TYPE, FIELD_MAPPINGS', () => {
    const src = t.buildWorkflowSourceCode('contact_created', 'contacts', mappings);
    expect(src).toContain("const EVENT_NAME = 'contact_created'");
    expect(src).toContain("const CRM_TYPE = 'contacts'");
    expect(src).toContain('"extoleKey":"email"');
  });

  it('embeds tokens as constants, not process.env', () => {
    const src = t.buildWorkflowSourceCode('test_event', 'contacts', [], 'extole-tok', 'hs-tok');
    expect(src).toContain("const EXTOLE_TOKEN = 'extole-tok'");
    expect(src).toContain("const HS_TOKEN = 'hs-tok'");
    expect(src).not.toContain('process.env');
    expect(src).not.toMatch(/Bearer [a-zA-Z0-9_-]{10}/);
  });

  it('escapes single quotes in event name', () => {
    const src = t.buildWorkflowSourceCode("deal's_closed", 'deals', []);
    expect(src).toContain("const EVENT_NAME = 'deal\\'s_closed'");
  });

  it('strips newlines from event name', () => {
    const src = t.buildWorkflowSourceCode("bad\nevent", 'contacts', []);
    expect(src).toContain("const EVENT_NAME = 'badevent'");
  });

  it('round-trips with parseWorkflowConfig', () => {
    const src = t.buildWorkflowSourceCode('deal_closed_won', 'deals', mappings);
    const parsed = t.parseWorkflowConfig(src);
    expect(parsed.eventName).toBe('deal_closed_won');
    expect(parsed.triggerObject).toBe('deal');
    expect(parsed.fieldMappings).toEqual(mappings);
  });

  it('handles empty field mappings', () => {
    const src = t.buildWorkflowSourceCode('ping', 'contacts', []);
    expect(src).toContain('const FIELD_MAPPINGS = []');
  });
});

// ─── parseWorkflowConfig ──────────────────────────────────────────────────────

describe('parseWorkflowConfig', () => {
  it('returns null for empty source', () => {
    expect(t.parseWorkflowConfig('')).toBeNull();
    expect(t.parseWorkflowConfig(null)).toBeNull();
  });

  it('returns null when EVENT_NAME missing', () => {
    expect(t.parseWorkflowConfig("const CRM_TYPE = 'contacts';")).toBeNull();
  });

  it('maps CRM paths back to object keys', () => {
    const cases = [
      ['contacts', 'contact'], ['deals', 'deal'], ['companies', 'company'],
      ['tickets', 'ticket'], ['quotes', 'quote'],
    ];
    for (const [crmPath, expected] of cases) {
      const src = t.buildWorkflowSourceCode('ev', crmPath, []);
      expect(t.parseWorkflowConfig(src).triggerObject).toBe(expected);
    }
  });
});

// ─── buildAutoShareLinkSourceCode ─────────────────────────────────────────────

describe('buildAutoShareLinkSourceCode', () => {
  it('embeds tokens as constants, not process.env', () => {
    const src = t.buildAutoShareLinkSourceCode('my_label', 'extole-tok', 'hs-tok');
    expect(src).toContain("const EXTOLE_TOKEN = 'extole-tok'");
    expect(src).toContain("const HS_TOKEN = 'hs-tok'");
    expect(src).not.toContain('process.env');
  });

  it('embeds program label', () => {
    const src = t.buildAutoShareLinkSourceCode('spring_sale');
    expect(src).toContain("const PROGRAM_LABEL = 'spring_sale'");
  });

  it('falls back to DEFAULT_SHARE_LABEL when empty', () => {
    const src = t.buildAutoShareLinkSourceCode('');
    expect(src).toContain("const PROGRAM_LABEL = 'exhsappd'");
  });
});

// ─── handleGetWorkflows ───────────────────────────────────────────────────────

describe('handleGetWorkflows', () => {
  function makeFlow(id, name, enabled = true, objectTypeId = '0-1') {
    return { id, name, isEnabled: enabled, objectTypeId, createdAt: '2025-01-01' };
  }

  function mockPage(results, nextAfter = null) {
    return {
      ok: true,
      json: async () => ({
        results,
        paging: nextAfter ? { next: { after: nextAfter } } : undefined,
      }),
    };
  }

  it('returns only Extole-prefixed workflows', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([
      makeFlow('1', 'Extole — contact_created'),
      makeFlow('2', 'Other workflow'),
      makeFlow('3', 'Extole — deal_closed', false, '0-3'),
    ]));

    const result = await t.handleGetWorkflows('hs_token');
    expect(result.workflows).toHaveLength(2);
    expect(result.workflows[0].id).toBe('1');
    expect(result.workflows[0].eventName).toBe('contact_created');
    expect(result.workflows[1].id).toBe('3');
    expect(result.workflows[1].enabled).toBe(false);
  });

  it('paginates through multiple pages', async () => {
    global.fetch
      .mockResolvedValueOnce(mockPage([makeFlow('1', 'Extole — event_a')], 'cursor_page2'))
      .mockResolvedValueOnce(mockPage([makeFlow('2', 'Extole — event_b')]));

    const result = await t.handleGetWorkflows('hs_token');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.workflows).toHaveLength(2);
    expect(result.workflows.map(w => w.id)).toEqual(['1', '2']);
  });

  it('returns empty list when no Extole workflows exist', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([makeFlow('1', 'Some other workflow')]));
    const result = await t.handleGetWorkflows('hs_token');
    expect(result.workflows).toEqual([]);
  });

  it('returns error on API failure', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 403 });
    const result = await t.handleGetWorkflows('hs_token');
    expect(result.error).toMatch(/403/);
    expect(result.workflows).toEqual([]);
  });
});

// ─── handleDeleteWorkflow ─────────────────────────────────────────────────────

describe('handleDeleteWorkflow', () => {
  it('returns deleted: true on 204', async () => {
    allowLogWrites();
    global.fetch.mockResolvedValueOnce({ ok: true, status: 204 }); // DELETE
    const result = await t.handleDeleteWorkflow('hs_token', { flowId: '123', workflowName: 'Extole — test', actor: 'user@test.com' });
    expect(result.deleted).toBe(true);
  });

  it('treats 404 as success', async () => {
    allowLogWrites();
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 }); // DELETE → 404
    const result = await t.handleDeleteWorkflow('hs_token', { flowId: 'gone', workflowName: 'Extole — old', actor: '' });
    expect(result.deleted).toBe(true);
    expect(result.status).toBe(404);
  });

  it('returns error when flowId missing', async () => {
    const result = await t.handleDeleteWorkflow('hs_token', {});
    expect(result.error).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

// ─── handleClearLog ───────────────────────────────────────────────────────────

describe('handleClearLog', () => {
  function mockSchema(objectTypeId) {
    return { ok: true, json: async () => ({ results: [{ name: 'extole_app_log', objectTypeId }] }) };
  }

  function mockSearch(ids, nextAfter = null) {
    return {
      ok: true,
      json: async () => ({
        results: ids.map(id => ({ id })),
        paging: nextAfter ? { next: { after: nextAfter } } : undefined,
      }),
    };
  }

  it('clears all entries across multiple pages', async () => {
    global.fetch
      .mockResolvedValueOnce(mockSchema('2-abc'))               // getLogObjectTypeId
      .mockResolvedValueOnce(mockSearch(['1', '2', '3'], 'c2')) // search page 1
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // archive page 1
      .mockResolvedValueOnce(mockSearch(['4', '5']))            // search page 2
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }); // archive page 2

    const result = await t.handleClearLog('hs_token');
    expect(result.cleared).toBe(5);
    expect(global.fetch).toHaveBeenCalledTimes(5);
  });

  it('returns 0 when no log schema exists', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) });
    const result = await t.handleClearLog('hs_token');
    expect(result.cleared).toBe(0);
  });

  it('returns 0 when log is already empty', async () => {
    global.fetch
      .mockResolvedValueOnce(mockSchema('2-abc'))
      .mockResolvedValueOnce(mockSearch([]));

    const result = await t.handleClearLog('hs_token');
    expect(result.cleared).toBe(0);
  });
});

// ─── handleCreateProperties ───────────────────────────────────────────────────

describe('handleCreateProperties', () => {
  it('creates a property that does not exist', async () => {
    allowLogWrites(); // catch-all for schema lookups in writeLogEntry
    global.fetch
      .mockResolvedValueOnce({ ok: false, status: 404 }) // GET — property doesn't exist
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }); // POST create

    const result = await t.handleCreateProperties('hs_token', {
      advocateCodeProperty: 'extole_advocate_code',
    });
    expect(result.created).toHaveLength(1);
    expect(result.created[0].action).toBe('created');
    expect(result.errors).toHaveLength(0);
  });

  it('skips a property that already exists', async () => {
    allowLogWrites();
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ name: 'extole_advocate_code' }) });

    const result = await t.handleCreateProperties('hs_token', {
      advocateCodeProperty: 'extole_advocate_code',
    });
    expect(result.created[0].action).toBe('already_exists');
    expect(result.errors).toHaveLength(0);
  });
});

// ─── handleValidateProperty ───────────────────────────────────────────────────

describe('handleValidateProperty', () => {
  it('validates against the correct CRM type for each object', async () => {
    const cases = [
      ['contact', 'contacts'], ['deal', 'deals'], ['company', 'companies'],
      ['ticket', 'tickets'], ['quote', 'quotes'],
    ];
    for (const [objectType, expectedCrmType] of cases) {
      global.fetch.mockResolvedValueOnce({ ok: true });
      await t.handleValidateProperty('hs_token', { objectType, propertyName: 'some_field' });
      const calledUrl = global.fetch.mock.calls[global.fetch.mock.calls.length - 1][0];
      expect(calledUrl).toContain(`/crm/v3/properties/${expectedCrmType}/some_field`);
    }
  });

  it('returns valid: false when property not found', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await t.handleValidateProperty('hs_token', { objectType: 'contact', propertyName: 'nonexistent' });
    expect(result.valid).toBe(false);
  });

  it('returns valid: false when propertyName is empty', async () => {
    const result = await t.handleValidateProperty('hs_token', { objectType: 'contact', propertyName: '' });
    expect(result.valid).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

// ─── handleGetForms ───────────────────────────────────────────────────────────

describe('handleGetForms', () => {
  function mockPage(forms, nextAfter = null) {
    return {
      ok: true,
      json: async () => ({
        results: forms,
        paging: nextAfter ? { next: { after: nextAfter } } : undefined,
      }),
    };
  }

  it('returns all forms from a single page', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([
      { id: 'f1', name: 'Contact Us' },
      { id: 'f2', name: 'Newsletter' },
    ]));
    const result = await t.handleGetForms('hs_token');
    expect(result.forms).toHaveLength(2);
    expect(result.forms[0]).toEqual({ id: 'f1', name: 'Contact Us' });
  });

  it('paginates through multiple pages', async () => {
    global.fetch
      .mockResolvedValueOnce(mockPage([{ id: 'f1', name: 'Form A' }], 'cursor2'))
      .mockResolvedValueOnce(mockPage([{ id: 'f2', name: 'Form B' }]));
    const result = await t.handleGetForms('hs_token');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.forms).toHaveLength(2);
    expect(result.forms.map(f => f.id)).toEqual(['f1', 'f2']);
  });

  it('returns error on API failure', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 403, text: async () => 'Forbidden' });
    const result = await t.handleGetForms('hs_token');
    expect(result.error).toMatch(/403/);
    expect(result.forms).toEqual([]);
  });

  it('falls back to id when name is missing', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([{ id: 'f99' }]));
    const result = await t.handleGetForms('hs_token');
    expect(result.forms[0]).toEqual({ id: 'f99', name: 'f99' });
  });
});

// ─── campaignReferencesEvent ──────────────────────────────────────────────────

describe('campaignReferencesEvent', () => {
  it('matches shape 1: campaign.event_names[]', () => {
    const campaign = { name: 'My Campaign', event_names: ['hubspot_deal_closed_won', 'other_event'] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_deal_closed_won')).toBe(true);
    expect(t.campaignReferencesEvent(campaign, 'unrelated_event')).toBe(false);
  });

  it('matches shape 2: campaign.triggers[].event_name', () => {
    const campaign = { name: 'My Campaign', triggers: [{ event_name: 'hubspot_contact_created' }] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_contact_created')).toBe(true);
    expect(t.campaignReferencesEvent(campaign, 'other_event')).toBe(false);
  });

  it('matches shape 2: campaign.triggers[].event_names[]', () => {
    const campaign = { name: 'My Campaign', triggers: [{ event_names: ['hubspot_deal_created', 'other'] }] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_deal_created')).toBe(true);
  });

  it('matches shape 3: campaign.builds[].triggers[].event_name', () => {
    const campaign = { builds: [{ triggers: [{ event_name: 'hubspot_deal_closed_won' }] }] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_deal_closed_won')).toBe(true);
  });

  it('matches shape 3: campaign.builds[].triggers[].event_names[]', () => {
    const campaign = { builds: [{ triggers: [{ event_names: ['hubspot_deal_closed_won'] }] }] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_deal_closed_won')).toBe(true);
  });

  it('is case-insensitive', () => {
    const campaign = { event_names: ['Hubspot_Deal_Closed_Won'] };
    expect(t.campaignReferencesEvent(campaign, 'hubspot_deal_closed_won')).toBe(true);
  });

  it('returns false when campaign has no event data', () => {
    expect(t.campaignReferencesEvent({ name: 'Empty Campaign' }, 'any_event')).toBe(false);
  });
});

// ─── handleCheckEventUsage ────────────────────────────────────────────────────

describe('handleCheckEventUsage', () => {
  const TOKEN = 'extole-test-token';

  function mockCampaigns(campaigns) {
    return { ok: true, json: async () => campaigns };
  }

  it('returns NOT_FOUND when no campaigns reference the event', async () => {
    global.fetch.mockResolvedValueOnce(mockCampaigns([
      { name: 'Other Campaign', event_names: ['some_other_event'] },
    ]));
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'hubspot_deal_closed_won' });
    expect(result.status).toBe('NOT_FOUND');
  });

  it('returns FOUND with campaign name when event is in use', async () => {
    global.fetch.mockResolvedValueOnce(mockCampaigns([
      { name: 'Referral Program', event_names: ['hubspot_deal_closed_won'] },
    ]));
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'hubspot_deal_closed_won' });
    expect(result.status).toBe('FOUND');
    expect(result.campaignName).toBe('Referral Program');
  });

  it('returns FOUND on first matching campaign and short-circuits', async () => {
    global.fetch.mockResolvedValueOnce(mockCampaigns([
      { name: 'First Match', event_names: ['hubspot_contact_created'] },
      { name: 'Second Match', event_names: ['hubspot_contact_created'] },
    ]));
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'hubspot_contact_created' });
    expect(result.status).toBe('FOUND');
    expect(result.campaignName).toBe('First Match');
  });

  it('returns UNKNOWN on API error', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'some_event' });
    expect(result.status).toBe('UNKNOWN');
  });

  it('returns UNKNOWN on fetch exception', async () => {
    global.fetch.mockRejectedValueOnce(new Error('network error'));
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'some_event' });
    expect(result.status).toBe('UNKNOWN');
  });

  it('returns NOT_FOUND immediately when eventName is empty', async () => {
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: '' });
    expect(result.status).toBe('NOT_FOUND');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns UNKNOWN when token is missing', async () => {
    const result = await t.handleCheckEventUsage(null, { eventName: 'some_event' });
    expect(result.status).toBe('UNKNOWN');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles campaigns wrapped in a results array', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ name: 'Wrapped Campaign', event_names: ['hubspot_contact_created'] }] }),
    });
    const result = await t.handleCheckEventUsage(TOKEN, { eventName: 'hubspot_contact_created' });
    expect(result.status).toBe('FOUND');
    expect(result.campaignName).toBe('Wrapped Campaign');
  });
});

// ─── handleGetAutoShareLinkStatus ────────────────────────────────────────────

describe('handleGetAutoShareLinkStatus', () => {
  function mockPage(workflows, nextAfter = null) {
    return {
      ok: true,
      json: async () => ({
        results: workflows,
        paging: nextAfter ? { next: { after: nextAfter } } : undefined,
      }),
    };
  }

  it('finds the workflow on the first page', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([
      { id: '42', name: 'Extole — Auto Share Link', isEnabled: true },
    ]));
    const result = await t.handleGetAutoShareLinkStatus('hs_token');
    expect(result.workflow).toEqual({ id: '42', enabled: true });
  });

  it('finds the workflow on a subsequent page', async () => {
    global.fetch
      .mockResolvedValueOnce(mockPage([{ id: '1', name: 'Other Workflow' }], 'cursor2'))
      .mockResolvedValueOnce(mockPage([{ id: '99', name: 'Extole — Auto Share Link', isEnabled: false }]));
    const result = await t.handleGetAutoShareLinkStatus('hs_token');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result.workflow).toEqual({ id: '99', enabled: false });
  });

  it('returns null when workflow does not exist', async () => {
    global.fetch.mockResolvedValueOnce(mockPage([{ id: '1', name: 'Some Other Workflow' }]));
    const result = await t.handleGetAutoShareLinkStatus('hs_token');
    expect(result.workflow).toBeNull();
  });

  it('returns null on API failure', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    const result = await t.handleGetAutoShareLinkStatus('hs_token');
    expect(result.workflow).toBeNull();
  });
});
