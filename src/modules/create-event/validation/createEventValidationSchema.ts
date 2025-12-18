import { z } from 'zod';

const crowdPreferencesSchema = z.object({
  ethnicity: z.array(z.string()).optional(),
  accent: z.array(z.string()).optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  eyeColour: z.array(z.string()).optional(),
  hairColour: z.array(z.string()).optional(),
  facialAttributes: z.array(z.string()).optional(),
  bodyAttributes: z.array(z.string()).optional(),
  tattooSpot: z.array(z.string()).optional(),
  skinTone: z.array(z.string()).optional(),
  isPregnant: z.boolean().optional(),
  months: z.string().optional(),
  additionalThings: z.array(z.string()).optional(),
});

const ageGroupSchema = z
  .object({
    id: z.string(),
    minAge: z
      .number()
      .min(0, 'Minimum age must be at least 0')
      .max(150, 'Age cannot exceed 150'),
    maxAge: z
      .number()
      .min(0, 'Maximum age must be at least 0')
      .max(150, 'Age cannot exceed 150'),
    maleCount: z.number().optional(),
    femaleCount: z.number().optional(),
    othersCount: z.number().optional(),
    preferences: crowdPreferencesSchema.optional(),
  })
  .refine(data => data.minAge <= data.maxAge, {
    message: 'Minimum age cannot be greater than maximum age',
    path: ['minAge'],
  });

export const createEventValidationSchema = z.object({
  // Title
  title: z.string().min(1, 'Title of the event is required'),

  // Location
  location: z.string().min(1, 'Event location is required'),

  // Visibility
  visibility: z.enum(['public', 'private']),

  // Date & Time
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),

  // Age Groups & Number of People
  ageGroups: z.array(ageGroupSchema),

  // Category
  category: z.string().min(1, 'Category is required'),

  // Tags
  tags: z.array(z.string()).optional(),

  // Payment Mode
  paymentMode: z.enum(['perHour', 'fixed']),
  paymentAmount: z
    .number('Payment is required')
    .min(15, 'Minimum payment is AUD $15.00'),

  // Event Brief
  eventBrief: z.string().min(1, 'Event brief is required'),

  // NDA
  uploadNDA: z.boolean(),
  ndaDocument: z.any().optional(),

  // Closing Date
  registrationClosingDate: z.date().optional(),
});

export type CreateEventFormData = z.infer<typeof createEventValidationSchema>;
export type AgeGroup = z.infer<typeof ageGroupSchema>;
export type CrowdPreferences = z.infer<typeof crowdPreferencesSchema>;
