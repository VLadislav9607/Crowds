import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { If, ScreenWrapper } from '@components';
import { AppButton, AppText } from '@ui';
import { IMAGES } from '@assets';
import {
  useCreateConnectAccount,
  useCreateConnectAccountLink,
  useCreateConnectLoginLink,
  useGetConnectAccount,
  useSyncConnectAccountStatus,
} from '@actions';
import { useRefetchQuery } from '@hooks';
import { showErrorToast } from '@helpers';
import { useConnectAccountSubscription } from '../../hooks/useConnectAccountSubscription';
import {
  ConnectStatus,
  getConnectStatus,
} from '../../helpers/getConnectStatus';
import { styles } from './styles';
import { COLORS } from '@styles';

const REDIRECT_URL_PREFIX =
  'https://mznllzlcwtonsjqvzpux.supabase.co/functions/v1/stripe-connect-redirect';

const STATUS_CONFIG: Record<
  ConnectStatus,
  {
    statusLabel: string;
    statusColor: string;
    description: string;
    boldWord?: string;
    buttonTitle: string;
  }
> = {
  not_connected: {
    statusLabel: 'Not Connected',
    statusColor: '#FFF3E0',
    description:
      'The Banking Process has been integrated with Stripe Connect; to ensure all your details stay safe on their platform.',
    boldWord: 'Stripe Connect',
    buttonTitle: 'Proceed to Add Details',
  },
  setup_incomplete: {
    statusLabel: 'Setup Incomplete',
    statusColor: '#FFF3E0',
    description:
      'Your Stripe Connect setup is incomplete. Please continue to finish connecting your bank account.',
    boldWord: 'Stripe Connect',
    buttonTitle: 'Continue Setup',
  },
  under_review: {
    statusLabel: 'Under Review',
    statusColor: '#E3F2FD',
    description:
      'Your account is being reviewed by Stripe. This usually takes a few minutes. Pull down to refresh.',
    buttonTitle: 'Continue Setup',
  },
  connected: {
    statusLabel: 'Connected',
    statusColor: '#E8F5E9',
    description:
      'Your Stripe Connect account is active and ready to receive payouts for completed events.',
    boldWord: 'Stripe Connect',
    buttonTitle: 'Manage Account',
  },
};

const renderDescription = (text: string, boldWord?: string) => {
  if (!boldWord || !text.includes(boldWord)) {
    return (
      <AppText
        typography="regular_14"
        color="black_60"
        style={styles.descriptionText}
      >
        {text}
      </AppText>
    );
  }

  const parts = text.split(boldWord);

  return (
    <AppText
      typography="regular_14"
      color="black_60"
      style={styles.descriptionText}
    >
      {parts[0]}
      <AppText typography="bold_14" color="main">
        {boldWord}
      </AppText>
      {parts[1]}
    </AppText>
  );
};

export const StripeConnectOnboardingScreen = () => {
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const {
    data: connectAccount,
    isLoading: isLoadingAccount,
    refetch,
  } = useGetConnectAccount();

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  useConnectAccountSubscription();

  const { mutate: syncStatus } = useSyncConnectAccountStatus();

  const status = getConnectStatus(connectAccount);
  const config = STATUS_CONFIG[status];

  const closeWebView = useCallback(() => {
    setWebViewUrl(null);
    syncStatus();
  }, [syncStatus]);

  const { mutate: createAccount, isPending: isCreating } =
    useCreateConnectAccount({
      onSuccess: data => {
        if (data.onboardingUrl) {
          setWebViewUrl(data.onboardingUrl);
        }
      },
      onError: (error: any) => {
        const msg = error?.message || error?.error || 'Unknown error';
        showErrorToast(`Failed to create Stripe account: ${msg}`);
      },
    });

  const { mutate: createLink, isPending: isCreatingLink } =
    useCreateConnectAccountLink({
      onSuccess: data => {
        if (data.url) {
          setWebViewUrl(data.url);
        }
      },
      onError: () => {
        showErrorToast('Failed to generate onboarding link. Please try again.');
      },
    });

  const { mutate: createLoginLink, isPending: isCreatingLoginLink } =
    useCreateConnectLoginLink({
      onSuccess: data => {
        if (data.url) {
          setWebViewUrl(data.url);
        }
      },
      onError: () => {
        showErrorToast('Failed to open account dashboard. Please try again.');
      },
    });

  const handleAction = () => {
    switch (status) {
      case 'not_connected':
        createAccount({});
        break;
      case 'setup_incomplete':
      case 'under_review':
        createLink({});
        break;
      case 'connected':
        createLoginLink({});
        break;
    }
  };

  const isActionLoading = isCreating || isCreatingLink || isCreatingLoginLink;

  return (
    <>
      <ScreenWrapper
        headerVariant="withTitleAndImageBg"
        title="Set Up Banking"
        containerStyle={{ paddingBottom: 0 }}
        contentContainerStyle={{ paddingBottom: 0 }}
        withBottomTabBar
      >
        <If condition={!isLoadingAccount}>
          <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingQuery}
                onRefresh={refetchQuery}
              />
            }
          >
            <View style={styles.descriptionContainer}>
              {renderDescription(config.description, config.boldWord)}
            </View>

            <View style={styles.statusBadgeContainer}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: config.statusColor },
                ]}
              >
                <AppText typography="bold_12" color="black">
                  {config.statusLabel}
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

            <View style={styles.bottomSection}>
              <AppButton
                title={config.buttonTitle}
                size="60"
                onPress={handleAction}
                isLoading={isActionLoading}
                isDisabled={isActionLoading}
                wrapperStyles={styles.buttonWrapper}
              />
            </View>
          </ScrollView>
        </If>
        <If condition={isLoadingAccount}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.main} />
          </View>
        </If>
      </ScreenWrapper>

      <Modal
        visible={!!webViewUrl}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeWebView}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeWebView}>
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
                  closeWebView();
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
};
