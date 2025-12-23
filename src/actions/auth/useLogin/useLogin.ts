import { useMutation } from "@tanstack/react-query";
import { loginAction } from "./action";
import { IMutationOptions } from "@services";
import { LoginRespDto } from "./types";

export const useLogin = (options?: IMutationOptions<LoginRespDto>) => {
    return useMutation({
        mutationFn: loginAction,
        ...options,
    });
};