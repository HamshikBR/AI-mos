import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { mockApprovals } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const ApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState(mockApprovals);
  const navigate = useNavigate();

  const pendingApprovals = approvals.filter((a) => a.status === 'Pending');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approval Workspace"
        subtitle={`${pendingApprovals.length} creative assets require your human review & approval`}
      />

      <div className="space-y-4">
        {approvals.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => navigate(`/approvals/${item.id}`)}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 flex-1">
              <img src={item.assetPreviewUrl} alt={item.assetTitle} className="w-16 h-16 rounded-lg object-cover" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#17202A]">{item.assetTitle}</h3>
                  <AIBadge roleName={item.aiRole} />
                </div>
                <p className="text-xs text-[#667085]">{item.campaignName} • Submitted: {item.submittedAt}</p>
                <p className="text-xs text-[#17202A] line-clamp-1 font-medium bg-[#F7F8FA] px-2.5 py-1 rounded border border-[#E4E7EC]">
                  Justification: {item.businessJustification}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#E4E7EC] pt-3 md:pt-0 md:pl-6">
              <ChannelBadge channel={item.channel} />
              <StatusBadge status={item.status} />
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Review
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
