import { useMutation } from "@tanstack/react-query";
import { createTalentAction } from "./action";
import { IMutationOptions } from "@services";
import { CreateTalentResDto } from "./types";

export const useCreateTalent = (
    options?: IMutationOptions<CreateTalentResDto>,
) => {
    return useMutation({
        mutationFn: createTalentAction,
        ...options,
    });
};
