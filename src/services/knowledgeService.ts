import { KnowledgeAsset, GovernanceStatus, AuditRecord } from '../types';
import { mockKnowledgeAssets, mockGovernanceStatus, mockAuditLogs } from '../mock/data';

let knowledgeStore = [...mockKnowledgeAssets];
let auditStore = [...mockAuditLogs];

export const knowledgeService = {
  async getKnowledgeAssets(): Promise<KnowledgeAsset[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return knowledgeStore;
  },

  async saveLearning(learningData: Omit<KnowledgeAsset, 'id' | 'createdAt'>): Promise<KnowledgeAsset> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newAsset: KnowledgeAsset = {
      ...learningData,
      id: `knw_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    knowledgeStore.unshift(newAsset);
    return newAsset;
  },
};

export const governanceService = {
  async getOverview(): Promise<GovernanceStatus> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockGovernanceStatus;
  },
};

export const auditService = {
  async getLogs(): Promise<AuditRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return auditStore;
  },

  async getLogById(id: string): Promise<AuditRecord | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return auditStore.find((a) => a.id === id);
  },

  async recordEvent(event: Omit<AuditRecord, 'id' | 'timestamp'>): Promise<AuditRecord> {
    const newRecord: AuditRecord = {
      ...event,
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };
    auditStore.unshift(newRecord);
    return newRecord;
  },
};
