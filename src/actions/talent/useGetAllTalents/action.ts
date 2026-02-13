import { supabase } from '@services';
import { GetAllTalentsBodyDto, GetAllTalentsRespDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const getAllTalentsAction = async (
  body: GetAllTalentsBodyDto,
): Promise<GetAllTalentsRespDto> => {
  const { data, error } = await supabase.functions.invoke('get-all-talents', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log('errorMessage', errorMessage);
    throw errorMessage;
  }

  return data;
};
