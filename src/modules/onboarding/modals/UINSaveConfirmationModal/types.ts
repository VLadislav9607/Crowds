import { ImperativeModalRef } from '@hooks';

export interface UINSaveConfirmationModalProps {
  onConfirm?: () => void;
  uin: string;
}

export type UINSaveConfirmationModalRef = ImperativeModalRef<UINSaveConfirmationModalProps>;
