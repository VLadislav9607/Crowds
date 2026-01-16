import { supabase } from '@services';
import {
  EventParticipantsByStatusBodyDto,
  EventParticipantsByStatusRespDto,
} from './types';

export const getEventParticipantsByStatusAction = async (
  body: EventParticipantsByStatusBodyDto,
): Promise<EventParticipantsByStatusRespDto> => {
  const { data, error } = await supabase.rpc(
    'get_event_participants_by_status',
    {
      p_event_id: body.eventId,
      p_status: body.status,
      p_initiated_by: body.initiatedBy,
      p_limit: 20,
      p_offset: body.offset,
    },
  );

  if (error) throw error;

  // Handle empty array or array with undefined/null values
  const participantsData = Array.isArray(data)
    ? data.filter((item): item is NonNullable<typeof item> => item != null)
    : [];

  return {
    data: participantsData,
    pagination: {
      offset: body.offset || 0,
    },
  };
};
