import { ICountryWithFlag } from '@constants';
import { HeadquartersSetupStepData } from '../HeadquartersSetupStep';

export interface NetworkSetupStepData {
  branches: ICountryWithFlag[];
  isLocalDecisionMaker: boolean | null;
}

export interface NetworkSetupStepProps {
  defaultNetwork?: NetworkSetupStepData;
  headquartersData?: HeadquartersSetupStepData;
}

export interface NetworkSetupStepRef {
  handleSubmit: (cb: (data: NetworkSetupStepData) => void) => void;
  getValues: (cb: (data: NetworkSetupStepData) => void) => void;
}
