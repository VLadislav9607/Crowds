import { supabase } from '@services';
import {
  GetCustomListTalentsBodyDto,
  GetCustomListTalentsRespDto,
} from './types';

export const getCustomListTalentsAction = async (
  body: GetCustomListTalentsBodyDto,
): Promise<GetCustomListTalentsRespDto> => {
  const { data, error } = await supabase.rpc('get_custom_list_talents', {
    p_list_id: body.listId,
    p_event_id: body.eventId,
    p_limit: body.limit,
    p_offset: body.offset,
  });

  console.log('data', data);
  console.log('error', error);
  if (error) {
    throw error;
  }

  if (!data) {
    return {
      data: [],
      pagination: {
        offset: body.offset,
        total: 0,
      },
    };
  }

  const total = data[0]?.total || 0;

  return {
    data,
    pagination: {
      offset: body.offset,
      total,
    },
  };
};
