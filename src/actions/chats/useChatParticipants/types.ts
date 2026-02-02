export interface IChatParticipant {
  user_id: string;
  role: 'organization' | 'talent';
  display_name: string;
  avatar_url: string | null;
}
