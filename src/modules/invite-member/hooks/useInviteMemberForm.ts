import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoleAccess } from '../types';

const inviteMemberFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  positionInCompany: z.string().min(1, 'Position in company is required'),
  roleAccess: z.array(z.enum(RoleAccess)),
});

export type InviteMemberFormData = z.infer<typeof inviteMemberFormSchema>;

export const useInviteMemberForm = () => {
  const formData = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      positionInCompany: '',
      roleAccess: [],
    },
  });

  return { formData };
};
