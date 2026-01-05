import { View } from 'react-native';

import { AppInput, AppText } from '@ui';
import { AppDateInput, If } from '@components';
import { ICONS } from '@assets';

import { TripAvailability } from '../../types';
import { ScheduleTypeSelector, DayTimeSchedule } from '../../components';
import { styles } from './styles';
import { ITravelingFormProps } from './types';
import { generateTravelDays } from './helpers';

export const TravelingForm = ({
  watch,
  setValue,
  errors,
}: ITravelingFormProps) => {
  const location = watch('location');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const tripAvailability = watch('tripAvailability');
  const travelDays = watch('travelDays');

  const handleStartDateChange = (date: Date) => {
    setValue('startDate', date);
    setValue('travelDays', generateTravelDays(date, endDate));
  };

  const handleEndDateChange = (date: Date) => {
    setValue('endDate', date);
    setValue('travelDays', generateTravelDays(startDate, date));
  };

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Where are you going?"
        value={location}
        containerStyle={styles.locationInput}
        onChangeText={value => setValue('location', value)}
        errorMessage={errors?.location?.message}
      />

      <View style={styles.dateRow}>
        <View style={styles.dateInput}>
          <AppDateInput
            fieldStyle={styles.dateField}
            placeholder="From"
            customIcon={ICONS.clockV2('black')}
            defaultIconPosition="right"
            value={startDate ?? undefined}
            onChange={handleStartDateChange}
          />
        </View>
        <View style={styles.dateInput}>
          <AppDateInput
            fieldStyle={styles.dateField}
            placeholder="To"
            defaultIconPosition="right"
            customIcon={ICONS.clockV2('black')}
            value={endDate ?? undefined}
            onChange={handleEndDateChange}
          />
        </View>
      </View>

      <If condition={!!errors?.startDate?.message}>
        <AppText typography="medium_10" color="red" margin={{ top: -8 }}>
          {errors?.startDate?.message}
        </AppText>
      </If>

      <If condition={travelDays.length > 0}>
        <View style={styles.divider} />

        <ScheduleTypeSelector
          value={tripAvailability}
          onChange={value => setValue('tripAvailability', value)}
        />
      </If>

      <If
        condition={
          tripAvailability === TripAvailability.CustomSchedule &&
          travelDays.length > 0
        }
      >
        <DayTimeSchedule
          mode="dates"
          schedules={travelDays}
          onChange={schedules => setValue('travelDays', schedules)}
          label="Select available days while traveling"
        />
      </If>
    </View>
  );
};
