import { TalentFlag } from '@modules/common';
import { IPopupMenuItem } from '@components';
import { BucketsTypes } from '@configs';

export type ParticipantStatus =
  | 'checked_in'
  | 'checked_out'
  | 'completed_tasks'
  | 'no_show';

export interface IEventParticipant {
  id: string;
  name: string;
  location: string;
  status: ParticipantStatus;
  time: string;
  flag: TalentFlag;
  avatarUrl?: string;
  avatarPath?: string;
  avatarBucket?: BucketsTypes;
}

export interface EventParticipantCardProps {
  participant: IEventParticipant;
  onMenuSelect?: (item: IPopupMenuItem) => void;
  onPressImageIcon?: () => void;
}
