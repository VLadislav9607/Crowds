import { supabase } from '@services';
import { CreateEventsFolderBodyDto, CreateEventsFolderResDto } from './types';

export const createEventsFolderAction = async (
  body: CreateEventsFolderBodyDto,
): Promise<CreateEventsFolderResDto> => {
  const { data, error } = await supabase.rpc('create_talent_events_folder', {
    p_name: body.name,
  });
  if (error) {
    throw error;
  }
  return data as unknown as CreateEventsFolderResDto;
};
