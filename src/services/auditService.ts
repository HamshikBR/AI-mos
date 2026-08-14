import { AuditRecord } from '../types';
import { mockAuditLogs } from '../mock/data';

let auditStore = [...mockAuditLogs];

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
