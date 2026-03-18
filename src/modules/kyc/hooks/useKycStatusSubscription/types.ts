import { KycStatus } from '@modules/kyc';

export interface KycRecord extends Record<string, unknown> {
  id: string;
  user_id: string;
  status: KycStatus;
  checks_total: number;
  checks_passed: number;
  created_at: string;
  updated_at: string;
}

export interface KycStatusChangeData {
  status: KycStatus;
  checksTotal: number;
  checksPassed: number;
}

export interface UseKycStatusSubscriptionProps {
  userId: string;
  onStatusChange: (data: KycStatusChangeData) => void;
  enabled?: boolean;
}
