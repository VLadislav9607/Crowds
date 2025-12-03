import { AppInput, AppText } from '@ui';
import { AppDateInput, CheckboxList } from '@components';
import { View } from 'react-native';
import { useTalentEnterName } from './useTalentEnterName';
import { Controller } from 'react-hook-form';
import { Gender } from '@modules/common';
import { styles } from './styles';

export const TalentEnterName = () => {
  const { control, errors } = useTalentEnterName();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="First Name"
            placeholder="Enter your first name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.firstName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Last Name"
            placeholder="Enter your last name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.lastName?.message}
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
              { label: 'Other', value: Gender.OTHER },
            ]}
            checkedValues={value}
            onCheckboxPress={item => onChange(item.value as Gender)}
            errorMessage={errors.gender?.message}
          />
        )}
      />

      <View>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange, value } }) => (
            <AppDateInput
              useDefaultIcon
              placeholder="Select your date of birth"
              label="Date of birth"
              containerStyle={{ marginBottom: 8 }}
              value={value}
              onChange={date => onChange(date)}
              errorMessage={errors.dateOfBirth?.message}
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
};
