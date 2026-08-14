import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { BrandWorkspacePage } from '../features/brand/BrandWorkspacePage';
import { BrandDnaPage } from '../features/brand/BrandDnaPage';
import { PersonasPage } from '../features/personas/PersonasPage';
import { CalendarPage } from '../features/calendar/CalendarPage';
import { CampaignsPage } from '../features/campaigns/CampaignsPage';
import { CreateCampaignPage } from '../features/campaigns/CreateCampaignPage';
import { CampaignWorkspacePage } from '../features/campaigns/CampaignWorkspacePage';
import { ContentPlanPage } from '../features/content/ContentPlanPage';
import { CreativeLibraryPage } from '../features/creative-library/CreativeLibraryPage';
import { MultiplePhotoUploadPage } from '../features/creative-library/MultiplePhotoUploadPage';
import { AssetDetailPage } from '../features/creative-library/AssetDetailPage';
import { CreativeStudioPage } from '../features/creative-studio/CreativeStudioPage';
import { ApprovalsPage } from '../features/approvals/ApprovalsPage';
import { ApprovalDetailPage } from '../features/approvals/ApprovalDetailPage';
import { PublishingPage } from '../features/publishing/PublishingPage';
import { PublishContentPage } from '../features/publishing/PublishContentPage';
import { CommunityPage } from '../features/community/CommunityPage';
import { AnalyticsPage } from '../features/analytics/AnalyticsPage';
import { InsightsPage } from '../features/insights/InsightsPage';
import { RecommendationsPage } from '../features/recommendations/RecommendationsPage';
import { KnowledgePage } from '../features/knowledge/KnowledgePage';
import { NewKnowledgePage } from '../features/knowledge/NewKnowledgePage';
import { GovernancePage } from '../features/governance/GovernancePage';
import { AuditPage } from '../features/audit/AuditPage';
import { AuditDetailPage } from '../features/audit/AuditDetailPage';
import { ReportsPage } from '../features/reports/ReportsPage';
import { AdminPage } from '../features/admin/AdminPage';
import { SettingsPage } from '../features/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'brand', element: <BrandWorkspacePage /> },
      { path: 'brand/dna', element: <BrandDnaPage /> },
      { path: 'brand/personas', element: <PersonasPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'campaigns/new', element: <CreateCampaignPage /> },
      { path: 'campaigns/:id', element: <CampaignWorkspacePage /> },
      { path: 'content', element: <ContentPlanPage /> },
      { path: 'creative-library', element: <CreativeLibraryPage /> },
      { path: 'creative-library/upload', element: <MultiplePhotoUploadPage /> },
      { path: 'creative-library/:id', element: <AssetDetailPage /> },
      { path: 'creative-studio', element: <CreativeStudioPage /> },
      { path: 'approvals', element: <ApprovalsPage /> },
      { path: 'approvals/:id', element: <ApprovalDetailPage /> },
      { path: 'publishing', element: <PublishingPage /> },
      { path: 'publishing/new', element: <PublishContentPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'recommendations', element: <RecommendationsPage /> },
      { path: 'knowledge', element: <KnowledgePage /> },
      { path: 'knowledge/new', element: <NewKnowledgePage /> },
      { path: 'governance', element: <GovernancePage /> },
      { path: 'audit', element: <AuditPage /> },
      { path: 'audit/:id', element: <AuditDetailPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
