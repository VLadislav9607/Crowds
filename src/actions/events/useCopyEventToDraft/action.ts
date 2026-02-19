import { supabase } from '@services';
import { CopyEventToDraftBodyDto, CopyEventToDraftResDto } from './types';

export const copyEventToDraftAction = async (
  body: CopyEventToDraftBodyDto,
): Promise<CopyEventToDraftResDto> => {
  const { data, error } = await supabase.rpc('copy_event_to_draft', {
    p_event_id: body.eventId,
  });

  if (error) throw error;

  return { draft_id: data as string };
};
