import { IEventParticipant } from '@modules/common';

export interface ApplicantsListProps {
  data: IEventParticipant[];
  variant?: 'invited' | 'applied' | 'approved' | 'rejected';
  isLoading?: boolean;
  isAccepting?: boolean;
  isRejecting?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onEndReached?: () => void;
  handleAccept: (participationId: string) => void;
  handleDecline: (participationId: string) => void;
  handlePressMessage: (talentId: string) => void;
}
