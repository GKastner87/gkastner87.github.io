---
title: "Automated User Notifications and Upgrade Orchestration with Azure Logic Apps and Graph API"
date: 2025-01-15
draft: false
tags: ["Windows 11","Azure","Logic Apps","Graph API","Intune","Automation","Storage","Serverless"]
summary: "How I used Azure Logic Apps, Microsoft Graph, and Storage to automate Windows 11 user notifications, deliver self-service upgrade guides, and orchestrate the rollout across a global workforce."
---

Upgrading at scale is half technology, half communication. I needed a way to target the right user, act on the right device, and send a clear message with a real deadline. Azure gave me the building blocks: Logic Apps as the orchestrator, Microsoft Graph for identity and device truth, and Azure Storage to host lightweight help pages and QR codes. It was fast to build, cheap to run, and simple for support to trigger.

---

## Azure Architecture Highlights

- **Logic Apps** orchestrates the workflow end-to-end: trigger, Graph lookups, conditional routing, notifications, logging.  
- **Managed Identity** authenticates to Microsoft Graph with app roles (DeviceManagementManagedDevices.Read.All, Directory.Read.All, Group.ReadWrite.All, Mail.Send).  
- **Azure Storage Static Website** hosts the upgrade guide + QR, globally available and versioned.  
- **Azure Monitor / Log Analytics** captures each run (who, what device, when, mail outcome) for traceability.  

---

## Step by Step

### 1. Trigger (group membership)

The workflow starts when something is added to the “Eligible for Windows 11” Entra ID group. In Logic Apps, use the Azure AD connector trigger *When a group member is added or removed* (or, if you prefer polling, a Recurrence + Graph delta on `/groups/{id}/members/delta`).

### 2. Guardrail: only proceed for users

The group can receive both users and devices. The flow checks the added object’s type first so it does not send an email when a **device** is added.

**Graph call to resolve type:**

```http
GET https://graph.microsoft.com/v1.0/directoryObjects/{id}?$select=id,displayName,@odata.type
```

Condition:  
- If `@odata.type` = `#microsoft.graph.user`, continue.  
- If `@odata.type` = `#microsoft.graph.device`, terminate or branch to no-op.  

This keeps notifications user-only and avoids false emails when devices are staged.

### 3. Find the user’s most recent managed device (Graph)

```http
GET https://graph.microsoft.com/v1.0/deviceManagement/managedDevices?
   $filter=userPrincipalName eq '{UserUPN}'&$orderby=lastSyncDateTime desc&$top=1
```

Devices that have not synced in the last 14 days are filtered out. This returns the Azure AD device GUID.

### 4. Map Azure AD device GUID to directory object id

```http
GET https://graph.microsoft.com/v1.0/devices?$filter=deviceId eq '{azureADDeviceId}'&$select=id,displayName,deviceId
```

This returns the directory object id needed for group membership changes.

### 5. Enroll the device into the rollout group

Check membership first to avoid duplicates:

```http
POST https://graph.microsoft.com/v1.0/groups/{RolloutGroupId}/members/$ref
Content-Type: application/json

{
  "@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/{deviceDirectoryObjectId}"
}
```

### 6. Email the user (Graph sendMail)

Build a short, personalised message. State that Windows 11 is ready, that they have 21 days (from the WUfB ring policy), and link to the Storage-hosted guide and support.

```http
POST https://graph.microsoft.com/v1.0/users/no-reply@domain.com/sendMail
Content-Type: application/json

{
  "message": {
    "subject": "Windows 11 is ready for your device",
    "body": {
      "contentType": "HTML",
      "content": "<p>Hello {DisplayName},</p>
                  <p>Your device <b>{DeviceName}</b> is ready for the Windows 11 upgrade.</p>
                  <p>You have 21 days to self-upgrade before it will be scheduled automatically outside working hours.</p>
                  <p><a href='{HelpPageUrl}'>Upgrade Instructions</a></p>
                  <p><a href='{SupportUrl}'>Get Support</a></p>"
    },
    "toRecipients": [{ "emailAddress": { "address": "{UserUPN}" } }]
  },
  "saveToSentItems": false
}
```

### 7. Serve the help page from Azure Storage

- Static HTML in Azure Storage (Static Website feature).  
- Mobile-friendly with steps, FAQ, QR image, and support link.  
- Versioned content updates instantly without editing the workflow.

### 8. Log the outcome in Log Analytics

Write structured logs: user UPN, device, IDs, group, and mail status. Build a workbook to query outcomes and failures.

---

## Why Serverless Worked

- Scales globally without ops overhead.  
- Secretless auth with Managed Identity.  
- Easy observability via Azure Monitor and Log Analytics.  
- Composable: adding Teams notifications or escalations is just another Logic Apps action.  

---

## Why This Was Cool

The guardrail that checks **member type** sounds small, but it’s what made the workflow clean. Support adds a user, and the system behaves correctly: emails go to people, devices are enrolled quietly, and no manual steps are needed. Under the hood, it’s all Azure — Logic Apps for control, Graph for truth, Storage for content, Monitor for visibility.

---

## Reuse Cases

- Compliance reminders for devices falling out of baseline  
- Pilot invites for new apps, with instructions hosted in Storage  
- License entitlement changes requiring user acknowledgement  
- Any scenario where the trigger is a user, the action is on their device, and the outcome is a clear message  
