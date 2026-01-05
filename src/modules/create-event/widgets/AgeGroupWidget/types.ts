import { Control } from 'react-hook-form';
import { View } from 'react-native';
import { CreateEventFormData } from '../../validation';

export interface AgeGroupWidgetProps {
  control: Control<CreateEventFormData>;
  index: number;
  onRemove?: () => void;
  widgetRef?: React.RefObject<View>;
}
