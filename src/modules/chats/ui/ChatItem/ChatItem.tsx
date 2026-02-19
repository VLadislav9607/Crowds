import { View, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

import { AppText, Avatar } from '@ui';
import { If } from '@components';

import { styles } from './styles';
import { IChatItemProps } from './types';
import { ChatType } from '@actions';

export const ChatItem = ({
  chat,
  variant = 'talent',
  onPress,
  isFirstChat,
  isNextUnread,
  isPrevUnread,
}: IChatItemProps) => {
  const {
    title,
    eventName,
    avatarUrl,
    type,
    lastMessage,
    lastMessageAt,
    hasUnread,
  } = chat;
  const hideBottomBorder =
    variant === 'organization' && isNextUnread && !hasUnread;
  const isConsecutiveUnread =
    variant === 'organization' && hasUnread && isPrevUnread;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        hasUnread && styles.containerUnread,
        isConsecutiveUnread && styles.containerUnreadNotFirst,
        hideBottomBorder && styles.containerBeforeUnread,
        isFirstChat && styles.containerFirst,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.eventRow}>
        <View style={styles.eventLabel}>
          <AppText typography="bold_10" color="main">
            Event:{' '}
            <AppText typography="medium_10" color="main">
              {eventName}
            </AppText>
            <AppText
              renderIf={type === ChatType.Group}
              typography="medium_10"
              color="main"
            >
              {' - Group chat'}
            </AppText>
          </AppText>
        </View>
        <AppText typography="regular_10" color="gray_primary">
          {lastMessageAt ? formatDistanceToNow(lastMessageAt) : ''}
        </AppText>
      </View>

      <View style={styles.mainRow}>
        <Avatar
          bucket={variant === 'talent' ? 'brand_avatars' : 'talents_avatars'}
          size={40}
          imgPath={avatarUrl || ''}
          name={title}
        />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <AppText typography="bold_14">{title}</AppText>
          </View>

          <View style={styles.topRow}>
            <AppText
              typography={hasUnread ? 'medium_12' : 'regular_12'}
              numberOfLines={1}
              style={styles.messageText}
            >
              {lastMessage || 'No messages yet'}
            </AppText>
          </View>
        </View>

        <If condition={!!hasUnread}>
          <View style={styles.unreadDot} />
        </If>
      </View>
    </TouchableOpacity>
  );
};
