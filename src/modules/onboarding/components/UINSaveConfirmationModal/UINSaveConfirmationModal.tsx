import { AppModal } from '@components';
import { UINSaveConfirmationModalProps } from './types';
import { styles } from './styles';
import { View } from 'react-native';
import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';

export const UINSaveConfirmationModal = ({
  ...props
}: UINSaveConfirmationModalProps) => {
  return (
    <AppModal title="Have you saved your UIN?" {...props}>
      <View style={styles.container}>
        <View style={styles.UINContainer}>
          <AppText typography="medium_12" color="black">
            Your UIN is:
          </AppText>
          <AppText typography="bold_14" color="main">
            1234567890
          </AppText>
        </View>

        <AppText typography="regular_8" color="black">
          This is your last chance to store your number safely!
        </AppText>

        <AppButton
          title="Yes, Saved & Proceed"
          variant="primary"
          size="60"
          wrapperStyles={styles.yesSavedProceedButton}
        />
        <AppButton
          title="Copy UIN"
          variant="withBorder"
          size="60"
          iconPlace="right"
          iconSize={24}
          titleStyles={styles.copyUINButtonTitle}
          icon={ICONS.copyIcon('main')}
        />
      </View>
    </AppModal>
  );
};
