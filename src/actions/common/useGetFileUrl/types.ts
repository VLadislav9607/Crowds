import { BucketsTypes } from '@configs';

export interface UseGetFileUrlBodyDto {
  bucket: BucketsTypes;
  path?: string;
}

export interface UseGetFileUrlRespDto {
  url: string;
}
