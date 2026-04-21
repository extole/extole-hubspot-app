# Extole HubSpot App — Test Plan

## Legend
- **M** = Manual (requires browser/HubSpot UI)
- **A** = Automated (script or CLI)
- ✅ = Confirmed passing
- 🔲 = Not yet tested
- ❌ = Known failure

---

## 1. Installation & Onboarding

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 1.1 | App installs on fresh portal | M | 🔲 | Uninstall, reinstall from developer portal; confirm Settings page loads |
| 1.2 | Scope authorization includes all required scopes | M | 🔲 | After install, confirm `crm.objects.custom.write` etc. granted |
| 1.3 | Connection test — valid token | M | 🔲 | Onboarding tab → enter valid EXTOLE_API_TOKEN → "Connected" status |
| 1.4 | Connection test — invalid token | M | 🔲 | Enter garbage token → error status shown |
| 1.5 | Missing token | M | 🔲 | No secret configured → error message on Onboarding tab |
| 1.6 | Create `extole_hubspotutk` property | M | 🔲 | Onboarding tab → Create Property → property appears in HubSpot Contact schema |
| 1.7 | Create property idempotent | A | 🔲 | Call `createProperties` twice → second call reports `already_exists`, no error |

**Script:** `scripts/test_onboarding.sh`
```bash
# Verify hubspotutk property exists
curl -s "https://api.hubapi.com/crm/v3/properties/contacts/extole_hubspotutk" \
  -H "Authorization: Bearer $HS_TOKEN" | jq '.name'
```

---

## 2. Event Configuration

### 2a. Workflow Creation

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.1 | Create Contact workflow | M | 🔲 | Event Config tab → New → Contact + event name → Save → appears in list |
| 2.2 | Create Deal workflow | M | 🔲 | Object: Deal → Save → list shows `flowType: PLATFORM_FLOW` |
| 2.3 | Create Company workflow | M | 🔲 | Object: Company → Save |
| 2.4 | Create Ticket workflow | M | 🔲 | Object: Ticket → Save |
| 2.5 | Save as Draft (inactive) | M | 🔲 | "Save as Draft" → workflow created, status shows DRAFT in list |
| 2.6 | Missing event name blocked | M | 🔲 | Leave event name blank → submit disabled or validation error |
| 2.7 | Workflow fires event → Extole stream | M | 🔲 | `extole stream` in terminal → trigger record → event appears |
| 2.8 | Field mappings correct in stream | A | 🔲 | Trigger contact record → check stream event has correct field values |

### 2b. Workflow Management

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.9 | Edit workflow — re-opens with pre-populated values | M | 🔲 | Actions → Edit → all fields match saved config |
| 2.10 | Edit workflow — saves updated source code | M | 🔲 | Change event name → Save → trigger record → new event name in stream |
| 2.11 | Activate workflow | M | 🔲 | Deactivate first → Actions → Activate → status flips |
| 2.12 | Deactivate workflow | M | 🔲 | Actions → Deactivate → status flips → no events fire on trigger |
| 2.13 | Delete workflow | M | 🔲 | Actions → Delete → confirm → removed from list and HubSpot |
| 2.14 | Delete already-deleted workflow | A | 🔲 | DELETE flow that doesn't exist → should not error |
| 2.15 | Open Workflow link | M | 🔲 | Actions → Open Workflow → correct HubSpot URL in new tab |

### 2c. Trigger Types

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 2.16 | Trigger: Record Created | M | 🔲 | Trigger type: Record Created → creates new contact → event fires |
| 2.17 | Trigger: Field Changed | M | 🔲 | Trigger type: Field Changed → change that field → event fires |
| 2.18 | Trigger: Field Value | M | 🔲 | Trigger type: Field Value → set field to target value → event fires |
| 2.19 | Field Value dropdown populates valid values | M | 🔲 | Select enumeration property → Value dropdown shows options |

**Script:** `scripts/test_event_config.sh`
```bash
# Fire a test event and watch stream
extole events fire hubspot_contact_sync --email test@example.com --watch
```

