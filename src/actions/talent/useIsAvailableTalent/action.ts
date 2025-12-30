import { supabase } from '@services';
import { UseIsAvailableTalentBodyDto } from './types';

export const useIsAvailableTalentAction = async (
  body: UseIsAvailableTalentBodyDto,
): Promise<boolean> => {
  const { data, error } = await supabase.rpc('is_user_available', {
    p_user_id: body.userId,
    p_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }

  return Boolean(data);
};
