import { ICountryWithFlag } from '@constants';

export interface BranchManagerEmailsStepData {
  branchManagerEmails: Record<string, string>; // key: country code, value: email
}

export interface BranchManagerEmailsStepProps {
  branches: ICountryWithFlag[];
  defaultValues?: BranchManagerEmailsStepData;
}

export interface BranchManagerEmailsStepRef {
  handleSubmit: (cb: (data: BranchManagerEmailsStepData) => void) => void;
}
