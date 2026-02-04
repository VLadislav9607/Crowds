import { AppDateInput, AppModal } from '@components';
import { useImperativeModal } from '@hooks';
import {
  EventQRCodeEditorFormValues,
  CreateEventQRCodeModalRef,
  eventQRCodeEditorSchema,
} from './types';
import { forwardRef, useEffect } from 'react';
import { CreateEventQRCodeModalRefProps } from './types';
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

export const EventQRCodeEditorModal = forwardRef<CreateEventQRCodeModalRef>(
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
      useImperativeModal<CreateEventQRCodeModalRefProps>(ref, {
        onRefClose: () => {
          form.reset({
            name: '',
            checkIn: undefined as unknown as Date,
            checkOut: undefined as unknown as Date,
          });
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
        checkIn: undefined as unknown as Date,
        checkOut: undefined as unknown as Date,
      },
      mode: 'onChange',
    });

    const checkIn = form.watch('checkIn');
    const checkOut = form.watch('checkOut');

    const onCreateEventQRCode = async (data: EventQRCodeEditorFormValues) =>
      createEventQRCodeMutate({
        name: data.name,
        start_at: data.checkIn.toISOString(),
        end_at: data.checkOut.toISOString(),
        event_id: refProps.eventId,
      });

    const onEditEventQRCode = async (data: EventQRCodeEditorFormValues) =>
      editEventQRCodeMutate({
        qr_id: refProps.editingQRCodeId!,
        name: data.name,
        start_at: data.checkIn.toISOString(),
        end_at: data.checkOut.toISOString(),
        event_id: refProps.eventId,
      });

    const onSubmit = (data: EventQRCodeEditorFormValues) => {
      refProps.editingQRCodeId
        ? onEditEventQRCode(data)
        : onCreateEventQRCode(data);
    };

    const showActionLoading = isCreatingEventQRCode || isEditingEventQRCode;

    useEffect(() => {
      if (qrCodeDetails && isVisible) {
        console.log(qrCodeDetails.qr_code);
        form.reset({
          name: qrCodeDetails.qr_code.name,
          checkIn: new Date(qrCodeDetails.qr_code.start_at),
          checkOut: new Date(qrCodeDetails.qr_code.end_at),
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrCodeDetails, isVisible]);

    return (
      <AppModal title="Generate QR Code" isVisible={isVisible} onClose={close}>
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

          <Controller
            control={form.control}
            name="checkIn"
            render={({ field: { onChange, value }, fieldState }) => (
              <AppDateInput
                label="Check-in"
                placeholder="Select Check-in date and time"
                mode="datetime"
                defaultIconColor="dark_gray"
                labelProps={{
                  typography: 'semibold_16',
                  color: isLoadingQRCodeDetails ? 'black_40' : 'black',
                }}
                value={value}
                onChange={onChange}
                errorMessage={fieldState.error?.message}
                minimumDate={new Date()}
                maximumDate={checkOut}
                skeleton={isLoadingQRCodeDetails}
              />
            )}
          />

          <Controller
            control={form.control}
            name="checkOut"
            render={({ field: { onChange, value }, fieldState }) => (
              <AppDateInput
                minimumDate={checkIn}
                label="Check-out"
                placeholder="Select Check-out date and time"
                mode="datetime"
                defaultIconColor="dark_gray"
                labelProps={{
                  typography: 'semibold_16',
                  color: isLoadingQRCodeDetails ? 'black_40' : 'black',
                }}
                value={value}
                onChange={onChange}
                errorMessage={fieldState.error?.message}
                skeleton={isLoadingQRCodeDetails}
              />
            )}
          />

          <AppText typography="medium_12" color="gray_primary">
            Attendees can only check in/out within the specified time window.
            The QR code will be inactive outside these hours.
          </AppText>
        </View>

        <AppButton
          isDisabled={isLoadingQRCodeDetails}
          isLoading={showActionLoading}
          title="Generate QR Code"
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
