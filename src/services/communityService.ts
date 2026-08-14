import { CommunityConversation } from '../types';
import { mockCommunityConversations } from '../mock/data';

let conversationsStore = [...mockCommunityConversations];

export const communityService = {
  async getConversations(): Promise<CommunityConversation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return conversationsStore;
  },

  async sendReply(conversationId: string, content: string, approvedBy: string): Promise<CommunityConversation> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = conversationsStore.findIndex((c) => c.id === conversationId);
    if (index === -1) throw new Error('Conversation not found');

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderName: approvedBy,
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      content,
      timestamp: 'Just now',
      isCustomer: false,
    };

    conversationsStore[index] = {
      ...conversationsStore[index],
      status: 'Approved & Sent',
      lastMessage: content,
      timestamp: 'Just now',
      unread: false,
      messages: [...conversationsStore[index].messages, newMsg],
    };

    return conversationsStore[index];
  },
};
