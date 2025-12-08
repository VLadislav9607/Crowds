import { Controller, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@ui';
import { AppDateInput } from '@components';
import { ICONS } from '@assets';

import { CreateEventFormData } from '../../validation';

interface BasicInfoSectionProps {
  control: any;
  errors: FieldErrors<CreateEventFormData>;
}

export const DateTimeSection = ({ control, errors }: BasicInfoSectionProps) => {
  return (
    <>
      <AppText typography="h5_mob" margin={{ bottom: -16 }}>
        Date & Time
      </AppText>

      <View style={styles.dateInputContainer}>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              placeholder="Start Date"
              defaultIconPosition="right"
              value={value}
              onChange={onChange}
              errorMessage={errors.startDate?.message}
              containerStyle={styles.dateInput}
            />
          )}
        />

        <Controller
          control={control}
          name="endDate"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              defaultIconPosition="right"
              placeholder="End Date"
              value={value}
              onChange={onChange}
              errorMessage={errors.endDate?.message}
              containerStyle={styles.dateInput}
            />
          )}
        />
      </View>

      <View style={styles.dateInputContainer}>
        <Controller
          control={control}
          name="startTime"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              mode="time"
              placeholder="Start Time"
              value={value}
              customIcon={ICONS.clockIcon()}
              defaultIconPosition="right"
              onChange={onChange}
              errorMessage={errors.startTime?.message}
              containerStyle={styles.dateInput}
            />
          )}
        />

        <Controller
          control={control}
          name="endTime"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              mode="time"
              placeholder="End Time"
              value={value}
              customIcon={ICONS.clockIcon()}
              defaultIconPosition="right"
              onChange={onChange}
              errorMessage={errors.endTime?.message}
              containerStyle={styles.dateInput}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
    columnGap: 14,
  },
  dateInput: {
    flex: 1,
  },
});
