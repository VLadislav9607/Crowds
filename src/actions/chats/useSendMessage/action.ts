import { supabase } from '@services';
import { SendMessageBodyDto, SendMessageRespDto } from './types';

export const sendMessageAction = async (
  body: SendMessageBodyDto,
): Promise<SendMessageRespDto> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      chat_id: body.chatId,
      text: body.text.trim(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
