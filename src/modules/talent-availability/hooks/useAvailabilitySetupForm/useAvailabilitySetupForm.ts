import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useGetMe,
  useUpdateAvailability,
  useGetUserAvailability,
} from '@actions';

import {
  availabilitySetupSchema,
  AvailabilitySetupFormData,
  DEFAULT_VALUES,
} from './schema';
import { mapApiToFormData, mapFormDataToApi } from './helpers';

interface UseAvailabilitySetupFormProps {
  onSuccess?: () => void;
}

export const useAvailabilitySetupForm = ({
  onSuccess,
}: UseAvailabilitySetupFormProps = {}) => {
  const { me } = useGetMe();
  const { data: existingData, isLoading } = useGetUserAvailability();
  const { mutate: updateAvailability, isPending } = useUpdateAvailability({
    onSuccess,
  });

  const {
    setValue,
    watch,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AvailabilitySetupFormData>({
    resolver: zodResolver(availabilitySetupSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  useEffect(() => {
    if (existingData) {
      reset(mapApiToFormData(existingData));
    }
  }, [existingData, reset]);

  const onSubmit = handleSubmit(data => {
    if (!me?.id) return;
    updateAvailability(mapFormDataToApi(data, me.id));
  });

  return {
    setValue,
    watch,
    getValues,
    errors,
    isValid,
    isLoading,
    isSubmitting: isPending,
    onSubmit,
  };
};
