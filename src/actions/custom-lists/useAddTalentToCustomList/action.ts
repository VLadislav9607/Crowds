import { supabase } from '@services';
import { AddTalentToCustomListBodyDto } from './types';

export const addTalentToCustomListAction = async (
  body: AddTalentToCustomListBodyDto,
): Promise<void> => {
  const { error } = await supabase.rpc('add_talent_to_custom_list', {
    p_list_id: body.p_list_id,
    p_talent_id: body.p_talent_id,
  });

  if (error) {
    throw error;
  }
};
