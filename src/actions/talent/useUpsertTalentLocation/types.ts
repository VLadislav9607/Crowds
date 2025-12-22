import { Database } from "@services";

export interface UpsertTalentLocationBodyDto {
    location: Omit<Database['public']['Tables']['talent_location']['Update'], 'talent_id'>
}

export interface UpsertTalentLocationRespDto {
    location: Database['public']['Tables']['talent_location']['Row']
}