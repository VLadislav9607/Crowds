import { View } from 'react-native';
import { AppText } from '@ui';
import { EventParticipantStatus } from '@actions';
import { styles } from './styles';

interface InviteStatusBadgeProps {
  status: EventParticipantStatus;
}

const STATUS_CONFIG: Record<
  EventParticipantStatus,
  { text: string; style: keyof typeof styles; textColor: 'white' | 'black' }
> = {
  pending: { text: 'Pending', style: 'pendingBadge', textColor: 'black' },
  approved: { text: 'Approved', style: 'approvedBadge', textColor: 'white' },
  rejected: { text: 'Rejected', style: 'rejectedBadge', textColor: 'white' },
};

export const InviteStatusBadge = ({ status }: InviteStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <View style={styles[config.style]}>
      <AppText typography="regular_10" color={config.textColor}>
        {config.text}
      </AppText>
    </View>
  );
};
