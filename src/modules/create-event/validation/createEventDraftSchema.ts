import { z } from 'zod';

// Validation functions for crowdPreferencesSchema
const validatePregnancyMonths = (data: {
  isPregnant?: boolean;
  months?: number | null;
}) => {
  if (data.isPregnant === true) {
    return data.months !== undefined && data.months !== null;
  }
  return true;
};

// Validation functions for ageGroupSchema
const validateAgeRange = (data: { minAge: number; maxAge: number }) => {
  return data.minAge <= data.maxAge;
};

const validateStartBeforeEnd = (data: {
  startAt?: Date | null;
  endAt?: Date | null;
}) => {
  if (!data.startAt || !data.endAt) {
    return true;
  }
  return data.startAt < data.endAt;
};

const validateRegistrationClosingDate = (data: {
  registrationClosingAt?: Date | null;
  startAt?: Date | null;
}) => {
  if (data.registrationClosingAt && data.startAt) {
    return data.registrationClosingAt <= data.startAt!;
  }
  return true;
};

const parsedLocationSchema = z.object(
  {
    autocomplete_description: z.string(),
    city: z.string(),
    coords: z.string(),
    country: z.string(),
    formatted_address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    place_id: z.string(),
    postal_code: z.string().optional(),
    region: z.string(),
    street_name: z.string().optional(),
    street_number: z.string().optional(),
    timezone: z.string().optional(),
  },
  { message: 'Location is required' },
);

const crowdPreferencesSchema = z
  .object({
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
    months: z.number().optional(),
    additionalThings: z.array(z.string()).optional(),
  })
  .refine(validatePregnancyMonths, {
    message: 'Please select pregnancy months',
    path: ['months'],
  });

const pickedDocumentSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number().optional(),
});

const ageGroupDraftSchema = z
  .object({
    id: z.string(),
    minAge: z
      .number({ message: 'Minimum age is required' })
      .min(0, 'Minimum age must be at least 0')
      .max(150, 'Age cannot exceed 150'),
    maxAge: z
      .number()
      .min(1, 'Maximum age must be at least 1')
      .max(150, 'Age cannot exceed 150'),
    maleCount: z.number().optional(),
    femaleCount: z.number().optional(),
    othersCount: z.number().optional(),
    preferences: crowdPreferencesSchema.optional(),
  })
  .refine(validateAgeRange, {
    message: 'Minimum age cannot be greater than maximum age',
    path: ['minAge'],
  });

export const createEventDraftSchema = z
  .object({
    title: z.string().min(1, 'Title of the event is required'),
    location: parsedLocationSchema.optional().nullable(),
    visibility: z.enum(['public', 'private']).optional().nullable(),
    startAt: z.date().optional().nullable(),
    endAt: z.date().optional().nullable(),
    ageGroups: z.array(ageGroupDraftSchema).optional().nullable(),
    category: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    paymentMode: z.enum(['perHour', 'fixed']),
    paymentAmount: z
      .number()
      .min(15, 'Minimum payment is AUD $15.00')
      .optional()
      .nullable(),
    eventBrief: z.string().optional().nullable(),
    ndaDocument: pickedDocumentSchema.optional().nullable(),
    ndaDocumentName: z.string().optional().nullable(),
    ndaDocumentPath: z.string().optional().nullable(),
    registrationClosingAt: z.date().optional().nullable(),
  })
  .refine(validateStartBeforeEnd, {
    message: 'Start date and time must be earlier than end date and time',
    path: ['startAt'],
  })
  .refine(validateRegistrationClosingDate, {
    message: 'Registration closing date cannot be after start date',
    path: ['registrationClosingAt'],
  });

export type CreateEventDraftFormData = z.infer<typeof createEventDraftSchema>;
export type EventDraftAgeGroup = z.infer<typeof ageGroupDraftSchema>;
export type EventDraftCrowdPreferences = z.infer<typeof crowdPreferencesSchema>;
