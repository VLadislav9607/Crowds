import { ScreenWithScrollWrapper } from '@components';
import { AppButton, AppInput } from '@ui';
import { View } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { useRenameEventsFolder } from '@actions';
import { showMutationErrorToast } from '@helpers';

export const RenameEventsFolder = () => {
  const { params } = useScreenNavigation<Screens.RenameEventsFolder>();

  const { mutate: renameEventsFolder, isPending } = useRenameEventsFolder({
    onError: showMutationErrorToast,
    onSuccess: () => {
      goBack();
    },
  });

  const [folderName, setFolderName] = useState(params?.folderName ?? '');

  const onRenameFolder = () => {
    renameEventsFolder({
      folder_id: params?.folderId ?? '',
      name: folderName,
    });
  };

  const isDisabled = !folderName.trim() || folderName === params?.folderName;

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title="Rename Folder"
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
        title="Rename"
        wrapperStyles={styles.button}
        isDisabled={isDisabled}
        onPress={onRenameFolder}
      />
    </ScreenWithScrollWrapper>
  );
};
