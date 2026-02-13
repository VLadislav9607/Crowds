import { supabase } from '@services';

export const getGroupChatIdAction = async (
  eventId: string,
): Promise<string> => {
  const { data, error } = await supabase.rpc('join_event_group_chat', {
    p_event_id: eventId,
  });

  if (error) {
    throw error;
  }

  return data as string;
};
