import { AppModal, If } from '@components';
import {
  TalentEventApplyConfirmModalProps,
  TalentEventApplyConfirmModalRef,
} from './types';
import { AppButton, AppText } from '@ui';
import { useBoolean, useImperativeModal, ImperativeModalRef } from '@hooks';
import { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { formatInTimeZone } from 'date-fns-tz';
import { calculateEventDuration } from '../../../helpers';
import { styles } from './styles';

export const TalentEventApplyConfirmModal =
  forwardRef<TalentEventApplyConfirmModalRef>((_, ref) => {
    const {
      value: isSubmitted,
      toggle: toggleIsSubmitted,
      setFalse: setIsSubmittedFalse,
    } = useBoolean();

    const {
      value: isLoading,
      setTrue: setIsLoadingTrue,
      setFalse: setIsLoadingFalse,
    } = useBoolean();

    const innerRef =
      useRef<ImperativeModalRef<TalentEventApplyConfirmModalProps>>(null);

    const { isVisible, refProps, close } =
      useImperativeModal<TalentEventApplyConfirmModalProps>(innerRef, {
        onRefClose: () => {
          setIsSubmittedFalse();
          setIsLoadingFalse();
        },
      });

    const handleSuccess = useCallback(() => {
      setIsLoadingFalse();
      toggleIsSubmitted();
    }, [setIsLoadingFalse, toggleIsSubmitted]);

    const handleError = useCallback(() => {
      setIsLoadingFalse();
    }, [setIsLoadingFalse]);

    useImperativeHandle(
      ref,
      () => ({
        open: (data: TalentEventApplyConfirmModalProps) => {
          setIsSubmittedFalse();
          setIsLoadingFalse();
          innerRef.current?.open(data);
        },
        close,
        handleSuccess,
        handleError,
      }),
      [
        close,
        handleSuccess,
        handleError,
        setIsLoadingFalse,
        setIsSubmittedFalse,
      ],
    );

    const handleConfirm = () => {
      setIsLoadingTrue();
      refProps?.onConfirm?.();
    };

    const handleCancel = () => {
      close();
    };

    const handleDone = () => {
      close();
    };

    const title = isSubmitted
      ? 'Thank you! You have now applied for this job.'
      : 'You are about to apply for:';

    const formattedDate = refProps?.startAt
      ? formatInTimeZone(refProps.startAt, 'UTC', 'dd MMM, yyyy')
      : '';

    const eventDuration =
      refProps?.startAt && refProps?.endAt
        ? calculateEventDuration(refProps.startAt, refProps.endAt)
        : { formatted: '' };

    return (
      <AppModal title={title} isVisible={isVisible} onClose={close}>
        <If condition={isSubmitted}>
          <AppText typography="regular_14" color="black">
            If you are successful, you will be notified in your list of
            Successful Jobs. Please ensure you check your notificatons and
            messages. If you are not successful this will list in the rejected
            items. Currently the status is Pending.
          </AppText>
        </If>

        <View
          style={[
            styles.eventContainer,
            isSubmitted
              ? styles.eventContainerSubmitted
              : styles.eventContainerNotSubmitted,
          ]}
        >
          <AppText typography="bold_20" color="black" margin={{ bottom: 10 }}>
            {refProps?.eventTitle || ''}
          </AppText>

          {refProps?.formattedAddress ? (
            <AppText
              typography="regular_12"
              color="black"
              margin={{ bottom: 4 }}
            >
              {refProps.formattedAddress}
            </AppText>
          ) : null}
          {formattedDate ? (
            <AppText
              typography="regular_12"
              color="black"
              margin={{ bottom: 4 }}
            >
              {formattedDate}
            </AppText>
          ) : null}
          {eventDuration.formatted ? (
            <AppText typography="regular_12" color="black">
              Duration {eventDuration.formatted}
            </AppText>
          ) : null}
        </View>

        <If condition={!isSubmitted}>
          <AppButton
            title="Cancel"
            variant="withBorder"
            onPress={handleCancel}
            size="60"
            wrapperStyles={styles.cancelButton}
            isDisabled={isLoading}
          />
          <AppButton
            title="Submit application"
            onPress={handleConfirm}
            size="60"
            isLoading={isLoading}
          />
        </If>

        <If condition={isSubmitted}>
          <AppButton title="Done" onPress={handleDone} size="60" />
        </If>
      </AppModal>
    );
  });

TalentEventApplyConfirmModal.displayName = 'TalentEventApplyConfirmModal';
