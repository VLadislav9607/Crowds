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
    watch,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const paymentMode = watch('paymentMode');

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
        render={({ field: { value, onChange } }) => {
          console.log('value', value);
          return (
            <AppInput
              value={value ? String(value) : ''}
              onChangeText={text => {
                if (!text || text.trim() === '' || text.trim() === '0') {
                  onChange(undefined);
                } else {
                  const numValue = Number(text);
                  if (!isNaN(numValue) && numValue > 0) {
                    onChange(numValue);
                  } else {
                    onChange(undefined);
                  }
                }
              }}
              keyboardType="numeric"
              errorMessage={errors.paymentAmount?.message}
              placeholder={paymentMode === 'fixed' ? 'Total fixed amount (USD)' : '$15.00 minimum (USD)'}
              description="Minimum 3-hour payment applies, even for 1-hour shifts (legal requirement)."
              containerStyle={styles.paymentAmountInput}
            />
          );
        }}
      />

      {paymentMode === 'fixed' && (
        <Controller
          control={control}
          name="fixedRateTotalHours"
          render={({ field: { value, onChange } }) => (
            <AppInput
              value={value ? String(value) : ''}
              onChangeText={text => {
                if (!text || text.trim() === '' || text.trim() === '0') {
                  onChange(undefined);
                } else {
                  const numValue = Number(text);
                  if (!isNaN(numValue) && numValue > 0) {
                    onChange(numValue);
                  } else {
                    onChange(undefined);
                  }
                }
              }}
              keyboardType="numeric"
              errorMessage={errors.fixedRateTotalHours?.message}
              placeholder="Total hours of work"
              description="Total planned hours across the full engagement period. Minimum $9.50 USD per hour applies."
            />
          )}
        />
      )}
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
