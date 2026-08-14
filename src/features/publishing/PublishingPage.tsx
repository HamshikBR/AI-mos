import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { mockPublishingChannels, mockPublishingJobs } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { Send, Plus, Calendar, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PublishingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const navigate = useNavigate();

  const filteredJobs = mockPublishingJobs.filter((j) => j.status === activeTab);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Publishing Center"
        subtitle="Multi-channel social media publishing queue with strict human-approval verification"
        action={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/publishing/new')}
          >
            Publish New Content
          </Button>
        }
      />

      {/* Connected Accounts Banner */}
      <div>
        <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-3">Connected Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockPublishingChannels.map((chan) => (
            <Card key={chan.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChannelBadge channel={chan.platform} />
                <div>
                  <h4 className="text-xs font-bold text-[#17202A]">{chan.accountName}</h4>
                  <p className="text-[11px] text-[#667085]">{chan.handle} • {chan.followersCount} followers</p>
                </div>
              </div>
              <StatusBadge status={chan.status} />
            </Card>
          ))}
        </div>
      </div>

      {/* Publishing Queue Tabs */}
      <Tabs
        tabs={[
          { id: 'Scheduled', label: 'Scheduled Queue', count: mockPublishingJobs.length },
          { id: 'Published', label: 'Published' },
          { id: 'Failed', label: 'Failed / Exceptions' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {/* Queue Table / List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <img src={job.assetPreviewUrl} alt={job.assetTitle} className="w-16 h-16 rounded-lg object-cover" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#17202A]">{job.assetTitle}</h4>
                  <ChannelBadge channel={job.channel} />
                </div>
                <p className="text-xs text-[#667085]">{job.campaignName} • Scheduled for: <span className="font-bold text-[#17202A]">{job.scheduledTime}</span></p>
                <p className="text-xs text-[#17202A] line-clamp-1 font-medium bg-[#F7F8FA] px-2.5 py-1 rounded border border-[#E4E7EC]">
                  "{job.caption}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#E4E7EC] pt-3 md:pt-0 md:pl-6">
              {job.hasHumanApproval && (
                <span className="text-[11px] font-bold text-[#16855B] bg-[#EAF8F2] px-2.5 py-1 rounded border border-[#16855B]/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Approved by {job.approvedBy}
                </span>
              )}
              <StatusBadge status={job.status} />
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
