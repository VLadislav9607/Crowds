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
  initialValue?: string;
  isEdit?: boolean;
}

export const CreateEditCustomList = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading = false,
  initialValue = '',
  isEdit = false,
}: CreateListModalProps) => {
  const [listName, setListName] = useState('');

  useEffect(() => {
    if (isVisible) {
      setListName(initialValue);
    } else if (!isLoading) {
      setListName('');
    }
  }, [isVisible, isLoading, initialValue]);

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
      title={isEdit ? 'Edit List Name' : 'Create a List'}
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
          title={isEdit ? 'Save' : 'Create'}
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
