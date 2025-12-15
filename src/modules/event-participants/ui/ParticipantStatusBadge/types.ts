import { ParticipantStatus } from '../../components/EventParticipantCard/types';

export interface ParticipantStatusBadgeProps {
  status: ParticipantStatus;
  time?: string;
  onPressImage?: () => void;
}

