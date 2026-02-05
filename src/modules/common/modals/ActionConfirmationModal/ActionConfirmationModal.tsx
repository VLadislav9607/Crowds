import { forwardRef } from 'react';
import { AppModal } from '@components';
import { useImperativeModal } from '@hooks';
import { AppButton } from '@ui';
import {
  ActionConfirmationModalRef,
  ActionConfirmationModalRefProps,
} from './types';
import { styles } from './styles';
import { useBoolean } from '@hooks';

export const ActionConfirmationModal = forwardRef<ActionConfirmationModalRef>(
  (_, ref) => {
    const { isVisible, close, refProps } =
      useImperativeModal<ActionConfirmationModalRefProps>(ref);
    const {
      value: isLoading,
      setTrue: setIsLoadingTrue,
      setFalse: setIsLoadingFalse,
    } = useBoolean(false);

    const handleClose = () => {
      if (isLoading) return;
      close();
    };

    const handleConfirm = async () => {
      const result = refProps?.onConfirm?.();

      if (result instanceof Promise) {
        setIsLoadingTrue();
        try {
          await result;
        } finally {
          close();
          setIsLoadingFalse();
        }
      } else {
        close();
      }
    };

    return (
      <AppModal
        hideToast={refProps?.hideToast}
        isVisible={isVisible}
        onClose={handleClose}
        title={refProps?.title}
        subtitle={refProps?.subtitle}
        subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}
      >
        <AppButton
          title={refProps?.confirmButtonText || 'Yes'}
          size="60"
          wrapperStyles={styles.logoutButton}
          mb={10}
          isLoading={isLoading}
          onPress={handleConfirm}
        />
        <AppButton
          title="Cancel"
          size="60"
          variant="withBorder"
          onPress={handleClose}
        />
      </AppModal>
    );
  },
);

ActionConfirmationModal.displayName = 'LogoutModal';
