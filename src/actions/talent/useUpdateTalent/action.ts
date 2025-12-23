import { supabase } from "@services";
import { UpdateTalentBodyDto, UpdateTalentRespDto } from "./types";

export const updateTalentAction = async (body: UpdateTalentBodyDto): Promise<UpdateTalentRespDto> => {
    const { data, error } = await supabase.from("talents").update(body.data).eq("id", body.id).select().single();

    if (error) {
        throw error;
    }

    return { talent: data };
};