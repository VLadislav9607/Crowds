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
  checkinOpensAt,
  checkinClosesAt,
  timezone,
  isBumpInPassed,
  hasAnyCheckins,
  isUpdating,
  onOpenEditBumpIn,
}: IEventManageBoardProps) => {
  const boardConfig = getBoardConfig(checkinOpensAt, checkinClosesAt, timezone);

  const isEditDisabled = isBumpInPassed || hasAnyCheckins;

  return (
    <View style={styles.container}>
      {boardConfig.map((item, index) => {
        const isOpensTile = item.type === BoardItemType.CHECKIN_OPENS;

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            disabled={!isOpensTile || isEditDisabled || isUpdating}
            onPress={() => onOpenEditBumpIn()}
            style={[
              styles.borderItem,
              {
                backgroundColor: item.bgColor,
                borderColor: item.borderColor,
                borderWidth: item.borderWidth || 0,
                opacity: isOpensTile && isEditDisabled ? 0.5 : 1,
              },
            ]}
          >
            <If condition={isOpensTile && isUpdating}>
              <ActivityIndicator color={COLORS.white} size="small" />
            </If>
            <If condition={!(isOpensTile && isUpdating)}>
              <AppText style={[styles.value, { color: item.textColor }]}>
                {item.value}
              </AppText>
            </If>
            <AppText style={[styles.label, { color: item.textColor }]}>
              {item.label}
            </AppText>

            <If condition={isOpensTile && !isEditDisabled && !isUpdating}>
              <SvgXml xml={ICONS.edit()} style={styles.editIcon} />
            </If>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
