import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';
import { CreateEventFormData } from '../../validation';

export interface UseDraftControllProps {
  formData: UseFormReturn<CreateEventFormData, any, FieldValues>;
  onScrollToErrorSection: (errors: FieldErrors<CreateEventFormData>) => void;
  setShowFullScreenLoader: (value: boolean) => void;
}

export interface UseEventControllProps {
  formData: UseFormReturn<CreateEventFormData, any, FieldValues>;
  onScrollToErrorSection: (errors: FieldErrors<CreateEventFormData>) => void;
  setShowFullScreenLoader: (value: boolean) => void;
}
