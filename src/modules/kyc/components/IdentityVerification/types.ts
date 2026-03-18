export interface IdentityVerificationProps {
  onPendingChange?: (isPending: boolean) => void;
  origin?: 'talent_onboarding' | 'org_onboarding' | 'profile';
}

export interface IdentityVerificationRef {
  onVerify: () => void;
}
