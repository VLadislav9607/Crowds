import { supabase } from '@services';
import { UseGetOrgEventsBodyDto, UseGetOrgEventsResDto } from './types';

export const getOrgEventsAction = async (
  params: UseGetOrgEventsBodyDto = {},
): Promise<UseGetOrgEventsResDto> => {
  const { data, error } = await supabase.rpc('get_brand_events', {
    p_brand_id: params.brand_id,
    search_query: params.search_query,
    status_filter: params.status_filter,
    visibility_filter: params.visibility_filter,
    limit_param: params.limit,
    offset_param: params.offset,
    start_after: params.start_after,
    start_before: params.start_before,
    end_after: params.end_after,
    end_before: params.end_before,
  });

  if (error) throw error;

  return data as unknown as UseGetOrgEventsResDto;
};
