import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, AIBadge } from '../../components/ui/Badge';
import { mockKnowledgeAssets } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Search, CheckCircle2, Sparkles } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const [knowledgeList, setKnowledgeList] = useState(mockKnowledgeAssets);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Repository"
        subtitle="Institutional marketing learnings, campaign post-mortems, and AI system memory"
        action={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/knowledge/new')}
          >
            Capture Campaign Learnings
          </Button>
        }
      />

      <div className="space-y-6">
        {knowledgeList.map((asset) => (
          <Card key={asset.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
              <div>
                <Badge variant="primary" className="mb-1">{asset.category}</Badge>
                <h3 className="text-base font-bold text-[#17202A]">{asset.title}</h3>
              </div>
              <span className="text-xs text-[#667085]">Created: {asset.createdAt}</span>
            </div>

            <p className="text-xs text-[#17202A] leading-relaxed font-medium bg-[#F7F8FA] p-3.5 rounded-xl border border-[#E4E7EC]">
              {asset.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#EAF8F2] rounded-lg border border-[#16855B]/20">
                <span className="font-bold text-[#16855B] block mb-1">What Worked (Success Factors)</span>
                <ul className="space-y-1 text-[#17202A]">
                  {asset.whatWorked.map((w, i) => (
                    <li key={i}>✓ {w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#FDF2F2] rounded-lg border border-[#C53B3B]/20">
                <span className="font-bold text-[#C53B3B] block mb-1">What Didn't (Lessons Learned)</span>
                <ul className="space-y-1 text-[#17202A]">
                  {asset.whatDidnt.map((d, i) => (
                    <li key={i}>⚠ {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#667085]">Utilized by AI Roles:</span>
                <div className="flex flex-wrap gap-1">
                  {asset.usedByAiRoles.map((role, i) => (
                    <AIBadge key={i} roleName={role} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
