import { Enums, supabase } from '@services';
import { CreateEventDraftBodyDto, CreateEventDraftResDto } from './types';

export const createEventDraftAction = async (
  body: CreateEventDraftBodyDto,
): Promise<CreateEventDraftResDto> => {
  const eventStatus: Enums<'EventStatus'> = 'draft';

  const { data, error } = await supabase.rpc('create_draft_or_event', {
    payload: { ...body, status: eventStatus } as any,
  });

  if (error) {
    throw error;
  }

  return { draft_id: data };
};
