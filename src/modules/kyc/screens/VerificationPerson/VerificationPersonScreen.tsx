import { useRef } from 'react';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useGetMe } from '@actions';

import { useKycStatusSubscription, invalidateUserKycStatus } from '../../hooks';

export const VerificationPersonScreen = () => {
  const { params, goBack } = useScreenNavigation<Screens.VerificationPerson>();
  const { isTalent } = useGetMe();
  const hasNavigatedRef = useRef(false);

  const handleVerificationSuccess = async () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    // Invalidate the KYC status query so it refetches on the previous screen
    if (params?.userId) {
      await invalidateUserKycStatus(params.userId);
    }

    if (isTalent) {
      goBack();
    } else {
      goToScreen(Screens.BottomTabs);
    }
  };

  useKycStatusSubscription({
    userId: params?.userId || '',
    enabled: !!params?.userId,
    onStatusChange: status => {
      console.log('status', status);
      if (status === 'completed') {
        handleVerificationSuccess();
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: params?.url || '' }}
        originWhitelist={['https://*', 'http://*', 'myapp://*']}
        onShouldStartLoadWithRequest={({ url }) => {
          if (
            (url.startsWith('myapp://') || url.includes('kyc/success')) &&
            !hasNavigatedRef.current
          ) {
            handleVerificationSuccess();
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};
