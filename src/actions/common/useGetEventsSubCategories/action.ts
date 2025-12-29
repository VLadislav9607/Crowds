import { supabase } from '@services';
import { UseGetEventsSubCategoriesResDto } from './types';

export const getEventsSubCategoriesAction = async (
  categoryIds: string[],
): Promise<UseGetEventsSubCategoriesResDto> => {
  if (categoryIds.length === 0) return { subCategories: [] };

  const response = await supabase
    .from('events_subcategories')
    .select('id, title, category_id')
    .in('category_id', categoryIds)
    .order('title');

  if (response.error) throw response.error;
  return { subCategories: response.data as any };
};
