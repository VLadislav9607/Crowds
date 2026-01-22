import { supabase } from '@services';
import { RemoveTalentFromCustomListBodyDto } from './types';

export const removeTalentFromCustomListAction = async (
  body: RemoveTalentFromCustomListBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('remove_talent_from_custom_list', {
    p_list_id: body.listId,
    p_event_id: body.eventId,
    p_talent_id: body.talentId,
  });

  if (error) {
    throw error;
  }
};
