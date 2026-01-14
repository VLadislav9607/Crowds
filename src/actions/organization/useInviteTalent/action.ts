import { supabase } from '@services';
import { InviteTalentBodyDto, InviteTalentResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const inviteTalentAction = async (
  body: InviteTalentBodyDto,
): Promise<InviteTalentResDto> => {
  const { data, error } = await supabase.functions.invoke('invite-talent', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    console.log('error', error);
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
