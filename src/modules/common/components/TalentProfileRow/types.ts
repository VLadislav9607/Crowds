import { EventParticipantStatus } from '@actions';
import { IPopupMenuItem } from '@components';

export interface IEventParticipant {
  participationId?: string;
  talentId: string;
  name: string;
  location: string;
  flag: string;
  avatar_url?: string;
  status?: EventParticipantStatus;
}

export interface TalentProfileRowProps {
  talent: IEventParticipant;
  popUpItems?: IPopupMenuItem[];
  renderRightAction?: () => React.ReactNode;
  onMenuSelect?: (item: IPopupMenuItem) => void;
  onPressCard?: () => void;
  showMenu?: boolean;
}
