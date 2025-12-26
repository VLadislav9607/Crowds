import { useQuery } from '@tanstack/react-query';
import { UseGetFileUrlBodyDto } from './types';
import { getFileUrlAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { BUCKETS_CONFIG } from '@configs';

export const useGetFileUrl = (body: UseGetFileUrlBodyDto) => {
  const bucketConfig = BUCKETS_CONFIG[body.bucket];

  const staleTime =
    bucketConfig.expiresIn === 0 || !bucketConfig.isPrivate
      ? Infinity
      : bucketConfig.expiresIn * 1000;

  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_FILE_URL, JSON.stringify(body)],
    queryFn: async () => await getFileUrlAction(body),
    enabled: !!body.bucket && !!body.path,
    staleTime,
  });
};
