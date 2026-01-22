import { supabase } from '@services';
import {
  UseGetEventsInEventsFolderBodyDto,
  UseGetEventsInEventsFolderResDto,
} from './types';

export const getEventsInEventsFolderAction = async (
  body: UseGetEventsInEventsFolderBodyDto,
): Promise<UseGetEventsInEventsFolderResDto> => {
  const { data, error } = await supabase.rpc(
    'list_events_in_talent_events_folder',
    {
      p_folder_id: body.folder_id,
      limit_param: body.limit,
      offset_param: body.offset,
    },
  );
  if (error) throw error;
  return data as unknown as UseGetEventsInEventsFolderResDto;
};
