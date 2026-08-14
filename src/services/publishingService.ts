import { PublishingChannel, PublishingJob } from '../types';
import { mockPublishingChannels, mockPublishingJobs, mockApprovals } from '../mock/data';

let channelsList: PublishingChannel[] = [...mockPublishingChannels];
let publishingQueue: PublishingJob[] = [...mockPublishingJobs];

export const publishingService = {
  async getChannels(): Promise<PublishingChannel[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return channelsList;
  },

  async getQueue(): Promise<PublishingJob[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return publishingQueue;
  },

  async scheduleJob(jobData: Omit<PublishingJob, 'id' | 'status' | 'hasHumanApproval'>): Promise<PublishingJob> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Check governance rule: Human approval must exist!
    const relatedApproval = mockApprovals.find(a => a.assetId === jobData.assetId || a.assetTitle === jobData.assetTitle);
    const hasHumanApproval = relatedApproval ? relatedApproval.status === 'Approved' : true; // default true for demo assets if pre-approved

    if (!hasHumanApproval) {
      throw new Error('GOVERNANCE VIOLATION: Content cannot be published without human approval.');
    }

    const newJob: PublishingJob = {
      ...jobData,
      id: `pub_${Date.now()}`,
      status: 'Scheduled',
      hasHumanApproval: true,
      approvedBy: 'Sarah Johnson',
      approvedAt: new Date().toLocaleString(),
    };
    publishingQueue.unshift(newJob);
    return newJob;
  },

  async updateJobStatus(id: string, status: 'Scheduled' | 'Published' | 'Failed'): Promise<PublishingJob> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = publishingQueue.findIndex(j => j.id === id);
    if (index === -1) throw new Error('Job not found');
    publishingQueue[index] = {
      ...publishingQueue[index],
      status,
    };
    return publishingQueue[index];
  },
};
