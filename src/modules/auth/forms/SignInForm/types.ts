import { ViewStyle } from 'react-native';
import { z } from 'zod';

export interface SignInFormRef {
  handleSubmit: ()=>void;
}

export interface SignInFormState {
  isLoggingIn: boolean;
}

export interface SignInFormProps {
  containerStyle?: ViewStyle;
  onFormStateChange?: (state: SignInFormState) => void;
}

export const signInFormSchema = z.object({
  username: z.string('Username is required').min(1, 'Username is required'),
  password: z.string('Password is required').min(1, 'Password is required'),
});

export interface SignInFormData extends z.infer<typeof signInFormSchema> {}
