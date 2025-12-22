import { supabase } from "@services";
import { UpdateOrganizationMemberBodyDto, UpdateOrganizationMemberRespDto } from "./types";

export const updateOrganizationMemberAction = async (body: UpdateOrganizationMemberBodyDto): Promise<UpdateOrganizationMemberRespDto> => {
    const { data, error } = await supabase.from("organizations_members").update(body.data).eq("id", body.id).select().single();

    if (error) {
        throw error;
    }

    return { organizationMember: data };
};