import { supabase } from '@services';
import {
  UseSearchPublicEventsBodyDto,
  UseSearchPublicEventsResDto,
} from './types';

export const searchPublicEventsAction = async (
  params: UseSearchPublicEventsBodyDto = {},
): Promise<UseSearchPublicEventsResDto> => {
  const { data, error } = await supabase.rpc('get_public_events_search', {
    limit_param: params.limit,
    offset_param: params.offset,
    search_query: params.search_query,
    user_lat: params.user_lat,
    user_lng: params.user_lng,
  });

  if (error) throw error;

  return data as unknown as UseSearchPublicEventsResDto;
};
