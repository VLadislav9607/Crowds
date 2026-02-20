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

const validateAtLeastOnePerson = (data: {
  maleCount?: number;
  femaleCount?: number;
  othersCount?: number;
}) => {
  const male = data.maleCount ?? 0;
  const female = data.femaleCount ?? 0;
  const others = data.othersCount ?? 0;
  return male > 0 || female > 0 || others > 0;
};

// Validation functions for createEventValidationSchema
const validateEndDateNotInPast = (date: Date) => {
  const now = new Date();
  return date >= now;
};

const validateStartBeforeEnd = (data: { startAt: Date; endAt: Date }) => {
  return data.startAt < data.endAt;
};

const validateRegistrationClosingDate = (data: {
  registrationClosingAt: Date;
  startAt: Date;
}) => {
  if (data.registrationClosingAt) {
    return data.registrationClosingAt <= data.startAt;
  }
  return true;
};

const pickedDocumentSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number().optional(),
});
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
    minWeight: z.number().optional(),
    maxWeight: z.number().optional(),
    minHeight: z.number().optional(),
    maxHeight: z.number().optional(),
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

const ageGroupSchema = z
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
  })
  .refine(validateAtLeastOnePerson, {
    message: 'At least one person must be added to age groups',
    path: ['maleCount'],
  });

export const createPublishedEventSchema = z
  .object({
    eventType: z.enum(['media_production', 'brand_activation']),
    title: z.string().min(1, 'Title of the event is required'),
    description: z.string().min(1, 'Description is required'),
    locationType: z.enum(['entire_country', 'specific_location']),
    officeId: z.string().optional(),
    locationCountryCode: z.string().optional(),
    location: parsedLocationSchema.optional().nullable(),
    visibility: z.enum(['public', 'private']),
    campaignStartAt: z.date().optional().nullable(),
    campaignEndAt: z.date().optional().nullable(),
    startAt: z
      .date({ message: 'Start date is required' })
      .refine(validateEndDateNotInPast, {
        message: 'Start date and time cannot be in the past',
      }),
    endAt: z
      .date({ message: 'End date is required' })
      .refine(validateEndDateNotInPast, {
        message: 'End date and time cannot be in the past',
      }),
    ageGroups: z
      .array(ageGroupSchema)
      .min(1, 'At least one age group is required'),
    category: z
      .string({ message: 'Category is required' })
      .min(1, 'Category is required'),
    subcategoryId: z
      .string({ message: 'Subcategory is required' })
      .min(1, 'Subcategory is required'),
    tags: z.array(z.string()).optional(),
    paymentMode: z.enum(['perHour', 'fixed']),
    paymentAmount: z
      .number('Payment is required')
      .min(15, 'Minimum payment is AUD $15.00'),
    eventBrief: z.string().min(1, 'Event brief is required'),
    ndaDocument: pickedDocumentSchema.optional(),
    ndaDocumentName: z.string().optional(),
    ndaDocumentPath: z.string().optional(),
    registrationClosingAt: z
      .date({
        message: 'Registration closing date is required',
      })
      .refine(validateEndDateNotInPast, {
        message: 'Registration closing date and time cannot be in the past',
      }),
  })
  .refine(validateStartBeforeEnd, {
    message: 'Start date and time must be earlier than end date and time',
    path: ['startAt'],
  })
  .refine(validateRegistrationClosingDate, {
    message: 'Registration closing date cannot be after start date',
    path: ['registrationClosingAt'],
  })
  .superRefine((data, ctx) => {
    if (data.locationType === 'specific_location' && !data.location) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a location',
        path: ['location'],
      });
    }
    if (data.locationType === 'entire_country' && !data.locationCountryCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a country',
        path: ['locationCountryCode'],
      });
    }
    if (
      data.eventType === 'media_production' &&
      data.locationType === 'entire_country'
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Film/TV events require a specific location',
        path: ['locationType'],
      });
    }
    if (
      data.campaignStartAt &&
      data.campaignEndAt &&
      data.campaignStartAt >= data.campaignEndAt
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Campaign start must be before campaign end',
        path: ['campaignStartAt'],
      });
    }
    if (
      data.campaignStartAt &&
      data.startAt &&
      data.startAt < data.campaignStartAt
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Event start date must be within the campaign period',
        path: ['startAt'],
      });
    }
    if (data.campaignEndAt && data.endAt && data.endAt > data.campaignEndAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Event end date must be within the campaign period',
        path: ['endAt'],
      });
    }
  });

export type CreateEventFormData = z.infer<typeof createPublishedEventSchema>;
export type AgeGroup = z.infer<typeof ageGroupSchema>;
export type CrowdPreferences = z.infer<typeof crowdPreferencesSchema>;
