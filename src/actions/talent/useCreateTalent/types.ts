import { Database } from "@services";

export interface CreateTalentBodyDto {
    first_name: string;
    last_name: string;
    username: string;
    gender: Database["public"]["Enums"]["Gender"];
    birth_date: string;
    password: string;
}

export interface CreateTalentResDto {
    success: boolean;
    talent: Database["public"]["Tables"]["talents"]["Row"];
    uin: string;
    session: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        expires_at: number;
    };
}
