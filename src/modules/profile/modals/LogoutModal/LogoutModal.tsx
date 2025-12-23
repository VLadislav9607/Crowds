import { forwardRef, useState } from 'react';

import { AppModal } from '@components';
import { useImperativeModal } from '@hooks';
import { AppButton } from '@ui';
import { supabase, queryClient } from '@services';
import { goToScreen, Screens } from '@navigation';
import { showErrorToast } from '@helpers';

import { LogoutModalRef } from './types';
import { styles } from './styles';

export const LogoutModal = forwardRef<LogoutModalRef>((_, ref) => {
  const { isVisible, close } = useImperativeModal(ref);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      queryClient.clear();
      goToScreen(Screens.First);
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to logout';
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
        onPress={handleLogout}
        isLoading={isLoading}
      />
      <AppButton
        title="Cancel"
        size="60"
        variant="withBorder"
        onPress={close}
      />
    </AppModal>
  );
});

LogoutModal.displayName = 'LogoutModal';
