import {
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
import { showMutationErrorToast } from '@helpers';

export interface UseGlobalOrgRegisterParams extends CommonOrgRegisterParams {
  organizationNameFormRef: RefObject<OrganizationNameFormRef | null>;
  headGlobalLocationFormRef: RefObject<HeadGlobalLocationFormRef | null>;
  organizationCreatorInformationFormRef: RefObject<OrganizationCreatorInformationFormRef | null>;
  headquartersSetupFormRef: RefObject<HeadquartersSetupStepRef | null>;
  networkSetupFormRef: RefObject<NetworkSetupStepRef | null>;
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

  const handleHeadGlobalLocationFormSubmit = async (
    values: HeadGlobalLocationFormData,
  ) => {
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
    });
  };

  const goToNextStepInGlobal = () => {
    !step &&
      organizationNameFormRef.current?.handleSubmit(
        handleOrganizationNameFormSubmit,
      )();
    step === 1 &&
      headquartersSetupFormRef?.current?.handleSubmit(
        handleHeadquartersSetupFormSubmit,
      );
    step === 2 &&
      networkSetupFormRef?.current?.handleSubmit(handleNetworkSetupFormSubmit);
    step === 3 &&
      headGlobalLocationFormRef?.current?.handleSubmit(
        handleHeadGlobalLocationFormSubmit,
      )();
    step === 4 &&
      organizationCreatorInformationFormRef.current?.handleSubmit(
        handleOrganizationCreatorInformationFormSubmit,
      )();
    step === 5 && onOtpVerificationFormSubmit();
    step === 6 &&
      createPasswordFormRef.current?.handleSubmit(
        onCreateGlobalCountryOrganization,
      )();
  };

  return { goToNextStepInGlobal, isGlobalOrgCreating };
};
