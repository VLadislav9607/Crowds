import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Animated from 'react-native-reanimated';

import { ICONS } from '@assets';
import { AppText } from '@ui';

import { styles } from '../styles';

interface AgeGroupHeaderProps {
  title: string;
  summaryText: string;
  chevronStyle: { transform: { rotate: string }[] };
  onPress: () => void;
}

export const AgeGroupHeader = ({
  title,
  summaryText,
  chevronStyle,
  onPress,
}: AgeGroupHeaderProps) => {
  return (
    <TouchableOpacity
      style={styles.header}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.headerContent}>
        <AppText typography="bold_16" color="black">
          {title}
        </AppText>
        <AppText typography="regular_14" color="gray_primary" numberOfLines={1}>
          {summaryText}
        </AppText>
      </View>

      <Animated.View style={chevronStyle}>
        <SvgXml xml={ICONS.chevronDown('black')} width={14} height={14} />
      </Animated.View>
    </TouchableOpacity>
  );
};
