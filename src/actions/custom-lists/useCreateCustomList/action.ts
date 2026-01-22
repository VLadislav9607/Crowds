import { supabase } from '@services';
import { CreateCustomListBodyDto, CreateCustomListResDto } from './types';

export const createCustomListAction = async (
  body: CreateCustomListBodyDto,
): Promise<CreateCustomListResDto> => {
  const { data, error } = await supabase.rpc('create_custom_list', {
    p_name: body.listName,
  });

  if (error) {
    throw error;
  }

  return { id: data } as CreateCustomListResDto;
};
