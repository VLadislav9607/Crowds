import { supabase } from '@services';

export const updateLastSeenChatAction = async (
  chatId: string,
): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('chat_participants')
    .update({
      last_seen_at: new Date().toISOString(),
    })
    .eq('chat_id', chatId)
    .eq('user_id', user?.id ?? '');

  if (error) {
    throw error;
  }
};
