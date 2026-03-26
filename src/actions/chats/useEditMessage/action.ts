import { supabase } from '@services';

export const editMessageAction = async (body: {
  messageId: string;
  text: string;
}): Promise<void> => {
  const { error } = await supabase.rpc('edit_chat_message', {
    p_message_id: body.messageId,
    p_text: body.text,
  });

  if (error) throw error;
};
