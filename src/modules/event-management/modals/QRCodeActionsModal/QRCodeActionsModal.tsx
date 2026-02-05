import { AppBottomSheet } from '@components';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheetData } from '@hooks';
import { COLORS } from '@styles';
import { AppButton } from '@ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { QRCodeActionsModalData, QRCodeActionsModalProps } from './types';
import {
  ActionConfirmationModal,
  ActionConfirmationModalRef,
} from '@modules/common';
import { useRef } from 'react';
import { useDeleteEventQRCode } from '@actions';
import { showMutationErrorToast } from '@helpers';
import {
  EventQRCodeEditorModal,
  EventQRCodeEditorModalRef,
} from '../EventQRCodeEditorModal';

export const QRCodeActionsModal = ({
  bottomSheetRef,
}: QRCodeActionsModalProps) => {
  const insets = useSafeAreaInsets();
  const actionConfirmationModalRef = useRef<ActionConfirmationModalRef>(null);
  const eventQRCodeEditorModalRef = useRef<EventQRCodeEditorModalRef>(null);
  const { mutateAsync: deleteEventQRCodeMutateAsync } = useDeleteEventQRCode({
    onError: showMutationErrorToast,
    onSuccess: () => {
      bottomSheetRef?.current?.close();
    },
  });

  const { data, modalRef } =
    useBottomSheetData<QRCodeActionsModalData>(bottomSheetRef);

  return (
    <>
      <AppBottomSheet
        bottomSheetRef={modalRef}
        snapPoints={[145 + insets.bottom]}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.buttonsWrapper}>
          <AppButton
            title="Edit QR Code"
            titleStyles={{ color: COLORS.black }}
            wrapperStyles={{ borderColor: COLORS.black }}
            size="50"
            variant="withBorder"
            onPress={() => {
              modalRef.current?.close();
              eventQRCodeEditorModalRef.current?.open({
                eventId: data?.eventId!,
                editingQRCodeId: data?.qrCodeId!,
              });
            }}
          />

          <AppButton
            title="Delete QR Code"
            titleStyles={{ color: COLORS.red }}
            wrapperStyles={{ borderColor: COLORS.red }}
            size="50"
            variant="withBorder"
            onPress={() => {
              modalRef.current?.close();
              actionConfirmationModalRef.current?.open({
                hideToast: true,
                title: 'Delete QR Code',
                subtitle: `Are you sure you want to delete this QR code - "${data?.qrCodeName}"?`,
                onConfirm: async () => {
                  await deleteEventQRCodeMutateAsync({
                    qr_id: data?.qrCodeId!,
                    event_id: data?.eventId!,
                  });
                },
              });
            }}
          />
        </BottomSheetView>
      </AppBottomSheet>

      <ActionConfirmationModal ref={actionConfirmationModalRef} />
      <EventQRCodeEditorModal ref={eventQRCodeEditorModalRef} />
    </>
  );
};
