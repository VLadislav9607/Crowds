import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { If } from '@components';

import { styles } from './styles';

interface CustomTalentsListCardProps {
  listName: string;
  countTalents: number;
  onInviteAll: () => void;
  onPress: () => void;
}

export const CustomTalentsListCard = ({
  listName,
  countTalents,
  onInviteAll,
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

      <If condition={countTalents > 0}>
        <AppButton
          title="Invite All"
          size="36"
          width={92}
          onPress={onInviteAll}
        />
      </If>

      <SvgXml xml={ICONS.chevronRight('black_80')} width={20} height={20} />
    </TouchableOpacity>
  );
};
