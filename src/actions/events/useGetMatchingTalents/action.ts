import { supabase } from '@services';
import { GetMatchingTalentsBodyDto, GetMatchingTalentsRespDto } from './types';

export const getMatchingTalentsAction = async (
  body: GetMatchingTalentsBodyDto,
): Promise<GetMatchingTalentsRespDto> => {
  const { data, error } = await supabase.rpc('get_matching_talents', {
    p_event_id: body.eventId,
    limit_param: body.limit,
    offset_param: body.offset,
    search_query: body.search,
    filter_distance_km: body.distance,
  });

  if (error) {
    throw error;
  }

  return data as unknown as GetMatchingTalentsRespDto;
};
