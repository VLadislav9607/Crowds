export interface TalentAvailabilityFormRef {
  onSubmit: () => void;
}

export interface TalentAvailabilityFormState {
  isLoading: boolean;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface TalentAvailabilityFormProps {
  onSuccess?: () => void;
  onFormStateChange?: (state: TalentAvailabilityFormState) => void;
}
