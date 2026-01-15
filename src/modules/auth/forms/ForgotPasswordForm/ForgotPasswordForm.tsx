import { View } from 'react-native';
import { AppInput } from '@ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { styles } from './styles';
import {
  ForgotPasswordFormData,
  ForgotPasswordFormProps,
  ForgotPasswordFormRef,
  forgotPasswordFormSchema,
} from './types';
import { useForgotPassword } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { goToScreen, Screens } from '@navigation';

export const ForgotPasswordForm = forwardRef<
  ForgotPasswordFormRef,
  ForgotPasswordFormProps
>(({ defaultValues, containerStyle, onFormStateChange, onSuccess }, ref) => {
  const { mutate: forgotPasswordMutate, isPending: isLoading } =
    useForgotPassword();

  const { control, handleSubmit, getValues } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues:
      defaultValues ||
      ({
        uin: '',
        password: '',
        confirmPassword: '',
      } as Partial<ForgotPasswordFormData>),
  });

  const onUpdatePassword = useCallback(
    (data: ForgotPasswordFormData) => {
      forgotPasswordMutate(data, {
        onSuccess: () => {
          onSuccess?.();
          showSuccessToast('Password reset successfully');
          goToScreen(Screens.SignIn);
        },
        onError: (error: Error) => {
          showErrorToast(error.message);
        },
      });
    },
    [forgotPasswordMutate, onSuccess],
  );

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: handleSubmit(onUpdatePassword),
      getValues,
    }),
    [handleSubmit, getValues, onUpdatePassword],
  );

  useEffect(() => {
    onFormStateChange?.({ isLoading });
  }, [isLoading, onFormStateChange]);

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
            onChangeText={text => field.onChange(text.toLowerCase())}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="uin"
        render={({ field, fieldState }) => (
          <AppInput
            label="UIN"
            placeholder="Enter your UIN"
            value={field.value}
            onChangeText={text => {
              // Allow only digits
              const numericValue = text.replace(/[^0-9]/g, '');
              // Limit to 12 digits
              const limitedValue = numericValue.slice(0, 12);
              field.onChange(limitedValue);
            }}
            errorMessage={fieldState.error?.message}
            keyboardType="numeric"
            maxLength={12}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <AppInput
            label="Password"
            placeholder="Enter new password"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            secureTextEntry
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <AppInput
            label="Confirm Password"
            placeholder="Confirm new password"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            secureTextEntry
          />
        )}
      />
    </View>
  );
});
