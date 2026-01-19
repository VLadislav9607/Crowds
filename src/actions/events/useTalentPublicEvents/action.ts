import { supabase } from '@services';
import { TalentPublicEventsBodyDto, TalentPublicEventsResDto } from './types';

export const searchPublicEventsAction = async (
  params: TalentPublicEventsBodyDto = {},
): Promise<TalentPublicEventsResDto> => {
  const { data, error } = await supabase.rpc(
    'get_public_events_search_with_preferences',
    {
      limit_param: params.limit,
      offset_param: params.offset,
      search_query: params.search_query,
      user_lat: params.user_lat,
      user_lng: params.user_lng,
      sort_mode: params.sort_mode,
      filter_distance_km: params.filter_distance_km,
      filter_date_from: params.filter_date_from,
      filter_date_to: params.filter_date_to,
      filter_payment_type: params.filter_payment_type,
    },
  );

  if (error) throw error;

  return data as unknown as TalentPublicEventsResDto;
};
