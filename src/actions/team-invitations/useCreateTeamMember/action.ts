import { supabase } from '@services';
import { CreateTeamMemberBodyDto, CreateTeamMemberResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createTeamMemberAction = async (
  body: CreateTeamMemberBodyDto,
): Promise<CreateTeamMemberResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-team-member',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data as CreateTeamMemberResDto;
};
