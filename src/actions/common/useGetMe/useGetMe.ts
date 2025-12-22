import { TANSTACK_QUERY_KEYS } from "@constants";
import { UseGetMeResDto } from "./types";
import { getMeAction } from "./action";
import { useQuery } from "@tanstack/react-query";
import { IQueryOptions, queryClient } from "@services";

export const useGetMe = (options?: IQueryOptions<UseGetMeResDto>) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
        queryFn: getMeAction,
        ...options,
    });
};


export const prefetchUseGetMe = async () => {
  return  await queryClient.prefetchQuery({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
        queryFn: getMeAction,
    });
}