import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { MyChatItem } from './types';

export const fetchMyChatsAction = async (): Promise<MyChatItem[]> => {
  const { data, error } = await supabase.functions.invoke('my-chats');

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data?.chats || [];
};
