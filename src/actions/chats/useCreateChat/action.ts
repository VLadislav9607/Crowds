import { FunctionsHttpError } from '@supabase/supabase-js';
import { CreateChatBodyDto, CreateChatRespDto } from './types';
import { supabase } from '@services';

export const createChatAction = async (
  body: CreateChatBodyDto,
): Promise<CreateChatRespDto> => {
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
