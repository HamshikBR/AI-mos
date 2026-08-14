import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, AIBadge } from '../../components/ui/Badge';
import { mockAuditLogs } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, ArrowRight, Search, ShieldCheck } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Audit Log"
        subtitle="Immutable audit trail of all AI generation, human decisioning, publishing, and system actions"
      />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-[#667085] uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Artifact</th>
                <th className="p-3.5">Campaign</th>
                <th className="p-3.5">Result</th>
                <th className="p-3.5 pr-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => navigate(`/audit/${log.id}`)}
                  className="hover:bg-[#F7F8FA] cursor-pointer transition-colors"
                >
                  <td className="p-3.5 pl-6 font-semibold text-[#17202A] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-bold text-[#17202A]">
                    <div className="flex items-center gap-1.5">
                      <span>{log.actor}</span>
                      {log.aiRole && <AIBadge roleName={log.aiRole} />}
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-[#17202A]">{log.action}</td>
                  <td className="p-3.5 text-[#667085]">{log.artifact}</td>
                  <td className="p-3.5 text-[#667085]">{log.campaign || 'N/A'}</td>
                  <td className="p-3.5"><StatusBadge status={log.result} /></td>
                  <td className="p-3.5 pr-6 text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View Record
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
