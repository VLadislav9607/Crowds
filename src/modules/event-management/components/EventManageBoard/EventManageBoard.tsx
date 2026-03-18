import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '@ui';
import { ICONS } from '@assets';
import { If } from '@components';
import { COLORS } from '@styles';

import { getBoardConfig } from './config';
import { BoardItemType, IEventManageBoardProps } from './types';
import { styles } from './styles';

export const EventManageBoard = ({
  checkinCutoff,
  timezone,
  isCutoffPassed,
  isUpdating,
  onOpenEditCheckIn,
}: IEventManageBoardProps) => {
  const boardConfig = getBoardConfig(checkinCutoff, timezone);

  return (
    <View style={styles.container}>
      {boardConfig.map((item, index) => {
        const isCutoffTile = item.type === BoardItemType.CHECK_IN_CUTOFF;

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            disabled={!isCutoffTile || isCutoffPassed || isUpdating}
            onPress={() => onOpenEditCheckIn()}
            style={[
              styles.borderItem,
              {
                backgroundColor: item.bgColor,
                borderColor: item.borderColor,
                borderWidth: item.borderWidth || 0,
                opacity: isCutoffTile && isCutoffPassed ? 0.5 : 1,
              },
            ]}
          >
            <If condition={isCutoffTile && isUpdating}>
              <ActivityIndicator color={COLORS.white} size="small" />
            </If>
            <If condition={!(isCutoffTile && isUpdating)}>
              <AppText style={[styles.value, { color: item.textColor }]}>
                {item.value}
              </AppText>
            </If>
            <AppText style={[styles.label, { color: item.textColor }]}>
              {item.label}
            </AppText>

            <If condition={isCutoffTile && !isCutoffPassed && !isUpdating}>
              <SvgXml xml={ICONS.edit()} style={styles.editIcon} />
            </If>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
