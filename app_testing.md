# Extole HubSpot App — Test Plan

## Legend
- **M** = Manual (requires browser/HubSpot UI)
- **A** = Automated (Jest unit test or CLI script)
- ✅ = Confirmed passing
- 🔲 = Not yet tested
- ❌ = Known failure

---

## 1. Installation & Connection

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 1.1 | App installs on fresh portal | M | 🔲 | Uninstall, reinstall from developer portal; confirm Settings page loads on Event Configuration tab |
| 1.2 | Scope authorization includes all required scopes | M | 🔲 | After install, confirm `automation`, `crm.objects.custom.write`, `forms` etc. granted |
| 1.3 | Connection test — valid token | M | ✅ | Event Config tab → Test Connection → green status |
| 1.4 | Connection test — invalid token | M | 🔲 | Enter garbage token → error status with HTTP status shown |
| 1.5 | Connection test — missing token | M | 🔲 | No EXTOLE_API_TOKEN secret configured → error message shown |

---

## 2. Event Configuration

### 2a. Workflow Creation

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.1 | Create Contact workflow | M | ✅ | Event Config tab → Add Workflow → Contact + event name → Create → appears in list |
| 2.2 | Create Deal workflow | M | 🔲 | Object: Deal → Create → list shows Deal object label |
| 2.3 | Create Company workflow | M | 🔲 | Object: Company → Create |
| 2.4 | Create Ticket workflow | M | 🔲 | Object: Ticket → Create |
| 2.5 | Save as Draft (inactive) | M | 🔲 | "Save as Draft" → workflow created, status shows DRAFT/Inactive in list |
| 2.6 | Missing event name blocked | M | 🔲 | Leave event name blank → Create button disabled |
| 2.7 | Workflow fires event → Extole stream | M | 🔲 | `extole stream --app-type hubspot_crm` → trigger record change → event appears |
| 2.8 | Field mappings appear in stream payload | A | 🔲 | Trigger contact → stream event has correct field values |
| 2.9 | buildWorkflowSourceCode output shape | A | 🔲 | Unit test: correct EVENT_NAME, FIELD_MAPPINGS, CRM_TYPE embedded |

### 2b. Workflow Management

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.10 | Edit workflow — re-opens with pre-populated values | M | 🔲 | Actions → Edit → event name, object, trigger type, field mappings all match |
| 2.11 | Edit workflow — saves updated source code | M | 🔲 | Change event name → Save → trigger record → new event name in stream |
| 2.12 | Activate workflow | M | 🔲 | Deactivate first → Actions → Activate → status flips to Active |
| 2.13 | Deactivate workflow | M | 🔲 | Actions → Deactivate → status flips → no events fire on trigger |
| 2.14 | Delete workflow | M | 🔲 | Actions → Delete → confirm → removed from list and from HubSpot Workflows |
| 2.15 | Delete already-deleted workflow | A | 🔲 | DELETE to non-existent flow ID → returns `{ deleted: true }`, no error |
| 2.16 | Open Workflow link | M | 🔲 | Actions → Open Workflow → correct HubSpot URL opens in new tab |
| 2.17 | Workflow list refresh | M | 🔲 | Create workflow in HubSpot UI directly → Refresh button → appears in list |

### 2c. Trigger Types

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.18 | Trigger: Record Created | M | 🔲 | Trigger type: Record Created → create contact → event fires |
| 2.19 | Trigger: Field Changed | M | 🔲 | Trigger type: Field Changed → change that field → event fires |
| 2.20 | Trigger: Field Changed to Value | M | 🔲 | Trigger type: Field Value → set field to target value → event fires |
| 2.21 | Field Value dropdown populates valid values | M | 🔲 | Select enumeration property → Value dropdown shows options |

### 2d. Properties

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.22 | Create `extole_advocate_code` property | M | ✅ | Form Instrumentation tab → Create Property → property appears in HubSpot Contact schema |
| 2.23 | Create property idempotent | A | 🔲 | Unit test: call `handleCreateProperties` twice → second returns `already_exists`, no error |

---

## 3. Form Instrumentation

