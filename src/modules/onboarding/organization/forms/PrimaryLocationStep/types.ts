import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface PrimaryLocationFormRef {
  handleSubmit: UseFormHandleSubmit<PrimaryLocationFormData>;
  getValues: UseFormGetValues<PrimaryLocationFormData>;
}

export interface PrimaryLocationFormState {
  isValid: boolean;
}

export interface PrimaryLocationFormProps {
  defaultValues?: PrimaryLocationFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: PrimaryLocationFormState) => void;
}

export const primaryLocationFormSchema = z
  .object({
    parsed_location: z.object({
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
    }, { message: 'Primary location is required' }),
    parsed_head_office_location: z
      .object({
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
      })
      .optional(),
    isHeadOffice: z.boolean(),
  })
  .refine(
    data => {
      // If isHeadOffice is false, parsed_head_office_location is required
      if (data.isHeadOffice === false) {
        return data.parsed_head_office_location !== undefined;
      }
      return true;
    },
    {
      message: 'Head office location is required',
      path: ['parsed_head_office_location'],
    },
  );

export interface PrimaryLocationFormData
  extends z.infer<typeof primaryLocationFormSchema> {}

