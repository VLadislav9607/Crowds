import { useState, useRef, useCallback } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { useCreatePaymentIntent, useConfirmEventPublication } from '@actions';
import { showErrorToast } from '@helpers';
import {
  PaymentConfirmationModalRef,
  PaymentConfirmationData,
} from '../../../modals';

export const usePaymentFlow = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentConfirmationModalRef = useRef<PaymentConfirmationModalRef>(null);

  const { mutateAsync: createPaymentIntent } = useCreatePaymentIntent();
  const { mutateAsync: confirmPublication } = useConfirmEventPublication();

  const startPaymentFlow = useCallback(
    async (eventId: string) => {
      try {
        setIsProcessing(true);

        // Create payment intent on the server (no modal — shown before this)
        const paymentData = await createPaymentIntent({ eventId });

        setIsProcessing(false);
        return paymentData;
      } catch (error) {
        setIsProcessing(false);
        showErrorToast('Failed to prepare payment. Please try again.');
        throw error;
      }
    },
    [createPaymentIntent],
  );

  const processPayment = useCallback(
    async (
      data: PaymentConfirmationData & {
        clientSecret?: string;
        paymentIntentId?: string;
      },
    ) => {
      try {
        setIsProcessing(true);

        let clientSecret = data.clientSecret;
        let paymentIntentId = data.paymentIntentId;

        if (!clientSecret) {
          const paymentData = await createPaymentIntent({
            eventId: data.eventId,
          });
          clientSecret = paymentData.clientSecret;
          paymentIntentId = paymentData.paymentIntentId;
        }

        // Initialize Stripe PaymentSheet
        const { error: initError } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret!,
          merchantDisplayName: 'CrowdsNow',
        });

        if (initError) {
          setIsProcessing(false);
          showErrorToast(initError.message || 'Failed to initialize payment.');
          return { success: false };
        }

        // Present the PaymentSheet
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          setIsProcessing(false);
          if (presentError.code === 'Canceled') {
            return { success: false, cancelled: true };
          }
          showErrorToast(
            presentError.message || 'Payment failed. Please try again.',
          );
          return { success: false };
        }

        // Confirm event publication on the server
        const result = await confirmPublication({
          eventId: data.eventId,
          paymentIntentId: paymentIntentId!,
        });

        setIsProcessing(false);

        if (
          result.status === 'aml_pending' ||
          result.status === 'aml_blocked'
        ) {
          return {
            success: false,
            amlStatus: result.status,
            message:
              result.message ||
              'We are reviewing your compliance status. We will get back to you.',
          };
        }

        return { success: true };
      } catch (error: any) {
        setIsProcessing(false);
        const errorMessage =
          error?.message || error?.error || 'Payment processing failed.';
        if (
          errorMessage.includes('compliance') ||
          errorMessage.includes('aml')
        ) {
          return {
            success: false,
            amlStatus: 'aml_blocked',
            message:
              'We are reviewing your compliance status. We will get back to you.',
          };
        }
        showErrorToast('Payment processing failed. Please try again.');
        return { success: false };
      }
    },
    [
      createPaymentIntent,
      initPaymentSheet,
      presentPaymentSheet,
      confirmPublication,
    ],
  );

  return {
    paymentConfirmationModalRef,
    startPaymentFlow,
    processPayment,
    isProcessing,
  };
};
