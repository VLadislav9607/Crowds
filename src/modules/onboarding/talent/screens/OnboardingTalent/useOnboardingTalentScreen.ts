import { useRef, useState } from 'react';
import {
  TalentNameFormData,
  TalentNameFormRef,
} from './components/TalentNameForm/types';
import {
  CreatePasswordFormData,
  CreatePasswordFormRef,
} from '../../../components';

export const useOnboardingTalentScreen = () => {
  const talentNameFormRef = useRef<TalentNameFormRef>(null);
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);

  const [step, _setStep] = useState(0);

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
        _setStep(1);
      })();

    step === 1 &&
      createPasswordFormRef.current?.handleSubmit(formData => {
        onChangeData('createPasswordFormData', formData);
      })();
  };

  const goToPreviousStep = () => {
    if (step === 1) {
      onChangeData(
        'createPasswordFormData',
        createPasswordFormRef.current?.getValues(),
      );
      _setStep(0);
    }
  };

  return {
    talentNameFormRef,
    createPasswordFormRef,
    step,
    data,
    onChangeData,
    goToNextStep,
    goToPreviousStep,
  };
};
