import { Pressable, View } from 'react-native';

import { AppText } from '@ui';

import { DayOfWeek, DAYS_INFO } from '../../types';
import { styles } from './styles';
import { IWeeklyDaySelectorProps } from './types';
import { updateDaySchedules } from './helpers';

export const WeeklyDaySelector = ({
  selectedDays,
  daySchedules,
  onChange,
  onSchedulesChange,
  label = 'Select available days:',
  errorMessage,
}: IWeeklyDaySelectorProps) => {
  const handleDayPress = (day: DayOfWeek) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];

    onChange(newDays);
    onSchedulesChange(updateDaySchedules(newDays, daySchedules));
  };

  return (
    <View style={styles.container}>
      <AppText typography="medium_14" color="gray_primary">
        {label}
      </AppText>

      <View style={styles.daysRow}>
        {DAYS_INFO.map(day => {
          const isSelected = selectedDays.includes(day.value);

          return (
            <Pressable
              key={day.value}
              style={[styles.day, isSelected && styles.daySelected]}
              onPress={() => handleDayPress(day.value)}
            >
              <AppText
                typography="bold_12"
                color={isSelected ? 'white' : 'gray_primary'}
              >
                {day.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <AppText renderIf={!!errorMessage} typography="regular_12" color="red">
        {errorMessage}
      </AppText>
    </View>
  );
};
