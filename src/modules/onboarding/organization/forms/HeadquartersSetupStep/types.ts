import { ICountryWithFlag } from '@constants';

export interface HeadquartersSetupStepData {
  hqCountry: ICountryWithFlag | null;
  opsCountry: ICountryWithFlag | null;
}

export interface HeadquartersSetupStepProps {
  defaultValues?: HeadquartersSetupStepData;
}

export interface HeadquartersSetupStepRef {
  handleSubmit: (cb: (data: HeadquartersSetupStepData) => void) => void;
}
