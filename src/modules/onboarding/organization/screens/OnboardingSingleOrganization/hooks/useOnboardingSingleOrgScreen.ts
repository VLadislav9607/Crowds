import { goBack, goToScreen, Screens } from '@navigation';
import { useState } from 'react';

import { useFormSingleOrg } from '../../../hooks';
import { singleOrganizationConfig } from '../../../configs';

const TOTAL_STEPS = singleOrganizationConfig.length;

export const useSingleOrgScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { formData, validateStep1, validateStep2, validateStep3 } =
    useFormSingleOrg();

  const handleNext = async () => {
    const validationFunctions = [validateStep1, validateStep2, validateStep3];
    const isLastStep = currentStep === TOTAL_STEPS;

    if (isLastStep) {
      formData.handleSubmit(() => goToScreen(Screens.TermsAndPrivacy))();
      return;
    }

    const validateStep = validationFunctions[currentStep - 1];
    if (validateStep) {
      const isValid = await validateStep();
      if (isValid) {
        goToNextStep();
      }
    }
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      goBack();
      return;
    }
    goToPreviousStep();
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    handleNext,
    handleBack,
    formData,
  };
};
