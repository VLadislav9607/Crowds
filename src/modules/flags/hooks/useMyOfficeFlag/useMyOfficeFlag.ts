import { useGetMe, getActiveFlagForTargetAction } from '@actions';
import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useMyOfficeFlag = () => {
  const { organizationMember } = useGetMe();
  const officeIds =
    organizationMember?.current_context?.offices.map(o => o.office_id) ?? [];
  const firstOfficeId = officeIds[0];

  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_MY_ACTIVE_FLAG, 'office', firstOfficeId],
    queryFn: () =>
      getActiveFlagForTargetAction({
        targetType: 'organization',
        targetId: firstOfficeId!,
      }),
    enabled: !!firstOfficeId,
    staleTime: Infinity,
  });
};
