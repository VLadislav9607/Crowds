import { ActivityIndicator, View } from 'react-native';
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
  isTalent,
}: IMessageProps) => {
  const { text, time, isMe, showTime, senderName, senderAvatar, id } = message;
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
              bucket={isTalent ? 'brand_avatars' : 'talents_avatars'}
              name={senderName}
            />
          </View>
        </If>

        <View style={getBubbleStyle()}>
          <If condition={id.startsWith('temp-')}>
            <ActivityIndicator
              size={16}
              color={isMe ? COLORS.white : COLORS.main}
            />
          </If>

          <AppText typography="regular_12" color={isMe ? 'white' : 'black'}>
            {text}
          </AppText>
        </View>
      </View>
    </View>
  );
};
