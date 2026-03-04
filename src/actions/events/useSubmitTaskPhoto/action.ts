import { supabase } from '@services';
import { SubmitTaskPhotoBodyDto, SubmitTaskPhotoRespDto } from './types';

export const submitTaskPhotoAction = async (
  params: SubmitTaskPhotoBodyDto,
): Promise<SubmitTaskPhotoRespDto> => {
  const { data, error } = await supabase.rpc('submit_task_photo', {
    p_participation_id: params.participation_id,
    p_photo_path: params.photo_path,
  });

  if (error) throw error;

  return data as unknown as SubmitTaskPhotoRespDto;
};
