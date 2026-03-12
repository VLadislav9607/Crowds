import { useRef, useState } from 'react';
import { View } from 'react-native';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useGetMe, useUpdateTalent, useCreateKycSession } from '@actions';

import { VerificationFailed, VerificationLoader } from '../../components';
import { useKycStatusSubscription, invalidateUserKycStatus } from '../../hooks';
import { styles } from './styles';

export const VerificationPersonScreen = () => {
  const { params, goBack } = useScreenNavigation<Screens.VerificationPerson>();
  const insets = useSafeAreaInsets();
  const { isTalent, talent, me } = useGetMe();
  const { mutateAsync: updateTalent } = useUpdateTalent();
  const { mutateAsync: createKycSession, isPending: isRetrying } =
    useCreateKycSession();
  const hasNavigatedRef = useRef(false);
  const [webViewError, setWebViewError] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState(params?.url || '');

  const handleVerificationSuccess = async () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    if (params?.userId) {
      await invalidateUserKycStatus(params.userId);
    }

    if (isTalent) {
      if ((talent?.onboarding_copleted_step ?? 0) < 2) {
        await updateTalent({
          id: me?.id || '',
          data: { onboarding_copleted_step: 2 },
        });
      }
      goBack();
    } else {
      goToScreen(Screens.BottomTabs);
    }
  };

  const handleRetry = async () => {
    const userId = me?.id || '';

    const response = await createKycSession({
      userId,
      firstName: me?.first_name || '',
      lastName: me?.last_name || '',
      dob: '2000-01-01',
    });

    if (response?.redirectUrl) {
      setWebViewUrl(response.redirectUrl);
      setVerificationFailed(false);
      setWebViewError(false);
      hasNavigatedRef.current = false;
    }
  };

  const handleNavigationRequest = ({ url }: { url: string }) => {
    if (
      (url.startsWith('myapp://') || url.includes('kyc/success')) &&
      !hasNavigatedRef.current
    ) {
      handleVerificationSuccess();
      return false;
    }
    return true;
  };

  useKycStatusSubscription({
    userId: params?.userId || '',
    enabled: !!params?.userId,
    onStatusChange: status => {
      if (status === 'completed') {
        handleVerificationSuccess();
      } else if (status === 'failed') {
        setVerificationFailed(true);
      }
    },
  });

  const renderContent = () => {
    if (verificationFailed) {
      return (
        <VerificationFailed onRetry={handleRetry} isLoading={isRetrying} />
      );
    }

    if (webViewError) {
      return <VerificationLoader />;
    }

    return (
      <WebView
        source={{ uri: webViewUrl }}
        allowsInlineMediaPlayback
        containerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        originWhitelist={['https://*', 'http://*', 'myapp://*']}
        onShouldStartLoadWithRequest={handleNavigationRequest}
        onError={() => setWebViewError(true)}
        onHttpError={() => setWebViewError(true)}
      />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};
