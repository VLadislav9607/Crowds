import { Gender } from '@modules/profile';
import { OrganizationType } from '@modules/common';
import z from 'zod';

export const organizationFormSchema = z.object({
  // Step 1: Organization Details (common)
  organizationName: z.string().min(1, 'Company/business name is required'),
  organizationType: z.enum([OrganizationType.SINGLE, OrganizationType.GLOBAL]),

  // Step 2: Location (different for single vs global)
  country: z.string().min(1, 'Country/Region is required'),
  isHeadOffice: z.boolean(),

  // Global flow fields - optional in base schema, validated conditionally
  headOfficeLocation: z.string().min(1, 'Head office location is required'),
  haveBranches: z.boolean(),
  branchesLocations: z
    .array(z.string())
    .min(1, 'Branches locations are required'),

  // Step 3: Your Information (common)
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  positionInCompany: z.string().min(1, 'Position in company is required'),
  isAuthorizedOnBehalfOfCompany: z.boolean(),
});

export type OrganizationFormData = z.infer<typeof organizationFormSchema>;
