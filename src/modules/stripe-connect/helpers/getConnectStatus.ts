import { ConnectAccountDto } from '@actions';

export type ConnectStatus =
  | 'not_connected'
  | 'setup_incomplete'
  | 'under_review'
  | 'connected';

export const getConnectStatus = (
  account: ConnectAccountDto | null | undefined,
): ConnectStatus => {
  if (!account) return 'not_connected';
  if (!account.details_submitted) return 'setup_incomplete';
  if (!account.charges_enabled || !account.payouts_enabled)
    return 'under_review';
  return 'connected';
};
