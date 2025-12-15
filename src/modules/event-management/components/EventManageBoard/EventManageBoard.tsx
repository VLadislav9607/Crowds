import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';
import { ICONS } from '@assets';
import { If } from '@components';

import { boardConfig } from './config';
import { BoardItemType, IEventManageBoardProps } from './types';

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

const GAP = 12;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: GAP,
    marginBottom: 35,
    paddingHorizontal: 12,
  },
  borderItem: {
    width: `${(100 - GAP / 2) / 2}%`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 125,
  },
  value: {
    ...TYPOGRAPHY.bold_40,
  },
  label: {
    ...TYPOGRAPHY.bold_14,
  },
  editIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
