import { KycStatus } from '@modules/kyc';

export interface KycRecord extends Record<string, unknown> {
  id: string;
  user_id: string;
  status: KycStatus;
  created_at: string;
  updated_at: string;
}

export interface UseKycStatusSubscriptionProps {
  userId: string;
  onStatusChange: (status: KycStatus) => void;
  enabled?: boolean;
}
