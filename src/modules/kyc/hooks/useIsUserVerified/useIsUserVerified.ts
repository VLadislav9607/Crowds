import { useQuery } from '@tanstack/react-query';
import { fetchUserKycStatus } from './action';
import { UseIsUserVerifiedProps } from './types';
import { queryClient } from '@services';

export const USER_KYC_STATUS_QUERY_KEY = 'user_kyc_status';

export const invalidateUserKycStatus = (userId: string) => {
  return queryClient.invalidateQueries({
    queryKey: [USER_KYC_STATUS_QUERY_KEY, userId],
  });
};

export const useIsUserVerified = ({
  userId,
  enabled = true,
}: UseIsUserVerifiedProps) => {
  const query = useQuery({
    queryKey: [USER_KYC_STATUS_QUERY_KEY, userId],
    queryFn: () => fetchUserKycStatus(userId!),
    enabled: enabled && !!userId,
    staleTime: 0,
  });

  const isVerified = query.data?.status === 'completed';
  const isKycPending = query.data?.status === 'pending';
  const isKycFailed = query.data?.status === 'failed';
  const checksTotal = query.data?.checks_total ?? 0;
  const checksPassed = query.data?.checks_passed ?? 0;
  const isKycInProgress =
    query.data?.status === 'pending' && checksTotal > 0;

  return {
    ...query,
    isVerified,
    isKycPending,
    isKycFailed,
    kycStatus: query.data?.status ?? null,
    checksTotal,
    checksPassed,
    isKycInProgress,
  };
};
