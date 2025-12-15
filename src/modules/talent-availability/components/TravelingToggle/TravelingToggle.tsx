import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { AppText } from '@ui';
import { Switch } from '@components';

import { styles } from './styles';
import { ITravelingToggleProps } from './types';

export const TravelingToggle = ({ value, onChange }: ITravelingToggleProps) => {
  return (
    <View style={[styles.container, value && styles.selectedContainer]}>
      <SvgXml xml={ICONS.plane()} width={36} height={36} />

      <View style={styles.content}>
        <AppText typography="semibold_16">Traveling soon?</AppText>
        <AppText typography="regular_14" color="grayscale_900">
          Set temporary availability
        </AppText>
      </View>

      <Switch active={value} onChange={onChange} activeColor="main" />
    </View>
  );
};
