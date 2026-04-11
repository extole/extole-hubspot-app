# Extole HubSpot App — Spec

## What it does

Connects HubSpot to Extole's referral platform. The app has three V1 features that together close the referral loop: instrumenting the friend's journey into the CRM, triggering Extole events on record changes, and seeding existing contacts at install time.

---

## Prerequisites

- **Data Hub Professional or higher** — required for serverless app functions. Starter tier cannot run this app. (Note: docs are inconsistent on whether Enterprise is required for UI extensions — needs partner team confirmation.)
- **Extole core.js** deployed on the client's website — standard for all Extole customers
- **HubSpot tracking script** deployed on all pages of the client's site — required for `hubspotutk` to be set before the Form Configurator snippet runs
- **HubSpot-embedded forms** on the client's site — native HubSpot forms only (not Typeform, Marketo, etc.). Clients not using HubSpot-native forms can skip the Form Configurator and use the Event Configurator alone.

---

## Feature 1 — Form Configurator

### Problem

When a friend clicks an advocate's Extole share link, they land on the client's site with referral context active. Without instrumentation, that context is invisible to HubSpot — the resulting Lead/Contact record has no advocate association and the referral chain breaks at lead creation.

### Architecture

Extole's `core.js` is already deployed first-party on the client's site. When a friend arrives via a share link, core.js fires a landing event to Extole that includes the advocate code and the HubSpot visitor ID (`hubspotutk`). This establishes the advocate → friend association in Extole before the friend has filled out any form.

`hubspotutk` is HubSpot's own visitor tracking cookie — set on first page load by the HubSpot tracking code, available on every page of the visit, and automatically associated with a Contact when a form is submitted. It is not exposed as a readable Contact property via the CRM API, so the Form Configurator snippet captures it from the client-side cookie and injects it into a hidden form field, where it gets stored as a custom Contact property.

**Cross-page persistence** is handled by Extole core.js — since it's first-party and session-scoped to the client's base domain, the referral context survives navigation across the site. The friend does not need to convert on the landing page.

### Flow

```
Friend clicks share link
  → lands on client site (Extole core.js + HubSpot tracking both present)
  → HubSpot sets hubspotutk (visitor cookie, consistent across all pages of this visit)
  → core.js fires landing event to Extole: { advocate_code, hubspotutk }
  → Extole establishes: this hubspotutk visitor was referred by this advocate

Friend navigates site (may visit multiple pages before converting)

Friend reaches a HubSpot form and submits it
  → Form Configurator snippet reads hubspotutk from cookie, injects into hidden Contact property field
  → (Optional) snippet reads advocate code from landing URL param, injects into separate hidden field

HubSpot creates Contact with hubspotutk stored as property
  → Event Configurator fires "Contact Created" to Extole:
      { email, contact_id, hubspotutk }
  → Extole looks up: hubspotutk → advocate code (from landing event)
  → Referral association complete; contact_id becomes canonical identity

Downstream events include contact_id through pipeline
  → At Closed Won: deal_id takes over as terminal event identifier
```

### What it configures

| Setting | Description |
|---|---|
| **HubSpot form targeting** | All forms, or a specific list of form IDs |
| **hubspotutk property** | Contact property to store the visitor ID (auto-created at setup) |
| **Advocate code property** | Optional — Contact property to store advocate code for direct HubSpot reporting |

The snippet is generated from these settings and provided as a copy-paste embed for the client's site. The snippet must load after the HubSpot tracking script so that `hubspotutk` is set before it runs.

### Open Questions

1. **Register call fields** — which fields does Extole require/support in the identity register call: email required, contact_id as supplementary key?
2. **hubspotutk property auto-creation** — should the app create the custom Contact property at install, or require admin setup?

---

## Feature 2 — Event Configurator

### What it does

Lets admins define record-triggered events that fire to Extole when HubSpot records change. The app registers a Custom Workflow Action — the admin creates the workflow trigger condition themselves in HubSpot's workflow builder; the app owns the action step that calls Extole.

### Core use cases

| Trigger | Extole event |
|---|---|
| Contact created | Friend entered CRM — include hubspotutk + email for identity |
| Contact lifecycle stage changed | Progression event — e.g. Lead → MQL |
| Deal reached Closed Won | Conversion — trigger advocate reward |

### Architecture

The app defines a **Custom Workflow Action** (via `workflow-actions/*-hsmeta.json`) that appears in HubSpot's workflow builder under the Extole app. The admin:
1. Creates a HubSpot Workflow with an enrollment trigger of their choice
2. Adds the Extole action step, configuring which Contact/Deal properties to send

