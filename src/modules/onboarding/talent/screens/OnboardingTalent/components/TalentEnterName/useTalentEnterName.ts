import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { talentEnterNameSchema, TalentEnterNameFormData } from './types';

export const useTalentEnterName = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TalentEnterNameFormData>({
    resolver: zodResolver(talentEnterNameSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    } as Partial<TalentEnterNameFormData>,
  });

  const onSubmit = (data: TalentEnterNameFormData) => {
    console.log('Form data:', data);
    // TODO: Handle form submission
  };

  return {
    control,
    handleSubmit,
    errors,
    setValue,
    watch,
    onSubmit,
  };
};
