import { Enums, supabase } from '@services';
import {
  CreatePublishedEventBodyDto,
  CreatePublishedEventResDto,
} from './types';

export const createPublishedEventAction = async (
  body: CreatePublishedEventBodyDto,
): Promise<CreatePublishedEventResDto> => {
  const eventStatus: Enums<'EventStatus'> = 'published';

  const { data, error } = await supabase.rpc('create_event_with_preferences', {
    payload: { ...body, status: eventStatus } as any,
  });
  if (error) {
    throw error;
  }
  return { event_id: data };
};
