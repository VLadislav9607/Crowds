export enum RoleAccess {
  // Master Admin
  ASSIGN_AS_MASTER_ADMIN = 'assign_as_master_admin',

  // Talent
  RECRUIT_APPLICANTS = 'recruit_applicants',
  APPROVE_APPLICANTS = 'approve_applicants',
  GIVE_FEEDBACK = 'give_feedback',
  RATE_APPLICANTS = 'rate_applicants',

  // Events
  CREATE_EDIT_EVENTS = 'create_edit_events',
  VIEW_EVENTS = 'view_events',
  MESSAGE_APPLICANTS = 'message_applicants',
  GROUP_MESSAGE = 'group_message',
  ONE_ON_ONE_MESSAGE = 'one_on_one_message',

  // Check-ins
  MANAGE_CHECK_INS = 'manage_check_ins',

  // Regions
  NATIONS = 'nations',

  // Settings
  INVITE_TEAM_MEMBERS = 'invite_team_members',
  EDIT_TEAM_MEMBERS = 'edit_team_members',
  EDIT_BUSINESS_INFO = 'edit_business_info',

  // Financial
  VIEW_EARNINGS = 'view_earnings',
  AUTHORIZE_TALENT_PAYMENTS = 'authorize_talent_payments',
  EDIT_BANK_INFO = 'edit_bank_info',
}
