import { supabase } from '@services';
import { DeleteEventsFolderBodyDto, DeleteEventsFolderResDto } from './types';

export const createEventsFolderAction = async (
  body: DeleteEventsFolderBodyDto,
): Promise<DeleteEventsFolderResDto> => {
  const { error } = await supabase.rpc('delete_talent_events_folder', {
    p_folder_id: body.folder_id,
  });
  if (error) {
    throw error;
  }
  return { success: true };
};
