import { AppModal } from "@components";
import { TalentEventUnavailableTimeModalProps, TalentEventUnavailableTimeModalRef } from "./types";
import { SvgXml } from "react-native-svg";
import { ICONS } from "@assets";
import { AppButton, AppCheckbox, AppText } from "@ui";
import { View } from "react-native";
import { useBoolean, useImperativeModal } from "@hooks";
import { styles } from "./styles";
import { forwardRef } from "react";

export const TalentEventUnavailableTimeModal = forwardRef<TalentEventUnavailableTimeModalRef>((_, ref) => {
  const { value: isAvailable, setValue: setIsAvailable } = useBoolean(false);


  const { isVisible, refProps, close } = useImperativeModal<TalentEventUnavailableTimeModalProps>(ref, {
    onRefClose: () => {
      setIsAvailable(false);
    },
  });


  const handleConfirm = () => {
    refProps?.onConfirm?.();
    close();
  };


  return (
    <AppModal isVisible={isVisible} onClose={close}>
      <SvgXml xml={ICONS.dangerTriangle('red')} width={50} height={50} />
      <AppText typography='h4' color='black' margin={{ top: 12, bottom: 12 }}>Unavailable at This Time!</AppText>


      <AppText typography='regular_14' color='black'>You're about to apply for a job, but your current availability shows you are not available on this date.</AppText>
      <AppText typography='regular_14' color='black'>Please confirm that you are available before proceeding.</AppText>


      <View style={styles.checkboxContainer}>
        <AppCheckbox
          type='checkedIcon'
          color="gray"
          colorChecked="main"
          checked={isAvailable}
          onChange={setIsAvailable}
          style={styles.checkbox}
        />

        <AppText typography='semibold_16' color='dark_gray'>Yes, I'm Available</AppText>
      </View>

      <AppText typography='bold_14' color='black' margin={{ top: 24, bottom: 10 }}>MUST READ:</AppText>

      <AppText typography='regular_12' color='black'>If you apply for a job and are selected, but do not show up, you will receive a <AppText color="red">Yellow Flag</AppText>, and your account may be suspended.</AppText>
      <AppText typography='regular_12' color='black' margin={{ bottom: 27 }}>Please make sure to review our Terms & Conditions before applying.</AppText>


      <AppButton title="Comfirm" isDisabled={!isAvailable} onPress={handleConfirm} size='60' />
    </AppModal>
  );
});

TalentEventUnavailableTimeModal.displayName = 'TalentEventUnavailableTimeModal';
