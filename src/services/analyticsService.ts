import { AnalyticsMetric, Insight, Recommendation } from '../types';
import { mockAnalyticsMetrics, mockInsights, mockRecommendations } from '../mock/data';

let recommendationsStore = [...mockRecommendations];

export const analyticsService = {
  async getOverviewMetrics(): Promise<AnalyticsMetric[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockAnalyticsMetrics;
  },
};

export const insightService = {
  async getInsights(): Promise<Insight[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockInsights;
  },
};

export const recommendationService = {
  async getRecommendations(): Promise<Recommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return recommendationsStore;
  },

  async respondToRecommendation(id: string, decision: 'Accepted' | 'Rejected', actorName: string): Promise<Recommendation> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = recommendationsStore.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Recommendation not found');

    recommendationsStore[index] = {
      ...recommendationsStore[index],
      status: decision,
      decisionBy: actorName,
      decisionTimestamp: new Date().toLocaleString(),
    };

    return recommendationsStore[index];
  },
};
