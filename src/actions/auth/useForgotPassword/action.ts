import { supabase } from "@services";
import { ForgotPasswordBodyDto, ForgotPasswordRespDto } from "./types";
import { FunctionsHttpError } from "@supabase/supabase-js";

export const forgotPasswordAction = async (
    body: ForgotPasswordBodyDto,
): Promise<ForgotPasswordRespDto> => {
    const { data, error } = await supabase.functions.invoke("reset-password", {
        body,
    });
    if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        throw errorMessage;
    }
    return data;
};
