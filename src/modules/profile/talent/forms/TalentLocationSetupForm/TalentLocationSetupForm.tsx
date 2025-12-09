import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { AppInput, AppText } from '@ui';
import { SelectOptionField } from '@components';
import { styles } from './styles';
import {
  TalentLocationSetupFormData,
  TalentLocationSetupFormRef,
  talentLocationSetupSchema,
} from './types';

// Common countries list - can be moved to constants if needed
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Italy', value: 'it' },
  { label: 'Spain', value: 'es' },
  { label: 'Netherlands', value: 'nl' },
  { label: 'Belgium', value: 'be' },
  { label: 'Switzerland', value: 'ch' },
  { label: 'Austria', value: 'at' },
  { label: 'Sweden', value: 'se' },
  { label: 'Norway', value: 'no' },
  { label: 'Denmark', value: 'dk' },
  { label: 'Poland', value: 'pl' },
  { label: 'Ukraine', value: 'ua' },
  { label: 'Japan', value: 'jp' },
  { label: 'South Korea', value: 'kr' },
  { label: 'China', value: 'cn' },
  { label: 'India', value: 'in' },
  { label: 'Brazil', value: 'br' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Argentina', value: 'ar' },
  { label: 'South Africa', value: 'za' },
  { label: 'New Zealand', value: 'nz' },
];

export const TalentLocationSetupForm = forwardRef<
  TalentLocationSetupFormRef,
  {}
>((_, ref) => {
  const defaultValues: TalentLocationSetupFormData = {
    country: '',
    stateProvince: '',
    suburb: '',
  };

  const { control, handleSubmit, getValues } =
    useForm<TalentLocationSetupFormData>({
      resolver: zodResolver(talentLocationSetupSchema),
      defaultValues,
      mode: 'onBlur',
    });

  useImperativeHandle(ref, () => ({ handleSubmit, getValues }), [
    handleSubmit,
    getValues,
  ]);

  return (
    <View style={styles.container}>
      <AppText color="black" typography="semibold_18" margin={{ bottom: 16 }}>
        Where do you live?
      </AppText>

      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <SelectOptionField
            fieldProps={{
              label: 'Country',
              placeholderText: 'Country',
              labelProps: { color: 'main' },
              value: countryOptions.find(o => o.value === field.value)?.label,
            }}
            options={countryOptions}
            selectedValues={field.value}
            onOptionSelect={item => field.onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="stateProvince"
        render={({ field, fieldState }) => (
          <AppInput
            label="State / Province"
            placeholder="State / Province"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Controller
        control={control}
        name="suburb"
        render={({ field, fieldState }) => (
          <AppInput
            label="Suburb"
            placeholder="Suburb"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />
    </View>
  );
});
