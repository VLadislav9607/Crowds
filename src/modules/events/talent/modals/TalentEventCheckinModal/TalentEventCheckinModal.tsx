import { AppImage, AppModal, If } from '@components';
import {
  TalentEventCheckinModalProps,
  TalentEventCheckinModalRef,
} from './types';
import { AppButton, AppText } from '@ui';
import { useImperativeModal } from '@hooks';
import { forwardRef } from 'react';
import { styles } from './styles';
import { ImageBackground, View } from 'react-native';
import { IMAGES } from '@assets';
import { useCheckinEvent } from '@actions';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

export const TalentEventCheckinModal = forwardRef<TalentEventCheckinModalRef>(
  (_, ref) => {
    const { isVisible, refProps, close } =
      useImperativeModal<TalentEventCheckinModalProps>(ref);

    const { mutate: checkinEvent, isPending } = useCheckinEvent({
      onSuccess: () => {
        close();
        showSuccessToast('Successfully checked in!');
        refProps.onCheckinSuccess?.();
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
        isVisible={isVisible}
        onClose={close}
        hideCloseButton
        contentContainerStyle={styles.modalContentContainer}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={IMAGES.headerCrowdBg}
        >
          <View style={styles.imageContentContainer}>
            <View style={styles.textContainer}>
              <AppText
                typography="bold_20"
                color="white"
                margin={{ bottom: 12 }}
              >
                {refProps.eventTitle}
              </AppText>
              <AppText typography="medium_12" color="white">
                {refProps.venue}
              </AppText>
            </View>

            <If condition={!!refProps.brandLogoPath}>
              <AppImage
                imgPath={refProps.brandLogoPath}
                bucket="brand_avatars"
                containerStyle={styles.image}
              />
            </If>
          </View>
        </ImageBackground>

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
