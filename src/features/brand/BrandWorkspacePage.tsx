import React from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { Building2, Dna, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { mockBrandDNA, mockPersonas } from '../../mock/data';

export const BrandWorkspacePage: React.FC = () => {
  const { currentBrand } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title={currentBrand.name}
        subtitle={`Brand Workspace — ${currentBrand.location}`}
        action={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/brand/dna')}>
              View DNA Version History
            </Button>
            <Button variant="primary" onClick={() => navigate('/brand/dna')}>
              Manage Brand DNA
            </Button>
          </div>
        }
      />

      {/* Brand Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Brand Health Score"
          value={`${currentBrand.brandHealthScore}%`}
          change="Top 5% Hospitality"
          changeType="positive"
          icon={<ShieldCheck className="w-5 h-5 text-[#16855B]" />}
        />
        <MetricCard
          title="Brand Consistency"
          value={`${currentBrand.consistencyScore}%`}
          change="AI Audit Verified"
          changeType="positive"
          icon={<CheckCircle2 className="w-5 h-5 text-[#173B63]" />}
        />
        <MetricCard
          title="Brand DNA Status"
          value={currentBrand.dnaStatus}
          description={`Version ${mockBrandDNA.version}`}
          icon={<Dna className="w-5 h-5 text-[#5B5BD6]" />}
        />
        <MetricCard
          title="Customer Personas"
          value={currentBrand.personasCount}
          description="Target segments active"
          icon={<Users className="w-5 h-5 text-[#287C7A]" />}
        />
      </div>

      {/* Brand Overview & Positioning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader
              title="Brand Positioning & Mission"
              subtitle={`Version ${mockBrandDNA.version} • Approved by ${mockBrandDNA.approvedBy}`}
            />
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">Positioning Statement</h4>
                <p className="text-sm text-[#17202A] leading-relaxed font-medium bg-[#F7F8FA] p-4 rounded-xl border border-[#E4E7EC]">
                  "{mockBrandDNA.positioning}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Brand Values</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockBrandDNA.values.map((v, i) => (
                      <Badge key={i} variant="primary">{v}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Brand Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockBrandDNA.personality.map((p, i) => (
                      <Badge key={i} variant="secondary">{p}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Personas Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Active Customer Personas"
              subtitle={`${mockPersonas.length} defined personas`}
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate('/brand/personas')}>
                  View All
                </Button>
              }
            />
            <div className="space-y-3">
              {mockPersonas.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate('/brand/personas')}
                  className="p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#17202A]">{p.name}</h4>
                      <p className="text-[11px] text-[#667085]">{p.occupation}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#667085]" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
