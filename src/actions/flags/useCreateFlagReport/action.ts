import { supabase } from '@services';
import {
  CreateFlagReportBodyDto,
  CreateFlagReportRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createFlagReportAction = async (
  body: CreateFlagReportBodyDto,
): Promise<CreateFlagReportRespDto> => {
  const functionName =
    body.requestedFlagType === 'black'
      ? 'create-black-flag-report'
      : 'create-flag-report';

  const { data, error } = await supabase.functions.invoke(functionName, {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
