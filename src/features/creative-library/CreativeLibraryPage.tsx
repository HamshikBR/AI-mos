import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { mockCreativeAssets } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, Filter, Upload, Image, Trash2, Edit3, ArrowRight } from 'lucide-react';

export const CreativeLibraryPage: React.FC = () => {
  const [channelFilter, setChannelFilter] = useState('All');
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const filteredAssets = channelFilter === 'All'
    ? mockCreativeAssets
    : mockCreativeAssets.filter((a) => a.channel === channelFilter);

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAssetIds.includes(id)) {
      setSelectedAssetIds(selectedAssetIds.filter((item) => item !== id));
    } else {
      setSelectedAssetIds([...selectedAssetIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creative Assets Library"
        subtitle="Manage user-uploaded photos, video media, and AI-generated campaign content"
        action={
          <div className="flex gap-3">
            <Button
              variant="outline"
              leftIcon={<Sparkles className="w-4 h-4 text-[#5B5BD6]" />}
              onClick={() => navigate('/creative-studio')}
            >
              Generate with AI
            </Button>
            <Button
              variant="primary"
              leftIcon={<Upload className="w-4 h-4" />}
              onClick={() => navigate('/creative-library/upload')}
            >
              + Upload Photos
            </Button>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E4E7EC] shadow-2xs">
        <div className="flex items-center gap-3">
          <Select
            options={[
              { value: 'All', label: 'All Channels' },
              { value: 'Instagram', label: 'Instagram' },
              { value: 'Facebook', label: 'Facebook' },
              { value: 'YouTube', label: 'YouTube' },
            ]}
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="w-44"
          />
        </div>

        {selectedAssetIds.length > 0 && (
          <div className="flex items-center gap-3 bg-[#F0F0FF] px-3.5 py-1.5 rounded-lg border border-[#C7C7FF]">
            <span className="text-xs font-bold text-[#5B5BD6]">{selectedAssetIds.length} Assets Selected</span>
            <Button
              variant="ai"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => navigate('/creative-studio')}
            >
              Use in Creative Studio
            </Button>
          </div>
        )}
      </div>

      {/* Visual Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => {
          const isSelected = selectedAssetIds.includes(asset.id);
          return (
            <Card
              key={asset.id}
              hoverable
              onClick={() => navigate(`/creative-library/${asset.id}`)}
              className={`relative overflow-hidden group flex flex-col justify-between ${
                isSelected ? 'ring-2 ring-[#5B5BD6] border-transparent' : ''
              }`}
            >
              {/* Checkbox Overlay */}
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => toggleSelect(asset.id, e as any)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded border-[#E4E7EC] text-[#5B5BD6] focus:ring-[#5B5BD6] cursor-pointer"
                />
              </div>

              <div>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3 bg-[#F7F8FA]">
                  <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-2 right-2">
                    <ChannelBadge channel={asset.channel} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={asset.status} />
                    <span className="text-[10px] text-[#667085]">{asset.mediaType.toUpperCase()}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#17202A] line-clamp-1 mt-1">{asset.title}</h4>
                  <p className="text-[11px] text-[#667085] line-clamp-1">{asset.campaignName || 'Unassigned'}</p>
                </div>
              </div>

              {asset.isAiGenerated && (
                <div className="mt-3 pt-2 border-t border-[#E4E7EC]">
                  <AIBadge roleName={asset.aiRole} />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
