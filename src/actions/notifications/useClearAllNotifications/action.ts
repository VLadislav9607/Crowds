import { supabase } from '@services';

export const clearAllNotificationsAction = async (): Promise<void> => {
  const { error } = await supabase.rpc('clear_all_notifications');

  if (error) throw error;
};
