import { AppModal } from '@components';
import { UINSaveConfirmationModalRef, UINSaveConfirmationModalProps } from './types';
import { styles } from './styles';
import { View } from 'react-native';
import { AppButton, AppCheckbox, AppText } from '@ui';
import { ICONS } from '@assets';
import { forwardRef } from 'react';
import { useBoolean, useImperativeModal } from '@hooks';
import { copyToClipboard } from '@helpers';

export const UINSaveConfirmationModal = forwardRef<UINSaveConfirmationModalRef>((_, ref) => {
  const { value: isChecked, toggle: toggleIsChecked, setFalse: setIsCheckedFalse } = useBoolean(false);

  const { isVisible, refProps, close } = useImperativeModal<UINSaveConfirmationModalProps>(ref,{
    onRefClose: setIsCheckedFalse,
  });

  const handleConfirm = () => {
    refProps?.onConfirm?.();
    close();
  };


  const onCopyUIN = () => {
    copyToClipboard({
      text: refProps?.uin!,
      successMessage: 'UIN copied to clipboard!',
    });
  };

  return (
    <AppModal title="Save your UIN" hideCloseButton isVisible={isVisible}>
      <View style={styles.container}>

        <AppText typography="regular_12" color="black" margin={{ top: 10 }}>
          This is your Unique Identifier Number. Crowds Now does not store
          any data, nor does it take your email or mobile. As a result in
          the event you lose your password; we have NO WAY or giving you
          back access to your account without your UIN (Unique Identifier
          Number). It is your responsibility to store it in a safe place.
          Only ONE is issued per account per person.
        </AppText>

        <View style={styles.UINContainer}>
          <AppText typography="medium_12" color="black">
            Your UIN is:
          </AppText>
          <AppText typography="bold_14" color="main">
            {refProps?.uin}
          </AppText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppCheckbox style={{ borderWidth: 2, width: 24, height: 24 }} onChange={toggleIsChecked} checked={isChecked} type='checkedIcon' />
          <AppText typography="regular_12" color="red" style={{ width: '100%', flex: 1, marginVertical: 6 }}>
            I have saved my UIN.  I understand that this is my last chance to save my number!
          </AppText>
        </View>

        <AppButton
          isDisabled={!isChecked}
          title="Yes, Saved & Proceed"
          variant="primary"
          size="60"
          wrapperStyles={styles.yesSavedProceedButton}
          onPress={handleConfirm}
        />
        <AppButton
          title="Copy UIN"
          variant="withBorder"
          size="60"
          iconPlace="right"
          iconSize={24}
          titleStyles={styles.copyUINButtonTitle}
          icon={ICONS.copyIcon('main')}
          onPress={onCopyUIN}
        />
      </View>
    </AppModal>
  );
});

UINSaveConfirmationModal.displayName = 'UINSaveConfirmationModal';
