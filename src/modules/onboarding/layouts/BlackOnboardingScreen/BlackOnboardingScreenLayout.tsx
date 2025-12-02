import { StyleSheet, ImageBackground, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import { ICONS, IMAGES } from '@assets';
import { AppButton, AppText, ButtonProps } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { If } from '@components';

interface IProps {
  children: React.ReactNode;
  title: string;
  buttonsLabel?: string;
  buttons?: ButtonProps[];
}

export const BlackOnboardingScreenLayout = ({
  children,
  title,
  buttonsLabel,
  buttons,
}: IProps) => {
  const { bottom, top } = useSafeAreaInsets();

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

      <View style={styles.contentContainer}>
        <AppText style={styles.title}>{title}</AppText>

        {children}
      </View>

      <If condition={!!buttons}>
        <View style={styles.buttonsContainer}>
          <AppText renderIf={!!buttonsLabel} style={styles.buttonsLabel}>
            {buttonsLabel}
          </AppText>

          {buttons?.map(buttonProps => (
            <AppButton key={buttonProps.title} {...buttonProps} />
          ))}
        </View>
      </If>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullLogo: {
    marginTop: 25,
  },
  buttonsContainer: {
    gap: 12,
    width: '100%',
    marginTop: 'auto',
  },
  title: {
    ...TYPOGRAPHY.h1_mob,
    textAlign: 'center',
    color: COLORS.white,
    marginBottom: 12,
  },
  buttonsLabel: {
    textAlign: 'center',
    color: COLORS.white,
    ...TYPOGRAPHY.medium_12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
