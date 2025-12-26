import { supabase } from '@services';
import { BUCKETS_CONFIG } from '@configs';
import { UseGetFileUrlBodyDto, UseGetFileUrlRespDto } from './types';

export const getFileUrlAction = async (
  body: UseGetFileUrlBodyDto,
): Promise<UseGetFileUrlRespDto> => {
  const { bucket, path } = body;
  const bucketConfig = BUCKETS_CONFIG[bucket];

  if (!path) {
    throw new Error('Path is required');
  }

  if (bucketConfig.isPrivate) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, bucketConfig.expiresIn);
    if (error) throw error;
    return { url: data.signedUrl };
  }

  return {
    url: supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl,
  };
};
