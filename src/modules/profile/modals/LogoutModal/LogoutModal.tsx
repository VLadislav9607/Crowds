import { AppModal } from "@components";
import { LogoutModalRef } from "./types";
import { useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { AppButton } from "@ui";
import { styles } from "./styles";
import { supabase, queryClient } from "@services";
import { navigationRef, Screens } from "@navigation";

export const LogoutModal = forwardRef<LogoutModalRef>((_, ref) => {

  const { isVisible, close } = useImperativeModal(ref);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      queryClient.clear();
      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 0,
          routes: [{ name: Screens.First }],
        });
      }
      close();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppModal isVisible={isVisible} onClose={close} title="Logout" subtitle="Are you sure you want to logout?" subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}>
      <AppButton title="Yes, logout" size="60" wrapperStyles={styles.logoutButton} mb={10} onPress={handleLogout} />
      <AppButton title="Cancel" size="60" variant="withBorder" onPress={close} />
    </AppModal>

  );
});

LogoutModal.displayName = 'LogoutModal';

