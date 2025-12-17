import { StyleProp, ViewStyle } from 'react-native';

export interface FilterButtonProps {
  onPress: () => void;
  activeFiltersCount?: number;
  style?: StyleProp<ViewStyle>;
}
