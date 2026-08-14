import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { mockPublishingJobs, mockCampaigns } from '../../mock/data';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [selectedChannel, setSelectedChannel] = useState('All');
  const navigate = useNavigate();

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Calendar"
        subtitle="August 2026 • Unified cross-channel content calendar"
        action={
          <div className="flex gap-3">
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/publishing/new')}
            >
              Add Campaign Content
            </Button>
          </div>
        }
      />

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-[#E4E7EC] shadow-2xs">
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-lg border border-[#E4E7EC] text-[#667085] hover:text-[#17202A]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-[#17202A]">August 2026</span>
          <button className="p-1.5 rounded-lg border border-[#E4E7EC] text-[#667085] hover:text-[#17202A]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              { id: 'month', label: 'Month' },
              { id: 'week', label: 'Week' },
              { id: 'list', label: 'List View' },
            ]}
            activeTab={viewMode}
            onChange={(id: any) => setViewMode(id)}
            variant="pills"
          />

          <Select
            options={[
              { value: 'All', label: 'All Channels' },
              { value: 'Instagram', label: 'Instagram' },
              { value: 'Facebook', label: 'Facebook' },
              { value: 'YouTube', label: 'YouTube' },
            ]}
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* View 1: Month Grid */}
      {viewMode === 'month' && (
        <Card className="p-0 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-[#E4E7EC] bg-[#F7F8FA] text-center text-xs font-bold text-[#667085] py-2.5">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          <div className="grid grid-cols-7 border-b border-[#E4E7EC] divide-x divide-[#E4E7EC] text-xs min-h-[500px]">
            {daysInMonth.map((day) => {
              const jobsOnDay = mockPublishingJobs.filter((_, idx) => (idx % 7) + 10 === day);
              return (
                <div key={day} className="p-2 min-h-[100px] hover:bg-[#F7F8FA]/50 transition-colors">
                  <span className="font-bold text-[#17202A] text-xs">{day}</span>
                  <div className="space-y-1.5 mt-1.5">
                    {day === 14 && (
                      <div className="p-1.5 bg-[#173B63]/10 border border-[#173B63]/20 rounded text-[11px] font-semibold text-[#173B63] truncate">
                        Summer Dining Campaign
                      </div>
                    )}
                    {jobsOnDay.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => navigate('/publishing')}
                        className="p-1.5 bg-white border border-[#E4E7EC] rounded shadow-2xs cursor-pointer hover:border-[#173B63] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <ChannelBadge channel={job.channel} />
                          <StatusBadge status={job.status} />
                        </div>
                        <p className="text-[10px] font-medium text-[#17202A] truncate mt-1">{job.assetTitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* View 2: List View */}
      {viewMode === 'list' && (
        <Card>
          <div className="space-y-3">
            {mockPublishingJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl border border-[#E4E7EC] flex items-center justify-between hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img src={job.assetPreviewUrl} alt={job.assetTitle} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-[#17202A]">{job.assetTitle}</h4>
                    <p className="text-xs text-[#667085]">{job.campaignName} • Scheduled: {job.scheduledTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ChannelBadge channel={job.channel} />
                  <StatusBadge status={job.status} />
                  <Button variant="outline" size="sm" onClick={() => navigate('/publishing')}>
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
