import { IPopupMenuItem } from '@components';
import { InvitedTalent } from '../../types';

export interface TalentCardProps {
  talent: InvitedTalent;
  variant?: 'invite' | 'add_to_list';
  isInvited?: boolean;
  isAddedToList?: boolean;
  isSendingInvite?: boolean;
  onMenuSelect: (item: IPopupMenuItem) => void;
  onPressActionButton: () => void;
}

export const INVITE_TALENT_POPUP_ITEMS: IPopupMenuItem[] = [
  { label: 'Add to My list', value: 'add_to_my_list' },
  { label: 'Add flag', value: 'add_flag' },
  { label: 'Report', value: 'report' },
];
