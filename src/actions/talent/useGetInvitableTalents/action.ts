import { supabase } from '@services';
import { InvitableTalentsBodyDto, InvitableTalentsRespDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const getInvitableTalentsAction = async (
  body: InvitableTalentsBodyDto,
): Promise<InvitableTalentsRespDto> => {

  const { data, error } = await supabase.functions.invoke(
    'get-invitable-talents',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
