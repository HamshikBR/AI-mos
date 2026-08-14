import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { AIBadge } from '../../components/ui/Badge';
import { creativeService } from '../../services/creativeService';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, Sparkles, CheckCircle2, Image, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { mockCampaigns, mockPersonas } from '../../mock/data';

interface UploadFileItem {
  id: string;
  file: File;
  previewUrl: string;
  categorySuggestion: string;
  brandRelevance: number;
  visualSubject: string;
}

export const MultiplePhotoUploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadFileItem[]>([]);
  const [step, setStep] = useState<'upload' | 'analyzing' | 'metadata' | 'complete'>('upload');
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0].id);
  const [selectedPersona, setSelectedPersona] = useState(mockPersonas[0].id);
  const [selectedChannel, setSelectedChannel] = useState<'Instagram' | 'Facebook' | 'YouTube'>('Instagram');
  const [selectedContentType, setSelectedContentType] = useState('Carousel');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    
    const items: UploadFileItem[] = selectedFiles.map((file, idx) => ({
      id: `file_${Date.now()}_${idx}`,
      file,
      previewUrl: URL.createObjectURL(file),
      categorySuggestion: file.name.toLowerCase().includes('brunch') ? 'Sunday Brunch / Culinary' : 'Hospitality Experience',
      brandRelevance: 94 + (idx % 5),
      visualSubject: 'Luxury Dining & Artisanal Cuisine',
    }));

    setFiles((prev) => [...prev, ...items]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartAnalysis = () => {
    if (files.length === 0) return;
    setStep('analyzing');
    setTimeout(() => {
      setStep('metadata');
    }, 1500); // simulate AI visual inspection
  };

  const handleFinalSave = async () => {
    setIsUploading(true);
    try {
      const rawFiles = files.map((f) => f.file);
      await creativeService.uploadAssets(rawFiles, selectedCampaign, selectedChannel, selectedContentType);
      setStep('complete');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Upload Creative Assets"
        subtitle="Batch upload photos & video media with AI visual classification"
      />

      {/* Step 1: Upload Dropzone */}
      {step === 'upload' && (
        <Card className="space-y-6">
          <div className="border-2 border-dashed border-[#173B63]/30 rounded-2xl p-10 text-center bg-[#F7F8FA] hover:bg-[#F0F0FF]/30 transition-colors">
            <UploadCloud className="w-12 h-12 text-[#173B63] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#17202A]">Drag & Drop multiple photos or media files here</h3>
            <p className="text-xs text-[#667085] mt-1 mb-4">Supports JPG, PNG, WEBP, MP4 (High Definition up to 50MB per file)</p>

            <label className="inline-block">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="px-5 py-2.5 bg-[#173B63] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer hover:bg-[#122F50] transition-colors inline-flex items-center gap-2">
                Browse Files
              </span>
            </label>
          </div>

          {/* Selected Files Preview Grid */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider">
                  Selected Files ({files.length})
                </h4>
                <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {files.map((item) => (
                  <div key={item.id} className="relative group rounded-lg overflow-hidden border border-[#E4E7EC]">
                    <img src={item.previewUrl} alt="preview" className="w-full h-28 object-cover" />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-1 right-1 p-1 bg-[#17202A]/70 text-white rounded-full hover:bg-[#C53B3B] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1.5 bg-white text-[10px] text-[#17202A] font-semibold truncate">
                      {item.file.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E4E7EC]">
                <Button
                  variant="ai"
                  size="md"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleStartAnalysis}
                >
                  Analyze Assets with AI
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Step 2: AI Analyzing State */}
      {step === 'analyzing' && (
        <Card className="p-12 text-center space-y-4">
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#E4E7EC] border-t-[#5B5BD6] animate-spin" />
            <Sparkles className="w-6 h-6 text-[#5B5BD6]" />
          </div>
          <h3 className="text-base font-bold text-[#17202A]">Analyzing {files.length} uploaded assets...</h3>
          <p className="text-xs text-[#5B5BD6] font-semibold">Running Brand Guardian visual subject & quality classification</p>
        </Card>
      )}

      {/* Step 3: Metadata Assignment & AI Analysis Results */}
      {step === 'metadata' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EC]">
            <div>
              <h3 className="text-base font-bold text-[#17202A]">AI Classification & Metadata Assignment</h3>
              <p className="text-xs text-[#667085]">Review AI tags and assign to campaign workspace</p>
            </div>
            <AIBadge roleName="Brand Guardian AI" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Assign to Campaign"
              options={mockCampaigns.map((c) => ({ value: c.id, label: c.name }))}
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            />
            <Select
              label="Target Persona"
              options={mockPersonas.map((p) => ({ value: p.id, label: p.name }))}
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
            />
            <Select
              label="Primary Channel"
              options={[
                { value: 'Instagram', label: 'Instagram' },
                { value: 'Facebook', label: 'Facebook' },
                { value: 'YouTube', label: 'YouTube' },
              ]}
              value={selectedChannel}
              onChange={(e: any) => setSelectedChannel(e.target.value)}
            />
            <Select
              label="Content Format"
              options={[
                { value: 'Carousel', label: 'Carousel' },
                { value: 'Post', label: 'Post' },
                { value: 'Reel', label: 'Reel / Short' },
              ]}
              value={selectedContentType}
              onChange={(e) => setSelectedContentType(e.target.value)}
            />
          </div>

          {/* AI Asset Inspection List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider">AI Visual Analysis Results</h4>
            {files.map((item) => (
              <div key={item.id} className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] flex items-center gap-4">
                <img src={item.previewUrl} alt="preview" className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#17202A]">{item.file.name}</span>
                    <span className="text-[#16855B] font-bold">Brand Relevance: {item.brandRelevance}%</span>
                  </div>
                  <p className="text-[#667085]">Visual Subject: <span className="font-semibold text-[#17202A]">{item.visualSubject}</span></p>
                  <p className="text-[#5B5BD6]">Category Suggestion: <span className="font-semibold">{item.categorySuggestion}</span></p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <Button variant="outline" onClick={() => setStep('upload')}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              isLoading={isUploading}
              onClick={handleFinalSave}
            >
              Add {files.length} Assets to Creative Library
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Completion */}
      {step === 'complete' && (
        <Card className="p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-[#EAF8F2] text-[#16855B] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17202A]">{files.length} Creative Assets Added Successfully</h3>
          <p className="text-xs text-[#667085]">Assets are now available in your Creative Library & Creative Studio workspace.</p>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={() => navigate('/creative-library')}>
              View Creative Library
            </Button>
            <Button variant="ai" leftIcon={<Sparkles className="w-4 h-4" />} onClick={() => navigate('/creative-studio')}>
              Open Creative Studio
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
