import { Control, FieldErrors } from 'react-hook-form';
import { OrganizationFormData } from '../validation';

export type StepComponent = React.ComponentType<{
  control: Control<OrganizationFormData>;
  errors: FieldErrors<OrganizationFormData>;
}>;

export type ValidationFunction = (formData: any) => Promise<boolean> | boolean;

export interface StepConfig {
  title: string;
  label?: string;
  description?: string;
  component?: StepComponent;
  validate?: ValidationFunction;
}
