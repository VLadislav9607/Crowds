import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPasswordSchema, CreatePasswordFormData } from './types';
import { useBoolean } from '@hooks';

export const useCreatePasswordScreen = () => {
  const {
    value: isUINSaveConfirmationModalVisible,
    toggle: toggleUINSaveConfirmationModalVisible,
  } = useBoolean(false);
  const { value: showUIN, toggle: toggleShowUIN } = useBoolean(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordSchema),
    // mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    } as Partial<CreatePasswordFormData>,
  });

  const onSubmit = (data: CreatePasswordFormData) => {
    console.log('Form data:', data);
    toggleUINSaveConfirmationModalVisible();
  };

  return {
    isUINSaveConfirmationModalVisible,
    control,
    errors,
    isValid,
    showUIN,
    onSubmit,
    handleSubmit,
    toggleShowUIN,
    toggleUINSaveConfirmationModalVisible,
  };
};
