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
  });

  const isVerified = query.data?.status === 'completed';
  const isKycPending = query.data?.status === 'pending';

  return {
    ...query,
    isVerified,
    isKycPending,
    kycStatus: query.data?.status ?? null,
  };
};
