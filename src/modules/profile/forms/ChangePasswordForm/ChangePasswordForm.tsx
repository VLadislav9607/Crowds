import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { AppInput } from '@ui';
import {
  ChangePasswordFormData,
  ChangePasswordFormProps,
  ChangePasswordFormRef,
  changePasswordSchema,
} from './types';
import { styles } from './styles';

export const ChangePasswordForm = forwardRef<
  ChangePasswordFormRef,
  ChangePasswordFormProps
>(({ defaultValues, containerStyle, onFormStateChange }, ref) => {
  const {
    control,
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues:
      defaultValues ||
      ({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      } as Partial<ChangePasswordFormData>),
    mode: 'onBlur',
  });

  useEffect(() => {
    onFormStateChange?.({ isValid });
  }, [isValid, onFormStateChange]);

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
      getValues,
    }),
    [handleSubmit, getValues],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Controller
        control={control}
        name="currentPassword"
        render={({ field, fieldState }) => (
          <AppInput
            placeholder="Enter current password"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            secureTextEntry
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <AppInput
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
            placeholder="Re-enter new password"
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

ChangePasswordForm.displayName = 'ChangePasswordForm';
