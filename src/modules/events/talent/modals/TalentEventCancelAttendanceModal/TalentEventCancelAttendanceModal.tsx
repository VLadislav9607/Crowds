import { AppModal } from "@components";
import { TalentEventCancelAttendanceModalProps, TalentEventCancelAttendanceModalRef } from "./types";
import { AppButton, AppText } from "@ui";
import { useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { styles } from "./styles";

export const TalentEventCancelAttendanceModal = forwardRef<TalentEventCancelAttendanceModalRef>((_, ref) => {

  const { isVisible, close } = useImperativeModal<TalentEventCancelAttendanceModalProps>(ref);

  return (
    <AppModal title="Cancel attendance" isVisible={isVisible} onClose={close}>


      <AppText typography='regular_16' color='black' margin={{ bottom: 10, top: 20 }}>You are about to cancel your attendance to the event ‘Fun Live Stage Segment, Single Guys’.</AppText>
      <AppText typography='regular_16' color='black' margin={{ bottom: 20 }}>Cancelling may affect your rating &  leaving earlier in the designated exit time; If you leave now, it will lead you to not get paid.</AppText>

      <AppButton title="Yes cancel" mb={10} size="60" wrapperStyles={styles.cancelButton} />
      <AppButton title="No, go back" variant="withBorder" size="60" onPress={close} />
    </AppModal>
  );
});

TalentEventCancelAttendanceModal.displayName = 'TalentEventCancelAttendanceModal';
