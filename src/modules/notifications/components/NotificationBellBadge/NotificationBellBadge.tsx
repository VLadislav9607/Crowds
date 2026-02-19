import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { useGetUnreadNotificationsCount } from '@actions';
import { ColorsKeys } from '@styles';

interface Props {
  color?: ColorsKeys;
  size?: number;
}

export const NotificationBellBadge = ({
  color = 'white',
  size = 20,
}: Props) => {
  const { data: unreadCount } = useGetUnreadNotificationsCount();
  const hasUnread = (unreadCount ?? 0) > 0;

  return (
    <View style={styles.container}>
      <SvgXml xml={ICONS.bell(color)} width={size} height={size} />
      {hasUnread && <View style={styles.badge} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.red,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
