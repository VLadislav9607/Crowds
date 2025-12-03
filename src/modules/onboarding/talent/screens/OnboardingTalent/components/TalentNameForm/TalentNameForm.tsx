import { AppInput, AppText } from '@ui';
import { AppDateInput, CheckboxList } from '@components';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Gender } from '@modules/common';
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
        name="firstName"
        render={({ field, fieldState }) => (
          <AppInput
            label="First Name"
            placeholder="Enter your first name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
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

      <View>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field, fieldState }) => (
            <AppDateInput
              useDefaultIcon
              placeholder="Select your date of birth"
              label="Date of birth"
              containerStyle={styles.dateInputContainer}
              value={field.value}
              onChange={date => field.onChange(date)}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <AppText color="main" typography="medium_12">
          Biometric ID verification will be required. If the birthdate you
          provide does not match your photo ID, your account may be permanently
          banned from the platform.
        </AppText>
      </View>
    </View>
  );
});
