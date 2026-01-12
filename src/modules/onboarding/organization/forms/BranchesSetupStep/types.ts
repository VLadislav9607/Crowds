import { ICountryWithFlag } from '@constants';

export interface BranchesSetupStepData {
  selectedHeadOfficeCountry: ICountryWithFlag | null;
  selectedBrachesCountries: ICountryWithFlag[];
  branchManagerEmails: Record<string, string>;
}

export interface BranchesSetupStepProps {
  defaultValues?: BranchesSetupStepData;
}

export interface BranchesSetupStepRef {
  handleSubmit: (onSubmit: (data: BranchesSetupStepData) => void) => () => void;
}
