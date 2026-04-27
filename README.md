# Extole HubSpot App

A HubSpot UI Extension that connects HubSpot to Extole's offer platform. It closes the loop by capturing friend attribution at form submission, firing lifecycle events to Extole when records change, and generating share links for contacts.

---

## Features

### Configure Events
Define record-triggered events that fire to Extole when HubSpot records change. The app registers a Custom Workflow Action — admins create the workflow trigger in HubSpot's workflow builder; this app provides the action step that calls Extole with the configured event name and properties.

Supports Contact, Deal, and other object types. Properties can be mapped from any HubSpot field.

### Manage Advocate Codes
Generates a JavaScript snippet to embed on the client's site. When a friend arrives via an advocate's share link, the snippet:

1. Reads `extole_shareable_code` from the URL and persists it in a 30-day cookie and localStorage.
2. On any subsequent page with a HubSpot form, injects the advocate code as a URL query param (`extole_advocate_code=<value>`) via `window.history.replaceState` before the form initializes.
3. HubSpot natively reads URL params at form init time and pre-populates hidden fields — no DOM manipulation required.

Works with both v2 (`hbspt.forms.create`) and v3 (`<div class="hs-form-frame">`) HubSpot form embeds.

**Required setup per form:** Add `extole_advocate_code` as a hidden field in the HubSpot form builder. HubSpot only saves fields that are explicitly defined on the form.

### Manage Share Links
Automatically generates Extole share links for contacts and writes them back to a configurable HubSpot contact property.

- **Auto-generate on create:** Creates a share link when a new contact is enrolled.
- **Backfill:** Generates share links for existing contacts in bulk.
- **Campaign targeting:** Optionally scope share links to a specific Extole program/campaign.

---

## Prerequisites

- **Operations Hub Professional or higher** — required for serverless app functions (used by all three features).
- **Extole account** with an API token — obtained from the Extole Tech Hub.
- **HubSpot-native forms** on the client's site — Manage Advocate Codes only works with embedded HubSpot forms, not third-party form tools.

---

## App Settings

Configured in the **Settings Log** tab (visible to HubSpot portal admins):

| Setting | Description |
|---|---|
| Extole API Token | Bearer token for Extole API calls |
| Extole Environment | `production` or `sandbox` |
| Advocate Code Property | HubSpot Contact property to store the advocate code (`extole_advocate_code` by default) |
| Referral URL Params | URL parameter name(s) to read the incoming advocate code from (`extole_shareable_code` by default) |
| Share Link Property | HubSpot Contact property to write the generated share link into |
| Auto-generate Share Links | Whether to generate a share link on Contact create |
| Campaign Targeting Label | Optional — scope share links to a specific Extole campaign |

---

## Development

```bash
# Authenticate (one-time)
hs auth

# Start local dev server (hot reload, DEVELOPING LOCALLY mode in HubSpot)
hs project dev

# Deploy to HubSpot
hs project upload
```

The `PRIVATE_APP_ACCESS_TOKEN` used for HubSpot CRM API calls is injected automatically by HubSpot into serverless functions (`settings.js`) in the deployed environment. For generated workflow custom code, both the Extole token and the HubSpot token are embedded as constants at workflow creation time — they are not injected at runtime. The token is not available during local dev — auth errors from serverless functions are expected when running `hs project dev`.

---

## Project Structure

```
src/
  app/
    cards/          # CRM card UI extensions (shown on Contact/Deal records)
    settings/       # Settings page UI extension
    functions/
      settings.js   # Serverless function backing the Settings page
      dispatch.js   # Serverless function for workflow action dispatches
      extole.js     # Extole API client (shared utility)
install.md          # Installation walkthrough
ARCHITECTURE.md     # Technical architecture overview
```
