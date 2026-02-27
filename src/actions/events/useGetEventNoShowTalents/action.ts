import { supabase } from '@services';
import { NoShowTalentDto } from './types';

export const getEventNoShowTalentsAction = async (
  eventId: string,
): Promise<NoShowTalentDto[]> => {
  const { data, error } = await supabase.rpc('get_event_no_show_talents', {
    p_event_id: eventId,
  });

  if (error) throw error;

  return (data as unknown as NoShowTalentDto[]) ?? [];
};
