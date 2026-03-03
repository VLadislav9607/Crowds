export interface ConnectAccountDto {
  id: string;
  talent_id: string;
  stripe_account_id: string;
  onboarding_completed: boolean;
  details_submitted: boolean;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  created_at: string;
}
