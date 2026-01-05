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
  TravelingToggle,
  DayTimeSchedule,
  WeeklyDaySelector,
} from '../../components';
import { TravelingForm } from '../TravelingForm';
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
  const isTraveling = watch('isTraveling');

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

      <TravelingToggle
        value={isTraveling}
        onChange={value => setValue('isTraveling', value)}
      />

      <If condition={isTraveling}>
        <TravelingForm watch={watch} setValue={setValue} errors={errors} />
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
