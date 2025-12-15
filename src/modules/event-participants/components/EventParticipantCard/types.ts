import { AvatarFlag } from '@ui';
import { IPopupMenuItem } from '@components';

export type ParticipantStatus = 'checked_in' | 'checked_out' | 'completed_tasks' | 'no_show';

export interface IEventParticipant {
  id: string;
  name: string;
  location: string;
  status: ParticipantStatus;
  time: string;
  flag: AvatarFlag;
  avatarUrl?: string;
}

export interface EventParticipantCardProps {
  participant: IEventParticipant;
  onMenuSelect?: (item: IPopupMenuItem) => void;
  onPressImageIcon?: () => void;
}

