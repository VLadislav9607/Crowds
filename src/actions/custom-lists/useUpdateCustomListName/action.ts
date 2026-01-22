import { supabase } from '@services';
import { UpdateCustomListNameBodyDto } from './types';

export const updateCustomListNameAction = async (
  body: UpdateCustomListNameBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('update_custom_list_name', {
    p_list_id: body.listId,
    p_event_id: body.eventId,
    p_name: body.name,
  });

  if (error) {
    throw error;
  }
};
