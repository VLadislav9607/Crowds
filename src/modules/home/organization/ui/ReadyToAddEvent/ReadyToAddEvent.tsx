import { StyleSheet, View } from 'react-native';

import { AppText, IconButton } from '@ui';
import { TYPOGRAPHY } from '@styles';
import { ICONS } from '@assets';

export const ReadyToAddEvent = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Ready to amplify your product/service with your dedicated crowd
      </AppText>
      <AppText style={styles.subtitle}>
        Tap the “+” and Let’s Get Started!
      </AppText>

      <IconButton icon={ICONS.plusSquare()} iconSize={112} onPress={() => {}} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    ...TYPOGRAPHY.bold_24,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.regular_14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
