import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AIBadge, StatusBadge } from '../../components/ui/Badge';
import { mockRecommendations } from '../../mock/data';
import { recommendationService } from '../../services/recommendationService';
import { auditService } from '../../services/auditService';
import { ThumbsUp, Sparkles, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDecision = async (id: string, decision: 'Accepted' | 'Rejected') => {
    setIsSubmitting(true);
    try {
      const updated = await recommendationService.respondToRecommendation(id, decision, 'Sarah Johnson (Brand Manager)');
      
      // Audit record creation
      await auditService.recordEvent({
        actor: 'Sarah Johnson',
        actorType: 'Human',
        action: `AI Recommendation ${decision}`,
        artifact: updated.title,
        result: decision === 'Accepted' ? 'Approved' : 'Rejected',
        details: {
          businessJustification: updated.businessImpact,
          humanDecisionBy: 'Sarah Johnson',
        },
      });

      setRecommendations((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Recommendations"
        subtitle="Actionable marketing strategy optimizations. Humans decide — AI recommends."
      />

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="space-y-4 border-t-4 border-t-[#5B5BD6]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-[#5B5BD6]" />
                <h3 className="text-base font-bold text-[#17202A]">{rec.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <AIBadge roleName={rec.aiRole} />
                <StatusBadge status={rec.status} />
              </div>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] space-y-2">
              <span className="text-[10px] font-bold text-[#173B63] uppercase tracking-wider block">Proposed Action</span>
              <p className="text-sm text-[#17202A] font-semibold">{rec.recommendation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white rounded-lg border border-[#E4E7EC]">
                <span className="font-bold text-[#667085] block mb-0.5">Why:</span>
                <p className="text-[#17202A]">{rec.why}</p>
              </div>
              <div className="p-3 bg-[#EAF8F2] rounded-lg border border-[#16855B]/20">
                <span className="font-bold text-[#16855B] block mb-0.5">Expected Business Impact:</span>
                <p className="text-[#17202A] font-semibold">{rec.businessImpact}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-between text-xs">
              <span className="text-[#5B5BD6] font-medium">Evidence Base: {rec.evidence}</span>

              {rec.status === 'Pending' ? (
                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<XCircle className="w-4 h-4" />}
                    isLoading={isSubmitting}
                    onClick={() => handleDecision(rec.id, 'Rejected')}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    isLoading={isSubmitting}
                    onClick={() => handleDecision(rec.id, 'Accepted')}
                  >
                    Accept & Record Human Decision
                  </Button>
                </div>
              ) : (
                <div className="text-xs font-semibold text-[#667085]">
                  Decision Recorded: <span className="font-bold text-[#17202A]">{rec.status} by {rec.decisionBy}</span> ({rec.decisionTimestamp})
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
