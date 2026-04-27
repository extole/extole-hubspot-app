# Extole HubSpot App — Installation Guide

## Overview

Installation takes about 20–30 minutes. After completing these steps the app is fully operational:
- HubSpot record changes fire events to Extole in real time
- Referral attribution is captured at form submission and stored on the Contact record
- Share links are generated for new contacts and written back to HubSpot

**Intended audience:** Extole implementation team.

---

## Prerequisites

Before starting, confirm the following with the client:

| Requirement | Details |
|---|---|
| **HubSpot tier** | Operations Hub **Professional** or higher — required for serverless functions. Starter tier cannot run this app. |
| **HubSpot role** | Portal admin access — required to install apps and create workflows |
| **Extole API token** | Long-lived bearer token for the client's Extole account |
| **HubSpot-embedded forms** | Required for Manage Advocate Codes; Configure Events and Share Links work without it |

---

## Step 0 — Local CLI Setup (developers only)

*Skip this step if you are not deploying or developing the app locally.*

The HubSpot CLI requires a `hubspot.config.yml` in the project root with your personal access key and portal ID. This file is gitignored — copy the example and fill in your values:

```bash
cp hubspot.config.example.yml hubspot.config.yml
```

Then edit `hubspot.config.yml`:
- `name` / `defaultPortal` — your chosen account alias (e.g. `my-portal`)
- `personalAccessKey` — generate one in HubSpot under **Settings → Integrations → Private Apps**
- `portalId` — your HubSpot portal ID (visible in the URL when logged in)

---

## Step 1 — Install the App

Send the client the private install link. The client (or you, if you have admin access to their portal) must be a **portal admin** to complete installation.

After install, the app appears in the HubSpot portal under **Settings → Integrations**.

---

## Step 2 — Connect Extole

1. Open the Extole app from the HubSpot App Marketplace sidebar or navigate to it via the main nav
2. In the **Settings** tab, find the **API Token** field
3. Paste the client's Extole API token
4. Set the **Environment** to `production` (or `sandbox` for testing)
5. Click **Test Connection** — confirm it shows green
6. Click **Save**

If the connection test fails, verify the token has API access on the client's Extole account.

---

## Step 3 — Create Contact Properties

The Manage Advocate Codes snippet and Share Links feature write data to custom Contact properties. These must exist before using either feature.

In the **Configure Events** tab, find the **Properties** section:

1. Confirm the property names (defaults: `extole_advocate_code`, `extole_share_link`)
2. Click **Create Properties**

This creates the properties if they don't exist. The operation is idempotent — safe to run again.

| Property | Purpose |
|---|---|
| `extole_advocate_code` | Advocate code captured at form submission; used for attribution |
| `extole_share_link` | Share link URL written back from Extole; displayed in HubSpot for the contact |

> If the client's Extole program uses `hubspotutk` for attribution (legacy), also create `extole_hubspotutk`. Most new implementations use the advocate code approach; skip this unless the program requires it.

---

## Step 4 — Configure Event Workflows

In the **Configure Events** tab, create one workflow per Extole event the client needs.

### Minimum recommended events

| Object | Trigger | Event Name | Purpose |
|---|---|---|---|
| Contact | Record created | `hubspot_contact_created` | Friend enters CRM — triggers advocate attribution lookup in Extole |
| Deal | Record created | `hubspot_deal_created` | Opportunity opened |
| Deal | Field changed to value: `dealstage` = `closedwon` | `hubspot_deal_closed_won` | Conversion — triggers advocate reward |

### Creating a workflow

1. Click **Add Workflow**
2. Set **Event Name** — the Extole event name (e.g. `hubspot_deal_closed_won`)
3. Set **Object** — Contact, Deal, Company, etc.
4. Set **Trigger**:
   - **Record created** — fires on any new record of that type
   - **Field changed** — fires any time the selected field changes
   - **Field changed to value** — fires when a field reaches a specific value (e.g. `dealstage` → `closedwon`)
5. Add **Field Mappings** — map HubSpot properties to Extole event payload keys. Default mappings are pre-filled per object type:
   - Contact: `email`, `contact_id`, `first_name`, `last_name`, `hubspotutk`
   - Deal: `deal_id`, `deal_name`, `amount`, `close_date`
6. Click **Create Workflow**

The workflow is created and enabled immediately.

### Common HubSpot field API names

| Label | API name |
|---|---|
| Deal Stage | `dealstage` |
| Amount | `amount` |
| Close Date | `closedate` |
| Deal Name | `dealname` |
| Lifecycle Stage | `lifecyclestage` |

---

## Step 5 — Deploy Form Snippet

*Skip this step if the client does not use HubSpot-embedded forms.*

The Manage Advocate Codes snippet captures the advocate code from the share URL and injects it into HubSpot form submissions so that friend Contacts are attributed to the correct advocate.

> **Prerequisites:** Step 3 (Create Properties) must be completed before Step 5a. The `extole_advocate_code` Contact property must exist before HubSpot will offer it as a field option in the form builder. If the hidden field is not added to the form, the snippet will still run without errors — but the advocate code will be silently dropped at form submission and never land on the Contact record.

