# Form Configurator — Spec

## Problem

When a friend clicks an advocate's Extole share link, they land on the client's site with referral context active. If the friend fills out a HubSpot form on that visit — demo request, free trial, contact us, etc. — the resulting Lead/Contact record needs to carry the advocate code so that:

1. Downstream events fired to Extole (via the Event Configurator) include the referral attribution
2. Extole can associate the friend with the advocate and trigger rewards

Without instrumentation, the advocate code is invisible to HubSpot and the referral chain breaks at lead creation.

---

## Approach

Extole's `core.js` is already deployed first-party on the client's site. When a friend arrives via a share link, core.js captures the referral context and maintains it in a first-party session (via access token / cookie scoped to the client's base domain).

The Form Configurator adds a thin JS snippet to the client's site that:
1. Reads `hubspotutk` from the browser cookie (set by HubSpot's tracking script) and injects it into a hidden field on configured HubSpot forms
2. Optionally reads the Extole advocate code from the landing page URL parameter and injects it into a separate hidden field
3. The form submits with both values → Contact is created in HubSpot with hubspotutk stored for Extole lookup, and optionally with the advocate code for direct HubSpot reporting

**Cross-page persistence is handled by Extole core.js** — since it's first-party and session-scoped to the client's base domain, the referral context survives navigation. The friend does not need to convert on the landing page.

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

1. **Fallback behavior** — if the friend has no referral context (no advocate code in URL, no `hubspotutk`), both hidden fields should submit empty and not block form submission.
2. **Form ID targeting** — does HubSpot's embed API provide a reliable way to identify which form is rendering so we can scope injection to configured forms only?
3. **Property creation at install** — should the app auto-create the `extole_advocate_code` Contact property on first setup, or require the admin to create it manually?
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
