import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { If } from '@components';

import { AppText } from '../AppText';
import { styles } from './styles';
import { FilterButtonProps } from './types';

export const FilterButton = ({
  onPress,
  activeFiltersCount = 0,
  style,
}: FilterButtonProps) => {
  const isActive = activeFiltersCount > 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, style, isActive && styles.active]}
    >
      <SvgXml
        xml={ICONS.filter(isActive ? 'main' : 'black_80')}
        width={20}
        height={20}
      />

      <If condition={isActive}>
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{activeFiltersCount}</AppText>
        </View>
      </If>
    </TouchableOpacity>
  );
};
