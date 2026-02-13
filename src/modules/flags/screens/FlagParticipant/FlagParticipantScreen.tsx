import { Screens, useScreenNavigation } from '@navigation';
import { useTalentFlagsNotes } from '../../hooks';

import { FlagParticipantScreenLayout } from '../../layouts';
import { FlagNotesList } from '../../components';
import { FlagParticipantForm } from '../../forms';

export const FlagParticipantScreen = () => {
  const { params } = useScreenNavigation<Screens.FlagParticipant>();
  const { notes, isLoading } = useTalentFlagsNotes(params?.talentId ?? '');

  return (
    <FlagParticipantScreenLayout talentId={params?.talentId ?? ''}>
      <FlagParticipantForm
        talentId={params?.talentId ?? ''}
        eventId={params?.eventId ?? ''}
      />

      <FlagNotesList notes={notes} isLoading={isLoading} />
    </FlagParticipantScreenLayout>
  );
};
