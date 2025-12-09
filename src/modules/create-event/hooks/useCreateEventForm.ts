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
      companyName: '',
      title: '',
      location: '',
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined,
      minAge: 1,
      maxAge: 100,
      category: '',
      tags: [],
      paymentMode: 'perHour',
      paymentAmount: 15,
      crowdPreferences: '',
      eventBrief: '',
      uploadNDA: false,
      ndaDocument: undefined,
      registrationClosingDate: undefined,
    },
    mode: 'onChange',
  });

  return { formData };
};
