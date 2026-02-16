import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  UpdateTeamInvitationBodyDto,
  UpdateTeamInvitationResDto,
} from './types';

export const updateTeamInvitationAction = async (
  body: UpdateTeamInvitationBodyDto,
): Promise<UpdateTeamInvitationResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'update-team-invitation',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as UpdateTeamInvitationResDto;
};
