import { StyleSheet, View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { AppText, IAppHeaderProps } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { ForwardBackArrows, IForwardBackArrowsProps } from '../../components';

interface IOnboardingScreenLayoutProps {
  title: string;
  label?: string;
  stepsCount: number;
  headerProps?: IAppHeaderProps;
  currentStep: number;
  children: React.ReactNode;
  showLoader?: boolean;
  isFloatFooter?: boolean;
  useAnimatedScrollView?: boolean;
  animatedScrollHandler?: (event: any) => void;
  onBackPress: () => void;
  onForwardPress: () => void;
  footerProps?: Pick<IForwardBackArrowsProps, 'containerStyle' | 'ForwardButton' | 'hideBack'>;
}


export const OnboardingScreenLayout = ({
  title,
  label,
  stepsCount,
  headerProps,
  currentStep,
  children,
  showLoader = false,
  isFloatFooter = true,
  onBackPress,
  onForwardPress,
  footerProps,
  animatedScrollHandler,
  useAnimatedScrollView = false,
}: IOnboardingScreenLayoutProps) => {
  return (
    <ScreenWithScrollWrapper
      showLoader={showLoader}
      isFloatFooter={isFloatFooter}
      headerVariant="withLogo"
      colorHeader="main"
      useAnimatedScrollView={useAnimatedScrollView}
      animatedScrollHandler={animatedScrollHandler}
      footer={
        <ForwardBackArrows
          steps={stepsCount}
          currentStep={currentStep}
          onBackPress={onBackPress}
          onForwardPress={onForwardPress}
          {...footerProps}
        />
      }
      {...headerProps}
    >
      <View style={styles.titleContainer}>
        <AppText typography="semibold_20" style={styles.titleText}>{title}</AppText>
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
  titleText: {
    textAlign: 'center',
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 40,
    ...TYPOGRAPHY.bold_9,
    color: COLORS.main,
    backgroundColor: COLORS.main_10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
