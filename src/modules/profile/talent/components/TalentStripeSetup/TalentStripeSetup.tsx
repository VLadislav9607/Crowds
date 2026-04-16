import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { TalentStripeSetupProps, TalentStripeSetupRef } from './types';
import { IMAGES } from '@assets';
import { Image } from 'react-native';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateConnectAccount, useCreateConnectAccountLink, useSyncConnectAccountStatus } from '@actions';
import { showErrorToast } from '@helpers';
import { SUPABASE_URL } from '@env';

const REDIRECT_URL_PREFIX = `${SUPABASE_URL}/functions/v1/stripe-connect-redirect`;

export const TalentStripeSetup = forwardRef<
  TalentStripeSetupRef,
  TalentStripeSetupProps
>(({ onSuccess }: TalentStripeSetupProps, ref) => {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const [refreshAttempts, setRefreshAttempts] = useState(0);

  const { mutate: syncStatus } = useSyncConnectAccountStatus();

  const closeWebView = useCallback(() => {
    setWebViewUrl(null);
    syncStatus();
    onSuccess?.();
  }, [syncStatus, onSuccess]);

  const { mutate: createLink } = useCreateConnectAccountLink({
    onSuccess: data => {
      if (data.url) {
        setWebViewUrl(data.url);
      }
    },
    onError: () => {
      showErrorToast(
        'Could not connect to Stripe. You can finish setup later from Banking in your profile.',
      );
    },
  });

  const { mutate: createAccount, isPending: isCreating } =
    useCreateConnectAccount({
      onSuccess: data => {
        if (data.onboardingUrl) {
          setRefreshAttempts(0);
          setWebViewUrl(data.onboardingUrl);
        }
      },
      onError: (error: any) => {
        const msg = error?.message || error?.error || 'Unknown error';
        showErrorToast(`Failed to create Stripe account: ${msg}`);
      },
    });

  useImperativeHandle(ref, () => ({
    onSetup: () => createAccount({}),
  }));

  return (
    <>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <AppText
            typography="regular_14"
            color="black_60"
            style={styles.descriptionText}
          >
            The Banking Process has been integrated with{' '}
            <AppText typography="bold_14" color="main">
              Stripe Connect
            </AppText>
            ; to ensure all your details stay safe on their platform.{'\n\n'}
            If you have an email address already linked to an existing bank account you can use that; alternatively you can use a new email address and Stripe will walk you through a validation process so you can add your preferred banking details.
          </AppText>
        </View>

        <View style={styles.statusBadgeContainer}>
          <View style={styles.statusBadge}>
            <AppText typography="bold_12" color="black">
              Not Connected
            </AppText>
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Image
            source={IMAGES.stripeConnect}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

      </View>

      <Modal
        visible={!!webViewUrl}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setWebViewUrl(null);
          syncStatus();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setWebViewUrl(null);
                syncStatus();
              }}
            >
              <AppText typography="bold_16" color="main">
                Close
              </AppText>
            </TouchableOpacity>
          </View>

          {webViewUrl && (
            <WebView
              source={{ uri: webViewUrl }}
              style={styles.webView}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              onShouldStartLoadWithRequest={request => {
                if (request.url.startsWith(REDIRECT_URL_PREFIX)) {
                  const urlObj = new URL(request.url);
                  const type = urlObj.searchParams.get('type');
                  if (type === 'refresh') {
                    setWebViewUrl(null);
                    if (refreshAttempts < 1) {
                      setRefreshAttempts(prev => prev + 1);
                      createLink({});
                    } else {
                      setRefreshAttempts(0);
                      syncStatus();
                      showErrorToast(
                        'Could not connect to Stripe. You can finish setup later from Banking in your profile.',
                      );
                    }
                  } else {
                    closeWebView();
                  }
                  return false;
                }
                return true;
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </>
  );
});

TalentStripeSetup.displayName = 'TalentStripeSetup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  descriptionText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  statusBadgeContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  illustration: {
    width: 220,
    height: 220,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  buttonWrapper: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  webView: {
    flex: 1,
  },
});
