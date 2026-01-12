import { If } from '@components';

import { OnboardingScreenLayout } from '../../../layouts';
import { useOnboardingUnAuthOrganization } from './useOnboardingUnAuthOrganization';
import { UINSaveConfirmationModal } from '../../../modals';
import {
  OrganizationNameStep,
  PrimaryLocationStep,
  HeadOfficeGlobalStep,
  OrganizationCreatorInformationStep,
  BranchesSetupStep,
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
    branchesSetupFormRef,
    isGlobal,
    organizationCreatorInformationFormRef,
    showFullScreenLoader,
    otpVerificationFormRef,
    createPasswordFormRef,
    setData,
    goToNextStep,
    goToPreviousStep,
    onResendOtpCode,
    onOtpVerificationFormSubmit,
    uinSaveConfirmationModalRef,
  } = useOnboardingUnAuthOrganization();

  const titlesSingle = {
    0: 'Organization Details',
    1: 'Primary Location',
    2: 'Your Information',
    3: 'Verification Code',
    4: 'Create a password',
  };

  const titlesGlobal = {
    0: 'Organization Details',
    1: 'Add company locations',
    2: 'Primary Location',
    3: 'Your Information',
    4: 'Verification Code',
    5: 'Create a password',
  };

  const titles = isGlobal ? titlesGlobal : titlesSingle;

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

      {/* IS SINGLE */}

      <If condition={step === 1 && !isGlobal}>
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

      <If condition={step === 2 && !isGlobal}>
        <OrganizationCreatorInformationStep
          ref={organizationCreatorInformationFormRef}
          defaultValues={data.organizationCreatorInformationFormData}
        />
      </If>

      <If condition={step === 3 && !isGlobal}>
        <OtpVerificationForm
          email={data.organizationCreatorInformationFormData?.email}
          onResendButtonPress={onResendOtpCode}
          onSubmit={onOtpVerificationFormSubmit}
          ref={otpVerificationFormRef}
        />
      </If>

      <If condition={step === 4 && !isGlobal}>
        <CreatePasswordForm ref={createPasswordFormRef} />
      </If>

      {/* IS GLOBAL */}

      <If condition={step === 1 && isGlobal}>
        <BranchesSetupStep
          ref={branchesSetupFormRef}
          defaultValues={data.branchesSetupFormData}
        />
      </If>

      <If condition={step === 2 && isGlobal}>
        <HeadOfficeGlobalStep
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

      <If condition={step === 3 && isGlobal}>
        <OrganizationCreatorInformationStep
          ref={organizationCreatorInformationFormRef}
          defaultValues={data.organizationCreatorInformationFormData}
        />
      </If>

      <If condition={step === 4 && isGlobal}>
        <OtpVerificationForm
          email={data.organizationCreatorInformationFormData?.email}
          onResendButtonPress={onResendOtpCode}
          onSubmit={onOtpVerificationFormSubmit}
          ref={otpVerificationFormRef}
        />
      </If>

      <If condition={step === 5 && isGlobal}>
        <CreatePasswordForm ref={createPasswordFormRef} />
      </If>

      {/* <If condition={step === 1}>
        {isGlobal ? (
          <HeadOfficeGlobalStep
            ref={headGlobalLocationFormRef}
            defaultValues={data.headGlobalLocationFormData}
            pickedLogo={data.image}
            onPickLogo={img=>{setData({...data, image: img})}}
            onChangeText={() =>
              data.headGlobalLocationFormData &&
              setData({ ...data, headGlobalLocationFormData: undefined })
            }
          />
        ) : (
          <PrimaryLocationStep
            ref={primaryLocationFormRef}
            defaultValues={data.primaryLocationFormData}
            pickedLogo={data.image} 
            onPickLogo={img=>{setData({...data, image: img})}}
            onChangeText={() =>
              data.primaryLocationFormData &&
              setData({ ...data, primaryLocationFormData: undefined })
            }
          />
        )}
      </If> */}

      {/* <If condition={step === 1}>
        <BranchesSetupStep 
          ref={branchesSetupFormRef}
        />
      </If> */}

      {/* <If condition={step === 2}>
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
      </If> */}

      <UINSaveConfirmationModal ref={uinSaveConfirmationModalRef} />
    </OnboardingScreenLayout>
  );
};
