import { Gender } from '@modules/common';
import { z } from 'zod';

export const talentEnterNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: 'Gender is required',
  }),
  dateOfBirth: z.date({
    message: 'Date of birth is required',
  }),
});

export type TalentEnterNameFormData = z.infer<typeof talentEnterNameSchema>;
