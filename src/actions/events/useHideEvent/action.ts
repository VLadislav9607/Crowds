import { supabase } from '@services';
import { HideEventBodyDto, HideEventResDto } from './types';

export const hideEventAction = async (
  body: HideEventBodyDto,
): Promise<HideEventResDto> => {
  const { data, error } = await supabase.rpc('hide_event', {
    p_event_id: body.eventId,
  });

  if (error) throw error;

  return data;
};
