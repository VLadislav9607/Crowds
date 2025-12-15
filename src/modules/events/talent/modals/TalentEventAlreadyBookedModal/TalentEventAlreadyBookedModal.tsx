import { AppModal } from "@components";
import { TalentEventAlreadyBookedModalProps, TalentEventAlreadyBookedModalRef } from "./types";
import { SvgXml } from "react-native-svg";
import { ICONS } from "@assets";
import { AppButton, AppText } from "@ui";
import { useImperativeModal } from "@hooks";
import { forwardRef } from "react";

export const TalentEventAlreadyBookedModal = forwardRef<TalentEventAlreadyBookedModalRef>((_, ref) => {

  const { isVisible, refProps, close } = useImperativeModal<TalentEventAlreadyBookedModalProps>(ref);

  const handleConfirm = () => {
    refProps?.onConfirm?.();
    close();
  };

  return (
    <AppModal isVisible={isVisible} onClose={close}>
      <SvgXml xml={ICONS.dangerTriangle('red')} width={50} height={50} />
      <AppText typography='h4' color='black' margin={{ top: 12, bottom: 12 }}>Already Booked for This Date!</AppText>
      <AppText typography='regular_14' color='black'>You are currently booked for another job on this date and cannot apply for this job.</AppText>

      <AppText typography='bold_14' color='black' margin={{ top: 42, bottom: 10 }}>Important Reminder:</AppText>

      <AppText typography='regular_12' color='black'>If you apply for a job and are selected but do not show up, you risk receiving a <AppText color="red">Yellow Flag</AppText> and possible suspension from the platform.</AppText>
      <AppText typography='regular_12' color='black' margin={{ bottom: 24, top: 10 }}>Please make sure to review our Terms & Conditions before applying.</AppText>

      <AppButton title="Ok, Got It"  onPress={handleConfirm} size='60' />
    </AppModal>
  );
});

TalentEventAlreadyBookedModal.displayName = 'TalentEventAlreadyBookedModal';
