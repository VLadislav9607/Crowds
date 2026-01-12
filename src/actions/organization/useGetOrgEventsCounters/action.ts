import { supabase } from '@services';
import {
  UseGetOrgEventsCountersBodyDto,
  UseGetOrgEventsCountersRespDto,
} from './types';

export const getOrgEventsCountersAction = async (
  body: UseGetOrgEventsCountersBodyDto,
): Promise<UseGetOrgEventsCountersRespDto> => {
  const { data, error } = await supabase.rpc(
    'get_events_stats_by_organization',
    { p_organization_id: body.organization_id },
  );

  if (error) throw error;
  return data as unknown as UseGetOrgEventsCountersRespDto;
};
