import { ButtonProps } from '@ui';
import { InvitedTalent } from '../../types';

export interface TalentsListProps {
  data: InvitedTalent[];
  variant?: 'invite' | 'add_to_list';
  floatingButtonProps?: ButtonProps;
  isLoading?: boolean;
  onEndReached?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onInviteTalent: (talentId: string) => void;
  isSendingInvite?: string | null;
}
