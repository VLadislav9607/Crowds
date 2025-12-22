import { AvatarFlag } from '@ui';

export interface InvitedTalent {
  id: string;
  name: string;
  location: string;
  flag: AvatarFlag;
  avatarUrl?: string;
}
