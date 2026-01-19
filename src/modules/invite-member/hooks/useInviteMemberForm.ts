import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const inviteMemberFormSchema = z.object({
  countryAccess: z.array(z.string()),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  positionInCompany: z.string().min(1, 'Position in company is required'),
  roleAccess: z.array(z.string()),
  email: z.email({ message: 'Invalid email address' }),
});

export type InviteMemberFormData = z.infer<typeof inviteMemberFormSchema>;

export const useInviteMemberForm = () => {
  const formData = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      positionInCompany: '',
      email: '',
      countryAccess: [],
      roleAccess: [],
    },
  });

  return { formData };
};
