import { forwardRef } from 'react';
import { AppModal } from '@components';
import { AppButton } from '@ui';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { OrgBaseEventCard } from '../../../events/organization/ui';
import { useImperativeModal } from '@hooks';
import { EventCreatedModalRef, EventCreatedModalRefProps } from './types';
import { styles } from './styles';
import { OrgEventListItemDto } from '@actions';

export const EventCreatedModal = forwardRef<EventCreatedModalRef>((_, ref) => {
  const { isVisible, close, refProps } =
    useImperativeModal<EventCreatedModalRefProps>(ref);

  const { navigation } = useScreenNavigation<Screens.CreateEvent>();

  const onClose = () => {
    close();
    goBack();
  };

  const goToInviteTalents = () => {
    close();

    setTimeout(() => {
      navigation.replace(Screens.InviteTalents, {
        eventId: refProps?.event?.id,
        forwardFrom: Screens.CreateEvent,
      });
    }, 300);
  };

  return (
    <AppModal
      title={refProps?.isDraftPublished ? 'Event Published' : 'Event Created'}
      subtitle="Start adding talents to your event."
      isVisible={isVisible}
      onClose={onClose}
    >
      <OrgBaseEventCard event={refProps?.event as OrgEventListItemDto} />

      <AppButton
        title="Invite Talents"
        variant="withBorder"
        onPress={goToInviteTalents}
        wrapperStyles={styles.buttonWrapper}
      />
    </AppModal>
  );
});
