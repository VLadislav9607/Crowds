import { supabase } from '@services';
import { RenameEventsFolderBodyDto, RenameEventsFolderResDto } from './types';

export const renameEventsFolderAction = async (
  body: RenameEventsFolderBodyDto,
): Promise<RenameEventsFolderResDto> => {
  const { error } = await supabase.rpc('rename_talent_events_folder', {
    p_folder_id: body.folder_id,
    p_name: body.name,
  });
  if (error) {
    throw error;
  }
  return { success: true };
};
