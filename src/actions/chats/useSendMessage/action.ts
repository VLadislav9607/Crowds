import { supabase } from '@services';
import { SendMessageBodyDto, SendMessageRespDto } from './types';

export const sendMessageAction = async (
  body: SendMessageBodyDto,
): Promise<SendMessageRespDto> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      chat_id: body.chatId,
      text: body.text?.trim() ?? '',
      ...(body.imagePath && { image_path: body.imagePath }),
      ...(body.imageBucket && { image_bucket: body.imageBucket }),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
