import { supabase } from '@services';
import { CustomListDto } from './types';

export const getCustomListsAction = async (): Promise<CustomListDto[]> => {
  const { data, error } = await supabase.rpc('get_custom_lists');

  if (error) {
    throw error;
  }

  return data || [];
};
