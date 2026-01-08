import { supabase } from '@services';

export const updateLastSeenChatAction = async (
  chatId: string,
): Promise<void> => {
  const { error } = await supabase
    .from('chat_participants')
    .update({
      last_seen_at: new Date().toISOString(),
    })
    .eq('chat_id', chatId);

  if (error) {
    throw error;
  }
};
