import { Controller, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { AppInput, AppText } from '@ui';
import { CreateEventFormData } from '../../validation';

interface AgePeopleSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const AgePeopleSection = ({
  control,
  errors,
}: AgePeopleSectionProps) => {
  return (
    <>
      <AppText typography="h5_mob" margin={{ bottom: -4 }}>
        Select Age Groups & No. of People
      </AppText>

      <View style={styles.container}>
        <Controller
          control={control}
          name="minAge"
          render={({ field: { value } }) => (
            <AppInput
              label="Min Age Group"
              value={value}
              inputMode="numeric"
              errorMessage={errors.minAge?.message}
              containerStyle={styles.dateInput}
              placeholder="Enter"
              labelProps={{
                typography: 'regular_12',
                color: 'dark_gray',
                style: { marginBottom: 0 },
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="maxAge"
          render={({ field: { value } }) => (
            <AppInput
              label="Max Age Group"
              value={value}
              inputMode="numeric"
              errorMessage={errors.maxAge?.message}
              containerStyle={styles.dateInput}
              placeholder="Enter"
              labelProps={{
                typography: 'regular_12',
                color: 'dark_gray',
                style: { marginBottom: 0 },
              }}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 14,
  },
  dateInput: {
    width: '10%',
    flex: 1,
  },
});
