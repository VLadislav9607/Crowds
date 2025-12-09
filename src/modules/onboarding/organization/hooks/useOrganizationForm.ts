import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { OrganizationType } from '@modules/common';
import { Gender } from '@modules/profile';

import { OrganizationFormData, organizationFormSchema } from '../validation';

export const useOrganizationForm = () => {
  const formData = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: OrganizationType.SINGLE,
      country: '',
      headOfficeLocation: '',
      firstName: '',
      lastName: '',
      positionInCompany: '',
      branchesLocations: [],
      gender: Gender.MALE,
      isHeadOffice: false,
      haveBranches: false,
      isAuthorizedOnBehalfOfCompany: false,
    },
  });

  return { formData };
};
