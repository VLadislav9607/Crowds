import { Database } from "@services";

export interface UpdateTalentBodyDto {
    id: string;
    data: Database["public"]["Tables"]["talents"]["Update"];
}

export interface UpdateTalentRespDto {
    talent: Database["public"]["Tables"]["talents"]["Row"];
}