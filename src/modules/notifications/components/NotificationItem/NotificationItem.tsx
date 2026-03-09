import { Pressable, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { formatDate } from '@utils';
import { styles } from './styles';
import { NotificationItemProps } from './types';

const FLAG_BAR_COLORS: Record<string, string> = {
  yellow: COLORS.yellow,
  red: COLORS.red,
};

export const NotificationItem = ({
  item,
  onPress,
  onDelete,
}: NotificationItemProps) => {
  const isUnread = !item.is_read;
  const isFlag = item.type === 'flag_applied';
  const flagData = isFlag
    ? (item.data as Record<string, unknown> | null)
    : null;
  const flagBarColor = flagData?.flagType
    ? FLAG_BAR_COLORS[flagData.flagType as string]
    : undefined;

  const itemData = item.data as Record<string, unknown> | null;
  const checkinCutoff = itemData?.checkin_cutoff as string | undefined;

  return (
    <Pressable
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={() => onPress(item)}
      onLongPress={() => onDelete(item.id)}
    >
      {isFlag && flagBarColor ? (
        <View style={[styles.flagBar, { backgroundColor: flagBarColor }]} />
      ) : (
        isUnread && <View style={styles.unreadDot} />
      )}
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
        <AppText
          typography="regular_12"
          color="dark_gray"
          numberOfLines={isFlag ? 4 : 10}
        >
          {item.body}
        </AppText>
        {!!flagData?.expiresOn && (
          <View style={styles.flagExpiresRow}>
            <AppText typography="regular_12" color="gray_primary">
              Expires:{' '}
              {formatDate(flagData.expiresOn as string, 'MMM dd, yyyy')}
            </AppText>
          </View>
        )}
        {checkinCutoff && (
          <View style={styles.flagExpiresRow}>
            <AppText typography="regular_12" color="gray_primary">
              New cutoff: {formatDate(checkinCutoff, 'MMM dd, h:mm a')}
            </AppText>
          </View>
        )}
      </View>
    </Pressable>
  );
};
