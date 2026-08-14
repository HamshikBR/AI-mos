export type Role = 
  | 'Business Owner'
  | 'Brand Manager'
  | 'Marketing Director'
  | 'Campaign Manager'
  | 'Content Strategist'
  | 'Social Media Manager'
  | 'Performance Marketer'
  | 'Community Manager'
  | 'Marketing Coordinator'
  | 'Platform Administrator';

export type Permission = 
  | 'campaign:create'
  | 'campaign:view'
  | 'campaign:edit'
  | 'campaign:delete'
  | 'creative:create'
  | 'creative:view'
  | 'creative:approve'
  | 'publishing:create'
  | 'publishing:manage'
  | 'governance:view'
  | 'audit:view'
  | 'admin:manage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  permissions: Permission[];
  brandId: string;
  brandName: string;
  lastActive: string;
  status: 'Active' | 'Inactive';
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
}

export interface BrandWorkspace {
  id: string;
  name: string;
  location: string;
  businessId: string;
  brandHealthScore: number;
  consistencyScore: number;
  dnaStatus: 'Up to date' | 'Review needed' | 'Draft';
  activeCampaignsCount: number;
  personasCount: number;
  lastUpdated: string;
}

export interface BrandVoiceSlider {
  label: string;
  left: string;
  right: string;
  value: number; // 0 to 100
}

export interface BrandDNA {
  id: string;
  brandId: string;
  version: string;
  approvedBy: string;
  lastUpdated: string;
  positioning: string;
  personality: string[];
  values: string[];
  toneOfVoice: string[];
  voiceSliders: BrandVoiceSlider[];
  messaging: {
    preferredTerminology: string[];
    avoidedTerminology: string[];
    corePillars: string[];
  };
  visualIdentity: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    typography: string;
    photographyStyle: string;
  };
  aiAgentsConfig: {
    name: string;
    role: string;
    status: 'Active' | 'Standby';
  }[];
}

export interface Persona {
  id: string;
  name: string;
  avatar: string;
  ageRange: string;
  occupation: string;
  location: string;
  interests: string[];
  preferredChannels: ('Instagram' | 'Facebook' | 'YouTube' | 'TikTok' | 'LinkedIn')[];
  topContentType: string;
  needs: string[];
  behaviors: string[];
  preferences: string[];
  painPoints: string[];
  historicalPerformance: {
    engagementRate: string;
    conversionRate: string;
    preferredTime: string;
  };
  aiObservation: string;
  evidence: string;
}

export type CampaignStatus = 'Draft' | 'In Progress' | 'Pending Approval' | 'Approved' | 'Active' | 'Completed' | 'Paused';

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  description: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  progress: number;
  owner: string;
  targetPersonas: string[];
  channels: ('Instagram' | 'Facebook' | 'YouTube')[];
  contentAssetsCount: number;
  approvedAssetsCount: number;
  publishedAssetsCount: number;
  pendingAssetsCount: number;
  aiAssistance?: {
    suggestedObjective: string;
    suggestedAudience: string;
    suggestedChannels: string[];
    businessJustification: string;
    aiRole: string;
    evidence: string;
  };
  createdAt: string;
}

export interface CampaignContent {
  id: string;
  campaignId: string;
  title: string;
  channel: 'Instagram' | 'Facebook' | 'YouTube';
  contentType: 'Carousel' | 'Reel' | 'Post' | 'Short' | 'Video';
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Scheduled' | 'Published';
  scheduledDate?: string;
}

export type CreativeAssetStatus = 'Uploaded' | 'Draft' | 'Generating' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Scheduled' | 'Published';

export interface CreativeAssetVersion {
  version: number;
  imageUrl: string;
  caption: string;
  prompt?: string;
  createdAt: string;
  createdBy: string;
  aiRole?: string;
}

export interface CreativeAsset {
  id: string;
  title: string;
  imageUrl: string;
  mediaType: 'image' | 'video';
  campaignId?: string;
  campaignName?: string;
  targetPersonaId?: string;
  targetPersonaName?: string;
  channel: 'Instagram' | 'Facebook' | 'YouTube';
  contentType: 'Post' | 'Carousel' | 'Reel' | 'Short' | 'Video';
  status: CreativeAssetStatus;
  createdBy: string;
  isAiGenerated: boolean;
  aiRole?: string;
  aiProvenance?: {
    brandDnaAligned: boolean;
    campaignBriefAligned: boolean;
    personaMatched: boolean;
    historicalPerformanceUsed: boolean;
    knowledgeRepoUsed: boolean;
  };
  businessJustification?: string;
  versions: CreativeAssetVersion[];
  currentVersion: number;
  uploadedAt: string;
  sourcePhotos?: string[];
  category?: string;
  brandRelevanceScore?: number;
}