### 3a. Snippet Generation

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 3.1 | Snippet updates live as settings change | M | 🔲 | Change advocate code property name → snippet reflects new name immediately |
| 3.2 | Snippet targeting: all forms → `FORM_IDS = []` | A | 🔲 | Unit test: `generateSnippet({ formIds: [] })` → output contains `FORM_IDS = []` |
| 3.3 | Snippet targeting: specific form IDs | A | 🔲 | Unit test: `generateSnippet({ formIds: ['abc'] })` → output contains `FORM_IDS = ["abc"]` |
| 3.4 | Snippet correct property name | A | 🔲 | Unit test: `generateSnippet({ advocateCodeProperty: 'my_prop' })` → output contains `ADVOCATE_CODE_PROPERTY = 'my_prop'` |
| 3.5 | Snippet correct referral URL params | A | 🔲 | Unit test: `generateSnippet({ referralUrlParams: ['ref_code'] })` → output contains `REFERRAL_URL_PARAMS = ["ref_code"]` |
| 3.6 | Snippet contains replaceState injection | A | 🔲 | Unit test: output contains `history.replaceState` |
| 3.7 | Snippet contains cookie persistence | A | 🔲 | Unit test: output contains `setCookie` and `setLocalStorage` |

### 3b. End-to-End Attribution

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 3.8 | Scenario A — advocate code injected from URL param | M | ✅ | Load `/extole-form-test.html?extole_shareable_code=hs.test.bob` → submit → Contact has `extole_advocate_code = hs.test.bob` |
| 3.9 | Scenario B — code persists across page navigation | M | ✅ | Load Scenario A → click to Scenario B (no URL param) → submit → Contact has `extole_advocate_code` set from cookie |
| 3.10 | Scenario C — v3 form builder (`hs-form-frame`) | M | ✅ | Load page with `hs-form-frame` embed + `?extole_shareable_code=hs.test.bob` → submit → Contact has `extole_advocate_code` set |
| 3.11 | No advocate code — snippet is a no-op | M | 🔲 | Load page with no URL param, no cookie → submit → `extole_advocate_code` not set on Contact |
| 3.12 | Form targeting — untargeted form not instrumented | M | 🔲 | Configure specific form ID → submit a different form → `extole_advocate_code` not set |
| 3.13 | replaceState updates URL visibly | M | ✅ | Load page with `?extole_shareable_code=X` → URL bar shows `?extole_shareable_code=X&extole_advocate_code=X` |

**Test pages:** `/tmp/extole-form-test.html` (Scenario A + C) and `/tmp/extole-form-test-b.html` (Scenario B)

```bash
# Serve test pages
cd /tmp && python3 -m http.server 9090
# Open: http://localhost:9090/extole-form-test.html?extole_shareable_code=hs.test.bob

# Verify contact after submission:
curl -s "https://api.hubapi.com/crm/v3/objects/contacts/search" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"filterGroups":[{"filters":[{"propertyName":"email","operator":"EQ","value":"YOUR_TEST_EMAIL"}]}],"properties":["email","extole_advocate_code"]}' \
  | jq '.results[0].properties'
```

---

## 4. Share Links

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 4.1 | Create `extole_share_link` property | M | ✅ | Share Links tab → Create Property → property appears on Contact schema |
| 4.2 | Backfill — creates persons + links | M | ✅ | Run Share Links → Created count > 0, links written to Contact records |
| 4.3 | Backfill — already has link (existing) | M | 🔲 | Re-run backfill → Created: 0, Already had link: N |
| 4.4 | Backfill — invalid email domain (error) | M | ✅ | Contacts with fake domains → Errors count, logged per contact |
| 4.5 | Backfill — contact without email (skipped) | M | ✅ | Contact with no email → Skipped count increments |
| 4.6 | Backfill with campaign targeting label | M | 🔲 | Select a program label → links scoped to that label in Extole |
| 4.7 | Share link written to correct property | A | ✅ | `curl` contacts API → `extole_share_link` populated |
| 4.8 | Share link is a valid URL | A | ✅ | Link matches `https://*.extole.io/*` pattern |
| 4.9 | Auto-share enable — workflow created | M | 🔲 | Toggle on → `Extole — Auto Share Link` workflow appears in HubSpot Workflows |
| 4.10 | Auto-share disable — workflow deactivated | M | 🔲 | Toggle off → workflow status becomes Inactive |
| 4.11 | Auto-share fires on new contact | M | 🔲 | Create new contact with email → `extole_share_link` populated within ~1 min |
| 4.12 | Auto-share — no email → skipped | M | 🔲 | Create contact without email → no error, no share link |
| 4.13 | handleRunShareLinkBackfillBatch unit test | A | 🔲 | Mock HS contacts + Extole persons/shareables → verify write-back called with correct link |

