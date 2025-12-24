import { useRef } from 'react';
import { LogoutModalRef } from '../../../../profile/modals';
import { IdentityVerificationRef, useIdentityVerification } from '@modules/kyc';

export const useOrgIdentityVerificationScreen = () => {
  const { goToVerification, isPending } = useIdentityVerification();
  const logoutModalRef = useRef<LogoutModalRef>(null);
  const profileIdentityVerificationRef = useRef<IdentityVerificationRef>(null);

  const goToPreviousStep = async () => logoutModalRef.current?.open({});

  return {
    logoutModalRef,
    profileIdentityVerificationRef,
    isPending,
    goToVerification,
    goToPreviousStep,
  };
};
