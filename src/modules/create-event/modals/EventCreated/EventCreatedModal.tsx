import { forwardRef } from 'react';
import { AppModal } from '@components';
import { AppButton } from '@ui';
import { goBack, goToScreen, Screens } from '@navigation';
import { OrgBaseEventCard } from '../../../events/organization/ui';
import { useImperativeModal } from '@hooks';
import { EventCreatedModalRef, EventCreatedModalRefProps } from './types';
import { styles } from './styles';

export const EventCreatedModal = forwardRef<EventCreatedModalRef>((_, ref) => {
  const { isVisible, close, refProps } =
    useImperativeModal<EventCreatedModalRefProps>(ref);

  const onClose = () => {
    close();
    goBack();
  };

  const goToInviteTalents = () => {
    close();

    setTimeout(() => {
      goToScreen(Screens.InviteTalents, { eventId: refProps?.event?.id });
    }, 300);
  };

  return (
    <AppModal
      title={refProps?.isDraftPublished ? 'Event Published' : 'Event Created'}
      subtitle="Start adding talents to your event."
      isVisible={isVisible}
      onClose={onClose}
    >
      <OrgBaseEventCard event={refProps?.event} />

      <AppButton
        title="Invite Talents"
        variant="withBorder"
        onPress={goToInviteTalents}
        wrapperStyles={styles.buttonWrapper}
      />
    </AppModal>
  );
});
