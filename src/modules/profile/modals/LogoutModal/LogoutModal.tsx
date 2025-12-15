import { forwardRef } from 'react';

import { AppModal } from '@components';
import { useImperativeModal } from '@hooks';
import { AppButton } from '@ui';

import { LogoutModalRef } from './types';
import { styles } from './styles';

export const LogoutModal = forwardRef<LogoutModalRef>((_, ref) => {
  const { isVisible, close } = useImperativeModal(ref);

  return (
    <AppModal
      isVisible={isVisible}
      onClose={close}
      title="Logout"
      subtitle="Are you sure you want to logout?"
      subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}
    >
      <AppButton
        title="Yes, logout"
        size="60"
        wrapperStyles={styles.logoutButton}
        mb={10}
      />
      <AppButton title="Cancel" size="60" variant="withBorder" onPress={close} />
    </AppModal>
  );
});

LogoutModal.displayName = 'LogoutModal';


