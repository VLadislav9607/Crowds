import { useInfiniteQuery } from '@tanstack/react-query';
import { getTalentPaymentHistoryAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  PaymentHistoryTab,
  TalentPaymentHistoryItem,
  GetTalentPaymentHistoryResDto,
} from './types';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
  IWithPaginationResponse,
} from '@services';

export const useGetTalentPaymentHistory = (
  tab: PaymentHistoryTab,
  options?: IInfinityQueryOptions<
    IWithPaginationResponse<TalentPaymentHistoryItem[]>
  >,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_PAYMENT_HISTORY, tab],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getTalentPaymentHistoryAction, { tab }),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<GetTalentPaymentHistoryResDto>(),
    ...options,
  });
};
