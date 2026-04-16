import { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper, AppFlashList } from '@components';
import { ICONS } from '@assets';
import { AppButton } from '@ui';
import {
  useGetNotifications,
  useMarkAllAsRead,
  useDeleteNotification,
  useClearAllNotifications,
  NotificationItem as NotificationItemType,
  useGetMe,
} from '@actions';
import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';
import { navigateFromNotification } from '@services';
import { NotificationItem } from '../../components';
import { styles } from './styles';
import { COLORS } from '@styles';

export const NotificationsListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { isTalent } = useGetMe();
  const { data, isLoading, refetch } = useGetNotifications();
  const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } =
    useMarkAllAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutateAsync: clearAllAsync } = useClearAllNotifications();

  const confirmModalRef = useRef<ActionConfirmationModalRef>(null);

  const notifications = data?.notifications ?? [];

  const hasUnread = notifications.some(n => !n.is_read);

  const handlePress = useCallback((item: NotificationItemType) => {
    const parsedData = item.data as Record<string, string> | null;
    navigateFromNotification(item.type, parsedData ?? undefined);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: 'Delete notification',
        subtitle: 'Remove this notification?',
        confirmButtonText: 'Delete',
        onConfirm: () => deleteNotification(id),
      });
    },
    [deleteNotification],
  );

  const handleClearAll = useCallback(() => {
    confirmModalRef.current?.open({
      title: 'Clear all notifications',
      subtitle: 'Are you sure you want to delete all notifications?',
      confirmButtonText: 'Clear All',
      onConfirm: () => clearAllAsync(),
    });
  }, [clearAllAsync]);

  const rightIcons =
    notifications.length > 0
      ? [
          {
            icon: () => ICONS.trash('red'),
            onPress: handleClearAll,
            size: 20,
          },
        ]
      : undefined;

  const listStyle = useMemo(
    () => ({
      paddingTop: 16,
      paddingBottom: Math.max(bottom, 16) + 80,
    }),
    [bottom],
  );

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      headerStyles={isTalent ? { backgroundColor: COLORS.black } : undefined}
      title="Notifications"
      rightIcons={rightIcons}
      containerStyle={styles.noPaddingBottom}
    >
      <AppFlashList
        data={notifications}
        gap={1}
        extraData={notifications?.length}
        emptyText="No notifications yet"
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={handlePress}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isLoading}
        contentContainerStyle={listStyle}
      />
      {hasUnread && (
        <View style={styles.floatingButtonContainer}>
          <AppButton
            title="Read all"
            size="50"
            onPress={() => markAllAsRead()}
            wrapperStyles={styles.floatingButton}
            isLoading={isMarkingAllAsRead}
          />
        </View>
      )}
      <ActionConfirmationModal ref={confirmModalRef} />
    </ScreenWrapper>
  );
};
