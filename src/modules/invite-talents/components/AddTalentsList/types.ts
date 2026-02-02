import { IEventParticipant } from '@modules/common';

export interface AddTalentItem
  extends Omit<IEventParticipant, 'participationId'> {
  isInList: boolean;
}

export interface AddTalentsListProps {
  data: AddTalentItem[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  actionTalentId?: string | null;
  onEndReached?: () => void;
  onPressRightAction: (talentId: string) => void;
}

// export const CUSTOM_LIST_POPUP_ITEMS: IPopupMenuItem[] = [
//   { label: 'Remove from list', value: 'remove_from_list' },
//   { label: 'Report', value: 'report' },
// ];
