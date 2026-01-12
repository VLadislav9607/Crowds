import { BucketsTypes } from 'src/configs';

export interface UseBucketUploadBodyDto {
  bucket: BucketsTypes;
  file: {
    uri: string;
    type: string;
    name: string;
  };
  folderName?: string;
}

export interface UseBucketUploadRespDto {
  uploaderId: string;
  uploadedFile: {
    id: string;
    path: string;
    fullPath: string;
  };
  size: number;
}
