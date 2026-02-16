import { useEffect, useRef, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  TeamMemberInfoFormData,
  TeamMemberInfoFormRef,
} from '../../forms/TeamMemberInfoForm';
import {
  CreatePasswordFormData,
  CreatePasswordFormRef,
} from '@modules/onboarding';
import {
  CreateTeamMemberResDto,
  useCreateTeamMember,
  useSendOtp,
  useVerifyOtp,
  useCheckUsernameExist,
  prefetchUseGetMe,
} from '@actions';
import { UINSaveConfirmationModalRef } from '../../../modals';
import { OtpVerificationFormRef } from '@modules/common';
import { supabase } from '@services';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { goBack, goToScreen, Screens, RootStackParamList } from '@navigation';

type OnboardingUnAuthTeamMemberRouteProp = RouteProp<
  RootStackParamList,
  Screens.OnboardingUnAuthTeamMember
>;

export const useOnboardingUnAuthTeamMember = () => {
  const route = useRoute<OnboardingUnAuthTeamMemberRouteProp>();
  const { token, invitation } = route.params;

  const otpVerificationFormRef = useRef<OtpVerificationFormRef>(null);
  const teamMemberInfoFormRef = useRef<TeamMemberInfoFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);

  const [step, setStep] = useState(0);
  const [data, setData] = useState<{
    verificationToken?: string;
    teamMemberInfoFormData?: TeamMemberInfoFormData;
    createPasswordFormData?: CreatePasswordFormData;
  }>({});

  const onChangeData = <K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K],
  ) => setData(prev => ({ ...prev, [key]: value }));

  /* ---------------------------------------------------------------- */
  /* Mutations                                                        */
  /* ---------------------------------------------------------------- */
  const { mutate: sendOtpMutate } = useSendOtp({
    onError: showMutationErrorToast,
  });

  const { mutateAsync: verifyOtpMutateAsync, isPending: isVerifyingOtp } =
    useVerifyOtp();

  const {
    mutateAsync: checkUsernameExistMutateAsync,
    isPending: isCheckingUsernameExist,
  } = useCheckUsernameExist();

  const onCreateTeamMemberSuccess = async (res: CreateTeamMemberResDto) => {
    await supabase.auth.setSession({
      access_token: res.session.access_token,
      refresh_token: res.session.refresh_token,
    });
    await prefetchUseGetMe();
    uinSaveConfirmationModalRef.current?.open({
      uin: res.uin,
      onConfirm: () => goToScreen(Screens.BottomTabs),
    });
  };

  const { mutate: createTeamMemberMutate, isPending: isCreatingTeamMember } =
    useCreateTeamMember({
      onSuccess: onCreateTeamMemberSuccess,
      onError: showMutationErrorToast,
    });

  /* ---------------------------------------------------------------- */
  /* Auto-send OTP on mount                                           */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    sendOtpMutate({ email: invitation.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------------------------- */
  /* Step handlers                                                    */
  /* ---------------------------------------------------------------- */
  const handleOtpSubmit = async (code: string) => {
    try {
      const result = await verifyOtpMutateAsync({
        email: invitation.email,
        otp_code: code,
      });
      onChangeData('verificationToken', result.verification_token);
      setStep(1);
    } catch {
      showErrorToast('Invalid verification code. Please try again.');
    }
  };

  const handleAcceptInvitation = () => {
    setStep(2);
  };

  const handleDeclineInvitation = () => {
    goBack();
  };

  const handleTeamMemberInfoSubmit = async (
    formData: TeamMemberInfoFormData,
  ) => {
    const isUserExists = await checkUsernameExistMutateAsync({
      username: formData.username.toLowerCase(),
    });

    if (isUserExists.isExists) {
      showErrorToast('Username already exists.');
      return;
    }

    onChangeData('teamMemberInfoFormData', formData);
    setStep(3);
  };

  const handleCreatePasswordSubmit = async (
    formData: CreatePasswordFormData,
  ) => {
    if (!data.teamMemberInfoFormData || !data.verificationToken) return;

    createTeamMemberMutate({
      token,
      verificationToken: data.verificationToken,
      username: data.teamMemberInfoFormData.username.toLowerCase(),
      firstName: data.teamMemberInfoFormData.firstName,
      lastName: data.teamMemberInfoFormData.lastName,
      gender: data.teamMemberInfoFormData.gender,
      position: data.teamMemberInfoFormData.position,
      password: formData.password,
    });
  };

  const handleResendOtp = () => {
    sendOtpMutate({ email: invitation.email });
  };

  /* ---------------------------------------------------------------- */
  /* Navigation                                                       */
  /* ---------------------------------------------------------------- */
  const goToNextStep = () => {
    if (step === 0) {
      const code = otpVerificationFormRef.current?.getCode();
      if (code) {
        handleOtpSubmit(code);
      }
    }

    if (step === 1) {
      handleAcceptInvitation();
    }

    if (step === 2) {
      teamMemberInfoFormRef.current?.handleSubmit(handleTeamMemberInfoSubmit)();
    }

    if (step === 3) {
      createPasswordFormRef.current?.handleSubmit(handleCreatePasswordSubmit)();
    }
  };

  const goToPreviousStep = () => {
    if (step === 0) {
      goBack();
    } else {
      setStep(step - 1);
    }
  };

  const showFullScreenLoader =
    isVerifyingOtp || isCheckingUsernameExist || isCreatingTeamMember;

  return {
    otpVerificationFormRef,
    teamMemberInfoFormRef,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    step,
    data,
    invitation,
    showFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    handleAcceptInvitation,
    handleDeclineInvitation,
    handleResendOtp,
    handleOtpSubmit,
  };
};
