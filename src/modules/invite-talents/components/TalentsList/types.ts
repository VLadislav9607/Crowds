import { IEventParticipant } from '@modules/common';
export interface TalentsListProps {
  data: IEventParticipant[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  actionTalentId?: string | null;
  isRegistrationClosed?: boolean;
  onEndReached?: () => void;
  onPressRightAction: (talentId: string) => void;
}
