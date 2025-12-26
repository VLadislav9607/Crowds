import { goBack, goToScreen, Screens } from '@navigation';
import { useRef, useState } from 'react';

import { OrganizationType, OtpVerificationFormRef } from '@modules/common';

import {
  HeadGlobalLocationFormData,
  HeadGlobalLocationFormRef,
  OrganizationCreatorInformationFormData,
  OrganizationCreatorInformationFormRef,
  OrganizationNameFormData,
  OrganizationNameFormRef,
  PrimaryLocationFormData,
  PrimaryLocationFormRef,
} from '../../forms';
import {
  CreateOrganizationResDto,
  prefetchUseGetMe,
  useCheckUsernameExist,
  useCreateOrganizationAndCreator,
  useSendOtp,
  useVerifyOtp,
} from '@actions';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { CreatePasswordFormData, CreatePasswordFormRef } from '../../../forms';
import { supabase } from '@services';
import { UINSaveConfirmationModalRef } from '../../../modals';

export const useOnboardingUnAuthOrganization = () => {
  const organizationNameFormRef = useRef<OrganizationNameFormRef>(null);
  const headGlobalLocationFormRef = useRef<HeadGlobalLocationFormRef>(null);
  const primaryLocationFormRef = useRef<PrimaryLocationFormRef>(null);
  const otpVerificationFormRef = useRef<OtpVerificationFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);

  const organizationCreatorInformationFormRef =
    useRef<OrganizationCreatorInformationFormRef>(null);

  const {
    mutateAsync: checkUsernameExistMutateAsync,
    isPending: isCheckingUsernameExist,
  } = useCheckUsernameExist();

  const onCreatingAccountSuccess = async (
    responseData: CreateOrganizationResDto,
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

  const {
    mutateAsync: createOrganizationAndCreatorMutateAsync,
    isPending: isCreatingOrganizationAndCreator,
  } = useCreateOrganizationAndCreator({
    onSuccess: onCreatingAccountSuccess,
    onError: showMutationErrorToast,
  });

  const { mutateAsync: verifyOtpMutateAsync, isPending: isVerifyingOtp } =
    useVerifyOtp({
      onError: e => showErrorToast(e?.message),
    });
  const { mutateAsync: sendOtpMutateAsync, isPending: isSendingOtp } =
    useSendOtp();

  const [step, setStep] = useState(0);

  const [data, setData] = useState<{
    organizationNameFormData?: OrganizationNameFormData;
    headGlobalLocationFormData?: HeadGlobalLocationFormData;
    primaryLocationFormData?: Partial<PrimaryLocationFormData>;
    organizationCreatorInformationFormData?: OrganizationCreatorInformationFormData;
    verificationToken?: string;
  }>({});

  const isGlobal =
    data.organizationNameFormData?.organizationType === OrganizationType.GLOBAL;

  const totalSteps = 5;

  const goToNextStep = () => {
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();
    step === 1 &&
      isGlobal &&
      headGlobalLocationFormRef.current?.handleSubmit(
        handleHeadGlobalLocationFormSubmit,
      )();
    step === 1 &&
      !isGlobal &&
      primaryLocationFormRef.current?.handleSubmit(
        handlePrimaryLocationFormSubmit,
        error =>
          (error?.parsed_location?.street_number ||
            error?.parsed_head_office_location?.street_number) &&
          showErrorToast('Location must contain a full address'),
      )();
    step === 2 &&
      organizationCreatorInformationFormRef.current?.handleSubmit(
        handleOrganizationCreatorInformationFormSubmit,
      )();
    step === 3 && onOtpVerificationFormSubmit();
    step === 4 &&
      createPasswordFormRef.current?.handleSubmit(onCreatePasswordFormSubmit)();
  };

  const onCreatePasswordFormSubmit = async (
    formData: CreatePasswordFormData,
  ) => {
    if (
      !data.verificationToken ||
      !data.organizationCreatorInformationFormData ||
      (!data.primaryLocationFormData && !data.headGlobalLocationFormData)
    )
      return;

    createOrganizationAndCreatorMutateAsync({
      organization_name: data.organizationNameFormData?.organizationName || '',
      password: formData.password,
      verification_token: data.verificationToken,
      owner: {
        first_name: data.organizationCreatorInformationFormData?.firstName,
        last_name: data.organizationCreatorInformationFormData?.lastName,
        gender: data.organizationCreatorInformationFormData?.gender,
        position:
          data.organizationCreatorInformationFormData?.positionInCompany,
        username: data.organizationCreatorInformationFormData?.username,
        email: data.organizationCreatorInformationFormData?.email,
      },
    });
  };

  const handleOrganizationNameFormSubmit = async (
    values: OrganizationNameFormData,
  ) => {
    setData({ ...data, organizationNameFormData: values });
    setStep(1);
  };

  const handleHeadGlobalLocationFormSubmit = async (
    values: HeadGlobalLocationFormData,
  ) => {
    setData({ ...data, headGlobalLocationFormData: values });
    setStep(2);
  };

  const handlePrimaryLocationFormSubmit = async (
    values: PrimaryLocationFormData,
  ) => {
    setData({ ...data, primaryLocationFormData: values });
    setStep(2);
  };

  const onResendOtpCode = () =>
    data.organizationCreatorInformationFormData?.email &&
    sendOtpMutateAsync({
      email: data.organizationCreatorInformationFormData?.email,
    });

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
    setData({ ...data, organizationCreatorInformationFormData: values });
    setStep(3);
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
    setData({ ...data, verificationToken: response.verification_token });
    if (response.success) {
      setStep(4);
    }
  };

  const goToPreviousStep = () => {
    if (step === 0) {
      goBack();
      return;
    }
    if (step === 4) {
      setStep(2);
      return;
    }
    setStep(step - 1);
  };

  const showFullScreenLoader =
    isCheckingUsernameExist ||
    isVerifyingOtp ||
    isCreatingOrganizationAndCreator ||
    isSendingOtp;

  return {
    step,
    totalSteps,
    data,
    organizationNameFormRef,
    headGlobalLocationFormRef,
    primaryLocationFormRef,
    isGlobal,
    organizationCreatorInformationFormRef,
    isCheckingUsernameExist,
    showFullScreenLoader,
    otpVerificationFormRef,
    uinSaveConfirmationModalRef,
    createPasswordFormRef,
    setData,
    onResendOtpCode,
    goToNextStep,
    goToPreviousStep,
    onOtpVerificationFormSubmit,
  };
};
