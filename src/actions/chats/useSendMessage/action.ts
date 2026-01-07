import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { SendMessageBodyDto, SendMessageRespDto } from './types';

export const sendMessageAction = async (
  body: SendMessageBodyDto,
): Promise<SendMessageRespDto> => {
  const { data, error } = await supabase.functions.invoke('send-message', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  if (error) {
    throw error;
  }

  return data;
};
