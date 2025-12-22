import { IMutationOptions } from "@services";
import { upsertTalentLocationAction } from "./action";
import { useMutation } from "@tanstack/react-query";
import { UpsertTalentLocationRespDto } from "./types";

export const useUpsertTalentLocation = (
    options?: IMutationOptions<UpsertTalentLocationRespDto>,
) => {
    return useMutation({
        mutationFn: upsertTalentLocationAction,
        ...options,
    });
};
