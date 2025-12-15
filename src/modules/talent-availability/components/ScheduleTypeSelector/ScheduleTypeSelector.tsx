import { Pressable, View } from 'react-native';

import { AppText } from '@ui';

import { TripAvailability } from '../../types';
import { styles } from './styles';
import { IScheduleTypeSelectorProps } from './types';

const OPTIONS: {
  value: TripAvailability;
  title: string;
  subtitle: string;
}[] = [
  {
    value: TripAvailability.SameAsRegular,
    title: 'Same as regular',
    subtitle: 'Use my normal schedule',
  },
  {
    value: TripAvailability.CustomSchedule,
    title: 'Custom schedule',
    subtitle: 'Set specific days & times',
  },
  {
    value: TripAvailability.NotAvailable,
    title: 'Not available',
    subtitle: 'Block all availability',
  },
];

export const ScheduleTypeSelector = ({
  value,
  onChange,
}: IScheduleTypeSelectorProps) => {
  return (
    <View style={styles.container}>
      <AppText typography="medium_14" color="gray_primary">
        Availability during this trip
      </AppText>
      {OPTIONS.map(option => {
        const isSelected = value === option.value;

        return (
          <Pressable
            key={option.value}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onChange(option.value)}
          >
            <View style={[styles.radio, isSelected && styles.selectedRadio]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>

            <View style={styles.content}>
              <AppText typography="bold_14">{option.title}</AppText>
              <AppText typography="medium_12" color="gray_primary">
                {option.subtitle}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
