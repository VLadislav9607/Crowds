import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface ChangePasswordFormState {
  isValid: boolean;
}

export interface ChangePasswordFormProps {
  defaultValues?: ChangePasswordFormData;
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: ChangePasswordFormState) => void;
}

export interface ChangePasswordFormRef {
  handleSubmit: UseFormHandleSubmit<ChangePasswordFormData>;
  getValues: UseFormGetValues<ChangePasswordFormData>;
}

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export interface ChangePasswordFormData
  extends z.infer<typeof changePasswordSchema> {}