```bash
# Check a contact's share link
curl -s "https://api.hubapi.com/crm/v3/objects/contacts/search" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"filterGroups":[{"filters":[{"propertyName":"email","operator":"EQ","value":"hs.test.alice@extole.com"}]}],"properties":["email","extole_share_link"]}' \
  | jq '.results[0].properties'
```

---

## 5. CRM Card

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 5.1 | Card appears on Contact sidebar | M | 🔲 | Open any Contact record → Extole Activity card visible in right sidebar |
| 5.2 | Card shows "No referral data" for unattributed contact | M | 🔲 | Contact with no `extole_advocate_code` → card shows "No referral data captured" |
| 5.3 | Card shows advocate code when present | M | 🔲 | Contact with `extole_advocate_code` set → "Referred by: <code>" displayed |
| 5.4 | Card shows session ID (hubspotutk) when present | M | 🔲 | Contact with `extole_hubspotutk` set → "Session ID: <truncated>" displayed |

---

## 6. Settings Log

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 6.1 | Log schema auto-created on first write | M | ✅ | Run backfill on fresh portal → open Settings Log tab → entries appear |
| 6.2 | Backfill completion logged | M | ✅ | Log tab shows `Share Link Backfill` row with Created/Existing/Skipped/Errors summary |
| 6.3 | Backfill errors logged per contact | M | ✅ | Each errored contact has its own `Share Link Backfill Error` row |
| 6.4 | Workflow created logged | M | 🔲 | Create workflow → Log tab shows `Workflow Created` |
| 6.5 | Workflow deleted logged | M | 🔲 | Delete workflow → Log tab shows `Workflow Deleted` |
| 6.6 | Workflow toggled logged | M | 🔲 | Activate/Deactivate workflow → Log tab shows `Workflow Toggled` |
| 6.7 | Auto-share enable logged | M | 🔲 | Enable auto-share → Log tab shows `Auto Share Link Enabled` |
| 6.8 | Auto-share disable logged | M | 🔲 | Disable auto-share → Log tab shows `Auto Share Link Disabled` |
| 6.9 | Log entries sorted newest first | M | ✅ | Most recent action at top |
| 6.10 | Log shows correct actor email | M | ✅ | Actor column shows the signed-in user's email |
| 6.11 | Log pagination — Next / Previous | M | 🔲 | Create >25 log entries → Next button appears, navigates correctly |
| 6.12 | Clear log empties table | M | 🔲 | Settings Log tab → Clear Log → Confirm → table empty |
| 6.13 | handleClearLog clears all entries (>100) | A | 🔲 | Unit test: mock search returning 150 entries → verify all archived, not just first 100 |

---

## 7. Edge Cases

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 7.1 | Workflow deleted in HubSpot UI | M | 🔲 | Delete workflow directly in HubSpot → Refresh in app → no longer listed |
| 7.2 | Workflow toggled in HubSpot UI | M | 🔲 | Toggle directly in HubSpot → status reflects reality on next list load |
| 7.3 | Edit workflow deleted in HubSpot UI | M | 🔲 | Try Edit on deleted workflow → graceful error shown |
| 7.4 | Delete already-deleted workflow | M | 🔲 | Should silently succeed (404 treated as success) |
| 7.5 | Backfill with 0 contacts | M | 🔲 | Empty portal → Created: 0, Skipped: 0, Errors: 0, Done immediately |
| 7.6 | HubSpot API 429 (rate limit) | M | 🔲 | Not tested — needs retry logic first |

---

## 8. Automated Test Strategy

### What can be unit tested (Jest + mocked `fetch`)

`settings.js` functions are plain async Node.js — straightforward to test with `jest.fn()` replacing `fetch`.

Priority targets:

