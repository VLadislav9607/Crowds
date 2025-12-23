import { View } from 'react-native';

import { AppSearchInputPrimary } from '../AppSearchInputPrimary';
import { FilterButton } from '../FilterButton';
import { styles } from './styles';
import { SearchWithFilterProps } from './types';

export const SearchWithFilter = ({
  searchValue,
  onSearchChange,
  placeholder = 'Search by keyword',
  activeFiltersCount = 0,
  onFilterPress,
  containerStyle,
}: SearchWithFilterProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AppSearchInputPrimary
        containerStyle={styles.searchInput}
        placeholder={placeholder}
        value={searchValue}
        onChangeText={onSearchChange}
      />

      <FilterButton
        onPress={onFilterPress}
        activeFiltersCount={activeFiltersCount}
      />
    </View>
  );
};
