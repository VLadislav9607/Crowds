import { supabase } from '@services';

export const getUnreadNotificationsCountAction =
  async (): Promise<number> => {
    const { data, error } = await supabase.rpc(
      'get_unread_notifications_count',
    );

    if (error) throw error;

    return data ?? 0;
  };
