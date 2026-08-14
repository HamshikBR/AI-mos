import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, AIBadge } from '../../components/ui/Badge';
import { mockBrandDNA } from '../../mock/data';
import { Dna, Sliders, MessageSquare, Palette, Users, History, Edit3, CheckCircle2, ShieldAlert } from 'lucide-react';

export const BrandDnaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('voice');
  const [dna, setDna] = useState(mockBrandDNA);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Dna className="w-4 h-4" /> },
    { id: 'voice', label: 'Brand Voice', icon: <Sliders className="w-4 h-4" /> },
    { id: 'messaging', label: 'Messaging & Terminology', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'visual', label: 'Visual Identity', icon: <Palette className="w-4 h-4" /> },
    { id: 'version', label: 'Version History', icon: <History className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Brand DNA Configuration"
        subtitle={`Version ${dna.version} • Approved by ${dna.approvedBy} • Last updated ${dna.lastUpdated}`}
        action={
          <Button variant="primary" leftIcon={<Edit3 className="w-4 h-4" />}>
            Edit Brand DNA
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Brand Voice */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader title="Voice Sliders & Tone Controls" subtitle="Calibrated guidance for AI content generation agents" />
            <div className="space-y-6">
              {dna.voiceSliders.map((slider, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#17202A]">
                    <span>{slider.label}</span>
                    <span className="text-[#5B5BD6] font-bold">{slider.value}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
                    <span>{slider.left}</span>
                    <span>{slider.right}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={slider.value}
                    disabled
                    className="w-full h-2 bg-[#E4E7EC] rounded-lg appearance-none cursor-pointer accent-[#173B63]"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="AI Agents Brand Enforcement" subtitle="How AI agents leverage these voice parameters" />
            <div className="space-y-3">
              {dna.aiAgentsConfig.map((agent, i) => (
                <div key={i} className="p-3 rounded-lg border border-[#E4E7EC] flex items-center justify-between bg-[#F7F8FA]">
                  <div>
                    <h4 className="text-xs font-bold text-[#17202A]">{agent.name}</h4>
                    <p className="text-[11px] text-[#667085]">{agent.role}</p>
                  </div>
                  <AIBadge roleName={agent.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Messaging & Terminology */}
      {activeTab === 'messaging' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-l-4 border-l-[#16855B]">
            <CardHeader title="Preferred Terminology" subtitle="Mandatory vocabulary for hospitality storytelling" />
            <div className="space-y-2">
              {dna.messaging.preferredTerminology.map((term, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#16855B] bg-[#EAF8F2] p-2.5 rounded-lg border border-[#16855B]/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>"{term}"</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-l-4 border-l-[#C53B3B]">
            <CardHeader title="Avoided Terminology" subtitle="Strictly prohibited language (AI will flag & reject)" />
            <div className="space-y-2">
              {dna.messaging.avoidedTerminology.map((term, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#C53B3B] bg-[#FDF2F2] p-2.5 rounded-lg border border-[#C53B3B]/20">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>"{term}"</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Visual Identity */}
      {activeTab === 'visual' && (
        <Card>
          <CardHeader title="Visual & Photography Standards" subtitle="Guidance for AI creative image generation & color styling" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Primary Color</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg shadow-sm border border-[#E4E7EC]" style={{ backgroundColor: dna.visualIdentity.primaryColor }} />
                <div>
                  <p className="text-xs font-bold text-[#17202A]">{dna.visualIdentity.primaryColor}</p>
                  <p className="text-[11px] text-[#667085]">Deep Royal Navy</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Secondary Color</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg shadow-sm border border-[#E4E7EC]" style={{ backgroundColor: dna.visualIdentity.secondaryColor }} />
                <div>
                  <p className="text-xs font-bold text-[#17202A]">{dna.visualIdentity.secondaryColor}</p>
                  <p className="text-[11px] text-[#667085]">Teal Accent</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Typography</h4>
              <p className="text-sm font-semibold text-[#17202A]">{dna.visualIdentity.typography}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E4E7EC]">
            <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Photography & Lighting Style</h4>
            <p className="text-sm text-[#17202A] bg-[#F7F8FA] p-4 rounded-xl border border-[#E4E7EC]">
              {dna.visualIdentity.photographyStyle}
            </p>
          </div>
        </Card>
      )}

      {/* Tab 4: Overview & Version History */}
      {(activeTab === 'overview' || activeTab === 'version') && (
        <Card>
          <CardHeader title="Version Audit Trail" subtitle="History of Brand DNA revisions and approvals" />
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#E4E7EC] bg-[#F7F8FA] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#173B63] bg-[#173B63]/10 px-2 py-0.5 rounded">v3.2 Current</span>
                <h4 className="text-sm font-bold text-[#17202A] mt-1">Revised Tone Sliders & Voice Rules for Summer Dining</h4>
                <p className="text-xs text-[#667085]">Updated Aug 10, 2026 by Sarah Johnson (Brand Manager)</p>
              </div>
              <Button variant="outline" size="sm">View Diff</Button>
            </div>
            <div className="p-4 rounded-xl border border-[#E4E7EC] bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#667085] bg-[#F1F3F5] px-2 py-0.5 rounded">v3.1</span>
                <h4 className="text-sm font-semibold text-[#17202A] mt-1">Initial Brand Positioning & Visual Identity Alignment</h4>
                <p className="text-xs text-[#667085]">Updated May 15, 2026 by Sarah Johnson</p>
              </div>
              <Button variant="outline" size="sm">View Diff</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
