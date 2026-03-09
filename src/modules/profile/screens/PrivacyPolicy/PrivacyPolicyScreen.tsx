import WebView from 'react-native-webview';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { goBack } from '@navigation';

const PRIVACY_URL = 'https://crowdsnow.com/privacy-policy/';

export const PrivacyPolicyScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <SvgXml xml={ICONS.goBackArrow()} width={24} height={24} />
      </TouchableOpacity>
      <WebView source={{ uri: PRIVACY_URL }} style={styles.webView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  webView: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
