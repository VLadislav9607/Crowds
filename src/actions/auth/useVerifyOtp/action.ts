import { FunctionsHttpError } from "@supabase/supabase-js";
import { VerifyOtpBodyDto, VerifyOtpRespDto } from "./types";
import { supabase } from "@services";

export const verifyOtpAction = async (
    body: VerifyOtpBodyDto,
): Promise<VerifyOtpRespDto> => {
    const { data, error } = await supabase.functions.invoke(
        "verify-email-otp",
        { body },
    );
    if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        throw errorMessage;
    }
    return data;
};
