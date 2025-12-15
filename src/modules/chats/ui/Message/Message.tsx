import { View } from 'react-native';

import { AppText, Avatar } from '@ui';
import { If } from '@components';

import { styles } from './styles';
import { IMessageProps } from './types';

export const Message = ({ message, isFirst, isLast }: IMessageProps) => {
  const { text, time, sender, showTime, senderName, senderAvatar } = message;
  const isMe = sender === 'me';
  const showAvatar = !isMe && !!isFirst;

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
        <If condition={!isMe}>
          <View
            style={
              showAvatar ? styles.avatarContainer : styles.avatarPlaceholder
            }
          >
            <If condition={showAvatar}>
              <Avatar size={20} uri={senderAvatar} name={senderName} />
            </If>
          </View>
        </If>

        <View style={getBubbleStyle()}>
          <AppText typography="regular_12" color={isMe ? 'white' : 'black'}>
            {text}
          </AppText>
        </View>
      </View>
    </View>
  );
};

