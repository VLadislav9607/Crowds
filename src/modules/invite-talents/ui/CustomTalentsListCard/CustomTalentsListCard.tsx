import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppText } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';

interface CustomTalentsListCardProps {
  listName: string;
  countTalents: number;
  onPress: () => void;
}

export const CustomTalentsListCard = ({
  listName,
  countTalents,
  onPress,
}: CustomTalentsListCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <AppText typography="h6" numberOfLines={2}>
          {listName}
        </AppText>

        <AppText typography="regular_14" color="gray_primary">
          {countTalents} people
        </AppText>
      </View>

      <SvgXml xml={ICONS.chevronRight('black_80')} width={20} height={20} />
    </TouchableOpacity>
  );
};
