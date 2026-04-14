export interface SettlementPreview {
  totalChargeCents: number;
  surchargeCents: number;
  talentPayoutCents: number;
  selectedCount: number;
  refundCents: number;
  crowdsEarnings: number;
}

export interface SettlementConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  preview: SettlementPreview;
}
