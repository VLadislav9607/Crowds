import { supabase } from '@services';
import { DeleteDraftEventResDto } from './types';

export const deleteDraftEventAction = async (
  eventId: string,
): Promise<DeleteDraftEventResDto> => {
  const { data, error } = await supabase.rpc('delete_draft_event', {
    event_id_param: eventId,
  });

  if (error) {
    throw error;
  }

  return { event_id: data };
};