---

## 3. Form Instrumentation

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 3.1 | Snippet generates with correct property names | M | 🔲 | Form Instrumentation tab → change property name → snippet updates live |
| 3.2 | Snippet targeting: all forms | M | 🔲 | Form targeting: All → `FORM_IDS = []` in snippet |
| 3.3 | Snippet targeting: specific form IDs | M | 🔲 | Enter form IDs → `FORM_IDS = ["abc"]` in snippet |
| 3.4 | Advocate code toggle off → property/param inputs disabled | M | 🔲 | Toggle off → inputs read-only, ADVOCATE_CODE_PROPERTY blank in snippet |
| 3.5 | Create Advocate Code property | M | 🔲 | Toggle on → Create Property → property appears in HubSpot Contact schema |
| 3.6 | Snippet injects hubspotutk hidden field | M | 🔲 | Embed snippet + HubSpot form on test page → submit → Contact has `extole_hubspotutk` set |
| 3.7 | Snippet injects advocate code from URL param | M | 🔲 | Load test page with `?ec=TEST123` → submit → Contact has `extole_advocate_code = TEST123` |
| 3.8 | Snippet ignores forms not in targeted list | M | 🔲 | Set specific form ID → submit different form → no hidden fields injected |

**Test page setup:**
```bash
# 1. Get your form ID from HubSpot portal (Marketing → Forms)
# 2. Generate snippet from Form Instrumentation tab
# 3. Create test page:
cat > /tmp/extole-form-test.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Extole Form Test</title></head>
<body>
  <h1>Extole Form Instrumentation Test</h1>
  <!-- HubSpot tracking script -->
  <script type="text/javascript" id="hs-script-loader" async defer
    src="//js.hs-scripts.com/245866198.js"></script>
  <!-- HubSpot form embed -->
  <script charset="utf-8" type="text/javascript"
    src="//js.hsforms.net/forms/embed/v2.js"></script>
  <div id="hs-form"></div>
  <script>
    hbspt.forms.create({ region: "na1", portalId: "245866198", formId: "YOUR_FORM_ID", target: "#hs-form" });
  </script>
  <!-- Paste generated snippet here -->
</body>
</html>
EOF
# 4. Serve locally
cd /tmp && python3 -m http.server 8080
# 5. Open: http://localhost:8080/extole-form-test.html?ec=TEST123
# 6. Submit form with a test email
# 7. Verify contact:
curl -s "https://api.hubapi.com/crm/v3/objects/contacts/search" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"filterGroups":[{"filters":[{"propertyName":"email","operator":"EQ","value":"YOUR_TEST_EMAIL"}]}],"properties":["email","extole_advocate_code","extole_hubspotutk"]}' \
  | jq '.results[0].properties'
```

---

## 4. Share Links

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 4.1 | Create share link property | M | ✅ | Share Links tab → Create Property → `extole_share_link` appears on Contact |
| 4.2 | Backfill — creates persons + links | M | ✅ | Generate Share Links → Created count > 0, links written to Contact records |
| 4.3 | Backfill — already has link (existing) | M | 🔲 | Re-run backfill → Created: 0, Already had link: N |
| 4.4 | Backfill — invalid email domain (error) | M | ✅ | Contacts with fake domains (extole-test.com) → Errors count, logged per contact |
| 4.5 | Backfill — contact without email (skipped) | M | ✅ | Contact with no email → Skipped count increments |
| 4.6 | Backfill with campaign targeting label | M | 🔲 | Select a program label → links created with that label in Extole |
| 4.7 | Auto-share enable | M | 🔲 | Toggle on → HubSpot workflow `Extole — Auto Share Link` created and active |
| 4.8 | Auto-share disable | M | 🔲 | Toggle off → workflow deactivated |
| 4.9 | Auto-share fires on new contact | M | 🔲 | Create new contact → share link appears on Contact record within ~1 min |
| 4.10 | Share link written to correct property | A | ✅ | `curl HubSpot contacts API` → `extole_share_link` populated |
| 4.11 | Share link valid Extole URL | A | ✅ | Link matches `https://{tenant}.extole.io/{code}` pattern |

