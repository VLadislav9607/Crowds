import { OrganizationType } from '@modules/common';
import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface OrganizationNameFormRef {
  handleSubmit: UseFormHandleSubmit<OrganizationNameFormData>;
  getValues: UseFormGetValues<OrganizationNameFormData>;
}

export interface OrganizationNameFormState {
  isValid: boolean;
}

export interface OrganizationNameFormProps {
  defaultValues?: OrganizationNameFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: OrganizationNameFormState) => void;
}

export const organizationNameFormSchema = z.object({
  organizationName: z.string().min(1, 'Company/business name is required'),
  organizationType: z.enum([OrganizationType.SINGLE, OrganizationType.GLOBAL]),
});

export interface OrganizationNameFormData
  extends z.infer<typeof organizationNameFormSchema> {}

