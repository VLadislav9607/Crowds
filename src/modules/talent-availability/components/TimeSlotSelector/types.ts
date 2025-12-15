import { ViewStyle } from 'react-native';

import { TimeSlot } from '../../types';

export interface ITimeSlotSelectorProps {
  value: TimeSlot;
  onChange: (value: TimeSlot) => void;
  customLabel?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}