| Function | What to test |
|---|---|
| `buildWorkflowSourceCode` | Pure function — correct EVENT_NAME, CRM_TYPE, FIELD_MAPPINGS in output |
| `parseWorkflowConfig` | Pure function — round-trips correctly with buildWorkflowSourceCode |
| `handleCreateWorkflow` | Correct flow body POSTed to HubSpot; error propagation |
| `handleToggleWorkflow` | GET + PUT with correct `isEnabled`; 404 on GET → error |
| `handleDeleteWorkflow` | DELETE called; 404 treated as success |
| `handleRunShareLinkBackfillBatch` | Person lookup → create → shareable → HubSpot PATCH; skipped/error paths |
| `handleClearLog` | Pages through >100 entries, archives all |
| `handleGetWorkflows` | Filters to Extole-prefixed workflows only |

`generateSnippet` in `Settings.tsx` is a pure function — testable with Jest + TypeScript.

Priority targets:

| Test | Assertion |
|---|---|
| Default output | Contains `ADVOCATE_CODE_PROPERTY`, `REFERRAL_URL_PARAMS`, `FORM_IDS` |
| replaceState present | Output contains `history.replaceState` |
| Cookie persistence present | Output contains `setCookie` and `setLocalStorage` |
| Form targeting | `formIds: ['abc']` → `FORM_IDS = ["abc"]` in output |
| XSS guard | Property name with `'` character → safely escaped in output |

### What can be script tested (extole CLI + curl)

Integration checks against the dev portal using real API calls:

```bash
# Required env vars
export HS_TOKEN="pat-na2-..."     # HubSpot private app access token
export EXTOLE_TOKEN="..."          # Extole API bearer token
export TEST_EMAIL="hs.test.$(date +%s)@extole.com"

# 1. Verify Extole connection
extole ping

# 2. Create a test contact, watch for event
extole stream --app-type hubspot_crm &
STREAM_PID=$!
curl -s -X POST "https://api.hubapi.com/crm/v3/objects/contacts" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"properties\":{\"email\":\"$TEST_EMAIL\",\"firstname\":\"Test\",\"lastname\":\"HubSpot\"}}"
sleep 10 && kill $STREAM_PID

# 3. Verify share link written to contact
curl -s "https://api.hubapi.com/crm/v3/objects/contacts/search" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"filterGroups\":[{\"filters\":[{\"propertyName\":\"email\",\"operator\":\"EQ\",\"value\":\"$TEST_EMAIL\"}]}],\"properties\":[\"email\",\"extole_share_link\",\"extole_advocate_code\"]}" \
  | jq '.results[0].properties'
```

### What cannot be automated (yet)

| Area | Reason |
|---|---|
| UI rendering and tab navigation | HubSpot UI Extensions testing library exists (`@hubspot/ui-extensions/testing`) but requires significant setup for this component size |
| Workflow trigger testing | Requires HubSpot to actually fire the workflow — no way to invoke synchronously in test |
| End-to-end form submission | Requires real browser, HubSpot tracking script, and live form |

---

## Known Issues (from Code Bunny review)

| # | Issue | Severity | Status |
|---|---|---|---|
| B1 | API tokens embedded as plaintext in workflow source code | 🔴 Critical | 🔲 Not fixed |
| B2 | Shipped snippet missing `replaceState` and has broken form element resolution | 🔴 Critical | 🔲 Not fixed |
| B3 | `handleClearLog` only clears first 100 entries | 🟠 High | 🔲 Not fixed |
| B4 | `handleGetWorkflows` caps at 100 with no pagination | 🟠 High | 🔲 Not fixed |
| B5 | Share link backfill `while` loop has no cancellation or timeout | 🟠 High | 🔲 Not fixed |
| B6 | Dead code: `handleRunBackfillBatch` (Onboarding tab removed) | 🟡 Medium | 🔲 Not fixed |
| B7 | `handleValidateProperty` only handles contacts/deals | 🟡 Medium | 🔲 Not fixed |

---

## Known Limitations / Deferred

| Item | Notes |
|---|---|
| `DEFAULT_SHARE_LABEL = 'exhsappd'` | Workaround for Extole v5 shareables API requiring label — remove when API fixed (ticket open) |
| HubSpot API rate limiting (429) | No retry/backoff logic — add before high-volume production use |
| Custom object scopes require reinstall | Adding `crm.objects.custom.*` scopes after initial install requires app reinstall |
| Cross-device attribution | `extole_advocate_code` cookie is browser-scoped — friend who clicks on mobile and converts on desktop loses attribution |
| HubSpot-native forms only | Form snippet does not work with Typeform, Marketo, or custom HTML forms |
