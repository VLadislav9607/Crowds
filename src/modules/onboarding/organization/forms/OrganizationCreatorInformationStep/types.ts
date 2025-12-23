import { Gender } from '@modules/profile';
import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface OrganizationCreatorInformationFormRef {
  handleSubmit: UseFormHandleSubmit<OrganizationCreatorInformationFormData>;
  getValues: UseFormGetValues<OrganizationCreatorInformationFormData>;
}

export interface OrganizationCreatorInformationFormState {
  isValid: boolean;
}

export interface OrganizationCreatorInformationFormProps {
  defaultValues?: OrganizationCreatorInformationFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: OrganizationCreatorInformationFormState) => void;
}

export const organizationCreatorInformationFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  positionInCompany: z.string().min(1, 'Position in company is required'),
  isAuthorizedOnBehalfOfCompany: z.boolean(),
  email: z.email({ message: 'Invalid email address'}),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
});

export interface OrganizationCreatorInformationFormData
  extends z.infer<typeof organizationCreatorInformationFormSchema> {}

