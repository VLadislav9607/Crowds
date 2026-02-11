import {
  OrganizationCreatorInformationFormRef,
  OrganizationNameFormRef,
  PrimaryLocationFormData,
  PrimaryLocationFormRef,
} from '../../../forms';

import { CreatePasswordFormRef } from '../../../../forms';
import { ParsedLocation, useCreateLocalOrg } from '@actions';
import { showErrorToast, showMutationErrorToast } from '@helpers';
import { RefObject } from 'react';

import { CommonOrgRegisterParams, OnboardingOrganizationData } from './types';

export interface UseSingleOrgRegisterParams extends CommonOrgRegisterParams {
  organizationNameFormRef: RefObject<OrganizationNameFormRef | null>;
  primaryLocationFormRef: RefObject<PrimaryLocationFormRef | null>;
  organizationCreatorInformationFormRef: RefObject<OrganizationCreatorInformationFormRef | null>;
  createPasswordFormRef: RefObject<CreatePasswordFormRef | null>;
}

export const useSingleOrgRegister = ({
  step,
  setStep,
  data,
  setData,
  organizationNameFormRef,
  primaryLocationFormRef,
  organizationCreatorInformationFormRef,
  createPasswordFormRef,
  handleOrganizationNameFormSubmit,
  handleOrganizationCreatorInformationFormSubmit,
  onOtpVerificationFormSubmit,
  onCreatingAccountSuccess,
}: UseSingleOrgRegisterParams) => {
  const { mutate, isPending: isLocalOrgCreating } = useCreateLocalOrg({
    onSuccess: async responseData => {
      await onCreatingAccountSuccess(responseData);
    },
    onError: error => {
      console.log('error', error);
      showMutationErrorToast(error);
    },
  });

  const handlePrimaryLocationFormSubmit = async (
    values: PrimaryLocationFormData,
  ) => {
    if (
      !!values.parsed_head_office_location &&
      values.parsed_head_office_location.country_code !==
        values.parsed_location.country_code
    ) {
      showErrorToast(
        'Head office location must be in the same country as the primary location, or use global organization flow',
        {
          visibilityTime: 10000,
        },
      );
      return;
    }
    setData((prev: OnboardingOrganizationData) => ({
      ...prev,
      primaryLocationFormData: values,
    }));
    setStep(prev => prev + 1);
  };

  const onCreateSingleCountryOrganization = async () => {
    const { parsed_head_office_location, parsed_location } =
      data.primaryLocationFormData!;

    const headOfficeLocation = parsed_head_office_location || parsed_location;
    const location = parsed_head_office_location ? parsed_location : undefined;

    mutate({
      verificationToken: data.verificationToken!,
      password: createPasswordFormRef.current?.getValues()!.password!,
      organizationName: data.organizationNameFormData?.organizationName!,
      headOfficeLocation: headOfficeLocation as ParsedLocation,
      location: location as ParsedLocation,
      creator: data.organizationCreatorInformationFormData!,
    });
  };

  const goToNextStepInSingle = () => {
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();
    step === 1 &&
      primaryLocationFormRef.current?.handleSubmit(
        handlePrimaryLocationFormSubmit,
        error =>
          (error?.parsed_location?.street_number ||
            error?.parsed_head_office_location?.street_number) &&
          showErrorToast('Location must contain a full address'),
      )();
    step === 2 &&
      organizationCreatorInformationFormRef.current?.handleSubmit(
        handleOrganizationCreatorInformationFormSubmit,
      )();
    step === 3 && onOtpVerificationFormSubmit();
    step === 4 &&
      createPasswordFormRef.current?.handleSubmit(
        onCreateSingleCountryOrganization,
      )();
  };

  return { goToNextStepInSingle, isLocalOrgCreating };
};
