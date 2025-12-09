import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface ForgotPasswordFormRef {
  handleSubmit: UseFormHandleSubmit<ForgotPasswordFormData>;
  getValues: UseFormGetValues<ForgotPasswordFormData>;
}

export interface ForgotPasswordFormState {
  isValid: boolean;
}

export interface ForgotPasswordFormProps {
  defaultValues?: ForgotPasswordFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: ForgotPasswordFormState) => void;
}

export const forgotPasswordFormSchema = z
  .object({
    uin: z
      .string()
      .min(1, 'UIN is required')
      .regex(/^\d{12}$/, 'UIN must be exactly 12 digits'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export interface ForgotPasswordFormData
  extends z.infer<typeof forgotPasswordFormSchema> {}
