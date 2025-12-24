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

  console.log('CreatePasswordForm errors', errors);

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

      {/* <If condition={!uin}>
          <View style={styles.generateUINContainer}>
            <AppText color="black_40" typography="regular_14">
              Generate your unique identifier
            </AppText>
            <AppButton
              title="Generate ID"
              variant="primary"
              size="37"
              wrapperStyles={styles.generateIDButton}
              onPress={onGenerateUIN}
              isDisabled={!isValid}
              titleStyles={styles.generateIDButtonTitle}
            />
          </View>
        </If> */}

      {/* <If condition={!!uin}>
          <View>
            <View style={styles.UINContainer}>
              <AppText color="black" typography="medium_12">
                Your unique identifier is:
              </AppText>
              <AppButton
                title="123456789012"
                variant="primary"
                size="31"
                wrapperStyles={styles.UINButton}
                iconPlace="right"
                iconSize={16}
                icon={ICONS.copyIcon('white')}
              />
            </View>

            <AppText color="main" typography="medium_12">
              This is your Unique Identifier Number. Crowds Now does not store
              any data, nor does it take your email or mobile. As a result in
              the event you lose your password; we have NO WAY or giving you
              back access to your account without your UIN (Unique Identifier
              Number).  It is your responsibility to store it in a safe place.
              Only ONE is issued per account per person.
            </AppText>
          </View>
        </If> */}
    </View>
  );
});
