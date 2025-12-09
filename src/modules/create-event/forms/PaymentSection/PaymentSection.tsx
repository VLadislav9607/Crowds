import { StyleSheet } from 'react-native';
import { Controller, FieldErrors } from 'react-hook-form';
import { CheckboxList } from '@components';
import { CreateEventFormData } from '../../validation';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppInput } from '@ui';

interface PaymentSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const PaymentSection = ({ control, errors }: PaymentSectionProps) => {
  return (
    <>
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
            value={value}
            onChangeText={onChange}
            errorMessage={errors.paymentAmount?.message}
            placeholder="$15 minimum"
            containerStyle={styles.paymentAmountInput}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  paymentAmountInput: {
    marginTop: -14,
  },
  label: {
    color: COLORS.black,
    ...TYPOGRAPHY.h5_mob,
    marginBottom: 14,
  },
});
