import { View, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';

import { COLORS } from '@styles';
import { AppText, Avatar, IconButton } from '@ui';
import { ICONS } from '@assets';
import { usePopupMenu } from '@components';

import { ParticipantStatusBadge } from '../../ui';
import { EventParticipantCardProps } from './types';
import { EVENT_PARTICIPANT_POPUP_ITEMS } from './constants';

export const EventParticipantCard = ({
  participant,
  onMenuSelect,
  onPressImageIcon,
  onPress,
  menuItems,
}: EventParticipantCardProps) => {
  const { name, location, status, time, flag, avatarUrl, avatarPath, avatarBucket } = participant;
  const { showPopup } = usePopupMenu();

  const handleOpenMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    showPopup({
      items: menuItems ?? EVENT_PARTICIPANT_POPUP_ITEMS,
      position: { x: pageX, y: pageY },
      onSelect: onMenuSelect,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <Avatar size={40} name={name} flag={flag} uri={avatarUrl} imgPath={avatarPath} bucket={avatarBucket} />

      <View style={styles.infoContainer}>
        <AppText typography="bold_14">{name}</AppText>
        <AppText typography="regular_12" color="black_60">
          {location}
        </AppText>
      </View>

      <ParticipantStatusBadge
        status={status}
        time={time}
        onPressImage={onPressImageIcon}
      />

      <IconButton
        icon={ICONS.dotsVertical()}
        iconSize={24}
        onPress={handleOpenMenu}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 12,
    borderRadius: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    gap: 4,
    marginLeft: 12,
  },
});
