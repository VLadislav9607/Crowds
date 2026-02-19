import { supabase } from '@services';

export const deleteNotificationAction = async (
  notificationId: string,
): Promise<void> => {
  const { error } = await supabase.rpc('delete_notification', {
    notification_id: notificationId,
  });

  if (error) throw error;
};
