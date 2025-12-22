import { StyleProp, ViewStyle } from 'react-native';

export interface SearchWithFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  activeFiltersCount?: number;
  onFilterPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

