export interface TalentStripeSetupProps {
  onSuccess?: () => void;
  onSkip?: () => void;
}

export interface TalentStripeSetupRef {
  onSetup: () => void;
}
