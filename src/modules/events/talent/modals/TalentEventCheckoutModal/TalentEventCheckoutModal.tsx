import { AppModal } from '@components';
import {
  TalentEventCheckoutModalProps,
  TalentEventCheckoutModalRef,
} from './types';
import { AppButton, AppText } from '@ui';
import { useImperativeModal } from '@hooks';
import { forwardRef } from 'react';
import { styles } from './styles';
import { useCheckoutEvent } from '@actions';
import { Screens, goToScreen } from '@navigation';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

export const TalentEventCheckoutModal = forwardRef<TalentEventCheckoutModalRef>(
  (_, ref) => {
    const { isVisible, refProps, close } =
      useImperativeModal<TalentEventCheckoutModalProps>(ref);

    const { mutate: checkoutEvent, isPending } = useCheckoutEvent({
      onSuccess: data => {
        close();
        goToScreen(Screens.TalentEventDetails, {
          eventId: refProps.eventId,
          participationId: data.participant_id,
        });
        setTimeout(() => {
          showSuccessToast('You have successfully checked out!');
        }, 500);
      },
      onError: error => {
        showMutationErrorToast(error);
      },
    });

    const handleCheckout = () => {
      checkoutEvent({ session_id: refProps.sessionId });
    };

    return (
      <AppModal
        title="Check Out"
        isVisible={isVisible}
        onClose={close}
        contentContainerStyle={styles.modalContentContainer}
      >
        <AppText
          typography="regular_16"
          color="black"
          margin={{ top: 20, bottom: 20 }}
        >
          {`Are you ready to check out from ${refProps.eventTitle}${refProps.venue ? ` at ${refProps.venue}` : ''}?`}
        </AppText>

        <AppButton
          title="Check Out"
          size="56"
          wrapperStyles={styles.checkoutButton}
          onPress={handleCheckout}
          isLoading={isPending}
          isDisabled={isPending}
        />
      </AppModal>
    );
  },
);

TalentEventCheckoutModal.displayName = 'TalentEventCheckoutModal';
