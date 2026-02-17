import { supabase } from '@services';
import {
  UpsertNotificationSettingsBodyDto,
  UpsertNotificationSettingsResDto,
} from './types';

export const upsertNotificationSettingsAction = async (
  body: UpsertNotificationSettingsBodyDto,
): Promise<UpsertNotificationSettingsResDto> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw userError ?? new Error('Not authenticated');

  const { data, error } = await supabase
    .from('notification_settings')
    .upsert({
      user_id: user.id,
      settings: body.settings,
    })
    .select()
    .single();

  if (error) throw error;

  return data as unknown as UpsertNotificationSettingsResDto;
};
