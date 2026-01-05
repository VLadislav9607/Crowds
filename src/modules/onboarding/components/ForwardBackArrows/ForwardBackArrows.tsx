import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { If } from '@components';

export interface IForwardBackArrowsProps {
  steps?: number;
  currentStep: number;
  disabledBack?: boolean;
  disabledForward?: boolean;
  hideBack?: boolean;
  hideDots?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  ForwardButton?: React.ReactNode;
  onBackPress: () => void;
  onForwardPress: () => void;
}

export const ForwardBackArrows = ({
  steps,
  currentStep,
  disabledBack,
  disabledForward,
  hideBack,
  hideDots,
  containerStyle,
  ForwardButton,
  onBackPress,
  onForwardPress,
}: IForwardBackArrowsProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.circlesContainer}>
        <If condition={!hideBack}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.circle, disabledBack && styles.disabledCircle]}
            onPress={onBackPress}
            disabled={disabledBack}
          >
            <SvgXml xml={ICONS.arrowLeft()} />
          </TouchableOpacity>
        </If>
        <If condition={!!ForwardButton}>{ForwardButton}</If>
        <If condition={!ForwardButton}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.circle, disabledForward && styles.disabledCircle]}
            onPress={onForwardPress}
            disabled={disabledForward}
          >
            <SvgXml xml={ICONS.arrowRight()} />
          </TouchableOpacity>
        </If>
      </View>

      <If condition={!!steps && !hideDots}>
        <View style={styles.dotsContainer}>
          {Array.from({ length: steps || 0 }).map((_, index) => (
            <View key={index} style={styles.dotWrapper}>
              <View
                style={[styles.dot, currentStep === index && styles.dotActive]}
              />
              {index < (steps || 0) - 1 && <View style={styles.line} />}
            </View>
          ))}
        </View>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.78,
    borderColor: COLORS.main,
  },
  disabledCircle: {
    opacity: 0.5,
  },
  circlesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  dotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  dotActive: {
    backgroundColor: COLORS.main,
  },
  line: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.main,
    marginHorizontal: 4,
  },
});
