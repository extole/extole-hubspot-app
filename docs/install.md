# Extole HubSpot App — Install Guide

This guide covers installing and configuring the Extole HubSpot app for a client portal.
Intended audience: Extole implementation team.

---

## Prerequisites

Before starting, confirm the following with the client:

| Requirement | Details |
|---|---|
| **HubSpot tier** | Operations Hub **Professional** or higher — required for serverless functions. Starter cannot run this app. |
| **HubSpot role** | Portal admin access (to install apps and create workflows) |
| **Extole API token** | Bearer token for the client's Extole account |
| **Website tech** | HubSpot tracking script and HubSpot-embedded forms deployed on site (required for Form Configurator; Event Configurator works without it) |
| **Extole core.js** | Already deployed on client site (standard for all Extole customers) |

---

## Step 1 — Install the App

Send the client the private install link. The client must be a **portal admin** to complete installation.

*[TODO: confirm private install link format and where Extole hosts/shares it — e.g. a link in the Extole dashboard, a direct URL from Extole support, etc.]*

After install, the app appears in **Settings → Integrations** in the client's HubSpot portal.

---

## Step 2 — Connect Extole

Open **Settings → Integrations → Extole** in the client's HubSpot portal.

1. In the **Connection** section, paste the client's Extole API token
2. Click **Test Connection** — confirm it shows green / connected
3. Click **Save**

If the connection test fails, verify the token has API access on the client's Extole account.

---

## Step 3 — Create Contact Properties

In the **Properties** section of the settings page:

1. Confirm the property names (defaults are `extole_hubspotutk` and optionally `extole_advocate_code`)
2. Click **Create Properties**

This creates the custom Contact properties that the Form Configurator snippet writes into.
The operation is idempotent — safe to run again if already present.

**Why these properties exist:**
- `extole_hubspotutk` — stores the HubSpot visitor cookie captured at form submission; used by Extole to link the friend Contact back to the advocate who referred them
- `extole_advocate_code` — optional; stores the advocate code directly on the Contact for HubSpot-side reporting

---

## Step 4 — Configure Events (Workflows)

In the **Event Configurator** section, create one workflow per Extole event the client needs.

### Minimum recommended events

| Object | Trigger | Event Name | Purpose |
|---|---|---|---|
| Contact | Record created | `hubspot_contact_created` | Friend enters CRM — includes hubspotutk for advocate attribution |
| Deal | Record created | `hubspot_deal_created` | Opportunity opened |
| Deal | Field changed to value: `dealstage` = `closedwon` | `hubspot_deal_closed_won` | Conversion — triggers advocate reward |

### Creating a workflow

1. Click **Add Workflow**
2. Set **Event Name** — use the Extole event name (e.g. `hubspot_deal_closed_won`)
3. Set **Object** — Contact, Deal, Company, etc.
4. Set **Trigger**:
   - **Record created** — fires on any new record of that type
   - **Field changed** — fires any time the selected field changes (re-enrollment enabled)
   - **Field changed to value** — fires when a field reaches a specific value (e.g. dealstage → closedwon)
5. Add **Field Mappings** — map HubSpot properties to Extole event payload keys. Recommended:
   - For Contact events: `email`, `hs_object_id` (as `contact_id`)
   - For Deal events: `hs_object_id` (as `deal_id`), `amount`, `dealname`
6. Click **Create Workflow**

The workflow is created in HubSpot and enabled immediately. It appears in the workflow table
and can be edited, toggled, or deleted from there.

### Field names

For Deal field triggers, common HubSpot internal property names:

| Label | API name |
|---|---|
| Deal Stage | `dealstage` |
| Amount | `amount` |
| Close Date | `closedate` |
| Deal Name | `dealname` |

---

## Step 5 — Deploy Form Snippet (if using Form Configurator)

Skip this step if the client is not using HubSpot-embedded forms.

### 5a — Add hidden field to each form

For every HubSpot form you want to instrument, add `extole_advocate_code` as a hidden field
in HubSpot's form builder. This is a one-time setup per form.

> **Why this is required:** HubSpot's form submission pipeline only saves fields that are
> explicitly defined on the form (`renderedFieldsIds`). Fields injected client-side without
> a corresponding form definition are silently dropped by the server.

To add the hidden field:
1. Open the form in HubSpot's form builder
2. Add a field → choose **Contact property** → select `Extole Advocate Code` (or your configured property)
3. Mark it as hidden
4. Save the form

### 5b — Deploy the snippet

In the **Form Configurator** section of the Extole app:

1. Confirm the advocate code URL parameter (default: `extole_shareable_code`)
2. Configure form targeting (all forms, or specific form IDs)
3. Copy the generated snippet
4. Add the snippet to the client's site — it must load **before** any HubSpot form embeds

The snippet:
- Reads the advocate code from the landing URL param and persists it in `sessionStorage`
- On form ready, sets the value of the `extole_advocate_code` hidden field (v2 classic forms)
- On form ready, sets the field value via `HubSpotFormsV4` API (v3 new form builder)
- Never creates new form fields — only sets values of fields already on the form
- Never blocks form submission (silently skips if no referral context is present)

---

## Step 6 — Backfill Existing Contacts (optional)

In the **Backfill** section:

1. Review the estimated contact count
2. Click **Start Backfill**
3. Monitor progress — the UI polls and shows enrolled / skipped / errors
4. The operation is idempotent (safe to re-run)

This seeds existing Contacts into Extole so historical contacts are known to the platform.
Net-new contacts are handled automatically by the Contact Created workflow from Step 4.

---

## Step 7 — Verify End-to-End

### Verify event delivery

After creating the Contact Created workflow, create a test contact in HubSpot. Confirm
the event arrives in Extole:

```bash
extole stream --app-type hubspot_crm --sandbox    # watch for incoming events
```

Or check a specific person:

```bash
extole person get --email test@example.com
```

### Verify referral attribution

Full attribution requires a friend to arrive via a share link and submit a form. In staging:

1. Get an advocate's share link from Extole
2. Visit the client's site via that link (sets referral context in Extole + hubspotutk)
3. Submit a HubSpot form
4. Check that the new Contact has `extole_advocate_code` populated with the advocate's code
5. Check that the `hubspot_contact_created` event arrived in Extole

---

## Known Limitations

- **Cross-device attribution** — `hubspotutk` is browser-scoped. A friend who clicks on mobile and converts on desktop loses the referral association. Document as a known gap.
- **Per-form hidden field setup required** — HubSpot's server filters form submissions to fields explicitly defined on the form (`renderedFieldsIds`). Client-side injection of unknown fields is silently dropped. The snippet only sets the value of existing hidden fields; each form must have `extole_advocate_code` added in the form builder once.
- **HubSpot-native forms only** — the Form Configurator only works with HubSpot's JS-embedded forms (classic v2 and new form builder v3). Typeform, Marketo, and custom HTML forms are not supported. Clients using non-HubSpot forms can still use the Event Configurator for downstream events; referral attribution requires the standard Extole web instrumentation path.
- **Operations Hub Professional required** — Starter tier clients cannot use this app. Must be confirmed before implementation.
