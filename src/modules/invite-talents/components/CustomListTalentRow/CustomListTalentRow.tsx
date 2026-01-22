import { AppButton } from '@ui';
import { TalentProfileRow } from '@modules/common';
import { IEventParticipant } from '@modules/common';
import { EventParticipantStatus } from '@actions';
import { InviteStatusBadge } from '../../ui';

interface CustomListTalentRowProps {
  talent: IEventParticipant & { status?: EventParticipantStatus };
  invitingTalentId: string | null;
  onInvite: (talentId: string) => void;
  onRemove: () => void;
}

export const CustomListTalentRow = ({
  talent,
  invitingTalentId,
  onInvite,
  onRemove,
}: CustomListTalentRowProps) => {
  const renderRightAction = () => {
    if (talent.status) {
      return <InviteStatusBadge status={talent.status} />;
    }

    return (
      <AppButton
        title="Invite"
        isLoading={invitingTalentId === talent.talentId}
        onPress={() => onInvite(talent.talentId)}
        size="36"
        width={71}
      />
    );
  };

  return (
    <TalentProfileRow
      talent={talent}
      popUpItems={[{ label: 'Remove from list', value: 'remove' }]}
      onMenuSelect={onRemove}
      renderRightAction={renderRightAction}
    />
  );
};
