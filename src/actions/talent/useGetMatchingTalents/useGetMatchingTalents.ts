import { TANSTACK_QUERY_KEYS } from '@constants';
import { getMatchingTalentsAction } from './action';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetMatchingTalentDto,
  GetMatchingTalentsBodyDto,
  GetMatchingTalentsRespDto,
} from './types';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
  IWithPaginationResponse,
} from '@services';

export const useGetMatchingTalents = (
  params: GetMatchingTalentsBodyDto,
  options?: IInfinityQueryOptions<
    IWithPaginationResponse<GetMatchingTalentDto[]>
  >,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_MATCHING_TALENTS,
      JSON.stringify(params),
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getMatchingTalentsAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<GetMatchingTalentsRespDto>(),
    ...options,
  });
};
