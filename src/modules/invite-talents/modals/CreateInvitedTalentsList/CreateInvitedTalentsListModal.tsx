import { View } from 'react-native';
import { useEffect } from 'react';

import { AppModal } from '@components';
import { AppButton, AppInput } from '@ui';

import { styles } from './styles';
import { useState } from 'react';

interface CreateListModalProps {
  isVisible: boolean;
  onConfirm: (listName: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const CreateInvitedTalentsListModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading = false,
}: CreateListModalProps) => {
  const [listName, setListName] = useState('');

  useEffect(() => {
    if (!isVisible && !isLoading) {
      setListName('');
    }
  }, [isVisible, isLoading]);

  const handleCancel = () => {
    if (isLoading) return;
    onClose();
    setListName('');
  };

  const handleConfirm = () => {
    if (isLoading || !listName.trim()) return;
    onConfirm(listName.trim());
  };

  return (
    <AppModal
      title="Create a List"
      hideCloseButton
      isVisible={isVisible}
      onClose={handleCancel}
    >
      <AppInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
      />

      <View style={styles.buttonsContainer}>
        <AppButton
          title="Cancel"
          size="37"
          width={74}
          variant="withBorder"
          onPress={handleCancel}
          isDisabled={isLoading}
        />
        <AppButton
          title="Create"
          size="37"
          width={74}
          onPress={handleConfirm}
          isLoading={isLoading}
          isDisabled={isLoading || !listName.trim()}
        />
      </View>
    </AppModal>
  );
};
