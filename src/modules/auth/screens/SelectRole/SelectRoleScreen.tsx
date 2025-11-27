import { ImageBackground, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import { ICONS, IMAGES } from '@assets';
import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { CardSelector } from '@components';

export const SelectRoleScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [selectedValue, setSelectedValue] = useState('organization');

  return (
    <ImageBackground
      source={IMAGES.selectRoleBg}
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
            value: 'organization',
          },
          {
            title: 'Find a crowd',
            value: 'talent',
          },
        ]}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
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
