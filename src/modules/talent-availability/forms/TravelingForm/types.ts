import { UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { AvailabilitySetupFormData } from '../../hooks/useAvailabilitySetupForm';

export interface ITravelingFormProps {
  watch: UseFormWatch<AvailabilitySetupFormData>;
  setValue: UseFormSetValue<AvailabilitySetupFormData>;
}
