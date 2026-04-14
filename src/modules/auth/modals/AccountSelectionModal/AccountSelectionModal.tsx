import { forwardRef } from 'react';
import { AppModal } from '@components';
import { AppButton } from '@ui';
import { useImperativeModal, ImperativeModalRef } from '@hooks';
import { LoginAccountOption } from '@actions';
import { StyleSheet } from 'react-native';

export interface AccountSelectionModalRefProps {
  accounts: LoginAccountOption[];
  onSelect: (accountType: 'organization' | 'talent') => void;
}

export type AccountSelectionModalRef =
  ImperativeModalRef<AccountSelectionModalRefProps>;

export const AccountSelectionModal = forwardRef<
  AccountSelectionModalRef,
  {}
>((_, ref) => {
  const { isVisible, refProps, close } = useImperativeModal(ref);

  const handleSelect = (type: 'organization' | 'talent') => {
    close();
    refProps.onSelect?.(type);
  };

  return (
    <AppModal
      isVisible={isVisible}
      onClose={close}
      title="Choose your profile"
      subtitle="Which profile would you like to sign in to?"
      subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}
    >
      <AppButton
        title="Find the Crowd"
        size="60"
        wrapperStyles={styles.button}
        onPress={() => handleSelect('organization')}
      />
      <AppButton
        title="Be the Crowd"
        size="60"
        variant="withBorder"
        onPress={() => handleSelect('talent')}
      />
    </AppModal>
  );
});

AccountSelectionModal.displayName = 'AccountSelectionModal';

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
});
