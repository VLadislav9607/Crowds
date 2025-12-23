import { Database } from "@services";

export interface UseGetMeResDto {
    isTalent: boolean;
    isOrganizationMember: boolean;
    talent?: Database["public"]["Tables"]["talents"]["Row"] & {
        talent_location: Database["public"]["Tables"]["talent_location"]["Row"] | null;
    };
    organizationMember?: Database["public"]["Tables"]["organizations_members"]["Row"];
}