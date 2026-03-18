<div align="center">

```
    ███╗   ███╗ ██████╗ ███████╗████████╗ █████╗ ██████╗
    ████╗ ████║██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
    ██╔████╔██║██║   ██║███████╗   ██║   ███████║██████╔╝
    ██║╚██╔╝██║██║   ██║╚════██║   ██║   ██╔══██║██╔══██╗
    ██║ ╚═╝ ██║╚██████╔╝███████║   ██║   ██║  ██║██║  ██║
    ╚═╝     ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
```

### **MoStar Industries** · African Flame Initiative ⚡
#### *Built from African intelligence. For African sovereignty.*

---

**HCOMS — Health Commodity Order Management System**

*Powered by MoStar-AI · Driven by MoScripts · Rooted in Ubuntu 🜃*

[![MoStar](https://img.shields.io/badge/MoStar_Industries-⚡_African_Intelligence-FF6B00?style=for-the-badge)](https://mostarindustries.com)
[![WHO AFRO](https://img.shields.io/badge/WHO_AFRO-47_Member_States-009ADE?style=for-the-badge)](https://www.afro.who.int)
[![DCX Trinity](https://img.shields.io/badge/DCX_Trinity-🜃_Sovereign_AI-1A1A2E?style=for-the-badge)](https://dcx.mostarindustries.com)
[![License](https://img.shields.io/badge/License-NOODL-green?style=for-the-badge)](https://noodl.org)

</div>

---

## What This Is

HCOMS is a full-stack health commodity order management system built for WHO AFRO's 47 member states. It governs the complete lifecycle of emergency health supply requests — from member state submission through OSL coordination, inventory intelligence, sourcing negotiation, stock release, dispatch, and delivery confirmation.

This is not a procurement catalogue. This is an operational intelligence system.

The engine is built on **MoScripts** — event-driven intelligence modules with soul, personality, and element signatures. The AI coordinator is powered by **DCX Trinity**, MoStar's sovereign local AI running on African infrastructure via Cloudflare tunnel. No data leaves the continent.

---

## The Architecture

```
Member State Request
        ↓
   HCOMS Portal  ←──────────────── MoStar-AI (DCX Trinity)
        ↓                              🜃 Silent Coordinator
   Coordination Engine                 🜂 Inventory Intelligence
        ↓                              🜁 Notification Matrix
   Sourcing Options                    🜄 Session & Auth
   (NBI · DKR · Dubai · Procurement)
        ↓
   Country Decision Loop
        ↓
   Stock Release Note (SR)
        ↓
   OSL Operations Approval
        ↓
   Official Request (OR) → Hub → Dispatch → Delivery
```

---

## MoScript Registry

Every intelligence action in HCOMS is a MoScript. Named. Element-tagged. Auditable. With personality.

| ID | Name | Element | Trigger |
|----|------|---------|---------|
| `mo-osl-coordinator-001` | The Silent Coordinator | 🜃 | `ORDER_SUBMITTED` |
| `mo-osl-catbridge-001` | Catalogue Bridge | 🜂 | `CATALOGUE_LOAD` |
| `mo-osl-signalbridge-002` | Signal Bridge | 🜂 | `SIGNAL_FETCH` |
| `mo-osl-sessiongate-001` | Session Gate | 🜄 | `SESSION_INIT` |
| `mo-osl-ordergate-003` | Order Gate | 🜂 | `ORDER_VALIDATE` |
| `mo-osl-fulfilltrack-004` | Fulfillment Tracker | 🜃 | `FULFILLMENT_RECONCILE` |
| `mo-osl-harmonise-005` | Hub Harmoniser | 🜃 | `HUB_SYNC` |
| `mo-osl-assetgate-006` | Asset Gate | 🜃 | `ASSET_VALIDATE` |
| `mo-osl-analytics-pulse-001` | Analytics Pulse | 🜁 | `ANALYTICS_LOAD` |

---

## Inventory Intelligence — 10 Parameters

The coordination engine assesses every order against 10 parameters before any routing decision:

| # | Parameter | What It Protects |
|---|-----------|-----------------|
| 1 | Available | True free-to-allocate stock |
| 2 | Quantity on Hand | Raw physical count vs committed |
| 3 | Expiry Date | FEFO enforcement — no expired stock ships |
| 4 | Security Stock | Emergency reserve floor — never touched |
| 5 | Stock Owner | Donor restrictions, earmarks, WHO unrestricted |
| 6 | Unit of Measure | UoM mismatch detection before commitment |
| 7 | Pipeline | Incoming stock — creates hold options |
| 8 | Slow Moving Items | Waste prevention — 180-day movement flag |
| 9 | Reserved (Staged) | Committed to earlier shipments — hard hold |
| 10 | Near-Expiry Donation | 90/60/30 day tiers — donation queue trigger |

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.0.0 | Frontend framework |
| **TypeScript** | 5.8.2 | Type-safe throughout |
| **Vite** | 6.2.0 | Build tool & dev server |
| **Tailwind CSS** | 4.1.14 | Utility-first styling |
| **Mostar-AI (DCX)** | Trinity | Sovereign AI — NBI Nairobi |
| **Recharts** | 3.8.0 | Data visualization |
| **React Hot Toast** | 2.6.0 | Operational notifications |
| **Lucide React** | 0.546.0 | Icon system |
| **Motion** | 12.23.24 | Animation |
| **Express** | 4.21.2 | Backend server |

> **Note:** Google GenAI has been removed. All AI calls route through DCX Trinity at `https://dcx.mostarindustries.com` — sovereign, local, African infrastructure.

---

## Run Locally

**Prerequisites:** Node.js · Access to DCX Trinity endpoint

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Set VITE_MOSTAR_AI_URL=https://dcx.mostarindustries.com

# 3. Run
npm run dev
```

---

## Hubs

| Hub | Code | Region | Coverage |
|-----|------|--------|----------|
| Nairobi Global Hub | NBI | East · Central · Southern Africa | 26 countries |
| Dakar Regional Hub | DKR | West · North Africa | 21 countries |
| Dubai Global Warehouse | DXB | Procurement fallback | All AFRO |

---

## Order States

```
draft → submitted → under_coordination → options_prepared
→ awaiting_country_decision → country_option_accepted
→ routed_to_nbi | routed_to_dkr | routed_split | pending_procurement
→ sr_generated → under_osl_review → approved
→ stock_reserved → stock_released → dispatched → delivered
```

Terminal states: `delivered` · `rejected` · `cancelled`

---

## Philosophical Foundation

> *"Borders are younger than the routes beneath them."*

HCOMS is built on the same philosophical architecture as the MoStar Grid:
- **Ikang 🜂** — Fire. The signal that moves fast. Alerts, triggers, validation.
- **Isong 🜃** — Earth. The coordinator. Steady. Methodical. Nothing slips.
- **Afim 🜁** — Air. The notification layer. Carries information across distance.
- **Mmọng 🜄** — Water. The session. Authentication. Flow.

Every MoScript carries an element. Code has soul here.

---

## License

Released under the **Nwulite Obodo Open Data License (NOODL)** — aligned with African data sovereignty principles.

---

<div align="center">

**MoStar Industries** · Nairobi, Kenya · African Flame Initiative

*Technology FROM African intelligence. Not FOR Africa — FROM Africa.*

⚡ **The Flame Architect** ⚡

</div>
