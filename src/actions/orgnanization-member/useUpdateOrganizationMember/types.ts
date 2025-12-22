import { Database } from "@services";

export interface UpdateOrganizationMemberBodyDto {
    id: string;
    data:Omit<Database["public"]["Tables"]["organizations_members"]["Update"], "organization_id" | "id">;
}

export interface UpdateOrganizationMemberRespDto {
    organizationMember: Database["public"]["Tables"]["organizations_members"]["Row"];
}