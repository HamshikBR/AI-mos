import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { AIBadge } from '../../components/ui/Badge';
import { knowledgeService } from '../../services/knowledgeService';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Save, ArrowLeft } from 'lucide-react';

export const NewKnowledgePage: React.FC = () => {
  const [title, setTitle] = useState('Festive Season Pre-Booking Campaign Learnings');
  const [category, setCategory] = useState<'Brand' | 'Campaigns' | 'Customers' | 'Content' | 'Performance' | 'Policies'>('Campaigns');
  const [summary, setSummary] = useState('Key insights from early bird festive staycation promotions targeting corporate decision makers.');
  const [whatWorked, setWhatWorked] = useState('Corporate staycation packages with private butler service hooks yielded highest conversions.');
  const [whatDidnt, setWhatDidnt] = useState('General unsegmented festive post text suffered low engagement.');
  const [recommendedActions, setRecommendedActions] = useState('Focus future festive promo on personalized corporate butler perks.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await knowledgeService.saveLearning({
        title,
        category,
        summary,
        whatWorked: [whatWorked],
        whatDidnt: [whatDidnt],
        recommendedActions: [recommendedActions],
        evidence: 'Based on Q3 campaign performance analytics',
        usedByAiRoles: ['Campaign Planner AI', 'Content Planner AI', 'Performance Analyst AI'],
        createdBy: 'Sarah Johnson (Knowledge Steward)',
      });
      navigate('/knowledge');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Capture Campaign Learning"
        subtitle="AI-assisted post-mortem knowledge capture for continuous system intelligence"
        action={
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/knowledge')}>
            Cancel
          </Button>
        }
      />

      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <h3 className="text-base font-bold text-[#17202A]">Knowledge Asset Draft</h3>
          <AIBadge roleName="Knowledge Steward AI" />
        </div>

        <Input label="Learning Asset Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Select
          label="Category"
          options={[
            { value: 'Campaigns', label: 'Campaigns' },
            { value: 'Brand', label: 'Brand' },
            { value: 'Customers', label: 'Customers' },
            { value: 'Content', label: 'Content' },
            { value: 'Performance', label: 'Performance' },
          ]}
          value={category}
          onChange={(e: any) => setCategory(e.target.value)}
        />

        <Textarea label="Executive Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <Textarea label="What Worked (Success Factors)" value={whatWorked} onChange={(e) => setWhatWorked(e.target.value)} />
        <Textarea label="What Didn't Work (Challenges)" value={whatDidnt} onChange={(e) => setWhatDidnt(e.target.value)} />
        <Textarea label="Recommended Future Action" value={recommendedActions} onChange={(e) => setRecommendedActions(e.target.value)} />

        <div className="flex justify-end pt-4 border-t border-[#E4E7EC]">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
            isLoading={isSubmitting}
            onClick={handleSave}
          >
            Approve & Save to Repository
          </Button>
        </div>
      </Card>
    </div>
  );
};
