import { supabase } from '@services';
import {
  UseGetEventDetailsForTalentBodyDto,
  EventDetailsForTalentDto,
} from './types';

export const getEventDetailsForTalent = async (
  params: UseGetEventDetailsForTalentBodyDto,
): Promise<EventDetailsForTalentDto> => {
  const { data, error } = await supabase
    .rpc('get_event_details_for_talent', {
      p_event_id: params.event_id,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error('Event not found');

  return data as unknown as EventDetailsForTalentDto;
};
