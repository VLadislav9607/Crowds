import { supabase } from '@services';
import {
  UseTalentEventsByStatusBodyDto,
  UseTalentEventsByStatusResDto,
} from './types';

export const getTalentEventsByStatusAction = async (
  body: UseTalentEventsByStatusBodyDto,
): Promise<UseTalentEventsByStatusResDto> => {
  const { data, error } = await supabase.rpc(
    'get_talent_participation_events',
    {
      p_status: body.status,
      p_initiated_by: body.initiatedBy,
      p_limit: 20,
      p_offset: body.offset,
    },
  );

  if (error) throw error;

  return data as unknown as UseTalentEventsByStatusResDto;
};
