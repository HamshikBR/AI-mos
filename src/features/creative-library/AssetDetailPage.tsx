import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { mockCreativeAssets } from '../../mock/data';
import { approvalService } from '../../services/approvalService';
import { CheckCircle2, Sparkles, Send, RefreshCw, History, ShieldCheck, ArrowLeft } from 'lucide-react';

export const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [asset, setAsset] = useState(mockCreativeAssets.find((a) => a.id === id) || mockCreativeAssets[0]);

  const handleSendForApproval = async () => {
    setIsSubmitting(true);
    try {
      await approvalService.submitForApproval({
        assetId: asset.id,
        assetTitle: asset.title,
        assetPreviewUrl: asset.imageUrl,
        campaignId: asset.campaignId || 'camp_summer_dining',
        campaignName: asset.campaignName || 'Summer Dining Campaign',
        channel: asset.channel,
        contentType: asset.contentType,
        aiRole: asset.aiRole || 'Creative Director AI',
        businessJustification: asset.businessJustification || 'High-converting visual concept.',
        evidenceUsed: {
          brandDna: true,
          campaign: true,
          persona: true,
          historicalPerformance: true,
          knowledgeRepo: true,
        },
        brandChecks: {
          brandAligned: true,
          correctTerminology: true,
          correctAudience: true,
          campaignObjectiveAligned: true,
        },
      });
      setAsset({ ...asset, status: 'Pending Approval' });
      navigate('/approvals');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={asset.title}
        subtitle={`${asset.campaignName || 'General Asset'} • ${asset.channel} ${asset.contentType}`}
        action={
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/creative-library')}>
              Back to Library
            </Button>

            {asset.status !== 'Approved' && asset.status !== 'Pending Approval' && (
              <Button
                variant="primary"
                leftIcon={<Send className="w-4 h-4" />}
                isLoading={isSubmitting}
                onClick={handleSendForApproval}
              >
                Send for Approval
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Preview & Versions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <img src={asset.imageUrl} alt={asset.title} className="w-full max-h-[500px] object-cover" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <ChannelBadge channel={asset.channel} />
                  <StatusBadge status={asset.status} />
                </div>
                <span className="text-xs text-[#667085]">Created: {asset.uploadedAt}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-1">Caption Content</h4>
                <p className="text-sm text-[#17202A] bg-[#F7F8FA] p-4 rounded-xl border border-[#E4E7EC] leading-relaxed">
                  {asset.versions[asset.versions.length - 1]?.caption || asset.title}
                </p>
              </div>
            </div>
          </Card>

          {/* Version History */}
          <Card>
            <h3 className="text-base font-bold text-[#17202A] mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-[#173B63]" /> Version History
            </h3>
            <div className="space-y-3">
              {asset.versions.map((ver) => (
                <div key={ver.version} className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#173B63]">Version {ver.version}</span>
                    <p className="text-[#667085] mt-0.5">{ver.caption}</p>
                  </div>
                  <span className="text-[#98A2B3] text-[10px]">{ver.createdAt}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: AI Provenance & Explainability */}
        <div className="space-y-6">
          {asset.isAiGenerated && (
            <Card className="border-t-4 border-t-[#5B5BD6]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#17202A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5B5BD6]" /> AI Provenance & Context
                </h3>
                <AIBadge roleName={asset.aiRole} />
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#F0F0FF] rounded-lg border border-[#C7C7FF]">
                  <span className="font-bold text-[#5B5BD6] block mb-1">Business Justification</span>
                  <p className="text-[#17202A]">{asset.businessJustification}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-[#17202A] uppercase tracking-wider text-[10px]">Context Checklist</h4>
                  <div className="flex items-center gap-2 text-[#16855B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Brand DNA Aligned (v3.2)
                  </div>
                  <div className="flex items-center gap-2 text-[#16855B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Campaign Brief Matched
                  </div>
                  <div className="flex items-center gap-2 text-[#16855B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Persona Tone Calibrated
                  </div>
                  <div className="flex items-center gap-2 text-[#16855B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Historical Performance Proven
                  </div>
                  <div className="flex items-center gap-2 text-[#16855B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Knowledge Repository Used
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-base font-bold text-[#17202A] mb-3">Asset Controls</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" leftIcon={<RefreshCw className="w-4 h-4" onClick={() => navigate('/creative-studio')} />}>
                Regenerate Variations in Studio
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
