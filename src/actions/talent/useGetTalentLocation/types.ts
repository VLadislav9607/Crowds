import { Database } from "@services";

export interface GetTalentLocationBodyDto {
    talentId: string;
}
export interface GetTalentLocationRespDto {
    location: Database['public']['Tables']['talent_location']['Row'];
}