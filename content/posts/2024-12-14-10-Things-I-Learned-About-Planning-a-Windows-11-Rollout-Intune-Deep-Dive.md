---
title: "10 Things I Learned About Planning a Windows 11 Rollout"
date: 2024-12-14
draft: false
tags: ["Windows 11", "Intune", "SCCM", "AutoPatch", "Azure", "Migration", "Digital Transformation"]
summary: "Rolling out Windows 11 at enterprise scale isn’t just about pushing an upgrade. It’s about flattening complexity, scrutinising policies, and setting clear milestones. Here are 10 lessons I learned along the way."
---

With Windows 10 end-of-life approaching, enterprises everywhere are racing to get onto Windows 11. What I walked into was an environment weighed down by half-finished initiatives, legacy overlap, and technical debt. AutoPatch had been started but not finished, SCCM and Intune were both trying to steer updates, and reporting had drifted into irrelevance.  

This is more the norm than the exception. Migrations rarely start on a clean slate. The lesson? Before you ship an upgrade, you have to flatten complexity, prove reality, and plan with clear checkpoints.  

Here are 10 things I learned that helped me do exactly that.  

---

## 1. Don’t ship change blind  
You can’t upgrade thousands of devices if you don’t know where they stand. First job: establish visibility.  

---

## 2. Flatten the update path  
Hybrid SCCM + Intune + old GPOs + half-enabled AutoPatch = chaos. Pick one authority for updates and enforce it.  

---

## 3. Scrutinise policies, follow the asset  
Status dashboards can lie. Follow a device end-to-end: does behaviour match expectation? If not, dig deeper.  
In my case, the **co-management sliders** (a prerequisite for AutoPatch) hadn’t been switched. Devices were “enrolled,” but not actually managed.  

**Lesson:** never trust the checkbox.  

---

## 4. Leverage the hard work of peers  
You’re rarely the first to hit a roadblock. Blogs, sample queries, and community dashboards are a treasure trove.  
I borrowed patterns, adapted them to our data, and shared back improvements.  

**Lesson:** stand on shoulders, then add your own weight.  

---

## 5. A visual workbook is non-negotiable  
An Azure Workbook became our single source of truth. Executives saw the high-level split (Win10 vs Win11), engineers drilled into cohorts, and I stopped answering the same “where are we at?” question five times a day.  

---

## 6. Prerequisites will trip you up  
AutoPatch and WUfB both demand specific prerequisites — TPM, firmware, drivers, workload sliders.  
If those aren’t in place, nothing else lands. Confirm prerequisites early.  

---

## 7. Document what you don’t know  
Keep three lists:  
- **Unknowns** (what we don’t know yet)  
- **Assumptions** (what we’ll treat as true until proven)  
- **Decisions** (the record of choices)  

This turned learning gaps into action, not anxiety.  

---

## 8. Roadmap with milestones, not vibes  
A project this size can drift fast if you don’t anchor it. Set **clear milestones and checkpoints**:  
- *By end of Week 2: 90% of devices reporting telemetry*  
- *By Week 4: pilots live in Regions A and B*  

Documenting where you expect to be — and when — keeps you honest. It shows if you’re on pace, or if more resources are needed.  

**Lesson:** milestones make the plan measurable, and measurability makes it real.  

---

## 9. Guardrails beat heroics  
I wasn’t going to brute-force this on weekends. Guardrails mattered more: Delivery Optimization, retry logic, safe maintenance windows.  
The system protected users and networks without late-night heroics.  

---

## 10. Success is silence  
The best compliment was silence. No panic escalations. No “where are we at?” pings.  
Just steady progress, visible in the workbook, and a rollout that didn’t make headlines internally.  

---

### Closing thought  
Rolling out Windows 11 isn’t about chasing shiny tools. It’s about flattening complexity, scrutinising behaviour, and making truth visible. Borrow from peers, contribute back, and anchor your plan in milestones. Because at scale, boring is what delivers.  