export interface CreativeGenerationRequest {
  campaignId: string;
  personaId: string;
  channels: ('Instagram' | 'Facebook' | 'YouTube')[];
  contentType: string;
  sourcePhotoUrls: string[];
  prompt: string;
  tone: string;
  format: string;
}

export interface CreativeVariation {
  id: string;
  headline: string;
  caption: string;
  imageUrl: string;
  hashtags: string[];
  callToAction: string;
  aiRole: string;
  aiReasoning: string;
  contextUsed: string[];
  evidence: string;
}

export interface CreativeGenerationResult {
  id: string;
  prompt: string;
  variations: CreativeVariation[];
  generatedAt: string;
}

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Changes Requested';

export interface Approval {
  id: string;
  assetId: string;
  assetTitle: string;
  assetPreviewUrl: string;
  campaignId: string;
  campaignName: string;
  channel: 'Instagram' | 'Facebook' | 'YouTube';
  contentType: string;
  aiRole: string;
  status: ApprovalStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  businessJustification: string;
  evidenceUsed: {
    brandDna: boolean;
    campaign: boolean;
    persona: boolean;
    historicalPerformance: boolean;
    knowledgeRepo: boolean;
  };
  brandChecks: {
    brandAligned: boolean;
    correctTerminology: boolean;
    correctAudience: boolean;
    campaignObjectiveAligned: boolean;
  };
  rejectionReason?: string;
  rejectionCategory?: 'Brand mismatch' | 'Incorrect information' | 'Creative issue' | 'Strategy issue' | 'Other';
  comments?: string;
}

export type ChannelStatus = 'Connected' | 'Disconnected' | 'Expired';

export interface PublishingChannel {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube';
  handle: string;
  accountName: string;
  status: ChannelStatus;
  avatarUrl: string;
  followersCount: string;
}

export type PublishingStatus = 'Draft' | 'Scheduled' | 'Published' | 'Failed';

export interface PublishingJob {
  id: string;
  assetId: string;
  assetTitle: string;
  assetPreviewUrl: string;
  campaignId: string;
  campaignName: string;
  channel: 'Instagram' | 'Facebook' | 'YouTube';
  channelHandle: string;
  caption: string;
  hashtags?: string[];
  scheduledTime: string;
  status: PublishingStatus;
  hasHumanApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
  errorMessage?: string;
}

export interface CommunityMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isCustomer: boolean;
}

export interface CommunityConversation {
  id: string;
  channel: 'Instagram' | 'Facebook' | 'YouTube';
  customerName: string;
  customerHandle: string;
  customerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: 'Needs Action' | 'Approved & Sent' | 'Pending Review';
  messages: CommunityMessage[];
  aiSuggestedReply?: {
    content: string;
    aiRole: string;
    businessJustification: string;
  };
}

export interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  summary: string;
  aiRole: string;
  businessInterpretation: string;
  evidence: {
    dataPoints: string[];
    campaignsCount: number;
    assetsCount: number;
    timeframe: string;
  };
  createdAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  recommendation: string;
  why: string;
  evidence: string;
  businessImpact: string;
  aiRole: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  decisionBy?: string;
  decisionTimestamp?: string;
  createdAt: string;
}

export interface KnowledgeAsset {
  id: string;
  title: string;
  category: 'Brand' | 'Campaigns' | 'Customers' | 'Content' | 'Performance' | 'Policies';
  summary: string;
  whatWorked: string[];
  whatDidnt: string[];
  recommendedActions: string[];
  evidence: string;
  usedByAiRoles: string[];
  createdAt: string;
  createdBy: string;
}

export interface GovernanceStatus {
  pendingApprovals: number;
  approved: number;
  rejected: number;
  exceptions: number;
  auditEvents: number;
  approvalCompliance: number;
  brandCompliance: number;
  publishingCompliance: number;
  aiExplainabilityCoverage: number;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'AI' | 'Human' | 'System';
  aiRole?: string;
  action: string;
  artifact: string;
  campaign?: string;
  channel?: string;
  result: 'Success' | 'Approved' | 'Rejected' | 'Scheduled' | 'Failed';
  details?: {
    aiContextUsed?: string[];
    businessJustification?: string;
    humanDecisionBy?: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'approval' | 'publishing' | 'insight' | 'system' | 'warning';
  read: boolean;
  link?: string;
}
