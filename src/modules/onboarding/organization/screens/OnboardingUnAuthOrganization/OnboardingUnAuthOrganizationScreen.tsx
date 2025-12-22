import { If } from '@components';
import { goToScreen, Screens } from '@navigation';

import { OnboardingScreenLayout } from '../../../layouts';
import { useCreatePassword, useOnboardingOrgScreen } from './hooks';
import { UINSaveConfirmationModal } from '../../../modals';
import {
  OrganizationNameStep,
  PrimaryLocationStep,
  HeadOfficeGlobalStep,
  OrganizationCreatorInformationStep,
} from '../../forms';
import { OtpVerificationForm } from '@modules/common';
import { CreatePasswordForm } from '../../../forms';

export const OnboardingUnAuthOrganizationScreen = () => {
  const {
    step,
    totalSteps,
    data,
    organizationNameFormRef,
    headGlobalLocationFormRef,
    primaryLocationFormRef,
    isGlobal,
    organizationCreatorInformationFormRef,
    showFullScreenLoader,
    otpVerificationFormRef,
    createPasswordFormRef,
    uin,
    goToNextStep,
    goToPreviousStep,
    onResendOtpCode,
    onOtpVerificationFormSubmit,
    uinSaveConfirmationModalRef,
  } = useOnboardingOrgScreen();



  const titles = {
    0: 'Organization Details',
    1: isGlobal ? 'Primary Information' : 'Primary Location',
    2: 'Your Information',
    3: 'Verification Code',
    4: 'Create a password',
  };

  const labels = {
    1: isGlobal ? 'Global' : 'Single Country',
    2: isGlobal ? 'Global' : 'Single Country',
  };

  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
      label={labels[step as keyof typeof labels]}
      stepsCount={totalSteps}
      currentStep={step}
      onBackPress={goToPreviousStep}
      onForwardPress={goToNextStep}
      showLoader={showFullScreenLoader}
    >
      <If condition={step === 0}>
        <OrganizationNameStep
          ref={organizationNameFormRef}
          defaultValues={data.organizationNameFormData}
        />
      </If>

      <If condition={step === 1}>
        {isGlobal ? (
          <HeadOfficeGlobalStep
            ref={headGlobalLocationFormRef}
            defaultValues={data.headGlobalLocationFormData}
          />
        ) : (
          <PrimaryLocationStep
            ref={primaryLocationFormRef}
            defaultValues={data.primaryLocationFormData}
          />
        )}
      </If>

      <If condition={step === 2}>
        <OrganizationCreatorInformationStep
          ref={organizationCreatorInformationFormRef}
          defaultValues={data.organizationCreatorInformationFormData}
        />
      </If>

      <If condition={step === 3}>
        <OtpVerificationForm
          email={data.organizationCreatorInformationFormData?.email}
          onResendButtonPress={onResendOtpCode}
          onSubmit={onOtpVerificationFormSubmit}
          ref={otpVerificationFormRef}
        />
      </If>

      <If condition={step === 4}>
        <CreatePasswordForm
          ref={createPasswordFormRef}
          uin={uin}
        />
      </If>

      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};

