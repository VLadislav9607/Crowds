import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAction } from "./action";
import { ForgotPasswordRespDto } from "./types";
import { IMutationOptions } from "@services";

export const useForgotPassword = (options?: IMutationOptions<ForgotPasswordRespDto>) => {
    return useMutation({
        mutationFn: forgotPasswordAction,
        ...options,
    });
};