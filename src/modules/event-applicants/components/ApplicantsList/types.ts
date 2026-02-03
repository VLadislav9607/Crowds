import { IEventParticipant } from '@modules/common';

export interface ApplicantsListProps {
  data: IEventParticipant[];
  variant?: 'invited' | 'applied' | 'approved' | 'rejected';
  selectedTalentId?: string;
  isLoading?: boolean;
  isAccepting?: boolean;
  isRejecting?: boolean;
  hasNextPage?: boolean;
  isCreatingChat?: boolean;
  isFetchingNextPage?: boolean;
  onEndReached?: () => void;
  handleAccept: (participationId: string, talentId: string) => void;
  handleDecline: (participationId: string, talentId: string) => void;
  handlePressMessage: (talent: IEventParticipant) => void;
}
