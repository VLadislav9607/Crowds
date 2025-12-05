import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface CreatePasswordFormState {
  isValid: boolean;
}

export interface CreatePasswordFormProps {
  defaultValues?: CreatePasswordFormData;
  uin?: string;
  containerStyle?: ViewStyle;
  onGenerateUIN?: () => void;
  onFormStateChange?: (state: CreatePasswordFormState) => void;
}

export interface CreatePasswordFormRef {
  handleSubmit: UseFormHandleSubmit<CreatePasswordFormData>;
  getValues: UseFormGetValues<CreatePasswordFormData>;
}

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export interface CreatePasswordFormData
  extends z.infer<typeof createPasswordSchema> {}
