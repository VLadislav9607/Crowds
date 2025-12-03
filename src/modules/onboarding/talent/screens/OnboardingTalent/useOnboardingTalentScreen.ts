import { useRef, useState } from 'react';
import {
  TalentNameFormData,
  TalentNameFormRef,
} from '../../forms/TalentNameForm/types';
import {
  CreatePasswordFormData,
  CreatePasswordFormRef,
} from '../../../components';
import { goBack } from '@navigation';
import { useBoolean } from '@hooks';

export const useOnboardingTalentScreen = () => {
  const talentNameFormRef = useRef<TalentNameFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);

  const {
    value: isUINConfirmationModalVisible,
    toggle: toggleUINConfirmationModalVisible,
  } = useBoolean();

  const [step, setStep] = useState(0);

  const [uin, setUIN] = useState<string>('');

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
      talentNameFormRef.current?.handleSubmit(formData => {
        onChangeData('talentNameFormData', formData);
        setStep(1);
      })();

    step === 1 &&
      createPasswordFormRef.current?.handleSubmit(formData => {
        onChangeData('createPasswordFormData', formData);
        toggleUINConfirmationModalVisible();
      })();
  };

  const goToPreviousStep = () => {
    if (!step) {
      goBack();
      return;
    }

    if (step === 1) {
      onChangeData(
        'createPasswordFormData',
        createPasswordFormRef.current?.getValues(),
      );
      setStep(0);
    }
  };

  return {
    talentNameFormRef,
    createPasswordFormRef,
    step,
    data,
    uin,
    isUINConfirmationModalVisible,
    toggleUINConfirmationModalVisible,
    onChangeData,
    goToNextStep,
    goToPreviousStep,
    setUIN,
  };
};
