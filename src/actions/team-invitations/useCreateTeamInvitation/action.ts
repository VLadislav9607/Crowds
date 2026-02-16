import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  CreateTeamInvitationBodyDto,
  CreateTeamInvitationResDto,
} from './types';

export const createTeamInvitationAction = async (
  body: CreateTeamInvitationBodyDto,
): Promise<CreateTeamInvitationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-team-invitation',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
