import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { If } from '@components';

import {
  AvailabilitySelector,
  DayTimeSchedule,
  WeeklyDaySelector,
} from '../../components';
import { useAvailabilitySetupForm } from '../../hooks';
import { AvailabilityType } from '../../types';
import {
  TalentAvailabilityFormProps,
  TalentAvailabilityFormRef,
} from './types';

const TalentAvailabilityFormComponent: ForwardRefRenderFunction<
  TalentAvailabilityFormRef,
  TalentAvailabilityFormProps
> = ({ onSuccess, onFormStateChange }, ref) => {
  const {
    watch,
    setValue,
    errors,
    isValid,
    isLoading,
    isSubmitting,
    onSubmit,
  } = useAvailabilitySetupForm({ onSuccess });

  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  useEffect(() => {
    onFormStateChange?.({ isLoading, isSubmitting, isValid });
  }, [isLoading, isSubmitting, isValid, onFormStateChange]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const availability = watch('availability');
  const selectedDays = watch('selectedDays');
  const daySchedules = watch('daySchedules');

  return (
    <View style={styles.container}>
      <AvailabilitySelector
        value={availability}
        onChange={value => setValue('availability', value)}
      />

      <If condition={availability === AvailabilityType.SetSchedule}>
        <WeeklyDaySelector
          selectedDays={selectedDays}
          daySchedules={daySchedules}
          onChange={days => setValue('selectedDays', days)}
          onSchedulesChange={schedules => setValue('daySchedules', schedules)}
          errorMessage={errors.selectedDays?.message}
        />

        <If condition={daySchedules.length > 0}>
          <DayTimeSchedule
            mode="days"
            schedules={daySchedules}
            onChange={schedules => setValue('daySchedules', schedules)}
          />
        </If>
      </If>
    </View>
  );
};

export const TalentAvailabilityForm = forwardRef(
  TalentAvailabilityFormComponent,
);

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
