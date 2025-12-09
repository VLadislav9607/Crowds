import { View } from 'react-native';
import { AppInput } from '@ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { styles } from './styles';
import {
  SignInFormData,
  SignInFormProps,
  SignInFormRef,
  signInFormSchema,
} from './types';

export const SignInForm = forwardRef<SignInFormRef, SignInFormProps>(
  ({ defaultValues, containerStyle, onFormStateChange }, ref) => {
    const {
      control,
      formState: { isValid },
      handleSubmit,
      getValues,
    } = useForm<SignInFormData>({
      resolver: zodResolver(signInFormSchema),
      defaultValues:
        defaultValues ||
        ({
          username: '',
          password: '',
        } as Partial<SignInFormData>),
    });

    useImperativeHandle(ref, () => ({ handleSubmit, getValues }), [
      handleSubmit,
      getValues,
    ]);

    useEffect(() => {
      if (onFormStateChange) {
        onFormStateChange({ isValid });
      }
    }, [isValid, onFormStateChange]);

    return (
      <View style={[styles.container, containerStyle]}>
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <AppInput
              label="Username"
              placeholder="Enter your username"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              secureTextEntry
            />
          )}
        />
      </View>
    );
  },
);
