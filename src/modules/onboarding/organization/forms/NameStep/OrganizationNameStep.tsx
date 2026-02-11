import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { AppInput, AppText } from '@ui';
import { CardSelector } from '@components';
import { TYPOGRAPHY } from '@styles';
import { OrganizationType } from '@modules/common';

import {
  OrganizationNameFormData,
  OrganizationNameFormProps,
  OrganizationNameFormRef,
  organizationNameFormSchema,
} from './types';

export const OrganizationNameStep = forwardRef<
  OrganizationNameFormRef,
  OrganizationNameFormProps
>(({ defaultValues, containerStyle, onFormStateChange }, ref) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    getValues,
  } = useForm<OrganizationNameFormData>({
    resolver: zodResolver(organizationNameFormSchema),
    defaultValues:
      defaultValues ||
      ({
        organizationName: '',
        organizationType: OrganizationType.SINGLE,
      } as Partial<OrganizationNameFormData>),
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
    <View style={containerStyle}>
      <AppText typography="bold_18" margin={{ bottom: 16 }}>
        Organization Details
      </AppText>
      <Controller
        control={control}
        name="organizationName"
        render={({ field, fieldState }) => (
          <AppInput
            placeholder="Company/business name"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <AppText style={styles.sectionTitle}>Select your location type</AppText>

      <Controller
        control={control}
        name="organizationType"
        render={({ field }) => (
          <CardSelector
            cards={[
              {
                title:
                  'Are you signing up for an office based in a single country/region?',
                value: OrganizationType.SINGLE,
              },
              {
                title: 'Are you signing up globally?',
                subtitle:
                  '(which has multiple branches & or offices around the world in many locations)',
                value: OrganizationType.GLOBAL,
              },
            ]}
            cardStyles={styles.card}
            selectedValue={field.value as OrganizationType}
            onSelect={selectedValue =>
              field.onChange(selectedValue as OrganizationType)
            }
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    height: 140,
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 16,
    ...TYPOGRAPHY.semibold_16,
  },
});
