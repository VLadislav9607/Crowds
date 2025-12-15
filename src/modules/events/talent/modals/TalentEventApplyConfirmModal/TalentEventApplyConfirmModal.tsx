import { AppModal, If } from "@components";
import { TalentEventApplyConfirmModalProps, TalentEventApplyConfirmModalRef } from "./types";
import { AppButton, AppText } from "@ui";
import { useBoolean, useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { View } from "react-native";
import { styles } from "./styles";

export const TalentEventApplyConfirmModal = forwardRef<TalentEventApplyConfirmModalRef>((_, ref) => {

  const { value: isSubmitted, toggle: toggleIsSubmitted, setFalse: setIsSubmittedFalse } = useBoolean()

  const { isVisible, refProps, close } = useImperativeModal<TalentEventApplyConfirmModalProps>(ref, {
    onRefClose: setIsSubmittedFalse,
  });

  const handleConfirm = () => {
    refProps?.onConfirm?.();
    close();
  };

  const tilte = isSubmitted ? 'Thank you! You have now applied for this job.' : 'You are about to apply for:';

  return (
    <AppModal title={tilte} isVisible={isVisible} onClose={close}>

      <If condition={isSubmitted}>
        <AppText typography='regular_14' color='black'>If you are successful, you will be notified in your list of Successful Jobs. Please ensure you check your notificatons and messages. If you are not successful this will list in the rejected items. Currently the status is Pending.</AppText>
      </If>

      <View style={[styles.eventContainer, isSubmitted ? styles.eventContainerSubmitted : styles.eventContainerNotSubmitted]}>
        <AppText typography='bold_20' color='black' margin={{ bottom: 10 }}>Fun Live Stage Segment, Single Guys</AppText>

        <AppText typography='regular_12' color='black' margin={{ bottom: 4 }}>Nottingham Royal Concert Hall</AppText>
        <AppText typography='regular_12' color='black' margin={{ bottom: 4 }}>9th February 2023</AppText>
        <AppText typography='regular_12' color='black'>Duration 3hrs</AppText>
      </View>

      <If condition={!isSubmitted}>
        <AppButton title="Cancel" variant='withBorder' onPress={handleConfirm} size='60' wrapperStyles={styles.cancelButton} />
        <AppButton title="Submit application" onPress={toggleIsSubmitted} size='60' />
      </If>

      <If condition={isSubmitted}>
        <AppButton title="Done" onPress={handleConfirm} size='60' />
      </If>

    </AppModal>
  );
});

TalentEventApplyConfirmModal.displayName = 'TalentEventApplyConfirmModal';
