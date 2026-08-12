# MTS-AI-MOS

**Marketing Technology System – AI Marketing Operating System**

MTS-AI-MOS is an enterprise-grade AI-powered Marketing Operating System designed specifically for hospitality businesses and multi-location luxury brands (such as *The Grand Palace Hotel, Bengaluru*).

It manages the complete marketing lifecycle:
```
BRAND ➔ BRAND DNA ➔ CUSTOMER PERSONAS ➔ MARKETING STRATEGY ➔ MARKETING CALENDAR ➔ CAMPAIGN ➔ CONTENT PLAN ➔ MULTIPLE USER-UPLOADED PHOTOS ➔ AI CONTENT / CREATIVE GENERATION ➔ HUMAN APPROVAL ➔ SOCIAL MEDIA PUBLISHING (INSTAGRAM / FACEBOOK / YOUTUBE) ➔ CUSTOMER ENGAGEMENT ➔ ANALYTICS ➔ AI INSIGHTS ➔ AI RECOMMENDATIONS ➔ KNOWLEDGE CAPTURE ➔ GOVERNANCE & AUDIT
```

---

## 🛠 Technology Stack

- **Frontend Framework**: React 18 + TypeScript (Strict mode)
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling & Design System**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Data Fetching & State**: TanStack Query (React Query v5) + Axios
- **Form Validation**: React Hook Form + Zod
- **Charts & Visualizations**: Recharts

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers/
│       ├── QueryProvider.tsx
│       └── AuthProvider.tsx
│
├── components/
│   ├── ui/          # Button, Input, Select, Textarea, Badge, Card, Modal, Drawer, Tabs
│   ├── common/      # MetricCard, EmptyState, LoadingState, ErrorState, PageHeader, Avatar
│   └── layout/      # AppLayout, Sidebar, Header, NotificationDrawer, SearchModal
│
├── features/
│   ├── auth/        # LoginPage
│   ├── dashboard/   # DashboardPage (Executive dashboard)
│   ├── brand/       # BrandWorkspacePage, BrandDnaPage
│   ├── personas/    # PersonasPage
│   ├── calendar/    # CalendarPage
│   ├── campaigns/   # CampaignsPage, CreateCampaignPage, CampaignWorkspacePage
│   ├── content/     # ContentPlanPage
│   ├── creative-library/ # CreativeLibraryPage, MultiplePhotoUploadPage, AssetDetailPage
│   ├── creative-studio/  # CreativeStudioPage (AI Workspace & Generation)
│   ├── approvals/   # ApprovalsPage, ApprovalDetailPage (Split-screen review)
│   ├── publishing/  # PublishingPage, PublishContentPage (Governance check)
│   ├── community/   # CommunityPage (Social inbox & AI reply approval)
│   ├── analytics/   # AnalyticsPage (Recharts)
│   ├── insights/    # InsightsPage
│   ├── recommendations/ # RecommendationsPage
│   ├── knowledge/   # KnowledgePage, NewKnowledgePage
│   ├── governance/  # GovernancePage
│   ├── audit/       # AuditPage, AuditDetailPage
│   ├── reports/     # ReportsPage
│   ├── admin/       # AdminPage
│   └── settings/    # SettingsPage
│
├── services/
│   ├── api/         # Axios client, error handling, configuration
│   ├── authService.ts
│   ├── brandService.ts
│   ├── campaignService.ts
│   ├── creativeService.ts
│   ├── approvalService.ts
│   ├── publishingService.ts
│   ├── communityService.ts
│   ├── analyticsService.ts
│   ├── insightService.ts
│   ├── recommendationService.ts
│   ├── knowledgeService.ts
│   ├── governanceService.ts
│   └── auditService.ts
│
├── types/           # TypeScript domain models
├── schemas/         # Zod form validation schemas
├── mock/            # Hospitality mock datasets
├── config/          # Centralized environment config
└── styles/          # Design system & CSS rules
```

---

## ⚡ Quick Start & Running Locally

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `VITE_API_BASE_URL=http://localhost:5000/api`.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🔒 Governance & Architectural Principles

1. **AI Recommends, Humans Decide**:
   - AI models generate concepts, strategic recommendations, and suggested customer replies.
   - All creative content MUST receive explicit **Human Approval** before it can be scheduled or published to social channels.

2. **Backend API Readiness**:
   - All frontend services in `src/services/` use mock async calls designed to match REST endpoints (e.g. `POST /api/creative/generate`, `POST /api/approvals`, `POST /api/publishing`).
   - Connecting to a Node.js/Express REST backend requires updating `src/services/*.ts` methods to invoke `apiClient.post()` / `apiClient.get()`.

---

## 🎯 Primary Demonstration Flow

1. Open **Dashboard** (`/dashboard`).
2. Navigate to **Campaigns** -> **Create Campaign** (`/campaigns/new`).
3. Select **Weekend Family** persona.
4. Upload multiple photos via **Upload Creative Assets** (`/creative-library/upload`).
5. Open **Creative Studio** (`/creative-studio`). Select photos and type prompt:
   *"Create a premium Instagram post promoting our new weekend brunch. Use the uploaded food photos, highlight the 20% discount, and make it feel premium and inviting."*
6. Click **Generate AI Creatives**, select a variation, and click **Send for Human Approval**.
7. Open **Approval Workspace** (`/approvals`), review split-screen detail, check AI provenance, and click **Approve Asset**.
8. Navigate to **Publishing** (`/publishing/new`), verify governance compliance checklist, select channels, and schedule.
9. View **Analytics**, **AI Insights**, **AI Recommendations**, and **Audit Log**.
# AI-mos
