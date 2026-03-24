import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import {
  ProcessEventSettlementBodyDto,
  ProcessEventSettlementResDto,
} from './types';

export const processEventSettlementAction = async (
  body: ProcessEventSettlementBodyDto,
): Promise<ProcessEventSettlementResDto> => {
  const { data, error } = await supabase.functions.invoke(
    'process-event-settlement',
    { body },
  );

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  if (error) {
    throw error;
  }

  return data;
};
