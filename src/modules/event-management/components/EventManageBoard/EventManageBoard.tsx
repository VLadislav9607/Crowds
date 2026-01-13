import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '@ui';
import { ICONS } from '@assets';
import { If } from '@components';

import { boardConfig } from './config';
import { BoardItemType, IEventManageBoardProps } from './types';
import { styles } from './styles';

export const EventManageBoard = ({
  onOpenEditCheckIn,
}: IEventManageBoardProps) => {
  return (
    <View style={styles.container}>
      {boardConfig.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          disabled={item.type !== BoardItemType.CHECK_IN_CUTOFF}
          onPress={() => onOpenEditCheckIn()}
          style={[
            styles.borderItem,
            {
              backgroundColor: item.bgColor,
              borderColor: item.borderColor,
              borderWidth: item.borderWidth || 0,
            },
          ]}
        >
          <AppText style={[styles.value, { color: item.textColor }]}>
            {item.value}
          </AppText>
          <AppText style={[styles.label, { color: item.textColor }]}>
            {item.label}
          </AppText>

          <If condition={item.type === BoardItemType.CHECK_IN_CUTOFF}>
            <SvgXml xml={ICONS.edit()} style={styles.editIcon} />
          </If>
        </TouchableOpacity>
      ))}
    </View>
  );
};
