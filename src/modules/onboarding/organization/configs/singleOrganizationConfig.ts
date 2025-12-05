import {
  OrganizationNameStep,
  PrimaryLocationStep,
  YourInformationStep,
} from '../forms';
import { StepConfig } from './types';

export const singleOrganizationConfig: StepConfig[] = [
  {
    title: 'Organization Details',
    component: OrganizationNameStep,
    validate: async formData => {
      return await formData.trigger('organizationName');
    },
  },
  {
    title: 'Primary Location',
    label: 'Single Country',
    component: PrimaryLocationStep,
    validate: async formData => {
      return await formData.trigger('country');
    },
  },
  {
    title: 'Your Information',
    label: 'Single Country',
    description: 'Enter the secondary location of your organization',
    component: YourInformationStep,
    validate: async formData => {
      return await formData.trigger([
        'firstName',
        'lastName',
        'positionInCompany',
      ]);
    },
  },
  {
    title: 'Create a password',
    // Password step doesn't need validation here, handled by CreatePasswordForm
  },
];
