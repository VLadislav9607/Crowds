import { supabase } from '@services';
import { ChatMessage, GetChatMessagesBodyDto } from './types';

export const getChatMessagesAction = async (
  body: GetChatMessagesBodyDto,
): Promise<ChatMessage[]> => {
  const { data, error } = await supabase.rpc('get_chat_messages', {
    p_chat_id: body.chatId,
    p_limit: body.limit,
    p_cursor: body.cursor,
  });

  if (error) {
    throw error;
  }

  return data;
};
