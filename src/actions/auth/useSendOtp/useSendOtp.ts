import { useMutation } from "@tanstack/react-query";
import { sendOtpAction } from "./action";
import { IMutationOptions } from "@services";
import { SendOtpRespDto } from "./types";

export const useSendOtp = (options?: IMutationOptions<SendOtpRespDto>) => {
    return useMutation({
        mutationFn: sendOtpAction,
        ...options,
    });
};
