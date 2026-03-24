import { If } from '@components';
import { OnboardingScreenLayout } from '../../../layouts';
import { useOnboardingUnAuthOrganization } from './useOnboardingUnAuthOrganization';
import { UINSaveConfirmationModal } from '../../../modals';
import {
  BranchManagerEmailsStep,
  NetworkSetupStep,
  OrganizationCreatorInformationStep,
  OrganizationNameStep,
  PrimaryLocationStep,
  HeadGlobalLocationStep,
} from '../../forms';
import { HeadquartersSetupStep } from '../../forms/HeadquartersSetupStep';
import { OtpVerificationForm } from '@modules/common';
import { CreatePasswordForm } from '../../../../onboarding/forms';
import { useMemo } from 'react';

export const OnboardingUnAuthOrganizationScreen = () => {
  const {
    step,
    isGlobal,
    data,
    networkSetupFormRef,
    headquartersSetupFormRef,
    branchManagerEmailsFormRef,
    organizationNameFormRef,
    primaryLocationFormRef,
    showFullScreenLoader,
    otpVerificationFormRef,
    createPasswordFormRef,
    headGlobalLocationFormRef,
    uinSaveConfirmationModalRef,
    organizationCreatorInformationFormRef,
    needsBranchManagerEmails,
    setData,
    goToNextStep,
    goToPreviousStep,
    onResendOtpCode,
    onOtpVerificationFormSubmit,
  } = useOnboardingUnAuthOrganization();

  const titlesSingle = {
    0: '',
    1: 'Primary Location',
    2: 'Your Information',
    3: 'Verification Code',
    4: 'Create a password',
  };

  const offset = needsBranchManagerEmails ? 1 : 0;

  const titlesGlobal = useMemo(() => {
    const titles: Record<number, string> = {
      0: '',
      1: '',
      2: '',
    };

    if (needsBranchManagerEmails) {
      titles[3] = '';
    }

    titles[3 + offset] = 'Primary Location';
    titles[4 + offset] = 'Your Information';
    titles[5 + offset] = 'Verification Code';
    titles[6 + offset] = 'Create a password';

    return titles;
  }, [needsBranchManagerEmails, offset]);

  const titles = isGlobal ? titlesGlobal : titlesSingle;

  const totalSteps = Object.keys(titles).length;

  return (
    <OnboardingScreenLayout
      title={titles[step as keyof typeof titles]}
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

      <If condition={!isGlobal}>
        <If condition={step === 1}>
          <PrimaryLocationStep
            ref={primaryLocationFormRef}
            defaultValues={data.primaryLocationFormData}
            pickedLogo={data.image}
            onPickLogo={img => {
              setData({ ...data, image: img });
            }}
            onChangeText={() =>
              data.primaryLocationFormData &&
              setData({ ...data, primaryLocationFormData: undefined })
            }
          />
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
          <CreatePasswordForm ref={createPasswordFormRef} />
        </If>
      </If>

      <If condition={isGlobal}>
        <If condition={step === 1}>
          <HeadquartersSetupStep
            ref={headquartersSetupFormRef}
            defaultValues={data.headquartersSetupFormData}
          />
        </If>

        <If condition={step === 2}>
          <NetworkSetupStep
            ref={networkSetupFormRef}
            headquartersData={data.headquartersSetupFormData}
            defaultNetwork={data.networkSetupFormData}
          />
        </If>

        <If condition={step === 3 && needsBranchManagerEmails}>
          <BranchManagerEmailsStep
            ref={branchManagerEmailsFormRef}
            branches={data.networkSetupFormData?.branches ?? []}
            defaultValues={data.branchManagerEmailsFormData}
          />
        </If>

        <If condition={step === 3 + offset}>
          <HeadGlobalLocationStep
            ref={headGlobalLocationFormRef}
            defaultValues={data.headGlobalLocationFormData}
            pickedLogo={data.image}
            onPickLogo={img => {
              setData({ ...data, image: img });
            }}
            onChangeText={() =>
              data.headGlobalLocationFormData &&
              setData({ ...data, headGlobalLocationFormData: undefined })
            }
          />
        </If>

        <If condition={step === 4 + offset}>
          <OrganizationCreatorInformationStep
            ref={organizationCreatorInformationFormRef}
            defaultValues={data.organizationCreatorInformationFormData}
          />
        </If>

        <If condition={step === 5 + offset}>
          <OtpVerificationForm
            email={data.organizationCreatorInformationFormData?.email}
            onResendButtonPress={onResendOtpCode}
            onSubmit={onOtpVerificationFormSubmit}
            ref={otpVerificationFormRef}
          />
        </If>

        <If condition={step === 6 + offset}>
          <CreatePasswordForm ref={createPasswordFormRef} />
        </If>
      </If>
      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};
