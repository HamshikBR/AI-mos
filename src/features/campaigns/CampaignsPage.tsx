import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { mockCampaigns } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { Plus, Layers, Calendar, ArrowRight, CheckSquare, Send, Sparkles } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const filteredCampaigns = filterStatus === 'All'
    ? mockCampaigns
    : mockCampaigns.filter((c) => c.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaigns Library"
        subtitle="Manage multi-channel hospitality campaigns, content plans, and performance goals"
        action={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/campaigns/new')}
          >
            Create Campaign
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'All', label: 'All Campaigns', count: mockCampaigns.length },
          { id: 'Active', label: 'Active' },
          { id: 'In Progress', label: 'In Progress' },
          { id: 'Draft', label: 'Draft' },
        ]}
        activeTab={filterStatus}
        onChange={setFilterStatus}
        variant="pills"
      />

      <div className="space-y-4">
        {filteredCampaigns.map((camp) => (
          <Card
            key={camp.id}
            hoverable
            onClick={() => navigate(`/campaigns/${camp.id}`)}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-[#17202A]">{camp.name}</h3>
                <StatusBadge status={camp.status} />
              </div>
              <p className="text-xs text-[#667085] line-clamp-1">{camp.objective}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085] pt-1">
                <span className="flex items-center gap-1 font-medium text-[#17202A]">
                  <Calendar className="w-3.5 h-3.5 text-[#173B63]" /> {camp.startDate} to {camp.endDate}
                </span>
                <span>Owner: {camp.owner}</span>
                <div className="flex gap-1">
                  {camp.channels.map((ch) => (
                    <ChannelBadge key={ch} channel={ch} />
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Progress Bar */}
            <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-[#E4E7EC] pt-4 md:pt-0 md:pl-6">
              <div className="space-y-1 text-center min-w-[100px]">
                <span className="text-[10px] font-semibold text-[#667085] uppercase block">Content Assets</span>
                <span className="text-sm font-bold text-[#17202A]">{camp.contentAssetsCount} Total</span>
                <div className="flex items-center justify-center gap-1 text-[10px] text-[#16855B] font-semibold">
                  <CheckSquare className="w-3 h-3" /> {camp.approvedAssetsCount} Approved
                </div>
              </div>

              <div className="space-y-1 w-32">
                <div className="flex justify-between text-xs font-bold text-[#17202A]">
                  <span>Progress</span>
                  <span>{camp.progress}%</span>
                </div>
                <div className="w-full bg-[#E4E7EC] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#173B63] h-2 rounded-full" style={{ width: `${camp.progress}%` }} />
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-[#667085]" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
