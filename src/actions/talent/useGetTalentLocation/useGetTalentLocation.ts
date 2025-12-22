import { TANSTACK_QUERY_KEYS } from "@constants";
import { getTalentLocationAction } from "./action";
import { GetTalentLocationBodyDto, GetTalentLocationRespDto } from "./types";
import { useQuery } from "@tanstack/react-query";
import { IQueryOptions } from "@services";

export const useGetTalentLocation = (
    body: GetTalentLocationBodyDto,
    options?: IQueryOptions<GetTalentLocationRespDto>,
) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_LOCATION, JSON.stringify(body)],
        queryFn: async () => await getTalentLocationAction(body),
        ...options,
    });
};
