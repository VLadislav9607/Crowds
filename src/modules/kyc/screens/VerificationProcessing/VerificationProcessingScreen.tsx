import { View, ActivityIndicator } from 'react-native';
import { AppText, AppButton } from '@ui';
import { COLORS } from '@styles';
import { useVerificationProcessing } from './useVerificationProcessing';
import { styles } from './styles';

export const VerificationProcessingScreen = () => {
  const { currentChecksPassed, totalChecks, handleRetry, isFailed } =
    useVerificationProcessing();

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer} />

      {isFailed ? (
        <>
          <AppText typography="bold_20" color="black" style={styles.title}>
            Verification Failed
          </AppText>
          <AppText
            typography="medium_16"
            color="gray_primary"
            style={styles.description}
          >
            Your identity verification was not successful. Please try again.
          </AppText>
          <AppButton
            title="Try Again"
            onPress={handleRetry}
            wrapperStyles={styles.retryButton}
          />
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color={COLORS.main} />
          <AppText typography="bold_20" color="black" style={styles.title}>
            Verifying Your Identity
          </AppText>
          <AppText
            typography="regular_14"
            color="gray_primary"
            style={styles.progressText}
          >
            {currentChecksPassed} of {totalChecks} checks complete
          </AppText>
        </>
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};
