import { StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import { AppInput, AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';
import { CheckboxList } from '@components';

import { OrganizationFormData } from '../../validation';

interface IProps {
  control: Control<OrganizationFormData>;
  errors: FieldErrors<OrganizationFormData>;
}

export const PrimaryLocationStep = ({ control, errors }: IProps) => {
  return (
    <>
      <AppText style={styles.organizationDetails}>Organization Details</AppText>

      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="Country/Region"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.country?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isHeadOffice"
        render={({ field: { onChange, value } }) => (
          <CheckboxList
            label="Is this location a head office?"
            items={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
            checkedValues={value ? 'yes' : 'no'}
            onCheckboxPress={item => onChange(item.value === 'yes')}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  organizationDetails: {
    ...TYPOGRAPHY.medium_14,
    lineHeight: 20,
  },
});
