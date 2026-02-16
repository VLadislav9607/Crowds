import { StyleSheet, View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { AppInput, AppText } from '@ui';
import { InviteMemberFormData } from '../../hooks';

interface TheirDetailsFormProps {
  control: Control<InviteMemberFormData>;
  errors: FieldErrors<InviteMemberFormData>;
  disabled?: boolean;
}

export const TheirDetailsForm = ({
  control,
  errors,
  disabled,
}: TheirDetailsFormProps) => {
  return (
    <>
      <AppText typography="h3_mob" style={styles.title}>
        Their Details
      </AppText>

      <View style={styles.container}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.firstName?.message}
              disabled={disabled}
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
              errorMessage={errors.lastName?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          control={control}
          name="positionInCompany"
          render={({ field: { onChange, value } }) => (
            <AppInput
              placeholder="Position in company"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.positionInCompany?.message}
              disabled={disabled}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
});
