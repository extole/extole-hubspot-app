# Form Configurator — Spec

## Problem

When a friend clicks an advocate's Extole share link, they land on the client's site with referral context active. If the friend fills out a HubSpot form on that visit — demo request, free trial, contact us, etc. — the resulting Lead/Contact record needs to carry the advocate code so that:

1. Downstream events fired to Extole (via the Event Configurator) include the referral attribution
2. Extole can associate the friend with the advocate and trigger rewards

Without instrumentation, the advocate code is invisible to HubSpot and the referral chain breaks at lead creation.

---

## Approach

The Form Configurator adds a thin JS snippet to the client's site that:

1. Reads the Extole advocate code from the landing page URL parameter (`extole_shareable_code` by default) and persists it in `sessionStorage` — so it survives navigation to other pages.
2. On form ready, sets the value of an existing `extole_advocate_code` hidden field on the form.
3. The form submits with the advocate code → Contact is created in HubSpot with the code for Extole attribution and HubSpot reporting.

**Prerequisites:** Each HubSpot form must have `extole_advocate_code` added as a hidden field in HubSpot's form builder. This is a one-time setup per form. HubSpot's server enforces that only fields explicitly defined on the form (`renderedFieldsIds`) are saved — client-side injection of fields not on the form is silently dropped.

**Supported form types:**
- **v2 classic forms** (`hbspt.forms.create`) — snippet wraps `forms.create` with a deferred `Object.defineProperty` trap to handle timing between the snippet and `v2.js` loading
- **v3 new form builder** (iframe embed) — snippet listens for `hs-form-event:on-ready` and calls `HubSpotFormsV4.setFieldValue`

**Cross-page persistence** — the advocate code is saved to `sessionStorage` on landing and read back on any subsequent page, so the friend does not need to convert on the landing page itself.

---

## What the Form Configurator Configures

Admins configure in the Extole HubSpot app:

| Setting | Description |
|---|---|
| **HubSpot form IDs** | Which forms to instrument (all forms, or a specific list) |
| **Target HubSpot property** | The Contact/Lead property to populate with the advocate code (e.g. `extole_advocate_code`) |

The snippet is generated automatically from these settings and provided as a copy-paste embed for the client's site.

---

## Prerequisites

- **Extole core.js** must be deployed on the client's site — this is standard for all Extole customers
- **Target HubSpot property** must be created on the Contact object before install (the app can create this automatically at setup)
- Client site must use **HubSpot-hosted or HubSpot-embedded forms** (native HubSpot forms, not third-party forms that happen to feed HubSpot)

---

## Flow

```
Friend clicks share link
  → lands on client site (page has both Extole core.js and HubSpot tracking)
  → HubSpot sets hubspotutk (persistent visitor cookie, available on all pages)
  → core.js fires landing event to Extole:
      { advocate_code, hubspotutk }
  → Extole establishes: this hubspotutk visitor was referred by this advocate

Friend navigates site (any subsequent page events include hubspotutk as anonymous identity)

Friend reaches a page with a HubSpot form and submits it

HubSpot creates Contact (hubspotutk is associated with the Contact record)
  → Event Configurator fires "Contact Created" event to Extole:
      { email, lead_id, hubspotutk }
  → Extole looks up: hubspotutk → advocate code (established at landing)
  → Referral association complete
  → lead_id becomes canonical identity through to Closed Won

Optional enrichment: if advocate code is also injected into a hidden form field
  → Contact record in HubSpot carries advocate code
  → Sales reps / HubSpot reporting can answer "who referred this person" without cross-referencing Extole
```

---

## Open Questions

1. **Fallback behavior** — if the friend has no referral context (no advocate code in URL), the hidden field submits empty and does not block form submission. ✓ Confirmed.
2. **Form ID targeting** — both v2 (`options.formId`) and v3 (`event.detail.formId`) expose the form ID, so scoping injection to specific forms is supported. ✓ Resolved.
3. **Property creation at install** — the app auto-creates the `extole_advocate_code` Contact property in the Form Instrumentation setup section. ✓ Resolved.
4. **Register call fields** — confirm with Extole eng which fields are required vs optional in the register call, and whether Contact ID is supported as a supplementary identity key.

---

## Identity sent to Extole

When the Event Configurator fires the "Contact Created" event to Extole, the payload will include:

- **Email** — sent in a register call to establish friend identity in Extole (email is Extole's primary identity key)
- **Lead / Contact ID** — possibly included as a secondary identifier to enable downstream correlation without relying on email
- **Advocate code** — captured from the hidden form field, associates the friend with the referring advocate

> Open question: confirm with Extole eng which fields are required vs optional in the register call, and whether lead ID is supported as a supplementary identity key.

---

## Out of Scope (V1)

- Non-HubSpot forms (Typeform, Marketo, custom HTML forms)
- Multi-touch attribution (first touch vs last touch advocate)
