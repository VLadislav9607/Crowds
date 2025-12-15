import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { AppText } from '@ui';

import { AvailabilityType } from '../../types';
import { styles } from './styles';
import { IAvailabilitySelectorProps } from './types';

const OPTIONS: { value: AvailabilityType; label: string; icon: string }[] = [
  {
    value: AvailabilityType.AlwaysAvailable,
    label: 'Always Available',
    icon: ICONS.checkedCircle(),
  },
  {
    value: AvailabilityType.SetSchedule,
    label: 'Set Schedule',
    icon: ICONS.calendarV3(),
  },
];

export const AvailabilitySelector = ({
  value,
  onChange,
}: IAvailabilitySelectorProps) => {
  return (
    <View style={styles.container}>
      {OPTIONS.map(option => {
        const isSelected = value === option.value;

        return (
          <Pressable
            key={option.value}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onChange(option.value)}
          >
            <SvgXml xml={option.icon} width={36} height={36} />
            <AppText
              typography="semibold_16"
              color={isSelected ? 'main' : 'black'}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};
