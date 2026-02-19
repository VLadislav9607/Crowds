import { Pressable, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { AppText } from '@ui';
import { styles } from './styles';
import { NotificationItemProps } from './types';

export const NotificationItem = ({
  item,
  onPress,
  onDelete,
}: NotificationItemProps) => {
  const isUnread = !item.is_read;

  return (
    <Pressable
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={() => onPress(item)}
      onLongPress={() => onDelete(item.id)}
    >
      {isUnread && <View style={styles.unreadDot} />}
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText
            typography={isUnread ? 'bold_14' : 'regular_14'}
            color="black"
            numberOfLines={1}
            style={styles.title}
          >
            {item.title}
          </AppText>
          <AppText typography="regular_12" color="gray_primary">
            {formatDistanceToNow(new Date(item.created_at), {
              addSuffix: true,
            })}
          </AppText>
        </View>
        <AppText typography="regular_12" color="dark_gray" numberOfLines={2}>
          {item.body}
        </AppText>
      </View>
    </Pressable>
  );
};
