import { AppImage, AppModal, If } from '@components';
import {
  TalentEventCheckoutModalProps,
  TalentEventCheckoutModalRef,
} from './types';
import { AppButton, AppText } from '@ui';
import { useBoolean, useImperativeModal } from '@hooks';
import { forwardRef, useState } from 'react';
import { styles } from './styles';
import { ImageBackground, View } from 'react-native';
import { IMAGES } from '@assets';
import { useCheckoutEvent } from '@actions';
import { showMutationErrorToast } from '@helpers';

export const TalentEventCheckoutModal = forwardRef<TalentEventCheckoutModalRef>(
  (_, ref) => {
    const {
      value: isCheckedOut,
      setTrue: setIsCheckedOutTrue,
      setFalse: setIsCheckedOutFalse,
    } = useBoolean();
    const [checkoutTime, setCheckoutTime] = useState('');

    const { isVisible, refProps, close } =
      useImperativeModal<TalentEventCheckoutModalProps>(ref, {
        onRefClose: setIsCheckedOutFalse,
      });

    const { mutate: checkoutEvent, isPending } = useCheckoutEvent({
      onSuccess: data => {
        const time = new Date(data.checked_out_at).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        setCheckoutTime(time);
        setIsCheckedOutTrue();
        refProps.onCheckoutSuccess?.();
      },
      onError: error => {
        showMutationErrorToast(error);
      },
    });

    const handleCheckout = () => {
      checkoutEvent({ session_id: refProps.sessionId });
    };

    const title = isCheckedOut ? 'Checked Out' : undefined;

    return (
      <AppModal
        title={title}
        isVisible={isVisible}
        onClose={close}
        hideCloseButton={!isCheckedOut}
        contentContainerStyle={styles.modalContentContainer}
      >
        <If condition={!isCheckedOut}>
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
            title="Check Out"
            size="56"
            wrapperStyles={styles.checkoutButton}
            onPress={handleCheckout}
            isLoading={isPending}
            isDisabled={isPending}
          />
        </If>

        <If condition={isCheckedOut}>
          <AppText
            typography="regular_16"
            color="black"
            margin={{ top: 20, bottom: 20 }}
          >
            {`You've successfully checked out from ${refProps.eventTitle} at ${checkoutTime}.`}
          </AppText>

          <AppButton
            title="Okay"
            size="56"
            variant="withBorder"
            onPress={close}
          />
        </If>
      </AppModal>
    );
  },
);

TalentEventCheckoutModal.displayName = 'TalentEventCheckoutModal';
