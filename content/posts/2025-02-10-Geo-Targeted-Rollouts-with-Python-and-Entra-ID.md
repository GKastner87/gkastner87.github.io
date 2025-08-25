---
title: "Geo-Targeted Rollouts with Python and Entra ID"
date: 2025-02-10
draft: false
tags: ["Windows 11","Azure","Intune","Python","Entra ID","KQL","Rollout Planning"]
description: "How I used Entra ID metadata, Python geospatial logic, and Azure Monitor data to design location-aware rollout waves that respected networks and support capacity."
category: "Intune"
---

A global Windows 11 rollout isn’t just about technical readiness. It’s also about **when and where** devices upgrade. Push too many machines at once in the wrong place and you swamp fragile WAN links. Move too fast in regions without support staff and you risk a flood of tickets that no one can respond to.

The solution was to make the rollout **location-aware**. By blending Entra ID metadata, Azure Monitor telemetry, and Python geospatial logic, we built a system that generated waves based not just on numbers, but on geography and support coverage.

---

## The Problem We Faced

- **Scattered devices** across head offices, branch offices, and remote sites in multiple countries.  
- **Unreliable WAN links** that couldn’t handle hundreds of upgrades in a single burst.  
- **Mixed support coverage**, with some hubs staffed locally and others fully remote.  
- **Messy data** in Entra ID — “Melb,” “MEL,” “Melbourne HQ” all meant the same site.  

We needed more than lists of devices. We needed a way to slice the fleet that respected physical geography *and* business constraints.

---

## Step 1. Clean the Location Data

Entra ID gave us attributes like `physicalDeliveryOfficeName`, `city`, and `country`. Azure Monitor logs filled in ISP and connection hints. We cleaned and normalized this data into a standard dictionary of sites:

| SiteCode | City       | Country | Lat      | Long     |
|----------|------------|---------|----------|----------|
| MEL001   | Melbourne  | AU      | -37.8136 | 144.9631 |
| SG001    | Singapore  | SG      | 1.3521   | 103.8198 |
| TKY001   | Tokyo      | JP      | 35.6762  | 139.6503 |

This gave us a foundation of accurate metadata to build on.

---

## 💡 The Aha Moment

The breakthrough came when we realized we could **turn those locations into coordinates** and reason about them with Python.

Once devices were mapped to latitude/longitude, everything changed:

- We could group them by proximity to hubs.  
- We could measure distance between devices and support locations.  
- We could define **rollout waves by support radius** — starting with sites where IT staff were physically present, then expanding outward.  

💡 That shift — from messy text fields to a **geo-aware rollout design** — was the moment the project turned from “lists of devices” into a strategy that made sense for both networks *and* people.

---

## Step 2. Triangulating Location with ISP Data

Directory attributes alone can be misleading. To improve accuracy, I cross-checked Entra ID metadata with **ISP and connection data** from Azure Monitor. This helped flag devices where the recorded office didn’t match where they were actually connecting from.

```kql
// ---- PARAMETERS ----
let lookback = 30d;            // how far back to trust connectivity signals
let stale_cutoff = ago(14d);   // device must have talked recently

// ---- 1) Fresh Intune/Entra device metadata ----
let directory =
IntuneDevices
| where isnotempty(DeviceName)
| where todatetime(LastContact) >= stale_cutoff
| project
    DeviceId,
    DeviceName,
    EntraCity    = tostring(City),
    EntraCountry = tostring(Country),
    EntraOffice  = tostring(physicalDeliveryOfficeName),
    UserUPN      = tostring(UserEmail),
    LastContact  = todatetime(LastContact);

// ---- 2) Latest connectivity/DO signal per device ----
let net_obs =
UCDOStatus
| where TimeGenerated >= ago(lookback)
| where isnotempty(DeviceName)
| project
    DeviceName,
    TimeGenerated,
    ISP        = tostring(ISP),
    NetCity    = tostring(City),
    NetCountry = tostring(Country),
    PublicIP   = tostring(PublicIP)
| summarize arg_max(TimeGenerated, *) by DeviceName
| project-away TimeGenerated;

// ---- 3) Join & compare ----
directory
| join kind=leftouter net_obs on DeviceName
| extend
    CityMatch    = iif(isempty(EntraCity) or isempty(NetCity), "Unknown",
                    iif(tolower(EntraCity) == tolower(NetCity), "Match", "Mismatch")),
    CountryMatch = iif(isempty(EntraCountry) or isempty(NetCountry), "Unknown",
                    iif(tolower(EntraCountry) == tolower(NetCountry), "Match", "Mismatch"))
| extend ConfidenceScore =
      iif(CountryMatch == "Match", 2, 0)
    + iif(CityMatch    == "Match", 1, 0)
    + iif(isnotempty(ISP), 1, 0)
| extend NeedsReview = iif(CountryMatch == "Mismatch" or CityMatch == "Mismatch", 1, 0)
| project
    DeviceName,
    UserUPN,
    EntraCountry, EntraCity, EntraOffice,
    NetCountry, NetCity, ISP, PublicIP,
    CountryMatch, CityMatch, ConfidenceScore, NeedsReview, LastContact
| order by NeedsReview desc, ConfidenceScore asc, LastContact desc
```

This query became the **sanity check** for our rollout planning. It flagged devices where Entra thought they were in Sydney, but network telemetry clearly showed them connecting from Singapore.

---

## Step 3. Python Scoring Logic

Using a simple Haversine formula, we calculated distances and grouped devices by nearest hub.

```python
from math import radians, cos, sin, asin, sqrt
import pandas as pd

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    return 2 * R * asin(sqrt(a))

df = pd.read_csv("devices_with_coords.csv")

hubs = {
    "Melbourne": (-37.8136, 144.9631),
    "Singapore": (1.3521, 103.8198),
    "Tokyo": (35.6762, 139.6503)
}

def nearest_hub(lat, lon):
    return min(hubs, key=lambda h: haversine(lat, lon, *hubs[h]))

df["NearestHub"] = df.apply(lambda x: nearest_hub(x.Lat, x.Long), axis=1)
```

---

## Step 4. Wave Generation

Rules for rollout batches:

- Limit to ~250 devices per wave.  
- No site contributes more than 40% of a wave.  
- Prioritize hubs with local IT staff first, then radiate outwards.  

```python
waves = []
current_wave = []
wave_size = 250

for idx, row in df.iterrows():
    current_wave.append(row)
    if len(current_wave) == wave_size:
        waves.append(current_wave)
        current_wave = []

if current_wave:
    waves.append(current_wave)
```

Each wave was exported as CSV and fed into the weekly CAB submission process.

---

## Visualization

To make this transparent for stakeholders, we pushed the results into an **Azure Workbook map view**:

- Devices plotted by latitude/longitude  
- Colored by wave assignment  
- Filters for region or business unit  

Executives could now see at a glance when each site was planned, how devices were distributed, and that no region was overloaded.

---

## Why This Mattered

- **Reduced WAN risk**: Waves respected physical network constraints.  
- **Support-first rollout**: Issues surfaced in places with onsite IT staff before spreading to remote regions.  
- **Confidence for leadership**: Map visualizations made the plan easy to understand and defend.  
- **Reusable pattern**: The Python + Entra approach can drive compliance rollouts, VPN migrations, or license entitlement projects.  

---

## Why This Was Cool

Most people treat upgrade planning as a spreadsheet exercise. By applying geospatial logic with Python and Entra ID metadata, we proved that **cloud engineering + data science thinking** can solve real operational challenges.

💡 Turning addresses into coordinates, then turning coordinates into rollout design, was the moment this project leveled up from operations to architecture.
