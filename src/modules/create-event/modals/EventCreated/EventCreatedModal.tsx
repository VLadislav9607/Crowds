import { AppModal } from '@components';
import { AppButton } from '@ui';
import { goToScreen, Screens } from '@navigation';
import { BaseEventCard } from '../../../events/organization/ui';

interface EventCreatedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const EventCreatedModal = ({
  isVisible,
  onClose,
}: EventCreatedModalProps) => {
  const mockedEvent = {
    id: '1',
    name: 'Event Preview Name',
    image:
      'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80',
    location: 'Location Preview',
    date: '03 OCT, 2025',
    duration: '1 h',
  };

  const goToInviteTalents = () => {
    onClose();

    setTimeout(() => {
      goToScreen(Screens.InviteTalents);
    }, 300);
  };

  return (
    <AppModal
      title="Event created successfully"
      subtitle="Start adding talents to your event."
      subtitleProps={{ typography: 'medium_14' }}
      isVisible={isVisible}
      onClose={onClose}
    >
      <BaseEventCard event={mockedEvent} />

      <AppButton
        title="Invite Talents"
        variant="withBorder"
        onPress={goToInviteTalents}
        wrapperStyles={{ marginTop: 16 }}
      />
    </AppModal>
  );
};
