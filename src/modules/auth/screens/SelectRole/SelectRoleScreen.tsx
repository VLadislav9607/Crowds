import { ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import { ICONS, IMAGES } from '@assets';
import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { CardSelector } from '@components';
import { Role } from '@modules/common';
import { goToScreen, Screens } from '@navigation';

export const SelectRoleScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={IMAGES.blackCrowdBg}
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <SvgXml
        xml={ICONS.fullLogo()}
        width={164}
        height={34}
        style={styles.fullLogo}
      />
      <AppText style={styles.title}>Do you want to...</AppText>

      <CardSelector
        cards={[
          {
            title: 'Be the crowd',
            value: Role.TALENT,
          },
          {
            title: 'Find a crowd',
            value: Role.ORGANIZATION,
          },
        ]}
        selectedValue={Role.TALENT}
        onSelect={value =>
          goToScreen(
            value === Role.ORGANIZATION
              ? Screens.OnboardingOrganization
              : Screens.OnboardingTalent,
          )
        }
        cardStyles={styles.card}
        cardTextStyles={styles.cardText}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 38,
  },
  fullLogo: {
    marginTop: 25,
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 39,
    marginBottom: 76,
  },
  card: {
    height: 160,
  },
  cardText: {
    ...TYPOGRAPHY.bold_32,
    letterSpacing: -0.01,
  },
});
