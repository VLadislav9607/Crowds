import { supabase } from '@services';
import { EventParticipantsCountsRespDto } from './types';

export const getEventParticipantsCountsAction = async (
  eventId: string,
): Promise<EventParticipantsCountsRespDto[]> => {
  const { data, error } = await supabase.rpc('get_event_participants_counts', {
    p_event_id: eventId,
  });

  if (error) throw error;

  return data;
};
