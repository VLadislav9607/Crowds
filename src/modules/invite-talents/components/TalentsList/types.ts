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

// export const INVITE_TALENT_POPUP_ITEMS: IPopupMenuItem[] = [
//   { label: 'Add to My list', value: 'add_to_my_list' },
//   { label: 'Add flag', value: 'add_flag' },
//   { label: 'Report', value: 'report' },
// ];

// export const CUSTOM_LIST_POPUP_ITEMS: IPopupMenuItem[] = [
//   { label: 'Remove from list', value: 'remove_from_list' },
//   { label: 'Report', value: 'report' },
// ];
