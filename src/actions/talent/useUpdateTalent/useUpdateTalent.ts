import { useMutation } from "@tanstack/react-query";
import { updateTalentAction } from "./action";
import { IMutationOptions } from "@services";
import { UpdateTalentRespDto } from "./types";

export const useUpdateTalent = (
    options?: IMutationOptions<UpdateTalentRespDto>,
) => {
    return useMutation({
        mutationFn: updateTalentAction,
        ...options,
    });
};
