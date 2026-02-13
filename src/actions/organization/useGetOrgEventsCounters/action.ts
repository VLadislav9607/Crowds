import { supabase } from '@services';
import {
  UseGetOrgEventsCountersBodyDto,
  UseGetOrgEventsCountersRespDto,
} from './types';

export const getOrgEventsCountersAction = async (
  body: UseGetOrgEventsCountersBodyDto,
): Promise<UseGetOrgEventsCountersRespDto> => {
  const { data, error } = await supabase.rpc('get_brand_events_counts', {
    p_brand_id: body.brand_id,
  });

  if (error) throw error;
  return data as unknown as UseGetOrgEventsCountersRespDto;
};
