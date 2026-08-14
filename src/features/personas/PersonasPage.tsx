import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, ChannelBadge, AIBadge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { mockPersonas } from '../../mock/data';
import { Persona } from '../../types';
import { Plus, Users, ArrowRight, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';

export const PersonasPage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customer Personas"
        subtitle="Audience segments enriched with AI behavioral performance intelligence"
        action={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Create Persona
          </Button>
        }
      />

      {/* Grid of Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockPersonas.map((persona) => (
          <Card
            key={persona.id}
            hoverable
            onClick={() => setSelectedPersona(persona)}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#173B63]"
                />
                <div>
                  <h3 className="text-base font-bold text-[#17202A]">{persona.name}</h3>
                  <p className="text-xs text-[#667085]">{persona.occupation}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-[#E4E7EC] pt-3">
                <div>
                  <span className="text-[#667085]">Age Range:</span>{' '}
                  <span className="font-semibold text-[#17202A]">{persona.ageRange}</span>
                </div>
                <div>
                  <span className="text-[#667085]">Location:</span>{' '}
                  <span className="font-semibold text-[#17202A] line-clamp-1">{persona.location}</span>
                </div>
                <div>
                  <span className="text-[#667085]">Top Format:</span>{' '}
                  <Badge variant="secondary">{persona.topContentType}</Badge>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">Preferred Channels:</span>
                  <div className="flex flex-wrap gap-1">
                    {persona.preferredChannels.map((c) => (
                      <ChannelBadge key={c} channel={c} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="mt-4 pt-3 border-t border-[#E4E7EC] bg-[#F0F0FF] p-3 rounded-lg border border-[#C7C7FF]">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> AI Behavioral Observation
              </div>
              <p className="text-xs text-[#17202A] font-medium leading-snug line-clamp-2">
                "{persona.aiObservation}"
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Persona Drawer Detail */}
      {selectedPersona && (
        <Drawer
          isOpen={!!selectedPersona}
          onClose={() => setSelectedPersona(null)}
          title={selectedPersona.name}
          subtitle={`${selectedPersona.occupation} • ${selectedPersona.ageRange} yrs`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedPersona.avatar}
                alt={selectedPersona.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#173B63]"
              />
              <div>
                <h3 className="text-lg font-bold text-[#17202A]">{selectedPersona.name}</h3>
                <p className="text-xs text-[#667085]">{selectedPersona.location}</p>
                <div className="flex gap-1.5 mt-2">
                  {selectedPersona.preferredChannels.map((c) => (
                    <ChannelBadge key={c} channel={c} />
                  ))}
                </div>
              </div>
            </div>

            {/* Historical Performance */}
            <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC] grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] block">Engagement</span>
                <span className="text-sm font-bold text-[#16855B]">{selectedPersona.historicalPerformance.engagementRate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] block">Conversion</span>
                <span className="text-sm font-bold text-[#173B63]">{selectedPersona.historicalPerformance.conversionRate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] block">Peak Time</span>
                <span className="text-xs font-bold text-[#17202A]">{selectedPersona.historicalPerformance.preferredTime}</span>
              </div>
            </div>

            {/* Needs & Pain Points */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Needs & Expectations</h4>
                <div className="space-y-1.5">
                  {selectedPersona.needs.map((n, i) => (
                    <div key={i} className="text-xs text-[#17202A] p-2.5 bg-white rounded-lg border border-[#E4E7EC] font-medium">
                      • {n}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Pain Points</h4>
                <div className="space-y-1.5">
                  {selectedPersona.painPoints.map((p, i) => (
                    <div key={i} className="text-xs text-[#C53B3B] p-2.5 bg-[#FDF2F2] rounded-lg border border-[#C53B3B]/20 font-medium">
                      ⚠ {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Evidence */}
            <div className="p-4 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF]">
              <AIBadge roleName="Performance Analyst" className="mb-2" />
              <h4 className="text-xs font-bold text-[#17202A] mb-1">AI Recommendation Context</h4>
              <p className="text-xs text-[#17202A] font-medium leading-relaxed">
                {selectedPersona.aiObservation}
              </p>
              <p className="text-[11px] text-[#5B5BD6] mt-2 font-semibold">
                Evidence: {selectedPersona.evidence}
              </p>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
