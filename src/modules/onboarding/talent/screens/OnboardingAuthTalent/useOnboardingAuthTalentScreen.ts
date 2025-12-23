import { useRef, useState } from "react";
import { TalentLocationSetupFormRef, TalentProfileSetupFormRef, TalentStripeSetupRef } from "@modules/profile";
import { useUpdateTalent } from "@actions";
import { useGetMe } from "@actions";
import { LogoutModalRef } from "../../../../profile/modals";
import { ProfileIdentityVerificationRef } from "../../../../profile/components";
import { Alert } from "react-native";
import { goToScreen, Screens } from "@navigation";

export const useOnboardingAuthTalentScreen = () => {
  const { data: me } = useGetMe();
  const { mutate: updateTalentMutate } = useUpdateTalent();

  const logoutModalRef = useRef<LogoutModalRef>(null);
  const talentLocationSetupFormRef = useRef<TalentLocationSetupFormRef>(null);
  const profileIdentityVerificationRef = useRef<ProfileIdentityVerificationRef>(null);
  const talentStripeSetupRef = useRef<TalentStripeSetupRef>(null);
  const talentProfileSetupFormRef = useRef<TalentProfileSetupFormRef>(null);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);

  const lastCompletedStep = me?.talent?.onboarding_copleted_step || 0;

  const [step, setStep] = useState(lastCompletedStep);

  const goToNextStep = () => {
    step === 0 && talentLocationSetupFormRef.current?.handleSubmit();
    step === 1 && profileIdentityVerificationRef.current?.onVerify();
    step === 2 && talentStripeSetupRef.current?.onSetup();
    step === 3 && talentProfileSetupFormRef.current?.onSubmit();
  };

  const onLocationSetupSuccess = () => {
    setStep(step + 1);
    setShowFullScreenLoader(false);
    lastCompletedStep < 1 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 1 },
      });
  };

  const onIdentityVerificationSuccess = () => {
    setStep(step + 1);
    setShowFullScreenLoader(false);
    lastCompletedStep < 2 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 2 },
      });
  };

  const onStripeSetupSuccess = () => {
    setStep(step + 1);
    setShowFullScreenLoader(false);
    lastCompletedStep < 3 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 3 },
      });
  };

  const onProfileSetupSuccess = () => {
    setShowFullScreenLoader(false);
    lastCompletedStep < 4 &&
      updateTalentMutate({
        id: me?.talent?.id!,
        data: { onboarding_copleted_step: 4 },
      });
      goToScreen(Screens.BottomTabs);
  };

  const goToPreviousStep = async () =>
    !step ? logoutModalRef.current?.open({}) : setStep(step - 1);

  return {
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
    onIdentityVerificationSuccess,
    onStripeSetupSuccess,
    onProfileSetupSuccess
  };
};

