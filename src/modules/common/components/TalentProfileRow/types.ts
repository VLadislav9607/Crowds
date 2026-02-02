import { EventParticipantStatus } from '@actions';
import { IPopupMenuItem } from '@components';
import { AvatarFlag } from '@ui';

export interface IEventParticipant {
  participationId?: string;
  talentId: string;
  name: string;
  location: string;
  flag: AvatarFlag;
  avatarUrl?: string;
  status: EventParticipantStatus;
}

export interface TalentProfileRowProps {
  talent: IEventParticipant;
  popUpItems: IPopupMenuItem[];
  renderRightAction: () => React.ReactNode;
  onMenuSelect: (item: IPopupMenuItem) => void;
}
