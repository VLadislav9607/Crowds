import { supabase } from '@services';
import { GetNotificationsResDto } from './types';

export const getNotificationsAction =
  async (): Promise<GetNotificationsResDto> => {
    const { data, error } = await supabase.rpc('get_notifications');

    if (error) throw error;

    return { notifications: data ?? [] };
  };
