import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { mockApprovals } from '../../mock/data';
import { approvalService } from '../../services/approvalService';
import { CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const ApprovalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [approval, setApproval] = useState(mockApprovals.find((a) => a.id === id) || mockApprovals[0]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectCategory, setRejectCategory] = useState<'Brand mismatch' | 'Incorrect information' | 'Creative issue' | 'Strategy issue' | 'Other'>('Brand mismatch');
  const [rejectComments, setRejectComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const updated = await approvalService.updateApprovalStatus(approval.id, 'Approved', 'Sarah Johnson (Brand Manager)');
      setApproval(updated);
      navigate('/publishing/new');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmReject = async () => {
    setIsSubmitting(true);
    try {
      const updated = await approvalService.updateApprovalStatus(
        approval.id,
        'Rejected',
        'Sarah Johnson (Brand Manager)',
        rejectCategory,
        rejectComments
      );
      setApproval(updated);
      setIsRejectModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Approval Review: ${approval.assetTitle}`}
        subtitle={`${approval.campaignName} • ${approval.channel} ${approval.contentType}`}
        action={
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/approvals')}>
            Back to Queue
          </Button>
        }
      />

      {/* Split-Screen Review Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL: Large Creative Preview (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-0 overflow-hidden sticky top-24">
            <img src={approval.assetPreviewUrl} alt={approval.assetTitle} className="w-full max-h-[580px] object-cover" />
            <div className="p-4 flex items-center justify-between bg-[#F7F8FA] border-t border-[#E4E7EC]">
              <ChannelBadge channel={approval.channel} />
              <StatusBadge status={approval.status} />
            </div>
          </Card>
        </div>

        {/* RIGHT PANEL: AI Justification & Governance Checks (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Metadata Card */}
          <Card className="space-y-4 border-t-4 border-t-[#173B63]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Generated Artifact Details</span>
              <AIBadge roleName={approval.aiRole} />
            </div>

            <div className="space-y-2 text-xs">
              <p><span className="text-[#667085]">Campaign:</span> <span className="font-bold text-[#17202A]">{approval.campaignName}</span></p>
              <p><span className="text-[#667085]">Submitted At:</span> <span className="font-semibold text-[#17202A]">{approval.submittedAt}</span></p>
            </div>

            <div className="p-3.5 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF] space-y-1">
              <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider block">AI Business Justification</span>
              <p className="text-xs text-[#17202A] font-medium leading-relaxed">
                "{approval.businessJustification}"
              </p>
            </div>
          </Card>

          {/* Evidence Checklist */}
          <Card className="space-y-3">
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5B5BD6]" /> Context Used by AI
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#16855B] font-semibold bg-[#EAF8F2] p-2 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Brand DNA v3.2
              </div>
              <div className="flex items-center gap-2 text-[#16855B] font-semibold bg-[#EAF8F2] p-2 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Campaign Brief
              </div>
              <div className="flex items-center gap-2 text-[#16855B] font-semibold bg-[#EAF8F2] p-2 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Customer Persona
              </div>
              <div className="flex items-center gap-2 text-[#16855B] font-semibold bg-[#EAF8F2] p-2 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> Historical Performance
              </div>
            </div>
          </Card>

          {/* Brand Compliance Checks */}
          <Card className="space-y-3 border-l-4 border-l-[#16855B]">
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16855B]" /> Automated Brand Compliance Checks
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-[#F7F8FA] rounded">
                <span>Brand Tone Alignment</span>
                <span className="text-[#16855B] font-bold">Passed (98%)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#F7F8FA] rounded">
                <span>Terminology Rules</span>
                <span className="text-[#16855B] font-bold">Passed</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#F7F8FA] rounded">
                <span>Target Audience Fit</span>
                <span className="text-[#16855B] font-bold">Passed</span>
              </div>
            </div>
          </Card>

          {/* Sticky Bottom Actions */}
          <div className="p-4 bg-white rounded-xl border border-[#E4E7EC] shadow-md flex items-center justify-between gap-4">
            <Button
              variant="danger"
              size="md"
              leftIcon={<XCircle className="w-4 h-4" />}
              onClick={() => setIsRejectModalOpen(true)}
            >
              Reject Asset
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              leftIcon={<CheckCircle2 className="w-5 h-5" />}
              isLoading={isSubmitting}
              onClick={handleApprove}
            >
              Approve Asset & Proceed to Publishing
            </Button>
          </div>
        </div>
      </div>

      {/* Reject Reason Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Creative Asset"
        subtitle="Provide reason for governance audit record"
      >
        <div className="space-y-4">
          <Select
            label="Rejection Reason Category"
            options={[
              { value: 'Brand mismatch', label: 'Brand mismatch' },
              { value: 'Incorrect information', label: 'Incorrect information' },
              { value: 'Creative issue', label: 'Creative issue' },
              { value: 'Strategy issue', label: 'Strategy issue' },
              { value: 'Other', label: 'Other' },
            ]}
            value={rejectCategory}
            onChange={(e: any) => setRejectCategory(e.target.value)}
          />

          <Textarea
            label="Feedback & Rejection Comments"
            placeholder="Explain why this creative asset was rejected..."
            value={rejectComments}
            onChange={(e) => setRejectComments(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#E4E7EC]">
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={isSubmitting} onClick={handleConfirmReject}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
