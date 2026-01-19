import { IPopupMenuItem } from '@components';
import { IEventParticipant } from '@modules/common';
export interface TalentsListProps {
  data: IEventParticipant[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  invitingTalentId?: string | null;
  onEndReached?: () => void;
  onPressRightAction: (talentId: string) => void;
}

export const INVITE_TALENT_POPUP_ITEMS: IPopupMenuItem[] = [
  { label: 'Add to My list', value: 'add_to_my_list' },
  { label: 'Add flag', value: 'add_flag' },
  { label: 'Report', value: 'report' },
];
