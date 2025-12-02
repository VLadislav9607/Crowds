import { Pressable, StyleSheet, View } from 'react-native';

import { goToScreen, Screens } from '@navigation';
import { AppText } from '@ui';
import { COLORS } from '@styles';
import { Role } from '@modules/common';

import { BlackOnboardingScreenLayout } from '../../../layouts';

export const TermsAndPrivacyScreen = () => {
  const buttons = [
    {
      title: 'Register',
      onPress: () =>
        goToScreen(Screens.Congratulations, { role: Role.ORGANIZATION }),
    },
  ];

  return (
    <BlackOnboardingScreenLayout
      title="Almost there!"
      buttonsLabel="Help & Support"
      buttons={buttons}
    >
      <View>
        <AppText typography="regular_16" style={styles.noteText}>
          By signing up to Crowds Now you agree to our
        </AppText>

        <View style={styles.termsContainer}>
          <Pressable style={styles.termsButton} onPress={() => {}}>
            <AppText typography="bold_16" color="white">
              Terms of Service
            </AppText>
          </Pressable>
          <AppText typography="regular_14" color="white">
            &
          </AppText>
          <Pressable style={styles.termsButton} onPress={() => {}}>
            <AppText typography="bold_16" color="white">
              Privacy Policy
            </AppText>
          </Pressable>
        </View>
      </View>

      <AppText typography="bold_14" style={styles.noteText}>
        Note:
        <AppText typography="regular_14" style={styles.noteText}>
          By signing up to Crowds Now you agree to our NDA and Confidentiality.
          Breaches of this may see you permanently banned from the platform
        </AppText>
      </AppText>

      <AppText typography="regular_10" style={styles.noteText}>
        All Notifications are received in app. Notifications for jobs cannot be
        turned off, but you can silent them with your phone.
      </AppText>
    </BlackOnboardingScreenLayout>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 8,
    marginHorizontal: 'auto',
  },
  termsButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.main,
  },
  noteText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
