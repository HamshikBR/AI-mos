import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Search, Layers, Image, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { mockCampaigns, mockCreativeAssets, mockKnowledgeAssets } from '../../mock/data';
import { useNavigate } from 'react-router-dom';

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredCampaigns = query
    ? mockCampaigns.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.objective.toLowerCase().includes(query.toLowerCase()))
    : mockCampaigns.slice(0, 2);

  const filteredAssets = query
    ? mockCreativeAssets.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : mockCreativeAssets.slice(0, 2);

  const filteredKnowledge = query
    ? mockKnowledgeAssets.filter((k) => k.title.toLowerCase().includes(query.toLowerCase()))
    : mockKnowledgeAssets.slice(0, 2);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Search" maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns, creative assets, knowledge repository, audit records..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-lg text-sm text-[#17202A] focus:outline-none focus:ring-2 focus:ring-[#173B63]"
            autoFocus
          />
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Campaigns */}
          {filteredCampaigns.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Campaigns
              </h4>
              <div className="space-y-1.5">
                {filteredCampaigns.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/campaigns/${c.id}`)}
                    className="p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h5 className="text-xs font-semibold text-[#17202A]">{c.name}</h5>
                      <p className="text-[11px] text-[#667085] line-clamp-1">{c.objective}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#667085]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Creative Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" /> Creative Assets
              </h4>
              <div className="space-y-1.5">
                {filteredAssets.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => handleSelect(`/creative-library/${a.id}`)}
                    className="p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={a.imageUrl} alt={a.title} className="w-8 h-8 rounded object-cover" />
                      <div>
                        <h5 className="text-xs font-semibold text-[#17202A]">{a.title}</h5>
                        <p className="text-[11px] text-[#667085]">{a.channel} • {a.contentType}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#667085]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Assets */}
          {filteredKnowledge.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Knowledge Repository
              </h4>
              <div className="space-y-1.5">
                {filteredKnowledge.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => handleSelect('/knowledge')}
                    className="p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h5 className="text-xs font-semibold text-[#17202A]">{k.title}</h5>
                      <p className="text-[11px] text-[#667085] line-clamp-1">{k.summary}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#667085]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
