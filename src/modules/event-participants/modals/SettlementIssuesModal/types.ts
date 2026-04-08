export interface FailedPayoutItem {
  name: string;
  reason: 'no_connect_account' | 'transfer_failed';
}

export interface SettlementIssuesModalProps {
  isVisible: boolean;
  onClose: () => void;
  failedPayouts: FailedPayoutItem[];
  successCount: number;
}
