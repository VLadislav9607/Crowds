export interface LoginBodyDto {
    username: string;
    password: string;
}

export interface LoginRespDto {
    success: boolean;
    session: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        expires_at: number;
    };
}