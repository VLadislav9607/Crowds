import { View, TouchableOpacity } from 'react-native';

import { AppText, Avatar } from '@ui';
import { If } from '@components';

import { styles } from './styles';
import { IChatItemProps } from './types';

export const ChatItem = ({
  chat,
  variant = 'talent',
  onPress,
  isFirstChat,
  isNextUnread,
  isPrevUnread,
}: IChatItemProps) => {
  const { name, avatar, lastMessage, time, isUnread, eventName } = chat;
  const showEventLabel = variant === 'organization' && eventName;
  const hideBottomBorder =
    variant === 'organization' && isNextUnread && !isUnread;
  const isConsecutiveUnread =
    variant === 'organization' && isUnread && isPrevUnread;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isUnread && styles.containerUnread,
        isConsecutiveUnread && styles.containerUnreadNotFirst,
        hideBottomBorder && styles.containerBeforeUnread,
        isFirstChat && styles.containerFirst,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <If condition={!!showEventLabel}>
        <View style={styles.eventRow}>
          <View style={styles.eventLabel}>
            <AppText typography="bold_10" color="main">
              Event:{' '}
              <AppText typography="medium_10" color="main">
                {eventName}
              </AppText>
            </AppText>
          </View>
          <AppText typography="regular_10" color="gray_primary">
            {time}
          </AppText>
        </View>
      </If>

      <View style={styles.mainRow}>
        <Avatar size={40} uri={avatar} name={name} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <AppText typography="bold_14">{name}</AppText>
            <If condition={!showEventLabel}>
              <AppText typography="regular_10" color="gray_primary">
                {time}
              </AppText>
            </If>
          </View>

          <View style={styles.topRow}>
            <AppText
              typography={isUnread ? 'medium_12' : 'regular_12'}
              numberOfLines={1}
              style={styles.messageText}
            >
              {lastMessage}
            </AppText>
          </View>
        </View>

        <If condition={!!isUnread}>
          <View style={styles.unreadDot} />
        </If>
      </View>
    </TouchableOpacity>
  );
};
