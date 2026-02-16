import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  DeclineTeamInvitationBodyDto,
  DeclineTeamInvitationResDto,
} from './types';

export const declineTeamInvitationAction = async (
  body: DeclineTeamInvitationBodyDto,
): Promise<DeclineTeamInvitationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'decline-team-invitation',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as DeclineTeamInvitationResDto;
};
