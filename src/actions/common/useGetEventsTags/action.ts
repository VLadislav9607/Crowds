import { supabase } from '@services';
import { UseGetEventsTagsResDto } from './types';

export const getEventsTagsAction = async (
  subcategoryIds: string[],
): Promise<UseGetEventsTagsResDto> => {
  const response = await supabase
    .from('events_tags')
    .select('id, title, subcategory_id')
    .in('subcategory_id', subcategoryIds)
    .eq('is_active', true)
    .order('title');

  if (response.error) throw response.error;
  return { tags: response.data as any };
};
