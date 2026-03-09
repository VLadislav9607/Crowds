import { AppButton } from '@ui';
import { TalentProfileRow } from '@modules/common';
import { IEventParticipant } from '@modules/common';
import { goToScreen, Screens } from '@navigation';
import { InviteStatusBadge } from '../../../invite-talents/ui';

interface CustomListTalentRowProps {
  talent: IEventParticipant;
  invitingTalentId?: string | null;
  onInvite?: (talentId: string) => void;
  onRemove: (talentId: string) => void;
  showInviteAction?: boolean;
}

export const CustomListTalentRow = ({
  talent,
  invitingTalentId,
  onInvite,
  onRemove,
  showInviteAction = true,
}: CustomListTalentRowProps) => {
  const renderRightAction = () => {
    if (!showInviteAction) return null;

    if (talent.status) {
      return <InviteStatusBadge status={talent.status} />;
    }

    return (
      <AppButton
        title="Invite"
        isLoading={invitingTalentId === talent.talentId}
        onPress={() => onInvite?.(talent.talentId)}
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
      onPressCard={() =>
        goToScreen(Screens.TalentProfile, {
          talentId: talent.talentId,
        })
      }
      renderRightAction={showInviteAction ? renderRightAction : undefined}
    />
  );
};
