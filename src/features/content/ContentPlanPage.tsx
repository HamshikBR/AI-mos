import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, ChannelBadge } from '../../components/ui/Badge';
import { mockCreativeAssets } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen } from 'lucide-react';

export const ContentPlanPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Plan"
        subtitle="Master overview of content assets across all active campaigns"
        action={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => navigate('/creative-library/upload')}>
            Upload New Photos
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCreativeAssets.map((asset) => (
          <Card key={asset.id} hoverable onClick={() => navigate(`/creative-library/${asset.id}`)}>
            <img src={asset.imageUrl} alt={asset.title} className="w-full h-44 object-cover rounded-lg mb-3" />
            <div className="flex items-center justify-between mb-2">
              <ChannelBadge channel={asset.channel} />
              <StatusBadge status={asset.status} />
            </div>
            <h4 className="text-xs font-bold text-[#17202A] line-clamp-1">{asset.title}</h4>
            <p className="text-[11px] text-[#667085] mt-1">{asset.campaignName}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
