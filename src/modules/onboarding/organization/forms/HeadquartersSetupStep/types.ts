import { ICountryWithFlag } from '@constants';

export interface HeadquartersSetupStepData {
  hqCountry: ICountryWithFlag | null;
  opsCountry: ICountryWithFlag | null;
}

export interface HeadquartersSetupStepProps {
  defaultValues?: HeadquartersSetupStepData;
  onValidationError?: () => void;
}

export interface HeadquartersSetupStepRef {
  handleSubmit: (cb: (data: HeadquartersSetupStepData) => void) => void;
}
