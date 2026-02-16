import { TalentEventHistoryItem } from '@actions';
import { IPopupMenuItem } from '@components';

export interface EventHistoryCardProps {
  event: TalentEventHistoryItem;
  onMenuSelect?: (item: IPopupMenuItem) => void;
}
