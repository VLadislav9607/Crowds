export interface LoginBodyDto {
    username: string;
    password: string;
    account_type?: 'organization' | 'talent';
}

export interface LoginAccountOption {
    type: 'organization' | 'talent';
    label: string;
}

export interface LoginRespDto {
    success: boolean;
    session?: {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        expires_at: number;
    };
    requires_account_selection?: boolean;
    accounts?: LoginAccountOption[];
}