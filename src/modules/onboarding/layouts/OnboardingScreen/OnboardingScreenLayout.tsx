import { StyleSheet, View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { AppText, IAppHeaderProps } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { ForwardBackArrows } from '../../components';

interface IOnboardingScreenLayoutProps {
  title: string;
  label?: string;
  stepsCount: number;
  headerProps?: IAppHeaderProps;
  currentStep: number;
  withFooter?: boolean;
  children: React.ReactNode;
  onBackPress: () => void;
  onForwardPress: () => void;
}

export const OnboardingScreenLayout = ({
  title,
  label,
  stepsCount,
  headerProps,
  currentStep,
  withFooter = true,
  children,
  onBackPress,
  onForwardPress,
}: IOnboardingScreenLayoutProps) => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withLogo"
      colorHeader="main"
      {...headerProps}
      footer={
        withFooter ? (
          <ForwardBackArrows
            steps={stepsCount}
            currentStep={currentStep}
            onBackPress={onBackPress}
            onForwardPress={onForwardPress}
          />
        ) : null
      }
    >
      <View style={styles.titleContainer}>
        <AppText typography="semibold_20">{title}</AppText>
        <AppText renderIf={!!label} style={styles.label}>
          {label}
        </AppText>
      </View>

      <View style={styles.contentContainer}>{children}</View>
    </ScreenWithScrollWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 24,
    marginBottom: 32,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 40,
    ...TYPOGRAPHY.bold_9,
    color: COLORS.main,
    backgroundColor: COLORS.main10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
