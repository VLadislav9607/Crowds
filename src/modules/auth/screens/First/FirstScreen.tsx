import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import { ICONS, IMAGES } from '@assets';
import { AppButton, AppText } from '@ui';
import { TYPOGRAPHY, COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';

export const FirstScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={IMAGES.splash}
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={styles.overlay} />

      <SvgXml xml={ICONS.firstScreenLogo()} style={styles.appName} />

      <AppText style={styles.text} color="white">
        {`The World Leading Market Place for Crowds On Demand!`}
      </AppText>

      <AppButton
        title="Get Started"
        onPress={() => goToScreen(Screens.SelectRole)}
        variant="primary"
        size="56"
      />
      <AppButton
        title="Login"
        onPress={() => goToScreen(Screens.SignIn)}
        variant="withBorder"
        size="56"
        titleStyles={styles.loginButtonText}
        wrapperStyles={styles.loginButton}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    marginTop: 28,
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    ...TYPOGRAPHY.bold_40,
  },
  appName: {
    marginTop: 26,
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.white,
    marginBottom: 10,
  },
  loginButtonText: {
    color: COLORS.white,
  },
});
