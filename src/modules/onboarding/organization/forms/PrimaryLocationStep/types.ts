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
  defaultValues?: Partial<PrimaryLocationFormData>;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: PrimaryLocationFormState) => void;
  onPrimaryLocationChange?: () => void;
  onHeadOfficeLocationChange?: () => void;
  onChangeText?: () => void;
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
      street_address: z.string().optional(),
      street_name: z.string(),
      street_number: z.string(),
    }),
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
        street_name: z.string(),
        street_number: z.string(),
        street_address: z.string().optional(),
      })
      .optional(),
    isHeadOffice: z.boolean(),
  })
  .refine(
    data => {
      if (!data.parsed_location) {
        return false;
      }
      // Check if key fields are filled (not empty strings)
      return (
        data.parsed_location.autocomplete_description.trim() !== '' &&
        data.parsed_location.place_id.trim() !== '' &&
        data.parsed_location.formatted_address.trim() !== ''
      );
    },
    {
      message: 'Primary location is required',
      path: ['parsed_location'],
    },
  )
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
