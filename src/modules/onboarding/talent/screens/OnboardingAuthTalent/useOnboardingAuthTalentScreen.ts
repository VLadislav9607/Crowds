import { useEffect, useRef, useState } from 'react';
import {
  TalentLocationSetupFormRef,
  TalentProfileSetupFormRef,
  TalentStripeSetupRef,
} from '@modules/profile';
import { TalentAvailabilityFormRef } from '@modules/talent-availability';
import { useUpdateTalent } from '@actions';
import { useGetMe } from '@actions';
import { LogoutModalRef } from '../../../../profile/modals';
import { goToScreen, Screens } from '@navigation';
import { IdentityVerificationRef } from '@modules/kyc';
import { useIsUserVerified } from '@modules/kyc';

export const useOnboardingAuthTalentScreen = () => {
  const { data: me } = useGetMe();
  const { mutate: updateTalentMutate } = useUpdateTalent();
  const { isVerified, isLoading: isLoadingKyc } = useIsUserVerified({
    userId: me?.talent?.id,
  });

  const logoutModalRef = useRef<LogoutModalRef>(null);
  const talentLocationSetupFormRef = useRef<TalentLocationSetupFormRef>(null);
  const profileIdentityVerificationRef = useRef<IdentityVerificationRef>(null);
  const talentStripeSetupRef = useRef<TalentStripeSetupRef>(null);
  const talentAvailabilityFormRef = useRef<TalentAvailabilityFormRef>(null);
  const talentProfileSetupFormRef = useRef<TalentProfileSetupFormRef>(null);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);

  const [step, setStep] = useState<number | null>(null);

  const goToNextStep = () => {
    step === 0 && talentLocationSetupFormRef.current?.handleSubmit();
    if (step === 1) {
      setShowFullScreenLoader(true);
      profileIdentityVerificationRef.current?.onVerify();
      setTimeout(() => setShowFullScreenLoader(false), 1000);
    }
    step === 2 && talentStripeSetupRef.current?.onSetup();
    step === 3 && setStep(4); // Availability info -> Availability form
    step === 4 && talentAvailabilityFormRef.current?.onSubmit();
    step === 5 && talentProfileSetupFormRef.current?.onSubmit();
  };

  useEffect(() => {
    if (isLoadingKyc) return;

    const completedStep = me?.talent?.onboarding_copleted_step ?? 0;

    // Not verified yet - go to verification step
    if (!isVerified) {
      return setStep(Math.min(completedStep, 1));
    }

    // Verified - continue from where user left off, minimum step 2 (Stripe)
    setStep(Math.max(completedStep, 2));
  }, [isVerified, me?.talent?.onboarding_copleted_step, isLoadingKyc]);

  const onLocationSetupSuccess = () => {
    if (step === null) return;
    setStep(step + 1);
    setShowFullScreenLoader(false);
    step < 1 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 1 },
      });
  };

  const onStripeSetupSuccess = () => {
    if (step === null) return;
    setStep(step + 1);
    setShowFullScreenLoader(false);
    step < 3 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 3 },
      });
  };

  const onAvailabilitySetupSuccess = () => {
    if (step === null) return;
    setStep(step + 1);
    setShowFullScreenLoader(false);
    step < 5 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 5 },
      });
  };

  const onProfileSetupSuccess = () => {
    if (step === null) return;
    setShowFullScreenLoader(false);
    step < 6 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 6 },
      });
    goToScreen(Screens.BottomTabs);
  };

  const goToPreviousStep = async () => {
    if (!step || (step === 2 && isVerified)) {
      logoutModalRef.current?.open({});
    } else {
      setStep(step - 1);
    }
  };

  const isLoading = step === null;

  return {
    logoutModalRef,
    talentLocationSetupFormRef,
    talentStripeSetupRef,
    talentAvailabilityFormRef,
    step,
    showFullScreenLoader: showFullScreenLoader || isLoading,
    profileIdentityVerificationRef,
    talentProfileSetupFormRef,
    onLocationSetupSuccess,
    setShowFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    onStripeSetupSuccess,
    onAvailabilitySetupSuccess,
    onProfileSetupSuccess,
    isVerified,
  };
};
