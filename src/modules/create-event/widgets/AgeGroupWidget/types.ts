import { Control } from 'react-hook-form';
import { CreateEventFormData } from '../../validation';

export interface AgeGroupWidgetProps {
  control: Control<CreateEventFormData>;
  index: number;
  onRemove?: () => void;
}
