import { useEffect, useRef, useState } from 'react';
import {
  TalentLocationSetupFormRef,
  TalentProfileSetupFormRef,
  TalentStripeSetupRef,
} from '@modules/profile';
import { useUpdateTalent, useGetMe } from '@actions';
import { LogoutModalRef } from '../../../../profile/modals';
import { IdentityVerificationRef } from '@modules/kyc';
import { goToScreen, Screens } from '@navigation';
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
    step === 3 && talentProfileSetupFormRef.current?.onSubmit();
  };

  useEffect(() => {
    if (isLoadingKyc) return;
    if (!me?.talent?.onboarding_copleted_step) return setStep(0);

    if (!isVerified) return setStep(1);

    if (isVerified) return setStep(2);

    setStep(me?.talent?.onboarding_copleted_step);
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

  const onProfileSetupSuccess = () => {
    if (step === null) return;
    setShowFullScreenLoader(false);
    step < 4 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 4 },
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
    step,
    showFullScreenLoader: showFullScreenLoader || isLoading,
    profileIdentityVerificationRef,
    talentProfileSetupFormRef,
    onLocationSetupSuccess,
    setShowFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    onStripeSetupSuccess,
    onProfileSetupSuccess,
    isVerified,
  };
};
