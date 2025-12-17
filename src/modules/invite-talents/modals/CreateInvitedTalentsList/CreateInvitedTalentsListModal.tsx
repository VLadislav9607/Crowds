import { View } from 'react-native';

import { AppModal } from '@components';
import { AppButton, AppInput } from '@ui';

import { styles } from './styles';
import { useState } from 'react';

interface CreateListModalProps {
  isVisible: boolean;
  onConfirm: (listName: string) => void;
  onClose: () => void;
}

export const CreateInvitedTalentsListModal = ({
  isVisible,
  onClose,
  onConfirm,
}: CreateListModalProps) => {
  const [listName, setListName] = useState('');

  const handleCancel = () => {
    onClose();
    setListName('');
  };

  const handleConfirm = () => {
    onConfirm(listName);
    onClose();
    setListName('');
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
        />
        <AppButton
          title="Create"
          size="37"
          width={74}
          onPress={handleConfirm}
        />
      </View>
    </AppModal>
  );
};
