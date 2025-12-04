import {
  OrganizationNameStep,
  YourInformationStep,
  HeadOfficeGlobalStep,
} from '../forms';
import { StepConfig } from './types';

export const globalOrganizationConfig: StepConfig[] = [
  {
    title: 'Organization Details',
    component: OrganizationNameStep,
    validate: async formData => {
      return await formData.trigger('organizationName');
    },
  },
  {
    title: 'Primary Information',
    label: 'Global',
    component: HeadOfficeGlobalStep,
    validate: async formData => {
      return await formData.trigger('headOfficeLocation');
    },
  },
  {
    title: 'Your Information',
    label: 'Global',
    description: 'Enter the secondary location of your organization',
    component: YourInformationStep,
    validate: async formData => {
      return await formData.trigger([
        'firstName',
        'lastName',
        'positionInCompany',
        'gender',
      ]);
    },
  },
  {
    title: 'Create a password',
  },
];
