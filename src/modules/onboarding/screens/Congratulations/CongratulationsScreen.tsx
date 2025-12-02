import { StyleSheet } from 'react-native';

import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { Role } from '@modules/common';

import { BlackOnboardingScreenLayout } from '../../layouts';
import { useCongratulationsScreen } from './hooks';

export const CongratulationsScreen = () => {
  const { buttons, role } = useCongratulationsScreen();

  return (
    <BlackOnboardingScreenLayout title="Congratulations!" buttons={buttons}>
      <AppText
        renderIf={role === Role.ORGANIZATION}
        style={styles.finalOrganizationText}
      >
        {`You’ve now joined the Crowds Now community. Would you like to invite your team members now and start building your team?
        \n If you skip this step, you’ll still be able to invite your team later from the settings.`}
      </AppText>

      <AppText renderIf={role === Role.TALENT} style={styles.finalTalentText}>
        You’re all setup.
      </AppText>
    </BlackOnboardingScreenLayout>
  );
};

const styles = StyleSheet.create({
  finalOrganizationText: {
    color: COLORS.white,
    ...TYPOGRAPHY.regular_16,
    letterSpacing: -0.02,
    textAlign: 'center',
  },
  finalTalentText: {
    marginTop: -14,
    color: COLORS.white,
    ...TYPOGRAPHY.regular_18,
    textAlign: 'center',
    marginBottom: '50%',
  },
});
