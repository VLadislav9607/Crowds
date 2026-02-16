import { Gender } from '@modules/profile';
import { UseFormGetValues, UseFormHandleSubmit } from 'react-hook-form';
import { z } from 'zod';
import { REGEX } from '@constants';

export interface TeamMemberInfoFormRef {
  handleSubmit: UseFormHandleSubmit<TeamMemberInfoFormData>;
  getValues: UseFormGetValues<TeamMemberInfoFormData>;
}

export interface TeamMemberInfoFormProps {
  defaultValues?: Partial<TeamMemberInfoFormData>;
}

export const teamMemberInfoFormSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(
      REGEX.username,
      'Username can only contain letters, numbers, and underscores',
    )
    .refine(val => REGEX.usernameStartWithLetterOrUnderscore.test(val), {
      message: 'Username must start with a letter or underscore',
    }),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: 'Gender is required',
  }),
  position: z.string().min(1, 'Position is required'),
});

export interface TeamMemberInfoFormData
  extends z.infer<typeof teamMemberInfoFormSchema> {}
