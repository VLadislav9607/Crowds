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
} from '../../../forms';
import {
  prefetchUseGetMe,
  useCheckUsernameExist,
  useCreateOrganizationAndCreator,
  useSendOtp,
  useVerifyOtp,
} from '@actions';
import { showErrorToast } from '@helpers';
import {
  CreatePasswordFormData,
  CreatePasswordFormRef,
} from '../../../../forms';
import { supabase } from '@services';
import { UINSaveConfirmationModalRef } from '../../../../modals';

export const useOnboardingOrgScreen = () => {
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

  const [uin, setUIN] = useState<string>('');
  const {
    mutateAsync: createOrganizationAndCreatorMutateAsync,
    isPending: isCreatingOrganizationAndCreator,
  } = useCreateOrganizationAndCreator();

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
    primaryLocationFormData?: PrimaryLocationFormData;
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
    if (!data.verificationToken || !data.organizationCreatorInformationFormData)
      return;

    createOrganizationAndCreatorMutateAsync(
      {
        organization_name:
          data.organizationNameFormData?.organizationName || '',
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
      },
      {
        onSuccess: async responseData => {
          setUIN(responseData.uin);
          await supabase.auth.setSession({
            access_token: responseData.session.access_token,
            refresh_token: responseData.session.refresh_token,
          });
          await prefetchUseGetMe();
          uinSaveConfirmationModalRef.current?.open({
            uin: responseData.uin,
            onConfirm: () => goToScreen(Screens.OnboardingAuthOrganization),
          });
        },
        onError: (error: Error) => {
          showErrorToast(
            error?.message || 'Failed to create account. Please try again.',
          );
        },
      },
    );

    // createTalentMutate({
    //   first_name: data.talentNameFormData.firstName,
    //   last_name: data.talentNameFormData.lastName,
    //   username: data.talentNameFormData.username.toLowerCase(),
    //   gender: data.talentNameFormData.gender,
    //   birth_date: format(data.talentNameFormData.dateOfBirth, "yyyy-MM-dd"),
    //   password: formData.password,
    // }, {
    //   onSuccess: async (data) => {
    //     setUIN(data.uin);
    //     await supabase.auth.setSession({
    //       access_token: data.session.access_token,
    //       refresh_token: data.session.refresh_token,
    //     });
    //     await prefetchUseGetMe();
    //     uinSaveConfirmationModalRef.current?.open({
    //       uin: data.uin,
    //       onConfirm: () => goToScreen(Screens.OnboardingAuthTalent)
    //     });
    //   },
    //   onError: (error: Error) => {
    //     showErrorToast(
    //       error?.message || "Failed to create account. Please try again.",
    //     );
    //   },
    // });
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
    sendOtpMutateAsync({ email: values.email });
    setData({ ...data, organizationCreatorInformationFormData: values });
    setStep(3);
  };

  const onOtpVerificationFormSubmit = async () => {
    try {
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
    } catch {}
  };

  const goToPreviousStep = () => (!step ? goBack() : setStep(step - 1));

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
    uin,
    onResendOtpCode,
    goToNextStep,
    goToPreviousStep,
    onOtpVerificationFormSubmit,
  };
};
