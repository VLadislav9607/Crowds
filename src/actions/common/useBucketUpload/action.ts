import { supabase } from '@services';
import { UseBucketUploadBodyDto, UseBucketUploadRespDto } from './types';
import {
  convertFileToArrayBuffer,
  generateFilePathForBucket,
  validateFile,
} from './helper';

export const bucketUploadAction = async (
  body: UseBucketUploadBodyDto,
): Promise<UseBucketUploadRespDto> => {
  const { bucket, file } = body;

  const { data: sessionData } = await supabase.auth.getSession();

  const uploaderId = sessionData.session?.user.id;
  if (!uploaderId) {
    throw new Error('User not authenticated');
  }

  const [filePath, arrayBuffer] = await Promise.all([
    generateFilePathForBucket(file.name, uploaderId),
    convertFileToArrayBuffer(file.uri, file.type),
  ]);

  const size = arrayBuffer.byteLength;

  await validateFile(bucket, file.type, size);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, arrayBuffer, { contentType: file.type });

  if (error) throw error;

  return { uploadedFile: data, size, uploaderId };
};
