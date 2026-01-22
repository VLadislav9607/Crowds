import { supabase } from '@services';
import {
  GetCustomListTalentsBodyDto,
  GetCustomListTalentsRespDto,
} from './types';

export const getCustomListTalentsAction = async (
  body: GetCustomListTalentsBodyDto,
): Promise<GetCustomListTalentsRespDto> => {
  const { data, error } = await supabase.rpc(
    'get_invitable_talents_for_custom_list',
    {
      p_event_id: body.eventId,
      p_list_id: body.listId,
      p_limit: body.limit,
      p_offset: body.offset,
      p_search: body.search,
    },
  );

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
    data: data,
    pagination: {
      offset: body.offset,
      total,
    },
  };
};
