import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { GetTeamInvitationResDto } from './types';

export const getTeamInvitationAction = async (body: {
  token: string;
}): Promise<GetTeamInvitationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'get-team-invitation',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
