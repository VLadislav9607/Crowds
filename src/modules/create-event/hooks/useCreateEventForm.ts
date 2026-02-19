import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateEventFormData, createPublishedEventSchema } from '../validation';

export const useCreateEventForm = () => {
  const formData = useForm<CreateEventFormData>({
    resolver: zodResolver(createPublishedEventSchema),
    defaultValues: {
      eventType: 'brand_activation',
      title: '',
      description: '',
      locationType: 'specific_location',
      officeId: '',
      locationCountryCode: undefined,
      location: undefined,
      visibility: 'public',
      campaignStartAt: undefined,
      campaignEndAt: undefined,
      startAt: undefined,
      endAt: undefined,
      ageGroups: [],
      category: '',
      tags: [],
      paymentMode: 'perHour',
      paymentAmount: undefined,
      eventBrief: '',
      ndaDocument: undefined,
      registrationClosingAt: undefined,
    },
    mode: 'onChange',
  });

  return { formData };
};
