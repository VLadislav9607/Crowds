import { AppModal } from "@components";
import { TalentLogoutModalRef } from "./types";
import { useImperativeModal } from "@hooks";
import { forwardRef } from "react";
import { AppButton } from "@ui";
import { styles } from "./styles";

export const TalentLogoutModal = forwardRef<TalentLogoutModalRef>((_, ref) => {

  const { isVisible, close } = useImperativeModal(ref);

  return (
    <AppModal isVisible={isVisible} onClose={close} title="Logout" subtitle="Are you sure you want to logout?" subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}>
      <AppButton title="Yes, logout" size="60" wrapperStyles={styles.logoutButton} mb={10} />
      <AppButton title="Cancel" size="60" variant="withBorder" onPress={close} />
    </AppModal>

  );
});

TalentLogoutModal.displayName = 'TalentLogoutModal';
