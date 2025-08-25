---
title: "Building a Windows 11 Dashboard with KQL and Azure Workbooks"
date: 2024-12-19
draft: false
tags: ["Windows 11","KQL","Azure","Workbooks","Intune","Dashboard","Upgrade"]
description: "How I built a Windows 11 vs Windows 10 tracking dashboard using KQL queries and Azure Workbooks, turning raw telemetry into a single source of truth."
category: "Intune"
---

Before planning rollout waves, you need a truthful picture of where your devices are. Azure Log Analytics plus KQL queries can give you that source of truth. In this guide I’ll walk through how I tracked Windows 11 versus Windows 10, built a clean workbook, and extended the data with context like version, geography, and ISP.

---

## Step 1. Deduplicate and get your active devices

The same device can generate multiple records after rebuilds or re-enrollment. Always use `arg_max` on a time field like `LastSeen` or `LastContact` to select the most recent record.

```kql
IntuneDevices
| where todatetime(LastContact) > ago(30d)
| summarize arg_max(LastContact, *) by DeviceId
```

---

## Step 2. Classify Windows 10 vs Windows 11

Windows 11 builds are 22000 and higher. Windows 10 builds are 19000–21999.

```kql
IntuneDevices
| extend BuildNum = tolong(extract(@"10\.0\.(\d+)", 1, OSVersion))
| extend OSFamily = case(BuildNum >= 22000, "Windows 11",
                         BuildNum >= 19000, "Windows 10",
                         "Unknown")
| summarize Devices = dcount(DeviceId) by OSFamily
```

This is the basis for your headline donut chart.

---

## Step 3. Track progress over time

Add a time bin to see upgrades happening week by week.

```kql
IntuneDevices
| extend BuildNum = tolong(extract(@"10\.0\.(\d+)", 1, OSVersion))
| extend OSFamily = case(BuildNum >= 22000, "Windows 11",
                         BuildNum >= 19000, "Windows 10",
                         "Unknown")
| summarize Devices = dcount(DeviceId) by bin(LastContact, 7d), OSFamily
```

---

## Step 4. Enrich with location and ISP

Tie in Delivery Optimization status or location fields to see where upgrades are occurring. This helps ensure WAN links are not being swamped.

---

## Step 5. A full enriched query example

Here’s a larger query I used to join multiple signals together and present a clean table of Windows 10 devices. It pulls inventory from Intune, update status from Windows Update for Business, and Delivery Optimization data. It also normalises OS versions, extracts email domains, and enriches with country, city, and ISP.

```kql
IntuneDevices
| where isnotempty(DeviceName)
| where isnotempty(UserEmail)
| extend EmailDomain = tostring(split(UserEmail, '@')[1])
| join kind=leftouter (
    UCClientUpdateStatus
    | where TimeGenerated >= ago(90d)
    | where UpdateCategory == "WindowsFeatureUpdate"
    | where isnotempty(DeviceName)
    | extend OSBuild = TargetBuild
    | summarize arg_max(TimeGenerated, *) by DeviceName
    | extend DaysSinceUpgradeOffered = iif(isnotempty(OfferReceivedTime), datetime_diff("day", now(), OfferReceivedTime), int(null))
    , OfferReceivedTime
) on DeviceName
| join kind=leftouter (
    UCDOStatus
    | where TimeGenerated >= ago(90d)
    | where isnotempty(DeviceName)
    | where isnotempty(Country) or isnotempty(City)
    | summarize arg_max(TimeGenerated, *) by DeviceName
) on DeviceName
| where OSVersion startswith "10.0.19" or (isnull(OSBuild) and OSVersion startswith "10.0.19")
| extend WindowsVersion = case(
    OSVersion startswith "10.0.19045", "Windows 10, version 22H2",
    OSVersion startswith "10.0.19044", "Windows 10, version 21H2",
    OSVersion startswith "10.0.19043", "Windows 10, version 21H1",
    OSVersion startswith "10.0.19042", "Windows 10, version 20H2",
    OSVersion startswith "10.0.19041", "Windows 10, version 2004",
    OSVersion startswith "10.0.19",     "Windows 10 (Other)",
    "Windows 10 (Unknown)"
)
| extend Organization = EmailDomain
| extend 
    LocationCountry = iff(isnotempty(Country), tostring(Country), "Unknown"),
    LocationCity    = iff(isnotempty(City), tostring(City), "Unknown")
| summarize 
    LastSeenDate      = max(LastContact),
    OSVersionInfo     = any(WindowsVersion),
    DaysSinceUpgradeOffered = any(DaysSinceUpgradeOffered),
    OfferReceivedTime = any(OfferReceivedTime),
    Model             = any(Model),
    Manufacturer      = any(Manufacturer),
    SerialNumber      = any(SerialNumber),
    UserEmailAddress  = any(UserEmail),
    UserDisplayName   = any(UserName),
    Organization      = any(Organization),
    EmailDomain       = any(EmailDomain),
    Country           = any(LocationCountry),
    City              = any(LocationCity), 
    ISP               = any(ISP),
    CompliantState    = any(CompliantState),
    JoinType          = any(JoinType)
    by DeviceName
| order by DeviceName asc
| project 
    DeviceName,
    UserEmailAddress,
    OSVersionInfo,
    DaysSinceUpgradeOffered,
    City,
    Country,
    UserDisplayName,
    LastSeenDate,
    Model,
    SerialNumber,
    ISP
| render table
```

This query became my go-to table in the workbook. It gave me a detailed view of every Windows 10 device still in scope, including when an upgrade offer was first received, how long it had been outstanding, and where the device was located.

---

## Step 6. Building the workbook

With these queries in place, the Azure Workbook was simple to build:

- Headline numbers for Windows 10 vs Windows 11  
- Donut chart of OS families  
- Trend line of upgrades over time  
- Table of detailed devices using the enriched query  
- Filters by country, city, or business unit  

---

## Why this matters

The workbook became the single source of truth. Executives could see the global Windows 11 percentage at a glance. Engineers could drill into device-level details, identify stalled upgrades, and act. By grounding everything in KQL, the data was live, reliable, and explainable.
