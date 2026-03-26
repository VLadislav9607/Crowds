import { supabase } from '@services';

export const deleteMessageAction = async (body: {
  messageId: string;
}): Promise<void> => {
  const { error } = await supabase.rpc('delete_chat_message', {
    p_message_id: body.messageId,
  });

  if (error) throw error;
};
