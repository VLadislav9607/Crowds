import { View, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppText } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';
import { ParticipantStatusBadgeProps } from './types';

const STATUS_TEXT = {
  checked_in: 'Checked in',
  checked_out: 'Checked out',
  completed_tasks: 'Preview Image',
  no_show: 'No show',
};

export const ParticipantStatusBadge = ({
  status,
  time,
  onPressImage,
}: ParticipantStatusBadgeProps) => {
  if (status === 'checked_in' || status === 'checked_out') {
    return (
      <View style={styles.container}>
        <AppText typography="regular_9" color="black_60">
          {STATUS_TEXT[status]}
        </AppText>
        <SvgXml
          xml={ICONS.checkedCircle(status === 'checked_in' ? 'green' : 'main')}
          width={24}
          height={24}
        />
        <AppText typography="regular_9" color="black_60">
          {time}
        </AppText>
      </View>
    );
  }

  if (status === 'completed_tasks') {
    return (
      <Pressable style={styles.container} hitSlop={10} onPress={onPressImage}>
        <SvgXml xml={ICONS.image()} width={24} height={24} />
        <AppText typography="regular_8" color="black_60">
          Preview Image
        </AppText>
      </Pressable>
    );
  }

  if (status === 'no_show') {
    return (
      <View style={styles.noShowContainer}>
        <AppText typography="regular_12" color="white">
          No show
        </AppText>
      </View>
    );
  }

  return null;
};

