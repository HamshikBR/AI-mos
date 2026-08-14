import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, AIBadge } from '../../components/ui/Badge';
import { mockAuditLogs } from '../../mock/data';
import { ArrowLeft, ShieldCheck, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuditDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const record = mockAuditLogs.find((l) => l.id === id) || mockAuditLogs[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title={`Audit Record: ${record.id}`}
        subtitle={`Logged on ${record.timestamp} • Actor: ${record.actor}`}
        action={
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/audit')}>
            Back to Audit Log
          </Button>
        }
      />

      <Card className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-4">
          <div>
            <span className="text-xs text-[#667085] uppercase font-bold tracking-wider block">Action Executed</span>
            <h3 className="text-lg font-bold text-[#17202A] mt-0.5">{record.action}</h3>
          </div>
          <StatusBadge status={record.result} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-[#F7F8FA] rounded-lg border border-[#E4E7EC]">
            <span className="text-[#667085] block font-semibold">Artifact Target</span>
            <span className="font-bold text-[#17202A] text-sm">{record.artifact}</span>
          </div>
          <div className="p-3 bg-[#F7F8FA] rounded-lg border border-[#E4E7EC]">
            <span className="text-[#667085] block font-semibold">Actor Identity</span>
            <div className="flex items-center gap-1.5 font-bold text-[#17202A] text-sm">
              <span>{record.actor}</span>
              {record.aiRole && <AIBadge roleName={record.aiRole} />}
            </div>
          </div>
        </div>

        {record.details?.aiContextUsed && (
          <div className="p-4 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF] space-y-2 text-xs">
            <span className="font-bold text-[#5B5BD6] uppercase tracking-wider block">AI Context Used at Execution</span>
            <div className="flex flex-wrap gap-2">
              {record.details.aiContextUsed.map((ctx, i) => (
                <span key={i} className="px-2.5 py-1 bg-white rounded-md font-semibold text-[#17202A] border border-[#C7C7FF]">
                  ✓ {ctx}
                </span>
              ))}
            </div>
          </div>
        )}

        {record.details?.businessJustification && (
          <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] text-xs space-y-1">
            <span className="font-bold text-[#667085] uppercase tracking-wider block">Business Justification</span>
            <p className="text-[#17202A] font-medium">{record.details.businessJustification}</p>
          </div>
        )}

        {record.details?.humanDecisionBy && (
          <div className="p-4 bg-[#EAF8F2] rounded-xl border border-[#16855B]/20 text-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16855B] shrink-0" />
            <div>
              <span className="font-bold text-[#16855B] block">Human Governance Approval Verified</span>
              <p className="text-[#17202A]">Explicitly reviewed and approved by {record.details.humanDecisionBy}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
