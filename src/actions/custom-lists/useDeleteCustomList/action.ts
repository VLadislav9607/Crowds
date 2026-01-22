import { supabase } from '@services';
import { DeleteCustomListBodyDto } from './types';

export const deleteCustomListAction = async (
  body: DeleteCustomListBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('delete_custom_list', {
    p_list_id: body.listId,
    p_event_id: body.eventId,
  });

  if (error) {
    throw error;
  }
};
