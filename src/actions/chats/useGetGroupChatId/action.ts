import { supabase } from '@services';

export const getGroupChatIdAction = async (
  eventId: string,
): Promise<string> => {
  const { data, error } = await supabase.rpc('ensure_event_group_chat_access', {
    p_event_id: eventId,
  });

  if (error) {
    throw error;
  }

  return data as string;
};
