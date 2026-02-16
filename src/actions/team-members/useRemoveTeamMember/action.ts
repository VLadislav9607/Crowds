import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { RemoveTeamMemberBodyDto, RemoveTeamMemberResDto } from './types';

export const removeTeamMemberAction = async (
  body: RemoveTeamMemberBodyDto,
): Promise<RemoveTeamMemberResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'remove-team-member',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as RemoveTeamMemberResDto;
};
