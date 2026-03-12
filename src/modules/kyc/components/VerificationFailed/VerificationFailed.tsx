import { View } from 'react-native';
import { AppText, AppButton } from '@ui';

import { styles } from './styles';

interface VerificationFailedProps {
  onRetry: () => void;
  isLoading: boolean;
}

export const VerificationFailed = ({
  onRetry,
  isLoading,
}: VerificationFailedProps) => {
  return (
    <View style={styles.container}>
      <AppText typography="bold_20" color="black">
        Verification Failed
      </AppText>
      <AppText
        typography="medium_16"
        color="gray_primary"
        style={styles.description}
      >
        Your identity verification was not successful. Please try again.
      </AppText>
      <AppButton title="Try Again" onPress={onRetry} isLoading={isLoading} />
    </View>
  );
};
