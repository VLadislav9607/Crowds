import { ICountryWithFlag } from '@constants';
import { HeadGlobalLocationFormData } from '../HeadGlobalLocationStep';

export interface BranchesSetupStepData {
  selectedHeadOfficeCountry: ICountryWithFlag | null;
  selectedBrachesCountries: ICountryWithFlag[];
  branchManagerEmails: Record<string, string>;
  headquartersManagerEmail?: string;
}

export interface BranchesSetupStepProps {
  defaultValues?: BranchesSetupStepData;
  globalLocation?: HeadGlobalLocationFormData;
}

export interface BranchesSetupStepRef {
  handleSubmit: (onSubmit: (data: BranchesSetupStepData) => void) => () => void;
}
