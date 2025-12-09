import { useRef, useState } from 'react';
import { CreatePasswordFormRef } from '@modules/onboarding';

export const useCreatePassword = () => {
  const [uin, setUIN] = useState('');
  const createPasswordFormRef = useRef<CreatePasswordFormRef>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleCreatePassword = (onboardingData: any) => {
    createPasswordFormRef.current?.handleSubmit(formData => {
      console.log('formData', formData);
      console.log('onboardingData', onboardingData);
      setConfirmationModalOpen(true);
      setUIN(Math.random().toString(36).substring(2, 15));
    })();
  };

  return {
    uin,
    createPasswordFormRef,
    confirmationModalOpen,
    handleCreatePassword,
    onConfirmationModalClose: () => setConfirmationModalOpen(false),
  };
};
