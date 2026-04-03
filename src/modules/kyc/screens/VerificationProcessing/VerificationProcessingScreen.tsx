import { View, ActivityIndicator } from 'react-native';
import { AppText, AppButton } from '@ui';
import { COLORS } from '@styles';
import { useVerificationProcessing } from './useVerificationProcessing';
import { styles } from './styles';

export const VerificationProcessingScreen = () => {
  const {
    currentChecksPassed,
    totalChecks,
    handleRetry,
    isFailed,
    isUnderage,
    isDobNotFound,
    isExpiredDocument,
  } = useVerificationProcessing();

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer} />

      {isExpiredDocument ? (
        <>
          <AppText typography="bold_20" color="black" style={styles.title}>
            Expired Document
          </AppText>
          <AppText
            typography="medium_16"
            color="gray_primary"
            style={styles.description}
          >
            Looks like you have provided an expired document, these things
            happen. Please try again with a valid ID.
          </AppText>
          <AppButton
            title="Try Again"
            onPress={handleRetry}
            wrapperStyles={styles.retryButton}
          />
        </>
      ) : isUnderage ? (
        <>
          <AppText typography="bold_20" color="black" style={styles.title}>
            Age Requirement Not Met
          </AppText>
          <AppText
            typography="medium_16"
            color="gray_primary"
            style={styles.description}
          >
            You must be at least 18 years old to use CrowdsNow. Based on your
            document, you do not meet this requirement.
          </AppText>
        </>
      ) : isDobNotFound ? (
        <>
          <AppText typography="bold_20" color="black" style={styles.title}>
            Date of Birth Not Found
          </AppText>
          <AppText
            typography="medium_16"
            color="gray_primary"
            style={styles.description}
          >
            We couldn't extract your date of birth from the document. Please try
            again with a clearer photo of your ID.
          </AppText>
          <AppButton
            title="Try Again"
            onPress={handleRetry}
            wrapperStyles={styles.retryButton}
          />
        </>
      ) : isFailed ? (
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
