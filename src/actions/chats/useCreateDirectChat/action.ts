import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateDirectChatBodyDto, CreateDirectChatRespDto } from './types';
import { supabase } from '@services';

export const createDirectChatAction = async (
  body: CreateDirectChatBodyDto,
): Promise<CreateDirectChatRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-direct-chat',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log('errorMessage', errorMessage);
    throw errorMessage;
  }

  return data;
};
