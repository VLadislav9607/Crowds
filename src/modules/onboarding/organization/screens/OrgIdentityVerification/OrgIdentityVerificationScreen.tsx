import { View } from 'react-native';
import { AppButton } from '@ui';

import { LogoutModal } from '../../../../profile/modals';
import { IdentityVerification } from '@modules/kyc';

import { OnboardingScreenLayout } from '../../../layouts';
import { styles } from './styles';
import { useOrgIdentityVerificationScreen } from './useOrgIdentityVerificationScreen';

export const OrgIdentityVerificationScreen = () => {
  const {
    logoutModalRef,
    profileIdentityVerificationRef,
    isPending,
    goToVerification,
    goToPreviousStep,
  } = useOrgIdentityVerificationScreen();

  return (
    <OnboardingScreenLayout
      title="Identity Verification"
      currentStep={0}
      onBackPress={goToPreviousStep}
      onForwardPress={goToVerification}
      showLoader={isPending}
      footerProps={{
        containerStyle: { paddingHorizontal: 35, paddingTop: 20 },
        ForwardButton: (
          <AppButton
            title="Start Verification"
            onPress={goToVerification}
            wrapperStyles={{ flex: 1 }}
          />
        ),
      }}
    >
      <View style={styles.container}>
        <IdentityVerification ref={profileIdentityVerificationRef} />
      </View>

      <LogoutModal ref={logoutModalRef} />
    </OnboardingScreenLayout>
  );
};
