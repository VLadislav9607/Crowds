import { supabase } from '@services';
import { IChatParticipant } from './types';

export const fetchChatParticipantsAction = async (
  chatId: string,
): Promise<IChatParticipant[]> => {
  const { data, error } = await supabase
    .from('chat_identities')
    .select(
      `
      id,
      user_id,
      type,
      first_name,
      last_name,
      avatar_url
    `,
    )
    .eq('chat_id', chatId);

  if (error) {
    throw error;
  }

  return data ?? [];
};
