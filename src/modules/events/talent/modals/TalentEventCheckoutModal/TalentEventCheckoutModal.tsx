import { AppModal, If } from "@components";
import { TalentEventCheckoutModalProps, TalentEventCheckoutModalRef } from "./types";
import { AppButton, AppText } from "@ui";
import { useBoolean, useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { styles } from "./styles";
import { Image, ImageBackground, View } from "react-native";
import { IMAGES } from "@assets";

export const TalentEventCheckoutModal = forwardRef<TalentEventCheckoutModalRef>((_, ref) => {

  const { value: isCheckedOut, toggle: toggleIsCheckedOut, setFalse: setIsCheckedOutFalse } = useBoolean()

  const { isVisible, close } = useImperativeModal<TalentEventCheckoutModalProps>(ref, {
    onRefClose:setIsCheckedOutFalse,
  });



  const title = isCheckedOut ? 'Checked Out' : undefined;

  return (
    <AppModal title={title} isVisible={isVisible} onClose={close} hideCloseButton={!isCheckedOut} contentContainerStyle={styles.modalContentContainer}>

      <If condition={!isCheckedOut}>
        <ImageBackground style={styles.imageBackground} source={IMAGES.headerCrowdBg}>
          <View style={styles.imageContentContainer}>
            <View style={styles.textContainer}>
              <AppText typography='bold_20' color="white" margin={{ bottom: 12 }}>Fun Live Stage Segment, Single Guys</AppText>
              <AppText typography='medium_12' color="white">The Atre Royal</AppText>
            </View>

            <Image style={styles.image} />
          </View>
        </ImageBackground>

        <AppButton title={isCheckedOut ? 'Checked Out' : 'Check Out'} size="56" wrapperStyles={styles.checkoutButton} onPress={toggleIsCheckedOut} />
      </If>

      <If condition={isCheckedOut}>
        <AppText typography='regular_16' color="black" margin={{top: 20, bottom: 20}}>You’ve successfully checked out from Fun Live Stage Segment, Single Guys at 2:34 pm.</AppText>

        <AppButton title="Okay" size="56" variant="withBorder" onPress={close} />
      </If>
    </AppModal>
  );
});

TalentEventCheckoutModal.displayName = 'TalentEventCheckoutModal';
