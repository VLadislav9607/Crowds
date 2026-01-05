import { supabase } from '@services';
import { UseGetEventsCategoriesResDto } from './types';

export const getEventsCategoriesAction =
  async (): Promise<UseGetEventsCategoriesResDto> => {
    const response = await supabase.from('events_categories').select('*');
    if (response.error) throw response.error;
    return { categories: response.data };
  };
