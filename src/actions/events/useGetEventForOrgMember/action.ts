import { supabase } from '@services';
import { UseGetEventByOrgMemberBodyDto, EventForOrgMemberDto } from './types';

export const getEventForOrgMember = async (
  params: UseGetEventByOrgMemberBodyDto,
): Promise<EventForOrgMemberDto> => {
  const { event_id } = params;

  const { data, error } = await supabase
    .rpc('get_event_details_org_member', {
      p_event_id: event_id,
    })
    .single();

  if (error) throw error;
  if (!data) throw new Error('Event not found');

  return data as unknown as EventForOrgMemberDto;
};
