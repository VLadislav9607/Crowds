import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface SignInFormRef {
  handleSubmit: UseFormHandleSubmit<SignInFormData>;
  getValues: UseFormGetValues<SignInFormData>;
}

export interface SignInFormState {
  isValid: boolean;
}

export interface SignInFormProps {
  defaultValues?: SignInFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: SignInFormState) => void;
}

export const signInFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export interface SignInFormData extends z.infer<typeof signInFormSchema> {}
