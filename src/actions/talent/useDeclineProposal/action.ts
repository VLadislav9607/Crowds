import { supabase } from '@services';
import { DeclineProposalBodyDto, DeclineProposalResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const declineProposalAction = async (
  body: DeclineProposalBodyDto,
): Promise<DeclineProposalResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'decline-talent-proposal',
    {
      body,
    },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
