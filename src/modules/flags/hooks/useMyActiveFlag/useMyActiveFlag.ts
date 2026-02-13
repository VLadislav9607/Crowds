import { useGetMe, getActiveFlagForTargetAction } from '@actions';
import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useMyActiveFlag = () => {
  const { talent } = useGetMe();

  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_MY_ACTIVE_FLAG, talent?.id],
    queryFn: () =>
      getActiveFlagForTargetAction({
        targetType: 'talent',
        targetId: talent!.id,
      }),
    enabled: !!talent?.id,
    staleTime: Infinity,
  });
};
