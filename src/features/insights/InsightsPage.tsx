import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AIBadge, Badge } from '../../components/ui/Badge';
import { mockInsights } from '../../mock/data';
import { Lightbulb, Sparkles, TrendingUp, CheckCircle2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InsightsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Marketing Insights"
        subtitle="Empirical patterns and audience behavioral trends synthesized by Performance Analyst AI"
      />

      <div className="space-y-6">
        {mockInsights.map((ins) => (
          <Card key={ins.id} className="space-y-4 border-l-4 border-l-[#5B5BD6]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#5B5BD6]" />
                <h3 className="text-base font-bold text-[#17202A]">{ins.title}</h3>
              </div>
              <AIBadge roleName={ins.aiRole} />
            </div>

            <p className="text-xs text-[#17202A] leading-relaxed bg-[#F7F8FA] p-4 rounded-xl border border-[#E4E7EC] font-medium">
              "{ins.summary}"
            </p>

            <div className="p-4 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF] space-y-2">
              <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider block">Business Interpretation</span>
              <p className="text-xs text-[#17202A] font-semibold">{ins.businessInterpretation}</p>
            </div>

            <div className="pt-2 border-t border-[#E4E7EC] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[#667085] uppercase text-[10px]">Evidence Data Base:</span>
                <div className="flex flex-wrap gap-2 text-[#17202A]">
                  {ins.evidence.dataPoints.map((dp, idx) => (
                    <Badge key={idx} variant="outline" className="bg-white">{dp}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#667085]">{ins.evidence.campaignsCount} Campaigns • {ins.evidence.assetsCount} Assets</span>
                <Button variant="ai" size="sm" onClick={() => navigate('/recommendations')}>
                  View Recommendations
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
