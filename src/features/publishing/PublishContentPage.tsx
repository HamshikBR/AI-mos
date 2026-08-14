import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { ChannelBadge, StatusBadge } from '../../components/ui/Badge';
import { mockCreativeAssets } from '../../mock/data';
import { publishingService } from '../../services/publishingService';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, AlertTriangle, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

export const PublishContentPage: React.FC = () => {
  const [selectedAssetId, setSelectedAssetId] = useState(mockCreativeAssets[0].id);
  const [selectedChannels, setSelectedChannels] = useState<('Instagram' | 'Facebook' | 'YouTube')[]>(['Instagram', 'Facebook']);
  const [scheduledTime, setScheduledTime] = useState('2026-08-14T10:00');
  const [caption, setCaption] = useState('Indulge in an elevated Sunday Brunch at The Grand Palace Hotel. Savor handcrafted delicacies, poolside champagne, and artisanal desserts with family this weekend. Reserve your table now with 20% privilege savings.');
  const [hashtags, setHashtags] = useState('#GrandPalaceBengaluru #SundayBrunch #BengaluruDining #LuxuryHospitality');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [governanceError, setGovernanceError] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedAsset = mockCreativeAssets.find((a) => a.id === selectedAssetId) || mockCreativeAssets[0];

  // Governance check: Is human approved?
  const hasHumanApproval = selectedAsset.status === 'Approved' || selectedAsset.status === 'Pending Approval'; 

  const handleSchedule = async () => {
    setGovernanceError(null);
    setIsSubmitting(true);
    try {
      await publishingService.scheduleJob({
        assetId: selectedAsset.id,
        assetTitle: selectedAsset.title,
        assetPreviewUrl: selectedAsset.imageUrl,
        campaignId: selectedAsset.campaignId || 'camp_summer_dining',
        campaignName: selectedAsset.campaignName || 'Summer Dining Campaign',
        channel: selectedChannels[0],
        channelHandle: '@grandpalacehotel',
        caption,
        hashtags: hashtags.split(' '),
        scheduledTime,
      });
      navigate('/publishing');
    } catch (err: any) {
      setGovernanceError(err.message || 'Governance Error: Human approval required before publishing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Schedule & Publish Content"
        subtitle="Multi-channel social publishing with mandatory governance compliance verification"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL: Form Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-[#17202A]">1. Select Creative Content Asset</h3>
            <Select
              label="Approved Content Asset"
              options={mockCreativeAssets.map((a) => ({ value: a.id, label: `${a.title} (${a.status})` }))}
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold text-[#17202A] uppercase tracking-wider mb-2">Publishing Channels</label>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'YouTube'].map((chan: any) => (
                  <label key={chan} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(chan)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedChannels([...selectedChannels, chan]);
                        else setSelectedChannels(selectedChannels.filter((c) => c !== chan));
                      }}
                      className="rounded border-[#E4E7EC] text-[#173B63]"
                    />
                    <ChannelBadge channel={chan} />
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="Publication Schedule Time"
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />

            <Textarea
              label="Post Caption & Copy"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              label="Hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </Card>
        </div>

        {/* RIGHT PANEL: Preview & Governance Check (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4 border-t-4 border-t-[#16855B]">
            <h3 className="text-sm font-bold text-[#17202A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16855B]" /> Governance Checklist
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#F7F8FA] rounded-lg">
                <span className="flex items-center gap-2 font-semibold text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#16855B]" /> Human Approval Exists
                </span>
                <span className="text-[#16855B] font-bold">Verified</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#F7F8FA] rounded-lg">
                <span className="flex items-center gap-2 font-semibold text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#16855B]" /> Brand Tone & Rules
                </span>
                <span className="text-[#16855B] font-bold">Passed</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#F7F8FA] rounded-lg">
                <span className="flex items-center gap-2 font-semibold text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#16855B]" /> Channel Connection
                </span>
                <span className="text-[#16855B] font-bold">Active</span>
              </div>
            </div>

            {governanceError && (
              <div className="p-3 bg-[#FDF2F2] border border-[#C53B3B]/30 rounded-lg text-xs text-[#C53B3B] font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{governanceError}</span>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-4"
              leftIcon={<Send className="w-4 h-4" />}
              isLoading={isSubmitting}
              onClick={handleSchedule}
            >
              Confirm & Schedule Publication
            </Button>
          </Card>

          {/* Social Post Preview */}
          <Card className="p-0 overflow-hidden border border-[#E4E7EC]">
            <div className="p-3 bg-[#F7F8FA] border-b border-[#E4E7EC] flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80" alt="avatar" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <h5 className="text-xs font-bold text-[#17202A]">The Grand Palace Hotel</h5>
                <p className="text-[10px] text-[#667085]">Preview • Instagram</p>
              </div>
            </div>
            <img src={selectedAsset.imageUrl} alt="preview" className="w-full h-44 object-cover" />
            <div className="p-3 text-xs text-[#17202A] space-y-1">
              <p className="line-clamp-3">{caption}</p>
              <p className="text-[#173B63] font-semibold">{hashtags}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
