import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { AIBadge, ChannelBadge } from '../../components/ui/Badge';
import { campaignService } from '../../services/campaignService';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Rocket } from 'lucide-react';

export const CreateCampaignPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Festive Grand Feast Promotion');
  const [objective, setObjective] = useState('Drive high-margin table reservations and corporate banquets during festive season');
  const [description, setDescription] = useState('A comprehensive multi-channel campaign targeting affluent local families and corporate tech leaders.');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-10-31');
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(['Weekend Family', 'Business Traveller']);
  const [selectedChannels, setSelectedChannels] = useState<('Instagram' | 'Facebook' | 'YouTube')[]>(['Instagram', 'Facebook']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = async () => {
    setIsSubmitting(true);
    try {
      const newCamp = await campaignService.createCampaign({
        name,
        objective,
        description,
        startDate,
        endDate,
        status: 'Active',
        owner: 'Sarah Johnson',
        targetPersonas: selectedPersonas,
        channels: selectedChannels,
      });
      navigate(`/campaigns/${newCamp.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Brief' },
    { num: 2, title: 'Audience' },
    { num: 3, title: 'AI Strategy' },
    { num: 4, title: 'Content Plan' },
    { num: 5, title: 'Review & Launch' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Create New Campaign"
        subtitle="Step-by-step campaign architecture with embedded AI strategic assistance"
      />

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E4E7EC] shadow-2xs">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s.num
                  ? 'bg-[#173B63] text-white ring-4 ring-[#173B63]/10'
                  : step > s.num
                  ? 'bg-[#16855B] text-white'
                  : 'bg-[#F1F3F5] text-[#667085]'
              }`}
            >
              {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-semibold ${step === s.num ? 'text-[#17202A]' : 'text-[#667085]'}`}>
              {s.title}
            </span>
            {s.num < steps.length && <div className="w-8 h-px bg-[#E4E7EC] hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Step 1: Brief */}
      {step === 1 && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-[#17202A]">Step 1: Campaign Brief</h3>
          <Input label="Campaign Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Primary Objective" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <Textarea label="Campaign Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E4E7EC]">
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(2)}>
              Next: Audience Selection
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Audience */}
      {step === 2 && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-[#17202A]">Step 2: Audience & Target Channels</h3>

          <div>
            <label className="block text-xs font-semibold text-[#17202A] uppercase tracking-wider mb-2">Target Personas</label>
            <div className="grid grid-cols-2 gap-3">
              {['Weekend Family', 'Business Traveller', 'Luxury Couple', 'Local Food Explorer'].map((p) => (
                <label key={p} className="flex items-center gap-3 p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F8FA] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPersonas.includes(p)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedPersonas([...selectedPersonas, p]);
                      else setSelectedPersonas(selectedPersonas.filter((item) => item !== p));
                    }}
                    className="rounded border-[#E4E7EC] text-[#173B63]"
                  />
                  <span className="text-xs font-bold text-[#17202A]">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(3)}>
              Next: AI Strategy
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: AI Strategy */}
      {step === 3 && (
        <Card className="space-y-4 border-l-4 border-l-[#5B5BD6]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#17202A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5B5BD6]" /> Step 3: AI Strategic Assistance
            </h3>
            <AIBadge roleName="Marketing Strategist" />
          </div>

          <div className="p-4 bg-[#F0F0FF] rounded-xl border border-[#C7C7FF] space-y-3">
            <div>
              <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider block">Suggested Objective</span>
              <p className="text-xs font-bold text-[#17202A]">Drive weekend table reservations with high-res food storytelling</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider block">Business Justification</span>
              <p className="text-xs text-[#17202A]">Weekend dining revenue yields 38% higher margin than weekday dining. Target personas demonstrate high conversion when presented with dessert prep videos.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-wider block">Evidence Base</span>
              <p className="text-xs text-[#667085]">Analyzed 18 previous dining campaigns across Q1-Q2 2026.</p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="ai" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(4)}>
              Use Recommendation & Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4 & 5: Review & Launch */}
      {(step === 4 || step === 5) && (
        <Card className="space-y-6">
          <h3 className="text-base font-bold text-[#17202A]">Step 5: Readiness Checklist & Launch</h3>

          <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#16855B]">
              <CheckCircle2 className="w-4 h-4" /> Brand aligned (Brand DNA v3.2 checked)
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#16855B]">
              <CheckCircle2 className="w-4 h-4" /> Audience defined ({selectedPersonas.join(', ')})
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#16855B]">
              <CheckCircle2 className="w-4 h-4" /> Timeline valid ({startDate} to {endDate})
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C98216]">
              <AlertTriangle className="w-4 h-4" /> Initial content plan assets require photo uploads in Creative Studio
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(3)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Rocket className="w-4 h-4" />}
              isLoading={isSubmitting}
              onClick={handleLaunch}
            >
              Launch Campaign Workspace
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
