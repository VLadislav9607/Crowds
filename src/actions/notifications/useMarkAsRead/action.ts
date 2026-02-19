import { supabase } from '@services';

export const markAllAsReadAction = async (): Promise<void> => {
  const { error } = await supabase.rpc('mark_all_notifications_as_read');

  if (error) throw error;
};
