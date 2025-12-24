export type KycStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface UserKycRecord {
  id: string;
  user_id: string;
  status: KycStatus;
  created_at: string;
  updated_at: string;
}

export interface UseIsUserVerifiedProps {
  userId?: string;
  enabled?: boolean;
}
