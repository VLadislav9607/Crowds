import { ImperativeModalRef } from '@hooks';

export interface ActionConfirmationModalRefProps {
  title: string;
  subtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void | Promise<void>;
}

export interface ActionConfirmationModalRef
  extends ImperativeModalRef<ActionConfirmationModalRefProps> {}
