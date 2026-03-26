import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { AppText, Avatar } from '@ui';
import { If } from '@components';
import { COLORS } from '@styles';
import { ChatType } from '@actions';

import { styles } from './styles';
import { IMessageProps } from './types';

export const Message = ({
  message,
  chatType,
  isFirst,
  isLast,
  onLongPress,
}: IMessageProps) => {
  const { text, time, isMe, showTime, senderName, senderAvatar, senderRole, id, isEdited } =
    message;
  const showAvatar = !isMe && chatType === ChatType.Group;

  const getBubbleStyle = () => {
    const baseStyles = [styles.bubble, isMe && styles.bubbleMe];

    if (isMe) {
      if (isFirst) return [...baseStyles, styles.bubbleFirstMe];
      if (isLast) return [...baseStyles, styles.bubbleLastMe];
      return [...baseStyles, styles.bubbleMiddleMe];
    } else {
      if (isFirst) return [...baseStyles, styles.bubbleFirstOther];
      if (isLast) return [...baseStyles, styles.bubbleLastOther];
      return [...baseStyles, styles.bubbleMiddleOther];
    }
  };

  const handleLongPress = () => {
    if (isMe && onLongPress) {
      onLongPress(message);
    }
  };

  return (
    <View style={[styles.container, showTime && styles.containerWithTime]}>
      <If condition={!!showTime}>
        <View style={[styles.timeContainer, isMe && styles.timeContainerMe]}>
          <AppText typography="regular_10" style={styles.timeText}>
            {time}
          </AppText>
        </View>
      </If>

      <View style={[styles.bubbleWrapper, isMe && styles.bubbleWrapperMe]}>
        <If condition={showAvatar}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={20}
              imgPath={senderAvatar}
              bucket={
                senderRole === 'talent' ? 'talents_avatars' : 'brand_avatars'
              }
              name={senderName}
            />
          </View>
        </If>

        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={handleLongPress}
          delayLongPress={300}
          disabled={!isMe || !onLongPress}
          style={getBubbleStyle()}
        >
          <If condition={id.startsWith('temp-')}>
            <ActivityIndicator
              size={16}
              color={isMe ? COLORS.white : COLORS.main}
            />
          </If>

          <View>
            <AppText typography="regular_12" color={isMe ? 'white' : 'black'}>
              {text}
            </AppText>
            <If condition={!!isEdited}>
              <AppText
                typography="regular_10"
                color={isMe ? 'white' : 'black_50'}
                style={styles.editedLabel}
              >
                edited
              </AppText>
            </If>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
