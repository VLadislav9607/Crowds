import { useRef, useState } from 'react';
import {
  TalentNameFormData,
  TalentNameFormRef,
} from '../../forms/TalentNameForm';
import {
  CreatePasswordFormData,
  CreatePasswordFormRef,
} from '@modules/onboarding';
import { CreateTalentResDto, useCreateTalent } from '@actions';
import { UINSaveConfirmationModalRef } from '../../../modals';
import { supabase } from '@services';
import { format } from 'date-fns';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { useCheckUsernameExist } from '@actions';
import { goBack, goToScreen, Screens } from '@navigation';
import { prefetchUseGetMe } from '@actions';

export const useOnboardingUnAuthTalentScreen = () => {
  const talentNameFormRef = useRef<TalentNameFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);

  const onCreateTalentSuccess = async (data: CreateTalentResDto) => {
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    await prefetchUseGetMe();
    uinSaveConfirmationModalRef.current?.open({
      uin: data.uin,
      onConfirm: () => goToScreen(Screens.OnboardingAuthTalent),
    });
  };

  const { mutate: createTalentMutate, isPending: isCreatingTalent } =
    useCreateTalent({
      onSuccess: onCreateTalentSuccess,
      onError: showMutationErrorToast,
    });

  const {
    mutateAsync: checkUsernameExistMutateAsync,
    isPending: isCheckingUsernameExist,
  } = useCheckUsernameExist();

  const [step, setStep] = useState(0);

  const [data, setData] = useState<{
    talentNameFormData?: TalentNameFormData;
    createPasswordFormData?: CreatePasswordFormData;
  }>({});

  const onChangeData = <K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K],
  ) => setData({ ...data, [key]: value });

  const goToNextStep = () => {
    !step &&
      talentNameFormRef.current?.handleSubmit(handleTalentNameFormSubmit)();

    step === 1 &&
      createPasswordFormRef.current?.handleSubmit(onCreatePasswordFormSubmit)();
  };

  const handleTalentNameFormSubmit = async (formData: TalentNameFormData) => {
    const isUserExists = await checkUsernameExistMutateAsync({
      username: formData.username.toLowerCase(),
    });

    if (isUserExists.isExists) {
      showErrorToast('Username already exists.');
      return;
    }

    onChangeData('talentNameFormData', formData);
    setStep(1);
  };

  const onCreatePasswordFormSubmit = async (
    formData: CreatePasswordFormData,
  ) => {
    if (!data.talentNameFormData) return;

    createTalentMutate({
      first_name: data.talentNameFormData.firstName,
      last_name: data.talentNameFormData.lastName,
      username: data.talentNameFormData.username.toLowerCase(),
      gender: data.talentNameFormData.gender,
      birth_date: format(data.talentNameFormData.dateOfBirth, 'yyyy-MM-dd'),
      password: formData.password,
    });
  };

  const goToPreviousStep = async () => (!step ? goBack() : setStep(step - 1));

  const showFullScreenLoader = isCreatingTalent || isCheckingUsernameExist;

  return {
    talentNameFormRef,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    step,
    data,
    showFullScreenLoader,
    goToNextStep,
    goToPreviousStep,
  };
};
