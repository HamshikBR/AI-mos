import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const reports = [
    { title: 'Monthly Marketing Performance Report', period: 'August 2026', type: 'Executive PDF' },
    { title: 'Campaign ROI & Dining Conversion Audit', period: 'Q2-Q3 2026', type: 'Analytics CSV' },
    { title: 'Brand Consistency & DNA Governance Audit', period: 'August 2026', type: 'Compliance PDF' },
    { title: 'Content Assets & Social Engagement Report', period: 'August 2026', type: 'Performance PDF' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Reports"
        subtitle="Exportable marketing performance, governance audits, and attribution summaries"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, i) => (
          <Card key={i} className="flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] text-[#173B63]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#17202A]">{r.title}</h3>
                <p className="text-xs text-[#667085] mt-0.5">Period: {r.period} • Format: {r.type}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E4E7EC] flex justify-end gap-3">
              <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                Export PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
