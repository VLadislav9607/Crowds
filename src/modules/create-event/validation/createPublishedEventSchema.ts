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
    title: z.string().min(1, 'Title of the event is required'),
    location: parsedLocationSchema,
    visibility: z.enum(['public', 'private']),
    startAt: z.date({ message: 'Start date is required' }),
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
    tags: z.array(z.string()).optional(),
    paymentMode: z.enum(['perHour', 'fixed']),
    paymentAmount: z
      .number('Payment is required')
      .min(15, 'Minimum payment is AUD $15.00'),
    eventBrief: z.string().min(1, 'Event brief is required'),
    uploadNDA: z.boolean(),
    ndaDocument: z.any().optional(),
    registrationClosingAt: z.date({
      message: 'Registration closing date is required',
    }),
  })
  .refine(validateStartBeforeEnd, {
    message: 'Start date and time must be earlier than end date and time',
    path: ['startAt'],
  })
  .refine(validateRegistrationClosingDate, {
    message: 'Registration closing date cannot be after start date',
    path: ['registrationClosingAt'],
  });

export type CreateEventFormData = z.infer<typeof createPublishedEventSchema>;
export type AgeGroup = z.infer<typeof ageGroupSchema>;
export type CrowdPreferences = z.infer<typeof crowdPreferencesSchema>;
