import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { Tabs } from '../../components/ui/Tabs';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { mockCampaigns, mockCreativeAssets, mockApprovals } from '../../mock/data';
import { Layers, CheckSquare, Send, Clock, Plus, Sparkles, ArrowRight } from 'lucide-react';

export const CampaignWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const campaign = mockCampaigns.find((c) => c.id === id) || mockCampaigns[0];
  const campaignAssets = mockCreativeAssets.filter((a) => a.campaignId === campaign.id || campaign.id === 'camp_summer_dining');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content Assets', count: campaignAssets.length },
    { id: 'approvals', label: 'Approvals', count: 3 },
    { id: 'publishing', label: 'Publishing Queue' },
    { id: 'insights', label: 'AI Insights' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={campaign.name}
        subtitle={`${campaign.startDate} to ${campaign.endDate} • ${campaign.objective}`}
        action={
          <div className="flex gap-3">
            <Button
              variant="outline"
              leftIcon={<Sparkles className="w-4 h-4 text-[#5B5BD6]" />}
              onClick={() => navigate('/creative-studio')}
            >
              Open Creative Studio
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/creative-library/upload')}
            >
              Upload Photos
            </Button>
          </div>
        }
      />

      {/* Progress & Status Banner */}
      <div className="p-4 bg-white rounded-xl border border-[#E4E7EC] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <StatusBadge status={campaign.status} />
          <span className="text-xs text-[#667085]">Owner: <span className="font-bold text-[#17202A]">{campaign.owner}</span></span>
          <div className="flex gap-1">
            {campaign.channels.map((ch) => (
              <ChannelBadge key={ch} channel={ch} />
            ))}
          </div>
        </div>

        {/* Next Action Callout */}
        <div className="flex items-center gap-3 bg-[#FEF7EC] px-3.5 py-1.5 rounded-lg border border-[#C98216]/20">
          <Clock className="w-4 h-4 text-[#C98216]" />
          <span className="text-xs font-semibold text-[#17202A]">Next Action: 3 creative assets require approval</span>
          <Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>
            Review Now
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Content Assets" value={campaign.contentAssetsCount || 18} icon={<Layers className="w-5 h-5 text-[#173B63]" />} />
        <MetricCard title="Approved Assets" value={campaign.approvedAssetsCount || 13} icon={<CheckSquare className="w-5 h-5 text-[#16855B]" />} />
        <MetricCard title="Published Posts" value={campaign.publishedAssetsCount || 11} icon={<Send className="w-5 h-5 text-[#287C7A]" />} />
        <MetricCard title="Pending Review" value={campaign.pendingAssetsCount || 2} icon={<Clock className="w-5 h-5 text-[#C98216]" />} />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab: Content Assets */}
      {(activeTab === 'overview' || activeTab === 'content') && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#17202A]">Campaign Content Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaignAssets.map((asset) => (
              <Card key={asset.id} hoverable onClick={() => navigate(`/creative-library/${asset.id}`)}>
                <img src={asset.imageUrl} alt={asset.title} className="w-full h-44 object-cover rounded-lg mb-3" />
                <div className="flex items-center justify-between mb-2">
                  <ChannelBadge channel={asset.channel} />
                  <StatusBadge status={asset.status} />
                </div>
                <h4 className="text-xs font-bold text-[#17202A] line-clamp-1">{asset.title}</h4>
                <p className="text-[11px] text-[#667085] mt-0.5">Created by: {asset.createdBy}</p>
                {asset.isAiGenerated && (
                  <div className="mt-2 pt-2 border-t border-[#E4E7EC]">
                    <AIBadge roleName={asset.aiRole} />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
