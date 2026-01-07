import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { GetChatMessagesBodyDto, GetChatMessagesResDto } from './types';

export const getChatMessagesAction = async (
  body: GetChatMessagesBodyDto,
): Promise<GetChatMessagesResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'get-chat-messages',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  if (error) {
    throw error;
  }

  return data;
};
