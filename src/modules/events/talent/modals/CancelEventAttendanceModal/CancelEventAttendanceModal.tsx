import { goBack } from '@navigation';
import { AppModal } from '@components';
import { AppButton, AppText } from '@ui';
import { useCancelAttendance } from '@actions';
import { showSuccessToast } from '@helpers';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

import { CancelEventAttendanceModalProps } from './types';
import { styles } from './styles';

export const CancelEventAttendanceModal = ({
  participationId,
  eventName,
  isVisible,
  onClose,
}: CancelEventAttendanceModalProps) => {
  const { mutate: cancelAttendance, isPending } = useCancelAttendance({
    onSuccess: () => {
      queryClient.setQueryData(
        [TANSTACK_QUERY_KEYS.GET_TALENT_EVENTS_COUNTS],
        (oldData: any) => {
          if (!oldData || !oldData[0]) return;

          return [
            {
              ...oldData[0],
              approved: oldData[0].approved - 1,
            },
          ];
        },
      );

      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS],
      });
      showSuccessToast('Attendance canceled successfully');
      onClose();
      setTimeout(() => {
        goBack();
      }, 300);
    },
  });

  return (
    <AppModal title="Cancel attendance" isVisible={isVisible} onClose={onClose}>
      <AppText
        typography="regular_16"
        color="black"
        margin={{ bottom: 10, top: 20 }}
      >
        You are about to cancel your attendance to the event ‘{eventName}’.
      </AppText>
      <AppText typography="regular_16" color="black" margin={{ bottom: 20 }}>
        Cancelling may affect your rating & leaving earlier in the designated
        exit time; If you leave now, it will lead you to not get paid.
      </AppText>

      <AppButton
        title="Yes cancel"
        mb={10}
        size="60"
        wrapperStyles={styles.cancelButton}
        onPress={() => cancelAttendance({ participationId })}
        isLoading={isPending}
        isDisabled={isPending}
      />
      <AppButton
        title="No, go back"
        variant="withBorder"
        size="60"
        onPress={onClose}
        isDisabled={isPending}
      />
    </AppModal>
  );
};
