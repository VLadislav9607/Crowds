import { Gender } from '@modules/common';
import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface TalentNameFormRef {
  handleSubmit: UseFormHandleSubmit<TalentNameFormData>;
  getValues: UseFormGetValues<TalentNameFormData>;
}

export interface TalentNameFormState {
  isValid: boolean;
}

export interface TalentNameFormProps {
  defaultValues?: TalentNameFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: TalentNameFormState) => void;
}

export const talentNameFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: 'Gender is required',
  }),
  dateOfBirth: z.date({
    message: 'Date of birth is required',
  }),
});

export interface TalentNameFormData
  extends z.infer<typeof talentNameFormSchema> {}
