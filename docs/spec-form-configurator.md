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
1. On any page with a configured HubSpot form: calls Extole's JS API to retrieve the current referral context
2. Injects the advocate code into a hidden field on the form
3. The form submits with the advocate code included → Lead/Contact is created in HubSpot with the referral attribution on record

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

1. **Extole JS API** — what is the exact call to retrieve the current advocate/referral code from core.js? (`getReferralContext()`? A property on `extole.advocate`? Needs confirmation from Extole eng.)
2. **Fallback behavior** — if core.js hasn't fired yet or the friend has no referral context, the hidden field should submit empty (not block form submission)
3. **hubspotutk as fallback** — `hubspotutk` (HubSpot's visitor cookie) is available on every page of the visit. If Extole can store the `hubspotutk` → advocate code mapping at landing time, it provides a reliable cross-page fallback for retrieving the advocate code even if core.js isn't active on the form page. Confirm with Extole eng whether this mapping can be stored in Extole's session context.
4. **Form ID targeting** — does HubSpot's embed API provide a reliable way to identify which form is rendering so we can scope injection to configured forms only?
4. **Property creation at install** — should the app auto-create the `extole_advocate_code` Contact property on first setup, or require the admin to create it manually?

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
