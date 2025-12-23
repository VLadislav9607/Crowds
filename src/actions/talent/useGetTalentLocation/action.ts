import { supabase } from "@services";
import { GetTalentLocationBodyDto, GetTalentLocationRespDto } from "./types";

export const getTalentLocationAction = async (body: GetTalentLocationBodyDto): Promise<GetTalentLocationRespDto> => {
    
    const { data, error } = await supabase.from("talent_location").select("*").eq("talent_id", body.talentId).single();

    if (error) {
        throw error;
    }

    return { location: data };
};