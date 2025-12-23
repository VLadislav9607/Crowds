import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { If } from '@components';
import { useOnboardingAuthOrganization } from './useOnboardingAuthOrganization';
import { ProfileIdentityVerification } from '../../../../profile/components';
import { AppButton, IAppHeaderProps } from '@ui';
import { LogoutModal } from '../../../../profile/modals';

export const OnboardingAuthOrganization = () => {


  const {
    logoutModalRef,
    step,
    showFullScreenLoader,
    profileIdentityVerificationRef,
    goToNextStep,
    goToPreviousStep,
    onIdentityVerificationSuccess,
  } = useOnboardingAuthOrganization();

  const titles = {
    0: 'Identity Verification',
  };

  const renderForwardButton = () => {

    if (step === 0) {
      return <AppButton title='Start Verification' onPress={goToNextStep} wrapperStyles={{ flex: 1 }} />
    }

    return undefined
  }


  const defaultHeaderProps: IAppHeaderProps = {
    headerStyles: {
      backgroundColor: COLORS.black,
    },
  }



  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
      stepsCount={Object.keys(titles).length}
      currentStep={step}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      showLoader={showFullScreenLoader}
      footerProps={{
        containerStyle: { paddingHorizontal: 35, paddingTop: 20 },
        ForwardButton: renderForwardButton(),
      }}
      headerProps={ defaultHeaderProps}
    >
      <View style={[styles.container]}>
        <If condition={step === 0}>
          <ProfileIdentityVerification
            ref={profileIdentityVerificationRef}
            onSuccess={onIdentityVerificationSuccess}
          />
        </If>
      </View>

      <LogoutModal ref={logoutModalRef} />
    </OnboardingScreenLayout>
  );
};

