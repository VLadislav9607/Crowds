import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { If, ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { goBack } from '@navigation';

import {
  AvailabilitySelector,
  TravelingToggle,
  DayTimeSchedule,
  WeeklyDaySelector,
} from '../../components';
import { TravelingForm } from '../../forms';
import { useAvailabilitySetupForm } from '../../hooks';
import { AvailabilityType } from '../../types';
import { showSuccessToast } from '@helpers';

export const AvailabilitySetupScreen = () => {
  const {
    watch,
    setValue,
    errors,
    isValid,
    isLoading,
    isSubmitting,
    onSubmit,
  } = useAvailabilitySetupForm({
    onSuccess: () => {
      showSuccessToast('Availability updated successfully');
      goBack();
    },
  });

  if (isLoading) {
    return (
      <ScreenWithScrollWrapper
        title="Set up availability"
        headerVariant="withTitle"
        colorHeader="black"
      >
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenWithScrollWrapper>
    );
  }

  const availability = watch('availability');
  const selectedDays = watch('selectedDays');
  const daySchedules = watch('daySchedules');
  const isTraveling = watch('isTraveling');

  return (
    <ScreenWithScrollWrapper
      title="Set up availability"
      headerVariant="withTitle"
      colorHeader="black"
      footer={
        <View style={styles.footer}>
          <AppButton
            title="Save"
            onPress={onSubmit}
            isDisabled={!isValid}
            isLoading={isSubmitting}
          />
        </View>
      }
    >
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
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
