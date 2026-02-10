import { AvatarFlag } from '@ui';

export interface IFlagNote {
  id: string;
  date: string;
  eventName: string;
  title: string;
  description?: string;
  flag: AvatarFlag;
}

export interface IParticipantInfo {
  id: string;
  name: string;
  avatarUrl?: string;
  gender: string;
  age: number;
  location: string;
}
