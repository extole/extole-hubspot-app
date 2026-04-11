# Extole HubSpot App — Spec

## What it does

Connects HubSpot to Extole's referral platform. The app has four features that together close the full referral loop: instrumenting the friend's journey into the CRM, triggering Extole events on record changes, writing Extole data back into HubSpot, and seeding existing contacts at install time.

---

## Prerequisites

- **Data Hub Professional or higher** — required for serverless functions (app functions) and webhook workflow triggers. Starter tier cannot run this app.
- **Extole core.js** deployed on the client's website — standard for all Extole customers
- **HubSpot-embedded forms** on the client's site — native HubSpot forms only (not Typeform, Marketo, etc.)

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
  → HubSpot sets hubspotutk (visitor cookie, consistent across all pages)
  → core.js fires landing event to Extole: { advocate_code, hubspotutk }
  → Extole establishes: this hubspotutk visitor was referred by this advocate

Friend navigates site (may visit multiple pages before converting)

Friend reaches a HubSpot form and submits it
  → Form Configurator snippet injects hubspotutk into hidden Contact property field
  → (Optional) snippet also injects advocate code into separate hidden field

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
| **Advocate code property** | Optional — Contact property to store advocate code for HubSpot reporting |

The snippet is generated from these settings and provided as a copy-paste embed for the client's site.

### Open Questions

1. **Extole JS API** — exact call to retrieve current advocate/referral code from core.js at form submission time (for optional advocate code injection). Needs Extole eng confirmation.
2. **Register call fields** — which fields does Extole require/support in the identity register call: email required, contact_id as supplementary key?
3. **hubspotutk property auto-creation** — should the app create the custom Contact property at install, or require admin setup?

---

## Feature 2 — Event Configurator

### What it does

Lets admins define record-triggered events that fire to Extole when HubSpot records change. No code required — the app registers the necessary HubSpot Workflow webhook triggers automatically.

### Core use cases

| Trigger | Extole event |
|---|---|
| Contact created | Friend entered CRM — include hubspotutk + email for identity |
| Contact lifecycle stage changed | Progression event — e.g. Lead → MQL |
| Deal reached Closed Won | Conversion — trigger advocate reward |

### Architecture

Each event config creates a HubSpot Workflow with:
1. An enrollment trigger (record change condition)
2. A webhook action that POSTs to Extole with configured properties

Workflows are created/deleted via the HubSpot Workflows API, called from the app's serverless function.

### Webhook slot constraint

Data Hub Professional includes 10 webhook workflow triggers per account. Enterprise includes 100. Clients may already have some slots in use for other integrations.

The app must display available webhook slots in the Event Configurator UI before creating a new config. Minimum viable install requires 2 slots (Contact Created + Deal Closed Won).

### Event config states

| State | Description |
|---|---|
| `DRAFT` | Configured but not yet deployed |
| `ACTIVE` | Workflow deployed and running |
| `INACTIVE` | Workflow deactivated, not deleted |
| `DEPLOY_FAILED` | Workflow creation/update failed |

---

## Feature 3 — Write-back Configurator

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

Extole outbound webhook → HubSpot Contacts API (serverless function). Admin configures which Extole events trigger which HubSpot property updates and on which object (Contact, Deal).

---

## Feature 4 — Backfill / Bulk Enroll

### What it does

Seeds existing HubSpot Contacts into Extole at install time. The Event Configurator covers net-new contacts going forward, but a fresh install leaves the existing contact base dark to Extole.

### Architecture

Admin-triggered bulk operation from the app UI — a single "Enroll existing contacts" button on the onboarding/settings screen. The serverless function pages through HubSpot Contacts and sends each to Extole using the same event/identity API as the Event Configurator.

### UI requirements

- Show count of contacts to be enrolled before triggering
- Progress indicator during run
- Summary on completion (enrolled, skipped, errors)
- Idempotent — safe to re-run

---

## Identity model

| Stage | Identifier |
|---|---|
| Anonymous (pre-form) | `hubspotutk` |
| Known contact (post-form) | HubSpot Contact ID |
| Post-conversion | HubSpot Deal ID |

Friend email is sent in Extole's register call (Extole's primary identity key) but is not the canonical CRM identifier — Contact ID takes that role once the Contact is created.

---

## Installation

1. Deploy the app to the HubSpot portal
2. Install the app (OAuth authorization flow)
3. Deploy Extole core.js on client site (if not already present)
4. Configure Event Configurator — minimum: Contact Created + Deal Closed Won
5. Embed Form Configurator snippet on client site
6. Run Backfill to enroll existing contacts
7. Configure Write-back as needed

---

## Out of Scope (V1)

- Non-HubSpot forms (Typeform, Marketo, custom HTML forms)
- Multi-touch referral attribution
- Deals/Companies objects in Event Configurator (Contacts only for V1)
- Marketplace distribution (private app, direct install only)
