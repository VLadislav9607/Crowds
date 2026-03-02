import { supabase } from '@services';
import { CheckedInTalentDto } from './types';

export const getEventCheckedInTalentsAction = async (
  eventId: string,
): Promise<CheckedInTalentDto[]> => {
  const { data, error } = await supabase.rpc('get_event_checked_in_talents', {
    p_event_id: eventId,
  });

  if (error) throw error;

  return (data as unknown as CheckedInTalentDto[]) ?? [];
};
