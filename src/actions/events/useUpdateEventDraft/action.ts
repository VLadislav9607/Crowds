import { supabase } from '@services';
import { UpdateDraftEventBodyDto, UpdateDraftEventResDto } from './types';

export const updateDraftEventAction = async (
  eventId: string,
  body: UpdateDraftEventBodyDto,
): Promise<UpdateDraftEventResDto> => {
  console.log(body);
  const { data, error } = await supabase.rpc('update_event_draft', {
    event_id_param: eventId,
    payload: body as any,
  });

  if (error) {
    throw error;
  }

  return { event_id: data };
};
