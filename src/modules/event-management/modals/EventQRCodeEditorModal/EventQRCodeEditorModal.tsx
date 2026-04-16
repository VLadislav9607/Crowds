import { AppModal } from '@components';
import { useImperativeModal } from '@hooks';
import {
  EventQRCodeEditorFormValues,
  EventQRCodeEditorModalRef,
  EventQRCodeEditorModalRefProps,
  eventQRCodeEditorSchema,
} from './types';
import { forwardRef, useEffect } from 'react';
import { AppButton, AppInput, AppText } from '@ui';
import { View } from 'react-native';
import { styles } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  useCreateEventQRCode,
  useEditEventQRCode,
  useGetEventQRCodeDetails,
} from '@actions';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

export const EventQRCodeEditorModal = forwardRef<EventQRCodeEditorModalRef>(
  (_, ref) => {
    const {
      mutate: createEventQRCodeMutate,
      isPending: isCreatingEventQRCode,
    } = useCreateEventQRCode({
      onError: showMutationErrorToast,
      onSuccess: () => {
        close();
        setTimeout(() => {
          showSuccessToast('QR Code created successfully');
        }, 500);
      },
    });

    const { isVisible, close, refProps } =
      useImperativeModal<EventQRCodeEditorModalRefProps>(ref, {
        onRefClose: () => {
          form.reset({ name: '' });
        },
      });

    const { data: qrCodeDetails, isLoading: isLoadingQRCodeDetails } =
      useGetEventQRCodeDetails(
        {
          qr_id: refProps.editingQRCodeId!,
        },
        { enabled: !!refProps.editingQRCodeId },
      );

    const { mutate: editEventQRCodeMutate, isPending: isEditingEventQRCode } =
      useEditEventQRCode({
        onError: showMutationErrorToast,
        onSuccess: () => {
          close();
          setTimeout(() => {
            showSuccessToast('QR Code updated successfully');
          }, 500);
        },
      });

    const form = useForm<EventQRCodeEditorFormValues>({
      resolver: zodResolver(eventQRCodeEditorSchema),
      defaultValues: {
        name: '',
      },
      mode: 'onChange',
    });

    const toMinutePrecisionISO = (date: Date) => {
      const d = new Date(date);
      d.setSeconds(0, 0);
      return d.toISOString();
    };

    // QR start_at is always set to checkinOpensAt (bump-in time)
    const getStartAt = () => {
      if (refProps.checkinOpensAt) {
        return toMinutePrecisionISO(new Date(refProps.checkinOpensAt));
      }
      return toMinutePrecisionISO(new Date(refProps.eventStartAt));
    };

    const onCreateEventQRCode = async (data: EventQRCodeEditorFormValues) =>
      createEventQRCodeMutate({
        name: data.name,
        start_at: getStartAt(),
        event_id: refProps.eventId,
      });

    const onEditEventQRCode = async (data: EventQRCodeEditorFormValues) =>
      editEventQRCodeMutate({
        qr_id: refProps.editingQRCodeId!,
        name: data.name,
        start_at: getStartAt(),
        event_id: refProps.eventId,
      });

    const onSubmit = (data: EventQRCodeEditorFormValues) => {
      refProps.editingQRCodeId
        ? onEditEventQRCode(data)
        : onCreateEventQRCode(data);
    };

    const showActionLoading = isCreatingEventQRCode || isEditingEventQRCode;

    useEffect(() => {
      if (isVisible && !refProps.editingQRCodeId) {
        form.reset({ name: '' });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, refProps.editingQRCodeId]);

    useEffect(() => {
      if (qrCodeDetails && isVisible) {
        form.reset({
          name: qrCodeDetails.qr_code.name,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrCodeDetails, isVisible]);

    const isEditing = !!refProps.editingQRCodeId;

    return (
      <AppModal
        title={isEditing ? 'Edit QR Code' : 'Generate QR Code'}
        isVisible={isVisible}
        onClose={close}
      >
        <View style={styles.container}>
          <Controller
            control={form.control}
            name="name"
            render={({ field: { onChange, value }, fieldState }) => (
              <AppInput
                label="QR Code Name"
                placeholder="e.g., Main Entrance, VIP Area"
                labelProps={{
                  typography: 'semibold_16',
                  color: isLoadingQRCodeDetails ? 'black_40' : 'black',
                }}
                value={value}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                skeleton={isLoadingQRCodeDetails}
                maxLength={120}
              />
            )}
          />

          <AppText typography="medium_12" color="gray_primary">
            Check-in time is set by the event's bump-in time.
          </AppText>
        </View>

        <AppButton
          isDisabled={isLoadingQRCodeDetails}
          isLoading={showActionLoading}
          title={isEditing ? 'Edit QR Code' : 'Generate QR Code'}
          size="56"
          wrapperStyles={styles.generateButton}
          onPress={form.handleSubmit(onSubmit)}
        />
        <AppButton
          isDisabled={isLoadingQRCodeDetails}
          title="Cancel"
          size="56"
          variant="withBorder"
          onPress={close}
        />
      </AppModal>
    );
  },
);
