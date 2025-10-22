# MSP Onboarding Runbook — Customer #1

## 1. Objectives
- Establish secure remote management for all company devices.  
- Ensure automated patching and software maintenance.  
- Provide visibility into system health, updates, and security posture.  
- Enable on-demand remote support with full audit trail.

---

## 2. Core Tools and Roles

| Function | Tool / Service | Owner | Notes |
|-----------|----------------|--------|-------|
| **RMM / Patch & Remote Access** | **Action1** Cloud RMM | MSP | Agent provides patching, remote desktop, reporting |
| **Security & Visibility (Phase 2)** | Wazuh SIEM | MSP | Adds compliance, threat detection |
| **Identity & MFA (Phase 2)** | Entra ID / Keycloak | Customer / MSP | Optional integration for SSO & device trust |
| **Documentation & Tickets** | HaloPSA (or internal tracker) | MSP | Records, SLAs, reports |
| **File / Config Backup (optional)** | Restic → MinIO / S3 | MSP | Protect configs, reports |

---

## 3. Device Onboarding Workflow

| Step | Action | Owner | Output |
|------|---------|--------|--------|
| 1 | Obtain device details (hostname, user, OS, location) | MSP | Baseline sheet |
| 2 | Install **Action1 agent** | MSP / User via link | Device appears in dashboard |
| 3 | Verify check-in & remote control | MSP | Confirm session works |
| 4 | Run initial inventory & patch scan | MSP | Baseline report |
| 5 | Apply **Standard Patch Policy** | MSP | Scheduled updates set |
| 6 | Create customer group & schedule | MSP | Maintenance window defined |
| 7 | Generate **Initial Hygiene Report** | MSP | Shared PDF or portal view |
| 8 | Record in PSA | MSP | Ticket closed, device registered |

---

## 4. Standard Patch & Automation Policy

| Category | Setting |
|-----------|----------|
| **OS updates** | Weekly, Wednesday 02:00 UTC; reboot if required |
| **3rd-party apps** | Auto-update daily 02:30 UTC (Chrome, Zoom, Adobe, etc.) |
| **Critical patches** | Immediate (within 24 h) |
| **Defender/AV signatures** | Daily |
| **Script tasks** | Disk cleanup, temp-file purge, event-log trim (weekly) |
| **Offline devices** | Retry window = 72 h |

---

## 5. Access & Security Controls

| Control | Description |
|----------|--------------|
| **Technician access** | MFA required via Action1 portal |
| **Remote sessions** | Customer consent or pre-approved unattended access |
| **Session recording** | Enabled, retained 90 days |
| **Role separation** | MSP Admin (you), Tech (support), Customer Viewer |
| **Break-glass protocol** | Logged emergency access with post-review |

---

## 6. Reporting & Communication

| Report | Frequency | Content | Recipient |
|---------|------------|----------|------------|
| **Monthly Hygiene Report** | Monthly | Patch compliance %, software inventory, Defender status, open alerts | Customer contact |
| **Incident Summary** | As needed | Ticket list + resolution time | Customer |
| **Quarterly Review** | Quarterly | Trend charts, recommendations, roadmap | Customer leadership |

---

## 7. Baseline Health Report Template (example)

| Area | Status | Notes |
|------|---------|-------|
| Windows Update | ✅ Up to date | — |
| 3rd-Party Apps | ⚠️ Chrome outdated | Auto-update scheduled |
| AV / EDR | ✅ Defender active | — |
| Disk Health | ✅ OK (0 errors) | — |
| Firewall | ✅ Enabled | — |
| Users / Local Admins | ⚠️ 2 extra admins | To review |
| Remote Access | ✅ MeshCentral fallback configured | — |

---

## 8. Next Steps / Phase 2 Roadmap
1. **Deploy Wazuh agent** for deeper security visibility.  
2. **Set up FleetDM** (or Intune) for policy management and macOS/Linux devices.  
3. **Implement Keycloak / Entra ID** integration for unified identity.  
4. **Add PSA ↔ RMM sync** for automatic ticket creation.  
5. **Publish customer portal** with reports and access logs.

---

### Deliverables to Customer
- ✅ Agent installed & verified  
- ✅ Baseline hygiene report (PDF)  
- ✅ Defined maintenance window  
- ✅ Support contact + escalation path  
- ✅ Monthly report schedule

