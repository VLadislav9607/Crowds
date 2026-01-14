import { supabase } from '@services';
import { UseGetTalentEventsCountsRespDto } from './types';

export const getTalentEventsCountsAction =
  async (): Promise<UseGetTalentEventsCountsRespDto> => {
    const { data, error } = await supabase.rpc('get_talent_events_counts');

    if (error) throw error;

    return data;
  };
