import { If } from '@components';
import { OnboardingScreenLayout } from '../../../layouts';
import { useOnboardingUnAuthOrganization } from './useOnboardingUnAuthOrganization';
import { UINSaveConfirmationModal } from '../../../modals';
import {
  NetworkSetupStep,
  OrganizationCreatorInformationStep,
  OrganizationNameStep,
  PrimaryLocationStep,
  HeadGlobalLocationStep,
} from '../../forms';
import { HeadquartersSetupStep } from '../../forms/HeadquartersSetupStep';
import { OtpVerificationForm } from '@modules/common';
import { CreatePasswordForm } from '../../../../onboarding/forms';

export const OnboardingUnAuthOrganizationScreen = () => {
  const {
    step,
    isGlobal,
    data,
    networkSetupFormRef,
    headquartersSetupFormRef,
    organizationNameFormRef,
    primaryLocationFormRef,
    showFullScreenLoader,
    otpVerificationFormRef,
    createPasswordFormRef,
    headGlobalLocationFormRef,
    uinSaveConfirmationModalRef,
    organizationCreatorInformationFormRef,
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

  const titlesGlobal = {
    0: '',
    1: '',
    2: '',
    3: 'Primary Location',
    4: 'Your Information',
    5: 'Verification Code',
    6: 'Create a password',
  };

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

        <If condition={step === 3}>
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

        <If condition={step === 4}>
          <OrganizationCreatorInformationStep
            ref={organizationCreatorInformationFormRef}
            defaultValues={data.organizationCreatorInformationFormData}
          />
        </If>

        <If condition={step === 5}>
          <OtpVerificationForm
            email={data.organizationCreatorInformationFormData?.email}
            onResendButtonPress={onResendOtpCode}
            onSubmit={onOtpVerificationFormSubmit}
            ref={otpVerificationFormRef}
          />
        </If>

        <If condition={step === 6}>
          <CreatePasswordForm ref={createPasswordFormRef} />
        </If>
      </If>
      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};
