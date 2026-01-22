import { supabase } from '@services';
import {
  ToggleEventInEventsFolderBodyDto,
  ToggleEventInEventsFolderResDto,
} from './types';

export const toggleEventInEventsFolderAction = async (
  body: ToggleEventInEventsFolderBodyDto,
): Promise<ToggleEventInEventsFolderResDto> => {
  const { error } = await supabase.rpc('toggle_event_in_talent_events_folder', {
    p_folder_id: body.folder_id,
    p_event_id: body.event_id,
  });
  if (error) {
    throw error;
  }
  return { success: true };
};
