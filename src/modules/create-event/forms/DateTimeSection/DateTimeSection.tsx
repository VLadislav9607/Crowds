import { forwardRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { isBefore, isAfter, addHours, differenceInHours } from 'date-fns';

import { AppText } from '@ui';
import { AppDateInput } from '@components';

import { CreateEventFormData } from '../../validation';
import { showErrorToast } from '@helpers';

export const DateTimeSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateEventFormData>();

  const startAt = useWatch({ control, name: 'startAt' });
  const endAt = useWatch({ control, name: 'endAt' });
  const registrationClosingAt = useWatch({
    control,
    name: 'registrationClosingAt',
  });

  const now = new Date();
  const minStartDate = addHours(now, 1); // Minimum start date is 1 hour from now

  const isLessThan3HoursDuration =
    startAt && endAt ? differenceInHours(endAt, startAt) < 3 : false;

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <AppText typography="h5_mob" margin={{ bottom: -16 }}>
        Date & Time
      </AppText>

      <View style={styles.dateInputContainer}>
        <Controller
          control={control}
          name="startAt"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              placeholder="Start Date"
              defaultIconPosition="right"
              value={value}
              mode="datetime"
              onChange={date => {
                if (isBefore(date, now)) return;
                onChange(date);
                if (endAt && isBefore(endAt, date)) {
                  setValue('endAt', undefined as any, { shouldValidate: true });
                }
                // If registrationClosingAt is set and is after the new startAt, clear it
                if (
                  registrationClosingAt &&
                  isAfter(registrationClosingAt, date)
                ) {
                  setValue('registrationClosingAt', undefined as any, {
                    shouldValidate: true,
                  });
                }
              }}
              errorMessage={errors.startAt?.message}
              containerStyle={styles.dateInput}
              minimumDate={minStartDate}
              maximumDate={endAt}
              valueFormat="MM/dd/yyyy h:mm a"
            />
          )}
        />

        <Controller
          control={control}
          name="endAt"
          render={({ field: { value, onChange } }) => (
            <AppDateInput
              defaultIconPosition="right"
              placeholder="End Date"
              value={value}
              mode="datetime"
              disabled={!startAt}
              onChange={date => {
                const minEndDate = addHours(startAt!, 3);
                if (isBefore(date, minEndDate)) {
                  showErrorToast('Event must be at least 3 hours long');
                  return;
                }
                onChange(date);
              }}
              errorMessage={
                !startAt
                  ? 'Please select start date first'
                  : errors.endAt?.message
              }
              containerStyle={styles.dateInput}
              minimumDate={startAt ? addHours(startAt, 3) : minStartDate}
              valueFormat="MM/dd/yyyy h:mm a"
            />
          )}
        />
      </View>

      {isLessThan3HoursDuration && (
        <AppText typography="medium_12" color="red" margin={{ top: -16 }}>
          The event must be at least 3 hours long. Please adjust the start or
          end time.
        </AppText>
      )}

      {/* {isLessThan2DaysAway && (
        <AppText
          typography="medium_12"
          color="gray_primary"
          margin={{ top: isLessThan3HoursDuration ? 0 : -16 }}
        >
          As the selected date is less than 2 days away, we cannot ensure crowd
          availability. We recommend choosing another date for a better
          experience.
        </AppText>
      )} */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  dateInputContainer: {
    flexDirection: 'row',
    columnGap: 14,
  },
  dateInput: {
    flex: 1,
  },
});
