import { supabase } from '@services';
import { UpdateAvailabilityBodyDto } from './types';

export const updateAvailabilityAction = async (
  body: UpdateAvailabilityBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('update_user_availability', {
    p_availability: body.availability,
    p_day_schedules: body.daySchedules,
  });

  if (error) throw error;
};
