import { AppBottomSheet } from '@components';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheetData } from '@hooks';
import { COLORS } from '@styles';
import { AppButton } from '@ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { goBack, goToScreen, Screens } from '@navigation';
import {
  EventsFolderActionsModalData,
  EventsFolderActionsModalProps,
} from './types';
import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';
import { useRef } from 'react';
import { useDeleteEventsFolder } from '@actions';
import { showMutationErrorToast } from '@helpers';

export const FolderActionButtonsModal = ({
  bottomSheetRef,
}: EventsFolderActionsModalProps) => {
  const insets = useSafeAreaInsets();
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);

  const { data, modalRef } =
    useBottomSheetData<EventsFolderActionsModalData>(bottomSheetRef);

  const { mutateAsync: deleteEventsFolderAsync } = useDeleteEventsFolder({
    onError: showMutationErrorToast,
    onSuccess: goBack,
  });

  return (
    <>
      <AppBottomSheet
        bottomSheetRef={modalRef}
        snapPoints={[145 + insets.bottom]}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.buttonsWrapper}>
          <AppButton
            title="Rename Folder"
            titleStyles={{ color: COLORS.black }}
            wrapperStyles={{ borderColor: COLORS.black }}
            size="50"
            variant="withBorder"
            onPress={() => {
              modalRef.current?.close();
              goToScreen(Screens.RenameEventsFolder, {
                folderId: data?.folderId!,
                folderName: data?.folderName!,
              });
            }}
          />
          <AppButton
            title="Delete Folder"
            titleStyles={{ color: COLORS.red }}
            wrapperStyles={{ borderColor: COLORS.red }}
            size="50"
            variant="withBorder"
            onPress={() => {
              modalRef.current?.close();
              actionConfirmationModalRef.current?.open({
                title: 'Delete Folder',
                subtitle: 'Are you sure you want to delete this folder?',
                onConfirm: async () => {
                  await deleteEventsFolderAsync({
                    folder_id: data?.folderId!,
                  });
                },
              });
            }}
          />
        </BottomSheetView>
      </AppBottomSheet>

      <ActionConfirmationModal ref={actionConfirmationModalRef} />
    </>
  );
};
