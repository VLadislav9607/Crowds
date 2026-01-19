import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { AppCheckbox, AppInput, AppText } from '@ui';
import { Gender } from '@modules/profile';
import { CheckboxList } from '@components';

import {
  OrganizationCreatorInformationFormData,
  OrganizationCreatorInformationFormProps,
  OrganizationCreatorInformationFormRef,
  organizationCreatorInformationFormSchema,
} from './types';

export const OrganizationCreatorInformationStep = forwardRef<
  OrganizationCreatorInformationFormRef,
  OrganizationCreatorInformationFormProps
>(({ defaultValues, containerStyle, onFormStateChange }, ref) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    getValues,
  } = useForm<OrganizationCreatorInformationFormData>({
    resolver: zodResolver(organizationCreatorInformationFormSchema),
    mode: 'onBlur',
    defaultValues:
      defaultValues ||
      ({
        firstName: '',
        lastName: '',
        positionInCompany: '',
        isAuthorizedOnBehalfOfCompany: false,
        gender: Gender.MALE,
      } as Partial<OrganizationCreatorInformationFormData>),
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
        render={({ field: { onChange, value }, fieldState }) => (
          <View>
            <AppInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              containerStyle={styles.nameInput}
              errorMessage={fieldState.error?.message}
            />

            <AppText
              typography="regular_14"
              color="gray_primary"
              margin={{ top: 8 }}
            >
              This will be your login username.
            </AppText>
          </View>
        )}
      />

      <View style={styles.nameInputs}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value }, fieldState }) => (
            <AppInput
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              containerStyle={styles.nameInput}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value }, fieldState }) => (
            <AppInput
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              containerStyle={styles.nameInput}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <CheckboxList
            label="Gender"
            items={[
              { label: 'Male', value: Gender.MALE },
              { label: 'Female', value: Gender.FEMALE },
            ]}
            checkedValues={value}
            onCheckboxPress={item => onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState }) => (
          <AppInput
            placeholder="Official Email Address"
            value={value}
            onChangeText={onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="positionInCompany"
        render={({ field: { onChange, value }, fieldState }) => (
          <AppInput
            placeholder="Position in company"
            value={value}
            onChangeText={onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isAuthorizedOnBehalfOfCompany"
        render={({ field: { onChange, value } }) => (
          // <CheckboxList
          //   label="Are you authorized on behalf of the company to make decisions; and or in an Executive, C Suite or Board Position?"
          //   items={[
          //     { label: 'Yes', value: 'yes' },
          //     { label: 'No', value: 'no' },
          //   ]}
          //   checkedValues={value ? 'yes' : 'no'}
          //   onCheckboxPress={item => onChange(item.value === 'yes')}
          // />
          <View style={styles.checkboxRow}>
            <AppCheckbox
              type="checkedIcon"
              checked={value}
              onChange={onChange}
            />
            <AppText typography="regular_14" style={styles.checkboxText}>
              I am authorized on behalf of the company to make decisions; and or
              in an Executive, C Suite or Board Position
            </AppText>
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  nameInput: {
    flex: 0.5,
  },
  nameInputs: {
    flexDirection: 'row',
    gap: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxText: {
    flex: 1,
  },
});
