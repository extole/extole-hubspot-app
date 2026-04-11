# Extole HubSpot App — Dev Plan

## Pre-build (human steps)

- [ ] Add Extole bearer token: `hs secret add EXTOLE_API_TOKEN --account extolehsappdev`
- [ ] Run `hs project dev --testing-account extolehsappdev --project-account extolehsappdev` and complete install flow in browser (one-time)

---

## Phase 1 — Foundation

**Goal:** Shared infrastructure that all features build on.

### 1.1 Extole API client
- Serverless utility module: `src/app/functions/extole.js`
- Reads `EXTOLE_API_TOKEN` from `context.secrets`
- Exposes `fireEvent(eventName, payload)` and `registerContact(payload)`
- Reference `/Users/christopherduskin/extole-sfdc-app` for endpoint, auth scheme, and payload shapes

### 1.2 App settings storage
- HubSpot Custom Object: `Extole_HS_Config` (key-value store for app settings)
- Used by Form Configurator to persist: target form IDs, hubspotutk property name, advocate code property name
- Created via HubSpot CRM API on first load if not present

### 1.3 Settings page scaffold
- `src/app/settings/` — app-level settings page (vs contact record card)
- Sections: Extole connection status, Form Configurator config, Backfill trigger
- Loads and saves config via serverless function

---

## Phase 2 — Event Configurator (Custom Workflow Action)

**Goal:** Admin can add Extole event firing as an action step in any HubSpot Workflow.

### 2.1 Workflow action definition
- `src/app/workflow-actions/extole-event-action-hsmeta.json`
- Action name: "Send to Extole"
- Input fields: event name (text), properties to include (multi-select from Contact properties)
- `actionUrl`: points to the event dispatch serverless function

### 2.2 Event dispatch function
- `src/app/functions/dispatch.js`
- Receives workflow action callback from HubSpot
- Extracts configured properties from the Contact/Deal record
- Calls `extole.fireEvent()` with the configured event name and payload
- Returns success/failure to HubSpot

### 2.3 Validation
- Deploy and verify the Extole action appears in HubSpot workflow builder
- Create a test Contact Created workflow using the action
- Confirm event fires to Extole on Contact creation

---

## Phase 3 — Form Configurator

**Goal:** Generate a JS snippet that captures hubspotutk (and optionally advocate code) into HubSpot form hidden fields.

### 3.1 Settings UI
- Section in the settings page: "Form Configurator"
- Fields:
  - Form targeting: All forms / Specific form IDs (multi-value text input)
  - hubspotutk property name (default: `extole_hubspotutk`)
  - Advocate code property name, optional (default: `extole_advocate_code`)
- Save/load via serverless function → Custom Object storage

### 3.2 Contact property auto-creation
- On settings save: call HubSpot CRM API to create `extole_hubspotutk` Contact property if it doesn't exist
- Same for `extole_advocate_code` if advocate code field is configured

### 3.3 Snippet generator
- Serverless function reads saved config and returns generated JS
- Settings page displays snippet in a copy-paste code block
- Snippet logic:
  ```js
  // 1. Read hubspotutk from document.cookie
  // 2. On HubSpot form ready: inject hubspotutk into hidden field mapped to configured property
  // 3. Optionally: read advocate code from URL param, inject into separate hidden field
  // 4. If no referral context: submit empty (never block form submission)
  // 5. Must load after HubSpot tracking script
  ```

---

## Phase 4 — Backfill / Bulk Enroll

**Goal:** Seed existing HubSpot Contacts into Extole at install time.

### 4.1 Backfill function (chunked)
- `src/app/functions/backfill.js`
- Accepts: `{ cursor, batchSize }` — cursor is HubSpot Contacts API `after` token
- Pages one batch of contacts, fires each to Extole via `extole.registerContact()`
- Returns: `{ processed, cursor, done }` — cursor is null when complete
- Idempotent: safe to re-run (Extole register call is upsert)

### 4.2 Backfill UI
- Section in settings page: "Backfill"
- Shows: contact count estimate, "Start Backfill" button
- On start: calls backfill function in polling loop (client polls until `done: true`)
- Progress bar: `processed / total`
- Completion summary: enrolled, skipped, errors

---

## Phase 5 — Polish & Hardening

- Error states: DEPLOY_FAILED recovery messaging, Extole API failure handling
- Settings page: Extole connection test (ping Extole API, show connected/disconnected)
- Snippet: add script load order note in UI ("load this snippet after the HubSpot tracking script")
- Known limitations surfaced in UI where relevant (e.g. "Form Configurator requires HubSpot JS-embedded forms")

---

## Out of scope (V1)

- Write-back Configurator (V2)
- Deal-specific property configuration in Event Configurator UI
- Non-HubSpot forms
- Multi-touch attribution
- Marketplace distribution
