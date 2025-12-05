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

export const HeadOfficeGlobalStep = ({ control, errors }: IProps) => {
  console.log('errors', errors);
  return (
    <>
      <AppText style={styles.organizationDetails}>Organization Details</AppText>

      <Controller
        control={control}
        name="headOfficeLocation"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="Search head office location"
            value={value || ''}
            onChangeText={onChange}
            errorMessage={errors.headOfficeLocation?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="haveBranches"
        render={({ field: { onChange, value } }) => (
          <CheckboxList
            label="Do you have branches?"
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
