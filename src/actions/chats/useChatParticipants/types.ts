export interface IChatParticipant {
  id: string;
  user_id: string;
  type: 'organization' | 'talent';
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}
