import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { AppModal } from '@components';
import { AppButton, AppText, AppTextarea } from '@ui';
import { useCancelEvent, useGetCancellationInfo } from '@actions';
import { showSuccessToast } from '@helpers';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { CancelEventModalProps } from './types';
import { styles } from './styles';

export const CancelEventModal = ({
  eventId,
  eventName,
  isVisible,
  onClose,
  onSuccess,
}: CancelEventModalProps) => {
  const [reason, setReason] = useState('');
  const [step, setStep] = useState<'reason' | 'confirm'>('reason');

  const {
    mutate: getCancellationInfo,
    data: cancellationInfo,
    isPending: isLoadingInfo,
  } = useGetCancellationInfo();

  const { mutate: cancelEvent, isPending: isCancelling } = useCancelEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS_COUNTERS],
      });
      showSuccessToast('Event cancelled successfully');
      setStep('reason');
      setReason('');
      onClose();
      setTimeout(() => {
        onSuccess();
      }, 300);
    },
  });

  useEffect(() => {
    if (isVisible) {
      setReason('');
      setStep('reason');
    }
  }, [isVisible]);

  const handleClose = () => {
    if (isCancelling) return;
    setStep('reason');
    setReason('');
    onClose();
  };

  const handleNext = () => {
    if (!reason.trim()) return;

    getCancellationInfo(eventId, {
      onSuccess: info => {
        if (info.is_within_5_days) {
          setStep('confirm');
        } else {
          cancelEvent({ eventId, reason: reason.trim() });
        }
      },
    });
  };

  const handleConfirmCancel = () => {
    cancelEvent({ eventId, reason: reason.trim() });
  };

  const isReasonValid = reason.trim().length >= 10;

  if (step === 'confirm' && cancellationInfo) {
    const remaining = Math.max(0, cancellationInfo.cancellation_threshold - cancellationInfo.cancellation_count - 1);

    return (
      <AppModal title="Warning" isVisible={isVisible} onClose={handleClose}>
        <View style={styles.warningContainer}>
          <AppText typography="bold_14" color="red" margin={{ bottom: 4 }}>
            Late Cancellation
          </AppText>
          <AppText typography="regular_12" color="black">
            This event is being cancelled within 5 days of its start date and
            will be recorded.
          </AppText>
        </View>

        <View style={styles.statsRow}>
          <AppText typography="regular_12" color="black_60">
            Cancellations in period
          </AppText>
          <AppText typography="bold_14" color="black">
            {cancellationInfo.cancellation_count}
          </AppText>
        </View>

        <View style={styles.statsRow}>
          <AppText typography="regular_12" color="black_60">
            Remaining before penalties
          </AppText>
          <AppText typography="bold_14" color="red">
            {remaining}
          </AppText>
        </View>

        <AppText typography="regular_14" color="black" margin={{ bottom: 16 }}>
          Cancel '{eventName}'?
        </AppText>

        <AppButton
          title="Yes, cancel event"
          mb={10}
          size="60"
          wrapperStyles={styles.cancelButton}
          onPress={handleConfirmCancel}
          isLoading={isCancelling}
          isDisabled={isCancelling}
        />
        <AppButton
          title="No, go back"
          variant="withBorder"
          size="60"
          onPress={handleClose}
          isDisabled={isCancelling}
        />
      </AppModal>
    );
  }

  return (
    <AppModal title="Cancel Event" isVisible={isVisible} onClose={handleClose}>
      <AppText typography="regular_14" color="black_60" margin={{ bottom: 16 }}>
        Please provide a reason for cancellation.
      </AppText>

      <AppTextarea
        placeholder="Reason for cancellation..."
        value={reason}
        onChangeText={setReason}
        containerStyle={styles.textarea}
        style={styles.textareaInput}
        numberOfLines={2}
        errorMessage={
          reason.length > 0 && reason.trim().length < 10
            ? 'Minimum 10 characters'
            : undefined
        }
      />

      <AppButton
        title="Cancel event"
        mb={10}
        size="60"
        wrapperStyles={styles.cancelButton}
        onPress={handleNext}
        isLoading={isLoadingInfo}
        isDisabled={!isReasonValid || isLoadingInfo}
      />
      <AppButton
        title="Go back"
        variant="withBorder"
        size="60"
        onPress={handleClose}
        isDisabled={isLoadingInfo}
      />
    </AppModal>
  );
};
