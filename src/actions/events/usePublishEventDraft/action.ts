import { supabase } from '@services';
import { PublishDraftEventResDto } from './types';

export const publishDraftEventAction = async (
  eventId: string,
): Promise<PublishDraftEventResDto> => {
  const { data, error } = await supabase.rpc('publish_event_draft', {
    event_id_param: eventId,
  });

  if (error) {
    throw error;
  }

  return { event_id: data };
};
