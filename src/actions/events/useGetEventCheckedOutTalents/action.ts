import { supabase } from '@services';
import { CheckedOutTalentDto } from './types';

export const getEventCheckedOutTalentsAction = async (
  eventId: string,
): Promise<CheckedOutTalentDto[]> => {
  const { data, error } = await supabase.rpc('get_event_checked_out_talents', {
    p_event_id: eventId,
  });

  if (error) throw error;

  return (data as unknown as CheckedOutTalentDto[]) ?? [];
};
