import { PickedImage } from '@modules/common';
import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface HeadGlobalLocationFormRef {
  handleSubmit: UseFormHandleSubmit<HeadGlobalLocationFormData>;
  getValues: UseFormGetValues<HeadGlobalLocationFormData>;
}

export interface HeadGlobalLocationFormState {
  isValid: boolean;
}

export interface HeadGlobalLocationFormProps {
  defaultValues?: HeadGlobalLocationFormData;
  containerStyle?: ViewStyle;
  pickedLogo?: PickedImage;
  onPickLogo?: (logo: PickedImage) => void;
  onChangeText?: () => void;
  onFormStateChange?: (state: HeadGlobalLocationFormState) => void;
}

export const headGlobalLocationFormSchema = z.object({
  parsed_location: z.object(
    {
      autocomplete_description: z.string(),
      city: z.string(),
      coords: z.string(),
      country: z.string(),
      country_code: z.string(),
      formatted_address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      place_id: z.string(),
      postal_code: z.string().optional(),
      region: z.string(),
      street_name: z.string(),
      street_number: z.string(),
    },
    { message: 'Head office location is required' },
  ),
  isHeadquartered: z.boolean(
    'Please select if this is where your organization is headquartered',
  ),
});

export interface HeadGlobalLocationFormData
  extends z.infer<typeof headGlobalLocationFormSchema> {}