The action calls the app's serverless function endpoint, which forwards the payload to Extole with the configured event name and properties.

This approach is architecturally cleaner than programmatically creating full workflow objects:
- The admin owns the trigger logic; the app owns only the action
- No workflow objects are created or deleted on the customer's behalf
- Custom Workflow Actions are not subject to the per-account webhook slot limit (10 at Data Hub Professional, 100 at Enterprise) that applies to the built-in "Send a webhook" workflow action

**Deal Closed Won** is supported via this same mechanism — the admin creates a Deal-based workflow with a Closed Won trigger and adds the Extole action. Deal-specific property configuration in the Event Configurator UI is V2.

### Event config states

| State | Description |
|---|---|
| `DRAFT` | Configured but not yet deployed |
| `ACTIVE` | Workflow deployed and running |
| `INACTIVE` | Workflow deactivated, not deleted |
| `DEPLOY_FAILED` | Workflow creation/update failed |

---

## Feature 3 — Backfill / Bulk Enroll

### What it does

Seeds existing HubSpot Contacts into Extole at install time. The Event Configurator covers net-new contacts going forward, but a fresh install leaves the existing contact base dark to Extole.

### Architecture

Admin-triggered bulk operation from the app UI. The serverless function pages through HubSpot Contacts in batches and sends each to Extole using the same event/identity API as the Event Configurator.

**Scale constraint:** HubSpot serverless functions have a 15-second execution timeout. Large contact bases cannot be processed in a single function invocation. The backfill must use a chunked/polling pattern — the function processes a batch, stores a cursor, and the UI polls for completion — or is scoped to portals under a contact threshold with the limitation documented.

### UI requirements

- Show count of contacts to be enrolled before triggering
- Progress indicator during run (polling pattern)
- Summary on completion (enrolled, skipped, errors)
- Idempotent — safe to re-run

---

## Feature 4 — Write-back Configurator (V2)

### What it does

Writes Extole data back into HubSpot Contact properties. Closes the loop from the advocate's perspective — sales reps and HubSpot reporting can see referral activity without cross-referencing Extole.

### Use cases

| Extole event | HubSpot write-back |
|---|---|
| Share link generated | Store share URL on Contact |
| Friend converted | Update referrer Contact with conversion count |
| Reward issued | Log reward status/amount on Contact |
| Referral count | Running tally on Contact property |

### Architecture

Extole outbound webhook → app serverless function → HubSpot Contacts API. Admin configures which Extole events trigger which HubSpot property updates. Inbound webhook authentication (HMAC or shared secret) required.

**Deferred to V2** — depends on the inbound pipeline (Features 1–2) being proven first.

---

## Identity model

| Stage | Identifier |
|---|---|
| Anonymous (pre-form) | `hubspotutk` |
| Known contact (post-form) | HubSpot Contact ID |
| Post-conversion | HubSpot Deal ID |

Friend email is sent in Extole's register call (Extole's primary identity key) but is not the canonical CRM identifier — Contact ID takes that role once the Contact is created.

---

## Known Limitations

- **Cross-device attribution** — `hubspotutk` is session-scoped to a single browser. A friend who clicks a share link on mobile and converts on desktop gets a new `hubspotutk`; the advocate association is lost. No viable cross-device solution exists for V1; document as a known gap.
- **HubSpot-native forms required** — the Form Configurator only instruments HubSpot JS-embedded forms. Clients using Marketo, Pardot, or custom HTML forms cannot use Feature 1. They can still use the Event Configurator (Features 2–3) for downstream events; referral attribution requires the standard Extole onboarding path. Flag in sales qualification for prospects with non-HubSpot primary conversion forms.
- **HubSpot JS embed only** — the Form Configurator snippet requires the HubSpot JS embed variant (fires `onFormSubmit`). The iframe embed variant does not expose JS hooks and is not supported.

---

## Installation

1. Deploy the app to the HubSpot portal
2. Install the app (private app token — static auth, no OAuth flow)
3. Add Extole API credentials in app settings
4. Deploy Extole core.js on client site (if not already present)
5. Configure Event Configurator — create HubSpot Workflows using the Extole Custom Workflow Action; minimum: Contact Created + Deal Closed Won
6. Embed Form Configurator snippet on client site (load after HubSpot tracking script)
7. Run Backfill to enroll existing contacts

---

## Out of Scope (V1)

- Non-HubSpot forms (Typeform, Marketo, custom HTML forms)
- Multi-touch referral attribution
- Deal-specific property configuration in Event Configurator UI (admin configures Deal workflows manually)
- Write-back Configurator (V2)
- Marketplace distribution (private app, direct install only)
