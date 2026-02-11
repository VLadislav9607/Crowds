import { CreateGlobalOrgResDto, CreateLocalOrgResDto } from '@actions';
import {
  HeadGlobalLocationFormData,
  HeadquartersSetupStepData,
  NetworkSetupStepData,
  OrganizationCreatorInformationFormData,
  OrganizationNameFormData,
  PrimaryLocationFormData,
} from '../../../forms';
import { PickedImage } from '@modules/common';

export interface OnboardingOrganizationData {
  organizationNameFormData?: OrganizationNameFormData;
  headquartersSetupFormData?: HeadquartersSetupStepData;
  networkSetupFormData?: NetworkSetupStepData;
  headGlobalLocationFormData?: HeadGlobalLocationFormData;
  primaryLocationFormData?: Partial<PrimaryLocationFormData>;
  organizationCreatorInformationFormData?: OrganizationCreatorInformationFormData;
  verificationToken?: string;
  image?: PickedImage;
}

export interface CommonOrgRegisterParams {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: OnboardingOrganizationData;
  setData: React.Dispatch<React.SetStateAction<OnboardingOrganizationData>>;
  handleOrganizationNameFormSubmit: (
    values: OrganizationNameFormData,
  ) => Promise<void>;
  handleOrganizationCreatorInformationFormSubmit: (
    values: OrganizationCreatorInformationFormData,
  ) => Promise<void>;
  onOtpVerificationFormSubmit: () => Promise<void>;
  onCreatingAccountSuccess: (
    responseData: CreateGlobalOrgResDto | CreateLocalOrgResDto,
  ) => Promise<void>;
}

export interface OrgRegisterParams {
  data: OnboardingOrganizationData;
}
