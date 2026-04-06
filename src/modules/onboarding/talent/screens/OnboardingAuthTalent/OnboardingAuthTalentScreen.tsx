import { OnboardingScreenLayout } from '../../../layouts';
import { COLORS } from '@styles';
import { View, StyleSheet } from 'react-native';
import { styles } from './styles';
import { If } from '@components';
import { useOnboardingAuthTalentScreen } from './useOnboardingAuthTalentScreen';
import {
  TalentLocationSetupForm,
  TalentProfileSetupForm,
  TalentStripeSetup,
} from '@modules/profile';
import {
  TalentAvailabilityForm,
  AvailabilityInfoStep,
  TalentAvailabilityFormState,
} from '@modules/talent-availability';
import { IdentityVerification } from '@modules/kyc';
import { AnimatedProfileSetupHeader } from '../../../../profile/components';
import { AppButton, IAppHeaderProps } from '@ui';
import { AnimatedProfileSetupHeaderRef } from '../../../../profile/components';
import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { LogoutModal } from '../../../../profile/modals';

export const OnboardingAuthTalentScreen = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollHandler, setScrollHandler] =
    useState<AnimatedProfileSetupHeaderRef['scrollHandler']>();

  const {
    logoutModalRef,
    talentLocationSetupFormRef,
    talentStripeSetupRef,
    talentAvailabilityFormRef,
    step,
    showFullScreenLoader,
    profileIdentityVerificationRef,
    talentProfileSetupFormRef,
    onLocationSetupSuccess,
    setShowFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    onStripeSetupSuccess,
    onStripeSetupSkip,
    onAvailabilitySetupSuccess,
    onProfileSetupSuccess,
    isKycPendingState,
    setIsKycPendingState,
  } = useOnboardingAuthTalentScreen();

  const titles: Record<number, string> = {
    0: 'Your city and country',
    1: 'Identity Verification',
    2: '',
    3: 'Please set up your current\navailability',
    4: '',
    5: 'Set Up Secure Banking\nwith Stripe',
  };

  const renderForwardButton = () => {
    if (step === 1) {
      return (
        <AppButton
          title="Start Verification"
          onPress={goToNextStep}
          isLoading={isKycPendingState}
          wrapperStyles={styles.flexOne}
        />
      );
    }

    if (step === 5) {
      return (
        <View style={stripeStepStyles.buttonsRow}>
          <AppButton
            title="Skip"
            variant="withBorder"
            onPress={onStripeSetupSkip}
            wrapperStyles={stripeStepStyles.buttonFlex}
          />
          <AppButton
            title="Proceed"
            onPress={() => talentStripeSetupRef.current?.onSetup()}
            wrapperStyles={stripeStepStyles.buttonFlex}
          />
        </View>
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
        showCamera
        ref={ref => setScrollHandler(ref?.scrollHandler)}
      />
    ),
  };

  const isProfileSetupStep = step === 2;
  const isAvailabilitySetupStep = step === 4;

  return (
    <OnboardingScreenLayout
      title={titles[step as number] ?? ''}
      stepsCount={Object.keys(titles).length}
      currentStep={step ?? 0}
      useAnimatedScrollView={isProfileSetupStep}
      animatedScrollHandler={scrollHandler}
      scrollViewRef={scrollViewRef}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      showLoader={showFullScreenLoader}
      isFloatFooter={!isProfileSetupStep}
      footerProps={{
        containerStyle: { paddingHorizontal: 35, paddingTop: 20 },
        ForwardButton: renderForwardButton(),
        hideBack: step === 6 || step === 5,
        hideDots: step === 5,
      }}
      headerProps={
        isProfileSetupStep ? setupProfileHeaderProps : defaultHeaderProps
      }
    >
      <View
        style={[
          styles.container,
          isProfileSetupStep && styles.profileSetupPaddingTop,
          isAvailabilitySetupStep && styles.availabilityPaddingTop,
        ]}
      >
        <If condition={step === 0}>
          <TalentLocationSetupForm
            onFormStateChange={val =>
              setShowFullScreenLoader(val.isUpsertingLocation)
            }
            ref={talentLocationSetupFormRef}
            onSuccess={onLocationSetupSuccess}
            showTaxField
          />
        </If>

        <If condition={step === 1}>
          <IdentityVerification
            ref={profileIdentityVerificationRef}
            origin="talent_onboarding"
            onPendingChange={setIsKycPendingState}
          />
        </If>

        <If condition={step === 2}>
          <TalentProfileSetupForm
            onFormStateChange={val => setShowFullScreenLoader(val.isUpdating)}
            ref={talentProfileSetupFormRef}
            onSuccess={onProfileSetupSuccess}
            scrollViewRef={scrollViewRef}
          />
        </If>

        <If condition={step === 3}>
          <AvailabilityInfoStep />
        </If>

        <If condition={step === 4}>
          <TalentAvailabilityForm
            ref={talentAvailabilityFormRef}
            onFormStateChange={(val: TalentAvailabilityFormState) =>
              setShowFullScreenLoader(val.isSubmitting)
            }
            onSuccess={onAvailabilitySetupSuccess}
          />
        </If>

        <If condition={step === 5}>
          <TalentStripeSetup
            ref={talentStripeSetupRef}
            onSuccess={onStripeSetupSuccess}
          />
        </If>
      </View>

      <LogoutModal ref={logoutModalRef} />
    </OnboardingScreenLayout>
  );
};

const stripeStepStyles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  buttonFlex: {
    flex: 1,
  },
});
