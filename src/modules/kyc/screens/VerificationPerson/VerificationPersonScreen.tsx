import { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useGetMe } from '@actions';
import { AppText } from '@ui';
import { COLORS } from '@styles';

import { useKycStatusSubscription, invalidateUserKycStatus } from '../../hooks';
import { styles } from './styles';

export const VerificationPersonScreen = () => {
  const { params, goBack } = useScreenNavigation<Screens.VerificationPerson>();
  const { isTalent } = useGetMe();
  const hasNavigatedRef = useRef(false);
  const [webViewError, setWebViewError] = useState(false);

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
      if (status === 'completed') {
        handleVerificationSuccess();
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {webViewError ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.main} />
          <AppText typography="medium_16" color="gray_primary">
            Completing verification...
          </AppText>
        </View>
      ) : (
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
          onError={() => setWebViewError(true)}
          onHttpError={() => setWebViewError(true)}
        />
      )}
    </SafeAreaView>
  );
};
