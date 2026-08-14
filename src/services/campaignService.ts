import { Campaign } from '../types';
import { mockCampaigns } from '../mock/data';

let campaignsList = [...mockCampaigns];

export const campaignService = {
  async getCampaigns(): Promise<Campaign[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return campaignsList;
  },

  async getCampaignById(id: string): Promise<Campaign | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return campaignsList.find((c) => c.id === id);
  },

  async createCampaign(data: Omit<Campaign, 'id' | 'progress' | 'contentAssetsCount' | 'approvedAssetsCount' | 'publishedAssetsCount' | 'pendingAssetsCount' | 'createdAt'>): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newCampaign: Campaign = {
      ...data,
      id: `camp_${Date.now()}`,
      progress: 0,
      contentAssetsCount: 0,
      approvedAssetsCount: 0,
      publishedAssetsCount: 0,
      pendingAssetsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      aiAssistance: {
        suggestedObjective: 'Maximize audience reach during targeted campaign timeframe',
        suggestedAudience: data.targetPersonas.join(', '),
        suggestedChannels: data.channels,
        businessJustification: 'Aligns with Brand DNA strategy for hospitality growth.',
        aiRole: 'Marketing Strategist AI',
        evidence: 'Analyzed historical persona performance data',
      },
    };
    campaignsList.unshift(newCampaign);
    return newCampaign;
  },
};
