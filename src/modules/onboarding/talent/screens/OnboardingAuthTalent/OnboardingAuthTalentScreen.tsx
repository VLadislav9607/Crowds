import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { styles } from './styles';
import { If } from '@components';
import { useOnboardingAuthTalentScreen } from './useOnboardingAuthTalentScreen';
import {
  TalentLocationSetupForm,
  TalentProfileSetupForm,
  TalentStripeSetup,
} from '@modules/profile';
import { AnimatedProfileSetupHeader } from '../../../../profile/components';
import { IdentityVerification } from '@modules/kyc';
import { AppButton, IAppHeaderProps } from '@ui';
import { AnimatedProfileSetupHeaderRef } from '../../../../profile/components';
import { useState } from 'react';
import { LogoutModal } from '../../../../profile/modals';

export const OnboardingAuthTalentScreen = () => {
  const [scrollHandler, setScrollHandler] =
    useState<AnimatedProfileSetupHeaderRef['scrollHandler']>();

  const {
    logoutModalRef,
    talentLocationSetupFormRef,
    talentStripeSetupRef,
    step,
    showFullScreenLoader,
    profileIdentityVerificationRef,
    talentProfileSetupFormRef,
    onLocationSetupSuccess,
    setShowFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    onStripeSetupSuccess,
    onProfileSetupSuccess,
  } = useOnboardingAuthTalentScreen();

  const titles = {
    0: 'Where do you live?',
    1: 'Identity Verification',
    2: 'Set Up Secure Banking\nwith Stripe',
    3: '',
  };

  const renderForwardButton = () => {
    if (step === 1) {
      return (
        <AppButton
          title="Start Verification"
          onPress={goToNextStep}
          wrapperStyles={{ flex: 1 }}
        />
      );
    }

    if (step === 2) {
      return (
        <AppButton
          title="Proceed to add details"
          onPress={goToNextStep}
          wrapperStyles={{ flex: 1 }}
        />
      );
    }
    return undefined;
  };

  const defaultHeaderProps: IAppHeaderProps = {
    headerStyles: {
      backgroundColor: COLORS.black,
    },
  };

  const setupProfileHeaderProps: IAppHeaderProps = {
    headerStyles: {
      backgroundColor: COLORS.black,
      paddingBottom: 55,
    },
    headerVariant: 'withTitle',
    goBackCallback: goToPreviousStep,
    title: 'Setup my profile',
    customElement: (
      <AnimatedProfileSetupHeader
        ref={ref => setScrollHandler(ref?.scrollHandler)}
      />
    ),
  };

  const isProfileSetupStep = step === 3;

  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
      stepsCount={Object.keys(titles).length}
      currentStep={step}
      useAnimatedScrollView={isProfileSetupStep}
      animatedScrollHandler={scrollHandler}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      showLoader={showFullScreenLoader}
      isFloatFooter={!isProfileSetupStep}
      footerProps={{
        containerStyle: { paddingHorizontal: 35, paddingTop: 20 },
        ForwardButton: renderForwardButton(),
        hideBack: step === 4,
      }}
      headerProps={
        isProfileSetupStep ? setupProfileHeaderProps : defaultHeaderProps
      }
    >
      <View
        style={[styles.container, isProfileSetupStep && { paddingTop: 70 }]}
      >
        <If condition={step === 0}>
          <TalentLocationSetupForm
            onFormStateChange={val =>
              setShowFullScreenLoader(val.isUpsertingLocation)
            }
            ref={talentLocationSetupFormRef}
            onSuccess={onLocationSetupSuccess}
          />
        </If>

        <If condition={step === 1}>
          <IdentityVerification ref={profileIdentityVerificationRef} />
        </If>

        <If condition={step === 2}>
          <TalentStripeSetup
            ref={talentStripeSetupRef}
            onSuccess={onStripeSetupSuccess}
          />
        </If>

        <If condition={step === 3}>
          <TalentProfileSetupForm
            onFormStateChange={val => setShowFullScreenLoader(val.isUpdating)}
            ref={talentProfileSetupFormRef}
            onSuccess={onProfileSetupSuccess}
          />
        </If>
      </View>

      <LogoutModal ref={logoutModalRef} />
    </OnboardingScreenLayout>
  );
};
