import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid business email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const campaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  objective: z.string().min(10, 'Objective must provide clear business intent'),
  description: z.string().min(10, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  targetPersonas: z.array(z.string()).min(1, 'Select at least one persona'),
  channels: z.array(z.enum(['Instagram', 'Facebook', 'YouTube'])).min(1, 'Select at least one channel'),
});

export const brandDnaSchema = z.object({
  positioning: z.string().min(10, 'Brand positioning statement is required'),
  personality: z.string().min(5, 'Comma-separated brand personality traits'),
  values: z.string().min(5, 'Brand values are required'),
  preferredTerminology: z.string(),
  avoidedTerminology: z.string(),
});

export const personaSchema = z.object({
  name: z.string().min(3, 'Persona name is required'),
  ageRange: z.string().min(1, 'Age range is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  location: z.string().min(2, 'Location is required'),
  interests: z.string().min(3, 'Interests (comma separated)'),
  preferredChannels: z.array(z.enum(['Instagram', 'Facebook', 'YouTube', 'TikTok', 'LinkedIn'])).min(1, 'Select at least one channel'),
  topContentType: z.string().min(2, 'Top content type is required'),
  needs: z.string().min(5, 'Needs are required'),
  painPoints: z.string().min(5, 'Pain points are required'),
});

export const creativePromptSchema = z.object({
  campaignId: z.string().min(1, 'Select a campaign'),
  personaId: z.string().min(1, 'Select a target persona'),
  channels: z.array(z.enum(['Instagram', 'Facebook', 'YouTube'])).min(1, 'Select at least one channel'),
  contentType: z.string().min(1, 'Select content type'),
  prompt: z.string().min(10, 'Provide a descriptive idea or prompt for the AI'),
  tone: z.string().min(1, 'Select tone'),
  format: z.string().min(1, 'Select format'),
});

export const assetMetadataSchema = z.object({
  campaignId: z.string().min(1, 'Select a campaign'),
  targetPersonaId: z.string().min(1, 'Select target persona'),
  channel: z.enum(['Instagram', 'Facebook', 'YouTube']),
  contentType: z.enum(['Post', 'Carousel', 'Reel', 'Short', 'Video']),
  category: z.string().min(1, 'Select category'),
});

export const approvalSchema = z.object({
  decision: z.enum(['Approved', 'Rejected', 'Changes Requested']),
  rejectionCategory: z.enum(['Brand mismatch', 'Incorrect information', 'Creative issue', 'Strategy issue', 'Other']).optional(),
  comments: z.string().optional(),
});

export const publishingSchema = z.object({
  assetId: z.string().min(1, 'Select content asset'),
  channels: z.array(z.enum(['Instagram', 'Facebook', 'YouTube'])).min(1, 'Select at least one channel'),
  scheduledTime: z.string().min(1, 'Select scheduled publication date and time'),
  caption: z.string().min(5, 'Caption is required'),
  hashtags: z.string().optional(),
});

export const recommendationDecisionSchema = z.object({
  recommendationId: z.string().min(1),
  decision: z.enum(['Accepted', 'Rejected']),
  notes: z.string().optional(),
});

export const knowledgeCaptureSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  category: z.enum(['Brand', 'Campaigns', 'Customers', 'Content', 'Performance', 'Policies']),
  summary: z.string().min(10, 'Summary is required'),
  whatWorked: z.string().min(5, 'Key successes'),
  whatDidnt: z.string().min(5, 'Challenges/Lessons'),
  recommendedActions: z.string().min(5, 'Future recommendations'),
});

export const adminUserSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  role: z.string().min(1, 'Select a role'),
  brandId: z.string().min(1, 'Select brand workspace'),
});
