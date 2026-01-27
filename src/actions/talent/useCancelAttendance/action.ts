import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@services';
import { CancelAttendanceBodyDto, CancelAttendanceResDto } from './types';

export const cancelAttendanceAction = async (
  body: CancelAttendanceBodyDto,
): Promise<CancelAttendanceResDto> => {
  const { data, error } = await supabase.functions.invoke('cancel-attendance', {
    body,
  });

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    throw errorMessage;
  }

  return data;
};
