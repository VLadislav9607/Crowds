import { supabase } from '@services';
import { AcceptProposalBodyDto, AcceptProposalResDto } from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const acceptProposalAction = async (
  body: AcceptProposalBodyDto,
): Promise<AcceptProposalResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'accept-talent-proposal',
    {
      body,
    },
  );

  console.log('data', data);

  if (error && error instanceof FunctionsHttpError) {
    console.log('error', error);
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
