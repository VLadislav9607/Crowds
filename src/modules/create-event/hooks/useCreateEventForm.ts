import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreateEventFormData,
  createEventValidationSchema,
} from '../validation';

export const useCreateEventForm = () => {
  const formData = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventValidationSchema),
    defaultValues: {
      title: '',
      location: '',
      visibility: 'public',
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      ageGroups: [],
      category: '',
      tags: [],
      paymentMode: 'perHour',
      paymentAmount: undefined,
      eventBrief: '',
      uploadNDA: false,
      ndaDocument: undefined,
      registrationClosingDate: undefined,
    },
    mode: 'onChange',
  });

  return { formData };
};
