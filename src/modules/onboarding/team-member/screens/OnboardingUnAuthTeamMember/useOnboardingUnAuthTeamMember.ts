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
  GetTeamInvitationResDto,
  useCreateTeamMember,
  useDeclineTeamInvitation,
  useGetTeamInvitation,
  useSendOtp,
  useVerifyOtp,
  useCheckUsernameExist,
  prefetchUseGetMe,
} from '@actions';
import { UINSaveConfirmationModalRef } from '../../../modals';
import {
  ActionConfirmationModalRef,
  OtpVerificationFormRef,
} from '@modules/common';
import { supabase } from '@services';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { goBack, goToScreen, Screens, RootStackParamList } from '@navigation';

type OnboardingUnAuthTeamMemberRouteProp = RouteProp<
  RootStackParamList,
  Screens.OnboardingUnAuthTeamMember
>;

export const useOnboardingUnAuthTeamMember = () => {
  const route = useRoute<OnboardingUnAuthTeamMemberRouteProp>();
  const { token } = route.params;

  const otpVerificationFormRef = useRef<OtpVerificationFormRef>(null);
  const teamMemberInfoFormRef = useRef<TeamMemberInfoFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);
  const stopOnboardingModalRef = useRef<ActionConfirmationModalRef>(null);

  const [invitation, setInvitation] = useState<GetTeamInvitationResDto | null>(
    null,
  );
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
  /* Load invitation                                                   */
  /* ---------------------------------------------------------------- */
  const getInvitation = useGetTeamInvitation({
    onSuccess: (res: GetTeamInvitationResDto) => {
      setInvitation(res);
      setStep(1);
    },
  });

  const invitationError = getInvitation.error as { message?: string } | null;
  const isLoadingInvitation = getInvitation.isPending;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        showErrorToast('Please logout first to accept a team invitation.');
        goBack();
        return;
      }
      getInvitation.mutate({ token });
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      onConfirm: () => goToScreen(Screens.OrgIdentityVerification),
    });
  };

  const { mutate: createTeamMemberMutate, isPending: isCreatingTeamMember } =
    useCreateTeamMember({
      onSuccess: onCreateTeamMemberSuccess,
      onError: showMutationErrorToast,
    });

  const { mutateAsync: declineInvitationMutateAsync } =
    useDeclineTeamInvitation({
      onSuccess: () => goBack(),
      onError: showMutationErrorToast,
    });

  /* ---------------------------------------------------------------- */
  /* Auto-send OTP when invitation loaded                              */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (invitation) {
      sendOtpMutate({ email: invitation.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation]);

  /* ---------------------------------------------------------------- */
  /* Step handlers                                                    */
  /* ---------------------------------------------------------------- */
  const handleOtpSubmit = async (code: string) => {
    if (!invitation) return;
    try {
      const result = await verifyOtpMutateAsync({
        email: invitation.email,
        otp_code: code,
      });
      onChangeData('verificationToken', result.verification_token);
      setStep(2);
    } catch {
      showErrorToast('Invalid verification code. Please try again.');
    }
  };

  const handleAcceptInvitation = () => {
    setStep(3);
  };

  const handleDeclineInvitation = async () => {
    await declineInvitationMutateAsync({ token });
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
    setStep(4);
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
    if (invitation) {
      sendOtpMutate({ email: invitation.email });
    }
  };

  /* ---------------------------------------------------------------- */
  /* Navigation                                                       */
  /* ---------------------------------------------------------------- */
  const goToNextStep = () => {
    if (step === 1) {
      const code = otpVerificationFormRef.current?.getCode();
      if (code) {
        handleOtpSubmit(code);
      }
    }

    if (step === 2) {
      handleAcceptInvitation();
    }

    if (step === 3) {
      teamMemberInfoFormRef.current?.handleSubmit(handleTeamMemberInfoSubmit)();
    }

    if (step === 4) {
      createPasswordFormRef.current?.handleSubmit(handleCreatePasswordSubmit)();
    }
  };

  const goToPreviousStep = () => {
    if (step <= 1) {
      goBack();
    } else if (step === 2) {
      // After email verification, don't go back to OTP — ask to stop onboarding
      stopOnboardingModalRef.current?.open({
        title: 'Stop Onboarding',
        subtitle: 'Are you sure you want to stop the onboarding process?',
        confirmButtonText: 'Yes, stop',
        onConfirm: () => goToScreen(Screens.First),
      });
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
    stopOnboardingModalRef,
    step,
    data,
    invitation,
    isAuthenticated,
    isLoadingInvitation,
    invitationError,
    showFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
    handleAcceptInvitation,
    handleDeclineInvitation,
    handleResendOtp,
    handleOtpSubmit,
  };
};
