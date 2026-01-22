import { ScreenWithScrollWrapper } from '@components';
import { AppButton, AppInput } from '@ui';
import { View } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import { useCreateEventsFolder } from '@actions';
import { goBack } from '@navigation';
import { showMutationErrorToast } from '@helpers';

export const CreateEventsFolder = () => {
  const [folderName, setFolderName] = useState('');

  const { mutateAsync: createEventsFolderMutateAsync, isPending } =
    useCreateEventsFolder({
      onSuccess: () => {
        goBack();
      },
      onError: showMutationErrorToast,
    });

  const handleCreateEventsFolder = async () => {
    await createEventsFolderMutateAsync({
      name: folderName,
    });
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title="Create a new Folder"
      showLoader={isPending}
      headerStyles={styles.headerStyles}
    >
      <View style={styles.container}>
        <AppInput
          autoFocus
          label="Enter your Folder’s Name"
          placeholder="Enter folder name"
          value={folderName}
          onChangeText={setFolderName}
          maxLength={40}
        />
      </View>

      <AppButton
        onPress={handleCreateEventsFolder}
        title="Create"
        wrapperStyles={styles.button}
        isDisabled={!folderName}
      />
    </ScreenWithScrollWrapper>
  );
};
