import { z } from 'zod';

export const talentLocationSetupSchema = z.object({
  parsed_location: z.object(
    {
      autocomplete_description: z.string(),
      city: z.string().optional(),
      coords: z.string(),
      country: z.string(),
      country_code: z.string().optional(),
      formatted_address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      place_id: z.string(),
      postal_code: z.string().optional(),
      region: z.string(),
      timezone: z.string().optional(),
    },
    { message: 'Location is required' },
  ),
});

export interface TalentLocationSetupFormData
  extends z.infer<typeof talentLocationSetupSchema> {}

export interface TalentLocationSetupFormRef {
  handleSubmit: () => void;
}

export interface TalentLocationSetupFormState {
  isUpsertingLocation: boolean;
}

export interface TalentLocationSetupFormProps {
  onFormStateChange?: (state: TalentLocationSetupFormState) => void;
  onSuccess?: () => void;
}
