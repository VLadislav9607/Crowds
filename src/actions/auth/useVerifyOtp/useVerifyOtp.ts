import { useMutation } from "@tanstack/react-query";
import { VerifyOtpRespDto } from "./types";
import { IMutationOptions } from "@services";
import { verifyOtpAction } from "./action";

export const useVerifyOtp = (options?: IMutationOptions<VerifyOtpRespDto>) => {
    return useMutation({
        mutationFn: verifyOtpAction,
        ...options,
    });
};
