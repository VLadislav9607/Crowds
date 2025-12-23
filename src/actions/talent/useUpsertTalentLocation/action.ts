import { supabase } from "@services";
import {
    UpsertTalentLocationBodyDto,
    UpsertTalentLocationRespDto,
} from "./types";
import { Database } from "@services";

export const upsertTalentLocationAction = async (
    body: UpsertTalentLocationBodyDto,
): Promise<UpsertTalentLocationRespDto> => {
    const { data: session, error: sessionError } = await supabase.auth
        .getSession();
        
    if (sessionError) {
        throw sessionError;
    }

    const locationData = {
        ...body.location,
        talent_id: session.session?.user.id,
    } as Database["public"]["Tables"]["talent_location"]["Insert"];

    const { data, error } = await supabase.from("talent_location").upsert(
        locationData,
    ).select().single();

    if (error) {
        throw error;
    }

    return { location: data };
};
