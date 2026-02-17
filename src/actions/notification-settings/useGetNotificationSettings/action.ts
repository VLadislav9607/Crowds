import { supabase } from '@services';
import { GetNotificationSettingsResDto } from './types';

export const getNotificationSettingsAction =
  async (): Promise<GetNotificationSettingsResDto> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw userError ?? new Error('Not authenticated');

    const { data, error } = await supabase
      .from('notification_settings')
      .select('settings')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;

    return {
      settings: (data?.settings as Record<string, boolean>) ?? {},
    };
  };
