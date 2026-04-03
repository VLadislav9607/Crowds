import { BUCKETS_CONFIG, BucketsTypes } from '@configs';
import { decode } from 'base64-arraybuffer';
import { REGEX } from '@constants';
import RNFS from 'react-native-fs';

export const generateFilePathForBucket = async (
  fileName: string,
  folderName: string,
) => {
  const timestamp = Date.now();

  const nameWithoutExtension = fileName.includes('.')
    ? fileName.substring(0, fileName.lastIndexOf('.'))
    : fileName;

  const cleanFileName = nameWithoutExtension.replace(REGEX.cleanFileName, '_');
  const finalFileName = `${timestamp}-${cleanFileName}`;

  const filePath = `${folderName}/${finalFileName}`;

  return filePath;
};

export const validateFile = (
  bucket: BucketsTypes,
  type: string,
  size: number,
) => {
  if (!BUCKETS_CONFIG[bucket].allowedTypes.includes(type)) {
    const allowedTypes = BUCKETS_CONFIG[bucket].allowedTypes
      .map(allowedType => allowedType.split('/')[1])
      .join(', ');
    throw new Error(`File type not allowed. Allowed types: ${allowedTypes}`);
  }

  if (size > BUCKETS_CONFIG[bucket].maxSize) {
    const maxSizeMB = (BUCKETS_CONFIG[bucket].maxSize / (1024 * 1024)).toFixed(
      2,
    );
    throw new Error(
      `File size exceeds the maximum allowed size: ${maxSizeMB} MB`,
    );
  }

  return true;
};

export const validateFileSafe = (
  bucket: BucketsTypes,
  type: string,
  size: number,
): { isValid: boolean; error?: string } => {
  try {
    validateFile(bucket, type, size);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: (error as Error).message };
  }
};

export const convertFileToArrayBuffer = async (
  fileUri: string,
  type: string,
): Promise<ArrayBuffer> => {
  if (fileUri.startsWith('data:')) {
    const base64Data = fileUri.replace(/^data:.*,/, '');
    return decode(base64Data);
  }

  const base64 = await RNFS.readFile(fileUri, 'base64');
  return decode(base64);
};
