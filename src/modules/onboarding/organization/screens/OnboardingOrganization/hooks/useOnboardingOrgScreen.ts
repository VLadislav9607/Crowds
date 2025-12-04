import { goBack, goToScreen, Screens } from '@navigation';
import { useState } from 'react';

import {
  singleOrganizationConfig,
  globalOrganizationConfig,
} from '../../../configs';
import { OrganizationType } from '@modules/common';

import { useOrganizationForm } from '../../../hooks';

export const useOnboardingOrgScreen = () => {
  const { formData } = useOrganizationForm();

  const organizationType = formData.watch('organizationType');

  const config =
    organizationType === OrganizationType.GLOBAL
      ? globalOrganizationConfig
      : singleOrganizationConfig;

  const TOTAL_STEPS = config.length;

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = async () => {
    const isLastStep = currentStep === TOTAL_STEPS;

    if (isLastStep) {
      formData.handleSubmit(() => goToScreen(Screens.TermsAndPrivacy))();
      return;
    }

    const currentStepConfig = config[currentStep - 1];

    // If step has validation function, use it
    if (currentStepConfig.validate) {
      const isValid = await currentStepConfig.validate(formData);
      if (isValid) {
        goToNextStep();
      }
    } else {
      // If no validation, just go to next step
      goToNextStep();
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
    config,
  };
};
