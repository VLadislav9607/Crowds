import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { InviteTalentBodyDto, InviteTalentResDto } from './types';

export const inviteTalentAction = async (
  body: InviteTalentBodyDto,
): Promise<InviteTalentResDto> => {
  const { data, error } = await supabase.functions.invoke('invite-talent', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log('errorMessage', errorMessage);
    throw errorMessage;
  }

  return data;
};
