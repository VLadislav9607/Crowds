import { supabase } from '@services';
import {
  UseTalentEventsByStatusBodyDto,
  UseTalentEventsByStatusResDto,
} from './types';

export const getTalentEventsByStatusAction = async (
  body: UseTalentEventsByStatusBodyDto,
): Promise<UseTalentEventsByStatusResDto> => {
  const { data, error } = await supabase.rpc('get_talent_events_by_status', {
    p_status: body.status,
    p_initiated_by: body.initiatedBy,
    p_limit: 20,
    p_offset: body.offset,
  });

  if (error) {
    throw error;
  }

  // Handle empty array or array with undefined/null values
  const eventsData = Array.isArray(data)
    ? data.filter((item): item is NonNullable<typeof item> => item != null)
    : [];

  return {
    data: eventsData,
    pagination: {
      offset: body.offset || 0,
    },
  };
};
