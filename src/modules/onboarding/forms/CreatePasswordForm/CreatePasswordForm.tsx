import { AppInput } from '@ui';
import { View } from 'react-native';
import {
  CreatePasswordFormData,
  CreatePasswordFormProps,
  CreatePasswordFormRef,
  createPasswordSchema,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { styles } from './styles';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

export const CreatePasswordForm = forwardRef<
  CreatePasswordFormRef,
  CreatePasswordFormProps
>(({ containerStyle, defaultValues, onFormStateChange }, ref) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues:
      defaultValues ||
      ({
        password: '',
        confirmPassword: '',
      } as Partial<CreatePasswordFormData>),
  });

  useEffect(() => {
    onFormStateChange?.({ isValid });
  }, [isValid, onFormStateChange]);

  useImperativeHandle(ref, () => ({ handleSubmit, getValues }), [
    handleSubmit,
    getValues,
  ]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Enter Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={errors.confirmPassword?.message}
          />
        )}
      />
    </View>
  );
});
