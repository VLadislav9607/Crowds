import { supabase } from '@services';
import {
  GetTalentEventHistoryBodyDto,
  GetTalentEventHistoryResDto,
} from './types';

export const getTalentEventHistoryAction = async (
  body: GetTalentEventHistoryBodyDto,
): Promise<GetTalentEventHistoryResDto> => {
  const { data, error } = await supabase.rpc('get_talent_event_history', {
    p_limit: 20,
    p_offset: body.offset ?? 0,
  });

  if (error) throw error;

  return data as unknown as GetTalentEventHistoryResDto;
};
