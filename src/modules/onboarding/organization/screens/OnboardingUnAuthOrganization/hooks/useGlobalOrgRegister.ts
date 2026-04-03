import {
  BranchManagerEmailsStepData,
  BranchManagerEmailsStepRef,
  HeadGlobalLocationFormData,
  HeadGlobalLocationFormRef,
  HeadquartersSetupStepData,
  HeadquartersSetupStepRef,
  NetworkSetupStepData,
  NetworkSetupStepRef,
  OrganizationCreatorInformationFormRef,
  OrganizationNameFormRef,
} from '../../../forms';

import { CreatePasswordFormRef } from '../../../../forms';
import { RefObject } from 'react';

import { CommonOrgRegisterParams, OnboardingOrganizationData } from './types';
import { ParsedLocation, useCreateGlobalOrg } from '@actions';
import { showErrorToast, showMutationErrorToast } from '@helpers';

export interface UseGlobalOrgRegisterParams extends CommonOrgRegisterParams {
  organizationNameFormRef: RefObject<OrganizationNameFormRef | null>;
  headGlobalLocationFormRef: RefObject<HeadGlobalLocationFormRef | null>;
  organizationCreatorInformationFormRef: RefObject<OrganizationCreatorInformationFormRef | null>;
  headquartersSetupFormRef: RefObject<HeadquartersSetupStepRef | null>;
  networkSetupFormRef: RefObject<NetworkSetupStepRef | null>;
  branchManagerEmailsFormRef: RefObject<BranchManagerEmailsStepRef | null>;
  createPasswordFormRef: RefObject<CreatePasswordFormRef | null>;
}

export const useGlobalOrgRegister = ({
  step,
  setStep,
  data,
  setData,
  organizationNameFormRef,
  headGlobalLocationFormRef,
  organizationCreatorInformationFormRef,
  headquartersSetupFormRef,
  networkSetupFormRef,
  branchManagerEmailsFormRef,
  createPasswordFormRef,
  handleOrganizationNameFormSubmit,
  handleOrganizationCreatorInformationFormSubmit,
  onOtpVerificationFormSubmit,
  onCreatingAccountSuccess,
}: UseGlobalOrgRegisterParams) => {
  const { mutate, isPending: isGlobalOrgCreating } = useCreateGlobalOrg({
    onSuccess: async responseData => {
      await onCreatingAccountSuccess(responseData);
    },
    onError: showMutationErrorToast,
  });

  const needsBranchManagerEmails =
    data.networkSetupFormData?.isLocalDecisionMaker === true &&
    (data.networkSetupFormData?.branches?.length ?? 0) > 0;

  const offset = needsBranchManagerEmails ? 1 : 0;

  const handleHeadquartersSetupFormSubmit = async (
    values: HeadquartersSetupStepData,
  ) => {
    setData((prev: OnboardingOrganizationData) => ({
      ...prev,
      headquartersSetupFormData: values,
      networkSetupFormData: {
        ...(prev.networkSetupFormData ?? {
          branches: [],
          isLocalDecisionMaker: null,
        }),
        branches:
          prev?.networkSetupFormData?.branches?.filter(
            branch =>
              branch.code !== values.hqCountry?.code &&
              branch.code !== values.opsCountry?.code,
          ) ?? [],
      },
    }));
    setStep(prev => prev + 1);
  };

  const handleNetworkSetupFormSubmit = async (values: NetworkSetupStepData) => {
    setData((prev: OnboardingOrganizationData) => ({
      ...prev,
      networkSetupFormData: values,
    }));
    setStep(prev => prev + 1);
  };

  const handleBranchManagerEmailsFormSubmit = async (
    values: BranchManagerEmailsStepData,
  ) => {
    setData((prev: OnboardingOrganizationData) => ({
      ...prev,
      branchManagerEmailsFormData: values,
    }));
    setStep(prev => prev + 1);
  };

  const handleHeadGlobalLocationFormSubmit = async (
    values: HeadGlobalLocationFormData,
  ) => {
    if (!data.image) {
      return;
    }
    setData((prev: OnboardingOrganizationData) => ({
      ...prev,
      headGlobalLocationFormData: values,
    }));
    setStep(prev => prev + 1);
  };

  const onCreateGlobalCountryOrganization = async () => {
    mutate({
      verificationToken: data.verificationToken!,
      password: createPasswordFormRef.current?.getValues()!.password!,
      organizationName: data.organizationNameFormData?.organizationName!,
      hqCountry: data.headquartersSetupFormData?.hqCountry!,
      opsCountry: data.headquartersSetupFormData?.opsCountry!,
      branches: data.networkSetupFormData?.branches!,
      isLocalDecisionMaker: data.networkSetupFormData?.isLocalDecisionMaker!,
      location: data?.headGlobalLocationFormData
        ?.parsed_location! as ParsedLocation,
      creator: data.organizationCreatorInformationFormData!,
      branchManagerEmails:
        data.branchManagerEmailsFormData?.branchManagerEmails,
      vat_number: data.headGlobalLocationFormData?.vat_number,
    });
  };

  const goToNextStepInGlobal = () => {
    // Step 0: Organization Name
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();

    // Step 1: Headquarters Setup
    step === 1 &&
      headquartersSetupFormRef?.current?.handleSubmit(
        handleHeadquartersSetupFormSubmit,
      );

    // Step 2: Network Setup
    step === 2 &&
      networkSetupFormRef?.current?.handleSubmit(handleNetworkSetupFormSubmit);

    // Step 3: Branch Manager Emails (only when needsBranchManagerEmails)
    if (step === 3 && needsBranchManagerEmails) {
      branchManagerEmailsFormRef?.current?.handleSubmit(
        handleBranchManagerEmailsFormSubmit,
      );
      return;
    }

    // Step 3 + offset: Head Global Location
    if (step === 3 + offset) {
      if (!data.image) {
        showErrorToast('Please add your brand logo');
      }
      headGlobalLocationFormRef?.current?.handleSubmit(
        handleHeadGlobalLocationFormSubmit,
        () => {},
      )();
    }

    // Step 4 + offset: Creator Information
    step === 4 + offset &&
      organizationCreatorInformationFormRef.current?.handleSubmit(
        handleOrganizationCreatorInformationFormSubmit,
      )();

    // Step 5 + offset: OTP Verification
    step === 5 + offset && onOtpVerificationFormSubmit();

    // Step 6 + offset: Create Password
    step === 6 + offset &&
      createPasswordFormRef.current?.handleSubmit(
        onCreateGlobalCountryOrganization,
      )();
  };

  return {
    goToNextStepInGlobal,
    isGlobalOrgCreating,
    needsBranchManagerEmails,
  };
};
