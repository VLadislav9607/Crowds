import { supabase } from '@services';

export const updateLastSeenChatAction = async (
  chatId: string,
): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase
      .from('chat_participants')
      .update({
        last_seen_at: new Date().toISOString(),
      })
      .eq('chat_id', chatId)
      .eq('user_id', user?.id ?? '');
  } catch {
    // Silently fail — user may have left the chat
  }
};
