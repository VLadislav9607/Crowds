import { supabase } from '@services';
import {
  RemoveEventFromEventsFolderBodyDto,
  RemoveEventFromEventsFolderResDto,
} from './types';

export const removeEventFromEventsFolderAction = async (
  body: RemoveEventFromEventsFolderBodyDto,
): Promise<RemoveEventFromEventsFolderResDto> => {
  const { error } = await supabase.rpc(
    'remove_event_from_talent_events_folder',
    {
      p_folder_id: body.folder_id,
      p_event_id: body.event_id,
    },
  );
  if (error) {
    throw error;
  }
  return { success: true };
};
