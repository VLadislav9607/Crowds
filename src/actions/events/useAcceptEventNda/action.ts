import { supabase } from '@services';
import { AcceptEventNdaBodyDto } from './types';

export const acceptEventNdaAction = async (body: AcceptEventNdaBodyDto) => {
  const { error } = await supabase.rpc('accept_event_nda', {
    p_event_id: body.eventId,
  });

  if (error) throw error;
};
