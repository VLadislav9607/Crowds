export interface CreateTeamMemberBodyDto {
  token: string;
  verificationToken: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  position: string;
  password: string;
}

export interface CreateTeamMemberResDto {
  success: boolean;
  uin: string;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  };
}
