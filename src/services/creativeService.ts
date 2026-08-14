import { 
  CreativeAsset, 
  CreativeGenerationRequest, 
  CreativeGenerationResult, 
  CreativeVariation 
} from '../types';
import { mockCreativeAssets } from '../mock/data';

let assetsStore: CreativeAsset[] = [...mockCreativeAssets];

export const creativeService = {
  async getAssets(campaignId?: string): Promise<CreativeAsset[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (campaignId) {
      return assetsStore.filter((a) => a.campaignId === campaignId);
    }
    return assetsStore;
  },

  async getAssetById(id: string): Promise<CreativeAsset | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return assetsStore.find((a) => a.id === id);
  },

  async uploadAssets(files: File[], campaignId: string, channel: 'Instagram' | 'Facebook' | 'YouTube', contentType: any): Promise<CreativeAsset[]> {
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate upload & AI visual analysis
    
    const newAssets: CreativeAsset[] = files.map((file, index) => {
      const id = `asset_up_${Date.now()}_${index}`;
      const objectUrl = URL.createObjectURL(file);
      return {
        id,
        title: file.name.replace(/\.[^/.]+$/, ""),
        imageUrl: objectUrl,
        mediaType: file.type.includes('video') ? 'video' : 'image',
        campaignId,
        channel,
        contentType: contentType || 'Post',
        status: 'Uploaded',
        createdBy: 'Sarah Johnson',
        isAiGenerated: false,
        uploadedAt: new Date().toISOString().split('T')[0],
        category: 'Uploaded Photo',
        brandRelevanceScore: 95,
        currentVersion: 1,
        versions: [
          {
            version: 1,
            imageUrl: objectUrl,
            caption: 'Uploaded hospitality creative asset.',
            createdAt: new Date().toLocaleTimeString(),
            createdBy: 'Sarah Johnson',
          },
        ],
      };
    });

    assetsStore.unshift(...newAssets);
    return newAssets;
  },

  async generateCreative(req: CreativeGenerationRequest): Promise<CreativeGenerationResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate AI generation lag with loading state

    const variations: CreativeVariation[] = [
      {
        id: `var_${Date.now()}_1`,
        headline: 'Weekend Culinary Privilege at Royal Dining Room',
        caption: `Indulge in an elevated weekend dining experience at The Grand Palace Hotel. ${req.prompt}. Book your table today and enjoy 20% privilege savings. #GrandPalaceBengaluru #SundayBrunch #LuxuryDining`,
        imageUrl: req.sourcePhotoUrls[0] || 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
        hashtags: ['#GrandPalaceBengaluru', '#SundayBrunch', '#BengaluruDining', '#LuxuryHospitality'],
        callToAction: 'Reserve Your Table Now',
        aiRole: 'Creative Director AI',
        aiReasoning: 'Utilizes high-converting opening hook focused on culinary privileges. Aligns strictly with Brand DNA preferred terms: "Elevated weekend dining", "Royal Dining Room".',
        contextUsed: ['Brand DNA v3.2', 'Weekend Family Persona', 'Historical Brunch Assets Data'],
        evidence: 'Historical performance indicates food privileged savings hooks increase Instagram engagement by +22%.',
      },
      {
        id: `var_${Date.now()}_2`,
        headline: 'Savor Palatial Hospitality & Artisanal Flavors',
        caption: `Escape into a sanctuary of taste. ${req.prompt}. Experience poolside champagne, live gourmet stations, and handcrafted acoustic melodies. #RoyalDining #BengaluruLuxury #EpicureanJourney`,
        imageUrl: req.sourcePhotoUrls[1] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        hashtags: ['#RoyalDining', '#BengaluruLuxury', '#EpicureanJourney', '#PalaceHospitality'],
        callToAction: 'View Chef Special Menu',
        aiRole: 'Copywriter AI',
        aiReasoning: 'Emphasizes sensory culinary storytelling ("sanctuary of taste", "handcrafted acoustic melodies") targeting high net worth dining seekers.',
        contextUsed: ['Brand DNA v3.2', 'Local Food Explorer Persona', 'Knowledge Repository Lesson #14'],
        evidence: 'Sensory storytelling generates 3.4x higher reel save rates.',
      },
      {
        id: `var_${Date.now()}_3`,
        headline: 'Family Weekend Escape & Poolside Brunch',
        caption: `Create cherished weekend memories with family at The Grand Palace Hotel. ${req.prompt}. Featuring live interactive cooking, kids lounge, and poolside luxury. #GrandPalaceStaycation #WeekendVibes`,
        imageUrl: req.sourcePhotoUrls[2] || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        hashtags: ['#GrandPalaceStaycation', '#WeekendVibes', '#FamilyBrunch', '#PoolsideLuxury'],
        callToAction: 'Book Family Table',
        aiRole: 'Content Planner AI',
        aiReasoning: 'Tailored for weekend family planning window on Thursday/Friday afternoon.',
        contextUsed: ['Weekend Family Persona', 'Instagram Audience Peak Times'],
        evidence: 'Family staycation visuals drive highest comment responses.',
      },
    ];

    return {
      id: `gen_${Date.now()}`,
      prompt: req.prompt,
      variations,
      generatedAt: new Date().toLocaleTimeString(),
    };
  },

  async addGeneratedAssetToLibrary(assetData: Omit<CreativeAsset, 'id' | 'uploadedAt'>): Promise<CreativeAsset> {
    const newAsset: CreativeAsset = {
      ...assetData,
      id: `asset_gen_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    assetsStore.unshift(newAsset);
    return newAsset;
  },
};
