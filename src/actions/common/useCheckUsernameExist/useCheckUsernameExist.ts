import { useMutation } from "@tanstack/react-query";
import { useCheckUsernameExistAction } from "./action";
import { IMutationOptions } from "@services";
import { UseCheckUsernameExistResDto } from "./types";

export const useCheckUsernameExist = (
    options?: IMutationOptions<UseCheckUsernameExistResDto>,
) => {
    return useMutation({
        mutationFn: useCheckUsernameExistAction,
        ...options,
    });
};
