import { If } from '@components';
import { goToScreen, Screens } from '@navigation';

import { OnboardingScreenLayout } from '../../../layouts';
import {
  OrganizationNameStep,
  PrimaryLocationStep,
  YourInformationStep,
} from '../../components';
import { singleOrganizationConfig } from '../../configs';
import { useCreatePassword, useSingleOrgScreen } from './hooks';
import { CreatePasswordForm } from '../../../components';
import { UINSaveConfirmationModal } from '../../../modals';

export const OnboardingSingleOrgScreen = () => {
  const { currentStep, totalSteps, handleNext, handleBack, formData } =
    useSingleOrgScreen();

  const {
    createPasswordFormRef,
    handleCreatePassword,
    uin,
    confirmationModalOpen,
    onConfirmationModalClose,
  } = useCreatePassword();
  return (
    <OnboardingScreenLayout
      title={singleOrganizationConfig[currentStep - 1].title}
      label={currentStep === 2 ? 'Single Country' : undefined}
      stepsCount={totalSteps}
      currentStep={currentStep - 1}
      onBackPress={handleBack}
      onForwardPress={handleNext}
    >
      <If condition={currentStep === 1}>
        <OrganizationNameStep
          control={formData.control}
          errors={formData.formState.errors}
        />
      </If>

      <If condition={currentStep === 2}>
        <PrimaryLocationStep
          control={formData.control}
          errors={formData.formState.errors}
        />
      </If>

      <If condition={currentStep === 3}>
        <YourInformationStep
          control={formData.control}
          errors={formData.formState.errors}
        />
      </If>

      <If condition={currentStep === 4}>
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
