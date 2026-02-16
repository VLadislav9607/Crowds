import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  RevokeTeamInvitationBodyDto,
  RevokeTeamInvitationResDto,
} from './types';

export const revokeTeamInvitationAction = async (
  body: RevokeTeamInvitationBodyDto,
): Promise<RevokeTeamInvitationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'revoke-team-invitation',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as RevokeTeamInvitationResDto;
};
