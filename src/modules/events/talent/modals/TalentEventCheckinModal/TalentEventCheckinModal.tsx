import { AppModal } from "@components";
import { TalentEventCheckinModalProps, TalentEventCheckinModalRef } from "./types";
import { AppButton, AppText } from "@ui";
import { useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { styles } from "./styles";
import { Image, ImageBackground, View } from "react-native";
import { IMAGES } from "@assets";
export const TalentEventCheckinModal = forwardRef<TalentEventCheckinModalRef>((_, ref) => {

  const { isVisible, close } = useImperativeModal<TalentEventCheckinModalProps>(ref);

  return (
    <AppModal isVisible={isVisible} onClose={close} hideCloseButton contentContainerStyle={styles.modalContentContainer}>

      <ImageBackground style={styles.imageBackground} source={IMAGES.headerCrowdBg}>
        <View style={styles.imageContentContainer}>
        <View style={styles.textContainer}>
          <AppText typography='bold_20' color="white" margin={{ bottom: 12 }}>Fun Live Stage Segment, Single Guys</AppText>
          <AppText typography='medium_12' color="white">The Atre Royal</AppText>
        </View>

        <Image style={styles.image} />
        </View>
      </ImageBackground>

      <AppButton title="Check In" size="56" wrapperStyles={styles.checkinButton} />
    </AppModal>
  );
});

TalentEventCheckinModal.displayName = 'TalentEventCheckinModal';
