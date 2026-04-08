export type KycStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'expired_document';

export type KycFailureReason = 'underage' | 'dob_not_found' | 'client_data_consistency' | null;

export interface UserKycRecord {
  id: string;
  user_id: string;
  status: KycStatus;
  checks_total: number;
  checks_passed: number;
  failure_reason: KycFailureReason;
  created_at: string;
  updated_at: string;
}

export interface UseIsUserVerifiedProps {
  userId?: string;
  enabled?: boolean;
  refetchInterval?: number | false;
}