**Script:** `scripts/test_share_links.sh`
```bash
HS_TOKEN="$1"
PORTAL=245866198
# Check alice's share link
curl -s "https://api.hubapi.com/crm/v3/objects/contacts/search" \
  -H "Authorization: Bearer $HS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"filterGroups":[{"filters":[{"propertyName":"email","operator":"EQ","value":"hs.test.alice@extole.com"}]}],"properties":["email","extole_share_link"]}' \
  | jq '.results[0].properties'
```

---

## 5. Activity Log

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 5.1 | Log schema auto-created on first write | M | ✅ | Run backfill → open Log tab → entries appear (no manual schema step) |
| 5.2 | Backfill completion logged | M | ✅ | Log tab shows `Share Link Backfill` row with Created/Existing/Skipped/Errors summary |
| 5.3 | Backfill errors logged per contact | M | ✅ | Each errored contact has its own `Share Link Backfill Error` row |
| 5.4 | Auto-share enable logged | M | 🔲 | Enable auto-share → Log tab shows `Auto Share Link Enabled` |
| 5.5 | Auto-share disable logged | M | 🔲 | Disable auto-share → Log tab shows `Auto Share Link Disabled` |
| 5.6 | Workflow created logged | M | 🔲 | Create workflow → Log tab shows `Workflow Created` |
| 5.7 | Workflow deleted logged | M | 🔲 | Delete workflow → Log tab shows `Workflow Deleted` |
| 5.8 | Clear log empties table | M | 🔲 | Log tab → Clear Log → Confirm → table empty |
| 5.9 | Log entries sorted newest first | M | ✅ | Most recent action at top of table |
| 5.10 | Log shows correct user (email) | M | ✅ | User column shows cduskin@extole.com |

---

## 6. Orphan / Edge Cases

| # | Test | Type | Status | Steps |
|---|------|------|--------|-------|
| 6.1 | Workflow deleted in HubSpot UI | M | 🔲 | Delete workflow directly in HubSpot → app list refreshes correctly |
| 6.2 | Workflow enabled/disabled in HubSpot UI | M | 🔲 | Toggle in HubSpot → status reflects reality on next list load |
| 6.3 | Edit deleted workflow | M | 🔲 | Delete workflow in HubSpot, try Edit in app → graceful error |
| 6.4 | Delete already-deleted workflow | M | 🔲 | Should silently succeed (treat 404 as success) |
| 6.5 | HubSpot rate limit (429) | M | 🔲 | Not tested — needs retry logic added |
| 6.6 | Backfill with 0 contacts | M | 🔲 | Empty portal → Created: 0, Skipped: 0, Errors: 0, Done |

---

## 7. Automated Test Strategy (Eng Handoff)

### Unit tests (Jest)
- Mock `fetch` and test each `handle*` function in `settings.js` in isolation
- Priority: `handleRunShareLinkBackfillBatch`, `handleCreateWorkflow`, `handleToggleWorkflow`

### Integration tests
- Real HubSpot sandbox + real Extole sandbox
- At minimum: rows marked ✅ above, run as regression suite

### Setup
```bash
# Required env vars
export HS_TOKEN="..."         # HubSpot access token (portal 245866198)
export EXTOLE_TOKEN="..."     # Extole API token

# Run all shell scripts
for f in scripts/test_*.sh; do bash "$f" "$HS_TOKEN" "$EXTOLE_TOKEN"; done
```

---

## Known Limitations / Deferred

| Item | Notes |
|------|-------|
| `DEFAULT_SHARE_LABEL = 'exhsappd'` | Workaround for Extole v5 shareables API requiring label — remove when API fixed |
| HubSpot rate limiting (429) | No retry logic — add before high-volume production use |
| Log limited to 50 entries | `getLogEntries` has `limit: 50` — pagination not implemented |
| Custom object scopes require reinstall | Adding `crm.objects.custom.*` scopes requires app reinstall — document in install guide |
