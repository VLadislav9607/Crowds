import { z } from 'zod';

export const createEventValidationSchema = z.object({
  // Company Name (pre-filled, read-only)
  companyName: z.string().min(1, 'Company name is required'),

  // Title
  title: z.string().min(1, 'Title of the event is required'),

  // Location
  location: z.string().min(1, 'Event location is required'),

  // Date & Time
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),

  // Age Groups & Number of People
  minAge: z.number().min(0, 'Minimum age must be at least 0'),
  maxAge: z.number().min(0, 'Maximum age must be at least 0'),

  // Category
  category: z.string().min(1, 'Category is required'),

  // Tags
  tags: z.array(z.string()).optional(),

  // Payment Mode
  paymentMode: z.enum(['perHour', 'fixed']),
  paymentAmount: z.number().min(15, 'Minimum payment is AUD $15.00'),

  // Crowd Preferences
  crowdPreferences: z.string().optional(),

  // Event Brief
  eventBrief: z.string().min(1, 'Event brief is required'),

  // NDA
  uploadNDA: z.boolean(),
  ndaDocument: z.any().optional(),

  // Closing Date
  registrationClosingDate: z.date().optional(),
});

export type CreateEventFormData = z.infer<typeof createEventValidationSchema>;
