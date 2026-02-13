import { AppButton } from '@ui';
import { TalentProfileRow } from '@modules/common';
import { IEventParticipant } from '@modules/common';
import { InviteStatusBadge } from '../../ui';

interface CustomListTalentRowProps {
  talent: IEventParticipant;
  invitingTalentId: string | null;
  isCheckingFlag?: boolean;
  onInvite: (talentId: string) => void;
  onRemove: (talentId: string) => void;
}

export const CustomListTalentRow = ({
  talent,
  invitingTalentId,
  isCheckingFlag,
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
        isDisabled={isCheckingFlag}
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
      onMenuSelect={() => onRemove(talent.talentId)}
      renderRightAction={renderRightAction}
    />
  );
};
