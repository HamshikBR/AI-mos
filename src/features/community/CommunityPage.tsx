import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { ChannelBadge, AIBadge, StatusBadge } from '../../components/ui/Badge';
import { mockCommunityConversations } from '../../mock/data';
import { communityService } from '../../services/communityService';
import { MessageSquare, Send, Sparkles, CheckCircle2, User } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [conversations, setConversations] = useState(mockCommunityConversations);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [replyText, setReplyText] = useState(
    mockCommunityConversations[0].aiSuggestedReply?.content || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeConv = conversations[selectedIndex] || conversations[0];

  const handleSelectConv = (idx: number) => {
    setSelectedIndex(idx);
    setReplyText(conversations[idx].aiSuggestedReply?.content || '');
  };

  const handleApproveAndSend = async () => {
    setIsSubmitting(true);
    try {
      const updated = await communityService.sendReply(activeConv.id, replyText, 'Sarah Johnson (Brand Manager)');
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Community Engagement Inbox"
        subtitle="Unified social inbox with AI response suggestions requiring human approval"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* LEFT PANEL: Conversation List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <Card className="p-2 space-y-1">
            <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider px-3 py-2">Customer Interactions</h3>
            {conversations.map((conv, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(idx)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#173B63]/10 border-[#173B63] shadow-2xs'
                      : 'bg-white border-[#E4E7EC] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#17202A]">{conv.customerName}</span>
                    <ChannelBadge channel={conv.channel} />
                  </div>
                  <p className="text-xs text-[#667085] line-clamp-1">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E4E7EC]">
                    <span className="text-[10px] text-[#98A2B3]">{conv.timestamp}</span>
                    <StatusBadge status={conv.status} />
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* RIGHT PANEL: Chat Thread & AI Response Review (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="flex flex-col justify-between min-h-[500px]">
            {/* Conversation Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-3">
                <img src={activeConv.customerAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-[#E4E7EC]" />
                <div>
                  <h4 className="text-sm font-bold text-[#17202A]">{activeConv.customerName}</h4>
                  <p className="text-xs text-[#667085]">{activeConv.customerHandle} • {activeConv.channel}</p>
                </div>
              </div>
              <StatusBadge status={activeConv.status} />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 py-6 space-y-4 overflow-y-auto">
              {activeConv.messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.isCustomer ? '' : 'flex-row-reverse'}`}>
                  <img src={msg.senderAvatar} alt="sender" className="w-8 h-8 rounded-full object-cover" />
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.isCustomer
                        ? 'bg-[#F7F8FA] border border-[#E4E7EC] text-[#17202A]'
                        : 'bg-[#173B63] text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{msg.senderName}</span>
                      <span className="text-[10px] opacity-75">{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggested Response Box & Human Approval Action */}
            {activeConv.status === 'Needs Action' && activeConv.aiSuggestedReply && (
              <div className="pt-4 border-t border-[#E4E7EC] space-y-3">
                <div className="p-3 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Suggested Response (Requires Human Approval)
                    </span>
                    <AIBadge roleName={activeConv.aiSuggestedReply.aiRole} />
                  </div>
                  <p className="text-xs text-[#667085]">
                    <span className="font-semibold text-[#17202A]">Business Justification:</span> {activeConv.aiSuggestedReply.businessJustification}
                  </p>
                </div>

                <Textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Review or modify AI suggested reply..."
                />

                <div className="flex justify-end gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    isLoading={isSubmitting}
                    onClick={handleApproveAndSend}
                  >
                    Human Approve & Send Response
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
