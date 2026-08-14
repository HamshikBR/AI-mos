import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { StatusBadge, AIBadge } from '../../components/ui/Badge';
import { mockGovernanceStatus, mockAuditLogs } from '../../mock/data';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileSpreadsheet, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GovernancePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Governance & Compliance Dashboard"
        subtitle="System-wide oversight: Human approval compliance, brand enforcement, and audit traceability"
      />

      {/* Governance Health Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Human Approval Compliance"
          value={`${mockGovernanceStatus.approvalCompliance}%`}
          change="100% Verified"
          changeType="positive"
          icon={<ShieldCheck className="w-5 h-5 text-[#16855B]" />}
        />
        <MetricCard
          title="Brand Consistency Score"
          value={`${mockGovernanceStatus.brandCompliance}%`}
          change="DNA v3.2 Enforced"
          changeType="positive"
          icon={<CheckCircle2 className="w-5 h-5 text-[#173B63]" />}
        />
        <MetricCard
          title="Publishing Compliance"
          value={`${mockGovernanceStatus.publishingCompliance}%`}
          change="0 Governance Violations"
          changeType="positive"
          icon={<Lock className="w-5 h-5 text-[#287C7A]" />}
        />
        <MetricCard
          title="AI Explainability Coverage"
          value={`${mockGovernanceStatus.aiExplainabilityCoverage}%`}
          change="Full Provenance"
          changeType="positive"
          icon={<AIBadge roleName="Explainability 100%" />}
        />
      </div>

      {/* Audit Activity Table */}
      <Card>
        <CardHeader
          title="Recent Governance Events & Audit Logs"
          subtitle="Real-time record of AI generation, human approval, and publishing actions"
          action={
            <button onClick={() => navigate('/audit')} className="text-xs text-[#173B63] font-bold hover:underline">
              View Complete Audit Trail →
            </button>
          }
        />

        <div className="space-y-3">
          {mockAuditLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => navigate(`/audit/${log.id}`)}
              className="p-3.5 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] hover:bg-white hover:shadow-2xs cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-[#E4E7EC]">
                  <FileSpreadsheet className="w-4 h-4 text-[#173B63]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17202A]">{log.actor}</span>
                    <span className="text-[10px] text-[#667085]">({log.actorType})</span>
                    {log.aiRole && <AIBadge roleName={log.aiRole} />}
                  </div>
                  <p className="text-[#17202A] font-medium mt-0.5">{log.action}: <span className="font-bold">{log.artifact}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[#667085]">{log.timestamp}</span>
                <StatusBadge status={log.result} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
