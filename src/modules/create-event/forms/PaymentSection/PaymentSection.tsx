import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { CheckboxList } from '@components';
import { AppInput } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { CreateEventFormData } from '../../validation';

export const PaymentSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <Controller
        control={control}
        name="paymentMode"
        render={({ field: { value, onChange } }) => (
          <CheckboxList
            label="Payment Mode"
            labelStyle={styles.label}
            items={[
              { label: 'Per Hour', value: 'perHour' },
              { label: 'Fixed', value: 'fixed' },
            ]}
            checkedValues={value}
            errorMessage={errors.paymentMode?.message}
            onCheckboxPress={item => onChange(item.value)}
          />
        )}
      />

      <Controller
        control={control}
        name="paymentAmount"
        render={({ field: { value, onChange } }) => (
          <AppInput
            value={value ? String(value) : ''}
            onChangeText={text => onChange(text ? Number(text) : undefined)}
            keyboardType="numeric"
            errorMessage={errors.paymentAmount?.message}
            placeholder="$15 minimum"
            description="Minimum 3-hour payment applies, even for 1-hour shifts (legal requirement)."
            containerStyle={styles.paymentAmountInput}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  paymentAmountInput: {
    marginTop: -14,
  },
  label: {
    color: COLORS.black,
    ...TYPOGRAPHY.h5_mob,
    marginBottom: 14,
  },
});
