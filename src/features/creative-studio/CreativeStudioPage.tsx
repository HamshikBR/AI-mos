import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { AIBadge, ChannelBadge } from '../../components/ui/Badge';
import { creativeService } from '../../services/creativeService';
import { approvalService } from '../../services/approvalService';
import { mockCampaigns, mockPersonas, mockCreativeAssets } from '../../mock/data';
import { CreativeVariation, CreativeGenerationResult } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send, RefreshCw, CheckCircle2, Image as ImageIcon, Layers, Sliders, ArrowRight } from 'lucide-react';

export const CreativeStudioPage: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0].id);
  const [selectedPersona, setSelectedPersona] = useState(mockPersonas[0].id);
  const [selectedChannels, setSelectedChannels] = useState<('Instagram' | 'Facebook' | 'YouTube')[]>(['Instagram', 'Facebook']);
  const [contentType, setContentType] = useState('Carousel');
  const [prompt, setPrompt] = useState('Create a premium Instagram post for our weekend brunch. Use the uploaded food photos, highlight the 20% discount, and make it feel premium and inviting.');
  
  // Photo selection from library
  const sourcePhotoUrls = [
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  ];
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(sourcePhotoUrls);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<CreativeGenerationResult | null>(null);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [isSubmittingApproval, setIsSubmittingApproval] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await creativeService.generateCreative({
        campaignId: selectedCampaign,
        personaId: selectedPersona,
        channels: selectedChannels,
        contentType,
        sourcePhotoUrls: selectedPhotos,
        prompt,
        tone: 'Elevated & Inviting',
        format: contentType,
      });
      setGenerationResult(res);
      setSelectedVariationIndex(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendForApproval = async () => {
    if (!generationResult) return;
    const currentVar = generationResult.variations[selectedVariationIndex];
    setIsSubmittingApproval(true);
    try {
      // Add to library and send to approval
      const newAsset = await creativeService.addGeneratedAssetToLibrary({
        title: currentVar.headline,
        imageUrl: currentVar.imageUrl,
        mediaType: 'image',
        campaignId: selectedCampaign,
        campaignName: mockCampaigns.find((c) => c.id === selectedCampaign)?.name,
        targetPersonaId: selectedPersona,
        targetPersonaName: mockPersonas.find((p) => p.id === selectedPersona)?.name,
        channel: selectedChannels[0],
        contentType: contentType as any,
        status: 'Pending Approval',
        createdBy: currentVar.aiRole,
        isAiGenerated: true,
        aiRole: currentVar.aiRole,
        businessJustification: currentVar.aiReasoning,
        currentVersion: 1,
        versions: [
          {
            version: 1,
            imageUrl: currentVar.imageUrl,
            caption: currentVar.caption,
            createdAt: new Date().toLocaleString(),
            createdBy: currentVar.aiRole,
            aiRole: currentVar.aiRole,
          },
        ],
      });

      await approvalService.submitForApproval({
        assetId: newAsset.id,
        assetTitle: currentVar.headline,
        assetPreviewUrl: currentVar.imageUrl,
        campaignId: selectedCampaign,
        campaignName: mockCampaigns.find((c) => c.id === selectedCampaign)?.name || 'Summer Dining Campaign',
        channel: selectedChannels[0],
        contentType,
        aiRole: currentVar.aiRole,
        businessJustification: currentVar.aiReasoning,
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

      navigate('/approvals');
    } finally {
      setIsSubmittingApproval(false);
    }
  };

  const activeVariation: CreativeVariation | null = generationResult
    ? generationResult.variations[selectedVariationIndex]
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Creative Studio"
        subtitle="Contextual AI visual & copywriting workspace powered by Brand DNA & Customer Intelligence"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANEL: Context Controls & Source Photos (3 Cols) */}
        <div className="lg:col-span-3 space-y-5">
          <Card className="space-y-4">
            <h3 className="text-xs font-bold text-[#17202A] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#173B63]" /> Context Configuration
            </h3>

            <Select
              label="Campaign Workspace"
              options={mockCampaigns.map((c) => ({ value: c.id, label: c.name }))}
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            />

            <Select
              label="Target Persona"
              options={mockPersonas.map((p) => ({ value: p.id, label: p.name }))}
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
            />

            <Select
              label="Format Type"
              options={[
                { value: 'Carousel', label: 'Instagram Carousel' },
                { value: 'Post', label: 'Social Post' },
                { value: 'Reel', label: 'Reel / YouTube Short' },
              ]}
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            />
          </Card>

          {/* Selected Source Photos */}
          <Card className="space-y-3">
            <h3 className="text-xs font-bold text-[#17202A] uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-[#287C7A]" /> Source Photos ({selectedPhotos.length})
            </h3>
            <p className="text-[11px] text-[#667085]">AI uses these user-uploaded photos for creative composition.</p>
            <div className="grid grid-cols-3 gap-2">
              {sourcePhotoUrls.map((url, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden border border-[#E4E7EC] h-16">
                  <img src={url} alt="source" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => navigate('/creative-library/upload')}>
              + Upload More Photos
            </Button>
          </Card>
        </div>

        {/* MAIN CANVAS: Preview & Generation Variations (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="p-0 overflow-hidden flex flex-col justify-between min-h-[520px]">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-[#E4E7EC] border-t-[#5B5BD6] animate-spin" />
                  <Sparkles className="w-6 h-6 text-[#5B5BD6] animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-[#17202A]">Creative Director AI is generating concepts...</h4>
                <p className="text-xs text-[#5B5BD6] mt-1 font-semibold">Applying Brand DNA v3.2 & Weekend Family Persona rules</p>
              </div>
            ) : activeVariation ? (
              <div className="space-y-4">
                <img src={activeVariation.imageUrl} alt="creative preview" className="w-full h-64 object-cover" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <AIBadge roleName={activeVariation.aiRole} />
                    <span className="text-xs font-bold text-[#173B63]">Variation {selectedVariationIndex + 1} of 3</span>
                  </div>

                  <h3 className="text-base font-bold text-[#17202A]">{activeVariation.headline}</h3>
                  <p className="text-xs text-[#17202A] leading-relaxed bg-[#F7F8FA] p-3.5 rounded-xl border border-[#E4E7EC]">
                    {activeVariation.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      leftIcon={<Send className="w-4 h-4" />}
                      isLoading={isSubmittingApproval}
                      onClick={handleSendForApproval}
                    >
                      Send for Human Approval
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#667085]">
                <Sparkles className="w-12 h-12 text-[#5B5BD6] mb-3" />
                <h4 className="text-base font-bold text-[#17202A]">Ready to Generate Creative Concepts</h4>
                <p className="text-xs text-[#667085] max-w-sm mt-1">
                  Enter your concept prompt in the right panel and click Generate with AI.
                </p>
              </div>
            )}

            {/* Variation Switcher Pills */}
            {generationResult && (
              <div className="p-3 bg-[#F7F8FA] border-t border-[#E4E7EC] flex justify-center gap-2">
                {generationResult.variations.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariationIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedVariationIndex === idx
                        ? 'bg-[#5B5BD6] text-white shadow-xs'
                        : 'bg-white text-[#667085] border border-[#E4E7EC] hover:text-[#17202A]'
                    }`}
                  >
                    Variation {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT PANEL: AI Prompt & Explainability (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          <Card className="space-y-4 border-t-4 border-t-[#5B5BD6]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#17202A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5B5BD6]" /> AI Creative Assistant
              </h3>
              <AIBadge roleName="Creative Director AI" />
            </div>

            <Textarea
              label="What's your idea?"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your creative vision..."
            />

            <Button
              variant="ai"
              size="lg"
              className="w-full"
              leftIcon={<Sparkles className="w-4 h-4" />}
              isLoading={isGenerating}
              onClick={handleGenerate}
            >
              Generate AI Creatives
            </Button>
          </Card>

          {/* AI Reasoning & Evidence Card */}
          {activeVariation && (
            <Card className="space-y-3 bg-[#F0F0FF]/60 border-[#C7C7FF]">
              <h4 className="text-xs font-bold text-[#5B5BD6] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> AI Strategic Reasoning
              </h4>
              <p className="text-xs text-[#17202A] font-medium leading-relaxed">
                "{activeVariation.aiReasoning}"
              </p>

              <div className="pt-2 border-t border-[#C7C7FF] space-y-1 text-[11px]">
                <span className="font-bold text-[#17202A] block">Evidence Base:</span>
                <p className="text-[#5B5BD6]">{activeVariation.evidence}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {activeVariation.contextUsed.map((ctx, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white rounded text-[10px] font-semibold text-[#17202A] border border-[#C7C7FF]">
                      ✓ {ctx}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
