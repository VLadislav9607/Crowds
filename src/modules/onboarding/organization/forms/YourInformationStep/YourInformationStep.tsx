import { StyleSheet, View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import { AppInput } from '@ui';
import { Gender } from '@modules/profile';
import { CheckboxList } from '@components';

import { OrganizationFormData } from '../../validation';

interface IProps {
  control: Control<OrganizationFormData>;
  errors: FieldErrors<OrganizationFormData>;
}

export const YourInformationStep = ({ control, errors }: IProps) => {
  return (
    <>
      <View style={styles.nameInputs}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              containerStyle={styles.nameInput}
              errorMessage={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
              containerStyle={styles.nameInput}
              errorMessage={errors.lastName?.message}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="positionInCompany"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="Position in company"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.positionInCompany?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isAuthorizedOnBehalfOfCompany"
        render={({ field: { onChange, value } }) => (
          <CheckboxList
            label="I am authorized on behalf of the company to make decisions; and or in an Executive, C Suite or Board Position"
            items={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
            checkedValues={value ? 'yes' : 'no'}
            onCheckboxPress={item => onChange(item.value === 'yes')}
          />
        )}
      />

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
    </>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    flex: 0.5,
  },
  nameInputs: {
    flexDirection: 'row',
    gap: 20,
  },
});
