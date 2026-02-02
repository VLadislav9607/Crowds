import { supabase } from '@services';
import { IChatParticipant } from './types';

export const fetchChatParticipantsAction = async (
  chatId: string,
): Promise<IChatParticipant[]> => {
  const { data, error } = await supabase.rpc('get_chat_participants', {
    p_chat_id: chatId,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};
