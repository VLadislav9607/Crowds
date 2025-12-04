import { If } from '@components';
import { goToScreen, Screens } from '@navigation';

import { OnboardingScreenLayout } from '../../../layouts';
import { useCreatePassword, useOnboardingOrgScreen } from './hooks';
import { CreatePasswordForm } from '../../../components';
import { UINSaveConfirmationModal } from '../../../modals';

export const OnboardingOrganizationScreen = () => {
  const { currentStep, totalSteps, handleNext, handleBack, formData, config } =
    useOnboardingOrgScreen();

  const {
    createPasswordFormRef,
    handleCreatePassword,
    uin,
    confirmationModalOpen,
    onConfirmationModalClose,
  } = useCreatePassword();

  const currentStepConfig = config[currentStep - 1];

  return (
    <OnboardingScreenLayout
      title={currentStepConfig.title}
      label={currentStepConfig.label}
      stepsCount={totalSteps}
      currentStep={currentStep - 1}
      onBackPress={handleBack}
      onForwardPress={handleNext}
    >
      {currentStepConfig.component &&
        (() => {
          const CurrentStep = currentStepConfig.component;
          return (
            <CurrentStep
              control={formData.control}
              errors={formData.formState.errors}
            />
          );
        })()}

      <If condition={currentStep === config.length}>
        <CreatePasswordForm
          ref={createPasswordFormRef}
          onGenerateUIN={() => handleCreatePassword(formData.getValues())}
          uin={uin}
        />
      </If>

      <UINSaveConfirmationModal
        isVisible={confirmationModalOpen}
        onClose={onConfirmationModalClose}
        onConfirm={() => {
          onConfirmationModalClose();
          goToScreen(Screens.TermsAndPrivacy);
        }}
      />
    </OnboardingScreenLayout>
  );
};
