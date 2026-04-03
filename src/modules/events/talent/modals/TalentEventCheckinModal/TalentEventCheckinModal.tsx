import { AppModal } from '@components';
import {
  TalentEventCheckinModalProps,
  TalentEventCheckinModalRef,
} from './types';
import { AppButton, AppText } from '@ui';
import { useImperativeModal } from '@hooks';
import { forwardRef } from 'react';
import { styles } from './styles';
import { useCheckinEvent } from '@actions';
import { Screens, goToScreen } from '@navigation';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

export const TalentEventCheckinModal = forwardRef<TalentEventCheckinModalRef>(
  (_, ref) => {
    const { isVisible, refProps, close } =
      useImperativeModal<TalentEventCheckinModalProps>(ref);

    const { mutate: checkinEvent, isPending } = useCheckinEvent({
      onSuccess: () => {
        close();
        goToScreen(Screens.TalentEventDetails, {
          eventId: refProps.eventId,
          participationId: refProps.participationId,
        });
        setTimeout(() => {
          showSuccessToast('You have successfully checked in!');
        }, 500);
      },
      onError: error => {
        showMutationErrorToast(error);
      },
    });

    const handleCheckin = () => {
      checkinEvent({ qr_code_id: refProps.qrCodeId });
    };

    return (
      <AppModal
        title="Check In"
        isVisible={isVisible}
        onClose={close}
        contentContainerStyle={styles.modalContentContainer}
      >
        <AppText
          typography="regular_16"
          color="black"
          margin={{ top: 20, bottom: 20 }}
        >
          {`Are you ready to check in to ${refProps.eventTitle}${refProps.venue ? ` at ${refProps.venue}` : ''}?`}
        </AppText>

        <AppButton
          title="Check In"
          size="56"
          wrapperStyles={styles.checkinButton}
          onPress={handleCheckin}
          isLoading={isPending}
          isDisabled={isPending}
        />
      </AppModal>
    );
  },
);

TalentEventCheckinModal.displayName = 'TalentEventCheckinModal';
