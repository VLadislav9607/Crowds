import { supabase } from '@services';
import { UpdateAvailabilityBodyDto } from './types';

export const updateAvailabilityAction = async (
  body: UpdateAvailabilityBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('update_user_availability', {
    p_availability: body.availability,
    p_day_schedules: body.daySchedules,
    p_is_traveling: body.isTraveling,
    p_location: body.location ?? null,
    p_start_date: body.startDate ?? null,
    p_end_date: body.endDate ?? null,
    p_trip_availability: body.tripAvailability,
    p_travel_days: body.travelDays,
  });

  console.log('error', error);
  if (error) throw error;
};
