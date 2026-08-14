import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { mockAnalyticsMetrics } from '../../mock/data';
import { BarChart3, TrendingUp, Users, Send, CheckSquare } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  const performanceTrendData = [
    { date: 'Aug 01', reach: 12000, engagement: 2400, bookings: 12 },
    { date: 'Aug 03', reach: 18000, engagement: 3100, bookings: 18 },
    { date: 'Aug 05', reach: 24000, engagement: 4200, bookings: 25 },
    { date: 'Aug 07', reach: 31000, engagement: 5800, bookings: 34 },
    { date: 'Aug 09', reach: 45000, engagement: 8900, bookings: 52 },
    { date: 'Aug 11', reach: 52000, engagement: 9800, bookings: 68 },
    { date: 'Aug 12', reach: 64000, engagement: 12400, bookings: 84 },
  ];

  const channelBreakdownData = [
    { channel: 'Instagram', reach: 184000, engagement: 14200, conversionRate: '6.2%' },
    { channel: 'Facebook', reach: 112000, engagement: 6800, conversionRate: '4.1%' },
    { channel: 'YouTube', reach: 46800, engagement: 3900, conversionRate: '3.8%' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Marketing Analytics"
        subtitle="Executive performance metrics, cross-channel engagement, and dining conversion attribution"
        action={
          <Select
            options={[
              { value: 'Last 7 Days', label: 'Last 7 Days' },
              { value: 'Last 30 Days', label: 'Last 30 Days' },
              { value: 'Q3 2026', label: 'Q3 2026' },
            ]}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-44"
          />
        }
      />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockAnalyticsMetrics.map((m, i) => (
          <MetricCard
            key={i}
            title={m.title}
            value={m.value}
            change={m.change}
            changeType={m.changeType}
            description={m.description}
            icon={<BarChart3 className="w-5 h-5 text-[#173B63]" />}
          />
        ))}
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Audience Reach & Engagement Trend */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader title="Audience Reach & Engagement Performance" subtitle="Daily reach and engagement metrics across social media channels" />
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrendData}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#173B63" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#173B63" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#287C7A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#287C7A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                  <XAxis dataKey="date" stroke="#667085" fontSize={11} />
                  <YAxis stroke="#667085" fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="reach" name="Total Reach" stroke="#173B63" fillOpacity={1} fill="url(#colorReach)" strokeWidth={2} />
                  <Area type="monotone" dataKey="engagement" name="Engagement" stroke="#287C7A" fillOpacity={1} fill="url(#colorEng)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right 5 Cols: Channel Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader title="Channel Reach Distribution" subtitle="Audience volume by platform" />
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                  <XAxis dataKey="channel" stroke="#667085" fontSize={11} />
                  <YAxis stroke="#667085" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="reach" name="Reach" fill="#173B63" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
