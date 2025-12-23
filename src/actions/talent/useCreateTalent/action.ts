import { supabase } from "@services";
import { CreateTalentBodyDto, CreateTalentResDto } from "./types";
import { FunctionsHttpError } from "@supabase/supabase-js";

export const createTalentAction = async (
    body: CreateTalentBodyDto,
): Promise<CreateTalentResDto> => {
    const { data, error } = await supabase.functions.invoke("create-talent", {
        body,
    });

    if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        throw errorMessage;
    }

    return data as CreateTalentResDto;
};
