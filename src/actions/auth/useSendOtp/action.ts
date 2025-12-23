import { FunctionsHttpError } from "@supabase/supabase-js";
import { SendOtpBodyDto, SendOtpRespDto } from "./types";
import { supabase } from "@services";

export const sendOtpAction = async (body: SendOtpBodyDto): Promise<SendOtpRespDto> => {
    const { data, error } = await supabase.functions.invoke('send-email-otp', {body});
    if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        throw errorMessage;
    }
    return data;
};