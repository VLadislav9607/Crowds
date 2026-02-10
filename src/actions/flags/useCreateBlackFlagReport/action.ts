import { supabase } from '@services';
import {
  CreateBlackFlagReportBodyDto,
  CreateBlackFlagReportRespDto,
} from './types';
import { FunctionsHttpError } from '@supabase/supabase-js';

export const createBlackFlagReportAction = async (
  body: CreateBlackFlagReportBodyDto,
): Promise<CreateBlackFlagReportRespDto> => {
  const { data, error } = await supabase.functions.invoke(
    'create-black-flag-report',
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
