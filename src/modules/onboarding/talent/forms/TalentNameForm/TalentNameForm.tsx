import { AppInput } from '@ui';
import { CheckboxList } from '@components';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Gender } from '@modules/profile';
import { styles } from './styles';
import {
  TalentNameFormData,
  TalentNameFormProps,
  TalentNameFormRef,
  talentNameFormSchema,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

export const TalentNameForm = forwardRef<
  TalentNameFormRef,
  TalentNameFormProps
>(({ defaultValues, containerStyle, onFormStateChange }, ref) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    getValues,
  } = useForm<TalentNameFormData>({
    resolver: zodResolver(talentNameFormSchema),
    defaultValues:
      defaultValues ||
      ({
        firstName: '',
        lastName: '',
      } as Partial<TalentNameFormData>),
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
            description="Please enter your name exactly as it appears on your government-issued ID. This helps us verify your identity quickly."
            value={field.value}
            onChangeText={text => field.onChange(text.toLowerCase())}
            errorMessage={fieldState.error?.message}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <AppInput
            label="First Name"
            placeholder="Enter your first name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="middleName"
        render={({ field, fieldState }) => (
          <AppInput
            label="Middle Name"
            placeholder="Enter your middle name (optional)"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <AppInput
            label="Last Name"
            placeholder="Enter your last name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => (
          <CheckboxList
            label="Gender"
            items={[
              { label: 'Male', value: Gender.MALE },
              { label: 'Female', value: Gender.FEMALE },
              { label: 'Other', value: Gender.OTHER },
            ]}
            checkedValues={field.value}
            onCheckboxPress={item => field.onChange(item.value as Gender)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </View>
  );
});