### 5a — Add hidden field to each HubSpot form

For every form you want to instrument, add `extole_advocate_code` as a hidden field in HubSpot's form builder.

> **Why this is required:** HubSpot's server only saves fields explicitly defined on the form. Values injected client-side for fields not on the form are silently dropped.

1. Open the form in HubSpot's form builder
2. Add a field → choose **Contact property** → select `Extole Advocate Code`
3. Set it to hidden
4. Save the form

Repeat for each form you want to instrument.

### 5b — Get and deploy the snippet

In the **Manage Advocate Codes** tab:

1. Set the **Advocate Code Property** (default: `extole_advocate_code`) — must match the property name in Step 3
2. Set the **Referral URL Params** (default: `extole_shareable_code`) — the URL parameter name Extole puts on share links
3. Optionally set form targeting (all forms, or specific form IDs)
4. Copy the generated snippet
5. Add the snippet to the client's site — it must load **before** any HubSpot form script

**Where to place it:** Add it once, site-wide — typically via a tag manager (GTM, etc.) or the site's global `<head>` template, before the `//js.hsforms.net/...` script tag. It does not need to be added per page.

**How it works:**
1. When a friend lands via a share link (URL has `?extole_shareable_code=<code>`), the snippet stores the code in a 30-day cookie and localStorage
2. On that page, and on every subsequent page the friend navigates to, the snippet injects `extole_advocate_code=<code>` as a URL param via `window.history.replaceState` before any HubSpot form loads
3. HubSpot reads URL params at form init time and pre-populates the hidden `extole_advocate_code` field natively
4. The friend can convert on any page — the code persists across the entire visit

---

## Step 6 — Configure Share Links

In the **Share Links** tab:

1. Set the **Share Link Property** (default: `extole_share_link`) — the Contact property that will receive the generated share link URL
2. Enable **Auto-generate Share Links** to create a share link for every new Contact automatically
3. Optionally select a **Campaign Targeting Label** to scope share links to a specific Extole program
4. Click **Save**

### Backfill existing contacts

To generate share links for contacts that existed before the app was installed:

1. Click **Run Backfill**
2. Monitor progress — the UI polls and shows processed / errors counts
3. The operation is idempotent (safe to re-run; contacts that already have a share link are skipped)

---

## Step 7 — Enable the CRM Card

The Extole app includes a sidebar card on the Contact record that shows the captured advocate code and HubSpot visitor ID.

In HubSpot:

1. Open any Contact record
2. In the right sidebar, click **Customize** (or the settings icon)
3. Find **Extole Activity** in the available cards list and add it
4. Save the layout

The card will show "No referral data captured" for contacts without attribution data, and will display the advocate code once form instrumentation captures it.

---

## Step 8 — Verify End-to-End

### Verify event delivery

After creating the Contact Created workflow, create a test contact in HubSpot. Confirm the event arrives in Extole:

```bash
extole stream --app-type hubspot_crm --sandbox
```

Or check a specific person:

```bash
extole person get --email test@example.com
```

### Verify attribution

Full attribution requires a friend to arrive via a share link and submit a form. In a staging or test environment:

1. Get an advocate's share link from Extole (or construct `https://<site>?extole_shareable_code=<code>`)
2. Visit the client's site via that link — confirm the URL param is present
3. Navigate to another page — confirm the snippet injects `extole_advocate_code` into the URL via `replaceState`
4. Submit a HubSpot form
5. Check that the new Contact has `extole_advocate_code` populated with the code
6. Confirm the `hubspot_contact_created` event arrived in Extole

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Test Connection fails | Token wrong or expired — re-paste in Settings |
| Workflow fires but no event in Extole | The Extole token is embedded in the workflow at creation time. If the token was updated in Settings after the workflow was created, use **Update Workflow** (or delete and recreate) to push the new token into the workflow's custom code |
| `extole_advocate_code` empty on Contact | Hidden field not added to form in form builder (Step 5a) — snippet runs silently but code is dropped at submission; or snippet not loading before form script; or `extole_advocate_code` property not yet created (Step 3) |
| Form snippet has no effect | Snippet must load before `//js.hsforms.net/...` — check script order in `<head>` |
| Share link backfill shows errors | Extole API token lacks shareables scope; or contacts have no email address |
| CRM card not showing | Layout customization not saved per Step 7 |

For deeper debugging, check the **Settings Log** tab for recent configuration actions and errors.

---

## Known Limitations

- **Cross-device attribution** — the advocate code cookie is browser-scoped. A friend who clicks on mobile and converts on a different device loses the attribution. Document this gap with the client.
- **HubSpot-native forms only** — Manage Advocate Codes works with HubSpot's JS-embedded forms (v2 classic and v3 new form builder). Typeform, Marketo, and custom HTML forms are not supported.
- **Operations Hub Professional required** — Starter tier clients cannot use this app. Must be confirmed before implementation.
- **Share link label** — A default campaign label (`exhsappd`) is applied to all share links until the Extole shareables API makes the label optional. If the client's program does not have this label, share link creation will fail. Contact Extole support to ensure the label exists on the client's program.
