import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  UpdateTeamMemberCapabilitiesBodyDto,
  UpdateTeamMemberCapabilitiesResDto,
} from './types';

export const updateTeamMemberCapabilitiesAction = async (
  body: UpdateTeamMemberCapabilitiesBodyDto,
): Promise<UpdateTeamMemberCapabilitiesResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'update-team-member-capabilities',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as UpdateTeamMemberCapabilitiesResDto;
};
