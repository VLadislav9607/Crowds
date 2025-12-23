import { useRef, useState } from 'react';
import { CreatePasswordFormRef } from '@modules/onboarding';
import { UINSaveConfirmationModalRef } from '../../../../modals';

export const useCreatePassword = (onConfirm?: () => void) => {
  const [uin, setUIN] = useState('');
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const uinSaveConfirmationModalRef = useRef<UINSaveConfirmationModalRef>(null);

  const handleCreatePassword = (onboardingData: any) => {
    createPasswordFormRef.current?.handleSubmit(formData => {
      console.log('formData', formData);
      console.log('onboardingData', onboardingData);
      const generatedUIN = Math.random().toString(36).substring(2, 15);
      setUIN(generatedUIN);
      uinSaveConfirmationModalRef.current?.open({
        uin: generatedUIN,
        onConfirm,
      });
    })();
  };

  return {
    uin,
    createPasswordFormRef,
    uinSaveConfirmationModalRef,
    handleCreatePassword,
  };
};
