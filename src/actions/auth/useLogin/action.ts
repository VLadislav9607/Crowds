import { FunctionsHttpError } from "@supabase/supabase-js";
import { LoginBodyDto, LoginRespDto } from "./types";
import { supabase } from "@services";

export const loginAction = async (body: LoginBodyDto): Promise<LoginRespDto> => {
    const { data, error } = await supabase.functions.invoke('login', {body})

    if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        throw errorMessage;
    }
    
    return data as LoginRespDto;
};