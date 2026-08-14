import { Approval, ApprovalStatus } from '../types';
import { mockApprovals } from '../mock/data';

let approvalsList: Approval[] = [...mockApprovals];

export const approvalService = {
  async getApprovals(): Promise<Approval[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return approvalsList;
  },

  async getApprovalById(id: string): Promise<Approval | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return approvalsList.find((a) => a.id === id);
  },

  async submitForApproval(approvalData: Omit<Approval, 'id' | 'submittedAt' | 'status'>): Promise<Approval> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newApproval: Approval = {
      ...approvalData,
      id: `appr_${Date.now()}`,
      status: 'Pending',
      submittedAt: new Date().toLocaleString(),
    };
    approvalsList.unshift(newApproval);
    return newApproval;
  },

  async updateApprovalStatus(id: string, status: ApprovalStatus, reviewerName: string, category?: any, comments?: string): Promise<Approval> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = approvalsList.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Approval item not found');

    approvalsList[index] = {
      ...approvalsList[index],
      status,
      reviewedAt: new Date().toLocaleString(),
      reviewedBy: reviewerName,
      rejectionCategory: category,
      comments: comments || approvalsList[index].comments,
    };
    return approvalsList[index];
  },
};
