import { goBack, goToScreen, Screens } from '@navigation';
import { useRef, useState } from 'react';

import {
  OrganizationType,
  OtpVerificationFormRef,
  PickedImage,
} from '@modules/common';

import {
  BranchesSetupStepData,
  BranchesSetupStepRef,
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
  useBucketUpload,
  useCheckUsernameExist,
  useCreateOrganizationAndCreator,
  useSendOtp,
  useUpdateOrganization,
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
  const branchesSetupFormRef = useRef<BranchesSetupStepRef>(null);
  const { mutateAsync: uploadToBucketMutationAsync } = useBucketUpload();
  const { mutateAsync: updateOrganizationMutateAsync } =
    useUpdateOrganization();

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
    const me = await prefetchUseGetMe();

    const logo = data.image;

    if (logo) {
      const fileResp = await uploadToBucketMutationAsync({
        bucket: 'organizations_avatars',
        file: { uri: logo.uri, type: logo.type, name: logo.name },
        folderName: me.organizationMember?.organization_id,
      });
      await updateOrganizationMutateAsync({
        organization_id: me.organizationMember?.organization_id!,
        avatar_path: fileResp.uploadedFile.path,
      });
    }

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
    useSendOtp({
      onError: showMutationErrorToast,
    });

  const [step, setStep] = useState(0);

  const [data, setData] = useState<{
    organizationNameFormData?: OrganizationNameFormData;
    branchesSetupFormData?: BranchesSetupStepData;
    headGlobalLocationFormData?: HeadGlobalLocationFormData;
    primaryLocationFormData?: Partial<PrimaryLocationFormData>;
    organizationCreatorInformationFormData?: OrganizationCreatorInformationFormData;
    verificationToken?: string;
    image?: PickedImage;
  }>({});

  const isGlobal =
    data.organizationNameFormData?.organizationType === OrganizationType.GLOBAL;

  const totalSteps = isGlobal ? 6 : 5;

  const goToNextStepInSingle = () => {
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();
    step === 1 &&
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

  const goToNextStepInGlobal = () => {
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();
    step === 1 &&
      branchesSetupFormRef.current?.handleSubmit(
        handleBranchesSetupFormSubmit,
      )();
    step === 2 &&
      headGlobalLocationFormRef.current?.handleSubmit(
        handleHeadGlobalLocationFormSubmit,
      )();
    step === 3 &&
      organizationCreatorInformationFormRef.current?.handleSubmit(
        handleOrganizationCreatorInformationFormSubmit,
      )();
    step === 4 && onOtpVerificationFormSubmit();
    step === 5 &&
      createPasswordFormRef.current?.handleSubmit(onCreatePasswordFormSubmit)();
  };

  const goToNextStep = isGlobal ? goToNextStepInGlobal : goToNextStepInSingle;

  const onCreatePasswordFormSubmit = async (
    formData: CreatePasswordFormData,
  ) => {
    if (
      !data.verificationToken ||
      !data.organizationCreatorInformationFormData ||
      (!data.primaryLocationFormData && !data.headGlobalLocationFormData)
    ) {
      return;
    }

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
    setStep(step + 1);
  };

  const handleHeadGlobalLocationFormSubmit = async (
    values: HeadGlobalLocationFormData,
  ) => {
    setData({ ...data, headGlobalLocationFormData: values });
    setStep(step + 1);
  };

  const handleBranchesSetupFormSubmit = async (
    values: BranchesSetupStepData,
  ) => {
    setData({ ...data, branchesSetupFormData: values });
    setStep(step + 1);
  };

  const handlePrimaryLocationFormSubmit = async (
    values: PrimaryLocationFormData,
  ) => {
    setData({ ...data, primaryLocationFormData: values });
    setStep(step + 1);
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
    setStep(step + 1);
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
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step === 0) {
      goBack();
      return;
    }
    if (step === 4 && !isGlobal) {
      setStep(2);
      return;
    }
    if (step === 5 && isGlobal) {
      setStep(3);
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
    branchesSetupFormRef,
    setData,
    onResendOtpCode,
    goToNextStep,
    goToPreviousStep,
    onOtpVerificationFormSubmit,
  };
};
