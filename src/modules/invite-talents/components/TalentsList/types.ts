import { IEventParticipant } from '@modules/common';
export interface TalentsListProps {
  data: IEventParticipant[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  actionTalentId?: string | null;
  onEndReached?: () => void;
  onPressRightAction: (talentId: string) => void;
}
