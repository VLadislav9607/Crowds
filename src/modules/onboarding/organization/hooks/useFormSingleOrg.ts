import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gender, OrganizationType } from '@modules/common';

const singleOrgFormSchema = z.object({
  organizationName: z.string().min(1, 'Company/business name is required'),
  organizationType: z.enum([OrganizationType.SINGLE, OrganizationType.GLOBAL]),
  country: z.string().min(1, 'Country/Region is required'),
  isHeadOffice: z.boolean(),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  positionInCompany: z.string().min(1, 'Position in company is required'),
  isAuthorizedOnBehalfOfCompany: z.boolean(),
});

export type SingleOrgFormData = z.infer<typeof singleOrgFormSchema>;

export const useFormSingleOrg = () => {
  const formData = useForm<SingleOrgFormData>({
    resolver: zodResolver(singleOrgFormSchema),
    defaultValues: {
      organizationName: '',
      organizationType: OrganizationType.SINGLE,
      country: '',
      isHeadOffice: false,
      gender: Gender.MALE,
      positionInCompany: '',
      isAuthorizedOnBehalfOfCompany: false,
      firstName: '',
      lastName: '',
    },
  });

  const validateStep1 = async () => {
    return await formData.trigger('organizationName');
  };

  const validateStep2 = async () => {
    return await formData.trigger(['country', 'isHeadOffice']);
  };

  const validateStep3 = async () => {
    return await formData.trigger('gender');
  };

  return { formData, validateStep1, validateStep2, validateStep3 };
};
