import { goBack, goToScreen, Screens } from '@navigation';
import { useRef, useState } from 'react';

import { OrganizationType, OtpVerificationFormRef } from '@modules/common';

import {
  BranchesSetupStepRef,
  HeadGlobalLocationFormRef,
  HeadquartersSetupStepRef,
  OrganizationCreatorInformationFormData,
  OrganizationCreatorInformationFormRef,
  OrganizationNameFormData,
  OrganizationNameFormRef,
  PrimaryLocationFormRef,
} from '../../forms';

import {
  useCheckUsernameExist,
  useSendOtp,
  useVerifyOtp,
  CreateGlobalOrgResDto,
  CreateLocalOrgResDto,
  prefetchUseGetMe,
} from '@actions';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { CreatePasswordFormRef } from '../../../forms';
import { supabase } from '@services';
import { UINSaveConfirmationModalRef } from '../../../modals';
import { NetworkSetupStepRef } from '../../forms/NetworkSetupStep';

import { useGlobalOrgRegister } from './hooks/useGlobalOrgRegister';
import { useSingleOrgRegister } from './hooks/useSingleOrgRegister';
import type { OnboardingOrganizationData } from './hooks/types';

export const useOnboardingUnAuthOrganization = () => {
  const organizationNameFormRef = useRef<OrganizationNameFormRef>(null);
  const headGlobalLocationFormRef = useRef<HeadGlobalLocationFormRef>(null);
  const primaryLocationFormRef = useRef<PrimaryLocationFormRef>(null);
  const otpVerificationFormRef = useRef<OtpVerificationFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);

  const headquartersSetupFormRef = useRef<HeadquartersSetupStepRef>(null);
  const networkSetupFormRef = useRef<NetworkSetupStepRef>(null);

  const branchesSetupFormRef = useRef<BranchesSetupStepRef>(null);

  const organizationCreatorInformationFormRef =
    useRef<OrganizationCreatorInformationFormRef>(null);

  const {
    mutateAsync: checkUsernameExistMutateAsync,
    isPending: isCheckingUsernameExist,
  } = useCheckUsernameExist();

  const onCreatingAccountSuccess = async (
    responseData: CreateGlobalOrgResDto | CreateLocalOrgResDto,
  ) => {
    await supabase.auth.setSession({
      access_token: responseData.session.access_token,
      refresh_token: responseData.session.refresh_token,
    });
    await prefetchUseGetMe();

    uinSaveConfirmationModalRef.current?.open({
      uin: responseData.uin,
      onConfirm: () => goToScreen(Screens.OrgIdentityVerification),
    });
  };

  const { mutateAsync: verifyOtpMutateAsync, isPending: isVerifyingOtp } =
    useVerifyOtp({
      onError: e => showErrorToast(e?.message),
    });
  const { mutateAsync: sendOtpMutateAsync, isPending: isSendingOtp } =
    useSendOtp({
      onError: showMutationErrorToast,
    });

  const [step, setStep] = useState(0);

  const [data, setData] = useState<OnboardingOrganizationData>({});

  const isGlobal =
    data.organizationNameFormData?.organizationType === OrganizationType.GLOBAL;

  const handleOrganizationNameFormSubmit = async (
    values: OrganizationNameFormData,
  ) => {
    setData(prev => ({ ...prev, organizationNameFormData: values }));
    setStep(prev => prev + 1);
  };

  const handleOrganizationCreatorInformationFormSubmit = async (
    values: OrganizationCreatorInformationFormData,
  ) => {
    if (!values.isAuthorizedOnBehalfOfCompany) {
      showErrorToast(
        'You must be authorized on behalf of the company to make decisions',
      );
      return;
    }
    const isUserExists = await checkUsernameExistMutateAsync({
      username: values.username.toLowerCase(),
    });
    if (isUserExists.isExists) {
      showErrorToast('Username already exists.');
      return;
    }
    await sendOtpMutateAsync({ email: values.email });
    setData(prev => ({
      ...prev,
      organizationCreatorInformationFormData: values,
    }));
    setStep(prev => prev + 1);
  };

  const onOtpVerificationFormSubmit = async () => {
    const otp_code = otpVerificationFormRef.current?.getCode();
    if (otp_code && otp_code.length < 6) {
      showErrorToast('Please enter the verification code');
      return;
    }
    const response = await verifyOtpMutateAsync({
      email: data.organizationCreatorInformationFormData?.email!,
      otp_code: otp_code || '',
    });
    setData(prev => ({
      ...prev,
      verificationToken: response.verification_token,
    }));
    if (response.success) {
      setStep(prev => prev + 1);
    }
  };

  const commonParams = {
    step,
    setStep,
    data,
    setData,
    organizationNameFormRef,
    organizationCreatorInformationFormRef,
    createPasswordFormRef,
    handleOrganizationNameFormSubmit,
    handleOrganizationCreatorInformationFormSubmit,
    onOtpVerificationFormSubmit,
    onCreatingAccountSuccess,
  };

  const { goToNextStepInGlobal, isGlobalOrgCreating } = useGlobalOrgRegister({
    ...commonParams,
    headGlobalLocationFormRef,
    headquartersSetupFormRef,
    networkSetupFormRef,
  });

  const { goToNextStepInSingle, isLocalOrgCreating } = useSingleOrgRegister({
    ...commonParams,
    primaryLocationFormRef,
  });

  const goToNextStep = isGlobal ? goToNextStepInGlobal : goToNextStepInSingle;

  const goToPreviousStep = () => {
    if (step === 0) {
      goBack();
      return;
    }

    if (step === 4 && !isGlobal) {
      setStep(2);
      return;
    }
    if (step === 6 && isGlobal) {
      setStep(4);
      return;
    }
    setStep(prev => prev - 1);
  };

  const onResendOtpCode = () =>
    data.organizationCreatorInformationFormData?.email &&
    sendOtpMutateAsync({
      email: data.organizationCreatorInformationFormData?.email,
    });

  const showFullScreenLoader =
    isCheckingUsernameExist ||
    isVerifyingOtp ||
    isGlobalOrgCreating ||
    isLocalOrgCreating ||
    isSendingOtp;

  return {
    step,
    data,
    organizationNameFormRef,
    headGlobalLocationFormRef,
    primaryLocationFormRef,
    isGlobal,
    networkSetupFormRef,
    organizationCreatorInformationFormRef,
    isCheckingUsernameExist,
    showFullScreenLoader,
    otpVerificationFormRef,
    uinSaveConfirmationModalRef,
    createPasswordFormRef,
    branchesSetupFormRef,
    headquartersSetupFormRef,
    setData,
    onResendOtpCode,
    goToNextStep,
    goToPreviousStep,
    onOtpVerificationFormSubmit,
  };
};
