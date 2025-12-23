import { useRef, useState } from "react";
import { useUpdateOrganizationMember } from "@actions";
import { useGetMe } from "@actions";
import { LogoutModalRef } from "../../../../profile/modals";
import { ProfileIdentityVerificationRef } from "../../../../profile/components";
import { goToScreen, Screens } from "@navigation";

export const useOnboardingAuthOrganization = () => {
  const { data: me } = useGetMe();
  const { mutate: updateOrganizationMemberMutate } =
    useUpdateOrganizationMember();

  const logoutModalRef = useRef<LogoutModalRef>(null);
  const profileIdentityVerificationRef = useRef<ProfileIdentityVerificationRef>(
    null,
  );
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);

  const lastCompletedStep = me?.organizationMember?.onboarding_copleted_step || 0;

  const [step, setStep] = useState(lastCompletedStep);

  const goToNextStep = () => {
    step === 0 && profileIdentityVerificationRef.current?.onVerify();
  };

  const onIdentityVerificationSuccess = () => {
    setShowFullScreenLoader(false);
    lastCompletedStep < 1 &&
      updateOrganizationMemberMutate({
        id: me?.organizationMember?.id!,
        data: { onboarding_copleted_step: 1 },
      }, {
        onError: e => console.log(e.message)
      });

    goToScreen(Screens.BottomTabs);
  };

  const goToPreviousStep = async () =>
    !step ? logoutModalRef.current?.open({}) : setStep(step - 1);

  return {
    logoutModalRef,
    step,
    showFullScreenLoader,
    profileIdentityVerificationRef,
    goToNextStep,
    goToPreviousStep,
    onIdentityVerificationSuccess,
  };
};
