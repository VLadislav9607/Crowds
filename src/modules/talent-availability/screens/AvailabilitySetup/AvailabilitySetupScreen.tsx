import { View, StyleSheet } from 'react-native';

import { If, ScreenWithScrollWrapper } from '@components';

import {
  AvailabilitySelector,
  TravelingToggle,
  DayTimeSchedule,
  WeeklyDaySelector,
} from '../../components';
import { TravelingForm } from '../../forms';
import { useAvailabilitySetupForm } from '../../hooks';
import { AvailabilityType } from '../../types';

export const AvailabilitySetupScreen = () => {
  const { watch, setValue } = useAvailabilitySetupForm();

  const availability = watch('availability');
  const selectedDays = watch('selectedDays');
  const daySchedules = watch('daySchedules');
  const isTraveling = watch('isTraveling');

  return (
    <ScreenWithScrollWrapper
      title="Set up availability"
      headerVariant="withTitle"
      colorHeader="black"
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
          <TravelingForm watch={watch} setValue={setValue} />
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
});
