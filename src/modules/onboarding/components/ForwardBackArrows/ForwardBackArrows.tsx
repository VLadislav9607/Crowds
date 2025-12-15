import { View, StyleSheet, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { COLORS } from '@styles';

interface IForwardBackArrowsProps {
  steps: number;
  currentStep: number;
  disabledBack?: boolean;
  disabledForward?: boolean;
  onBackPress: () => void;
  onForwardPress: () => void;
}

export const ForwardBackArrows = ({
  steps,
  currentStep,
  disabledBack,
  disabledForward,
  onBackPress,
  onForwardPress,
}: IForwardBackArrowsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Pressable
          style={[styles.circle, disabledBack && styles.disabledCircle]}
          onPress={onBackPress}
          disabled={disabledBack}
        >
          <SvgXml xml={ICONS.arrowLeft()} />
        </Pressable>
        <Pressable
          style={[styles.circle, disabledForward && styles.disabledCircle]}
          onPress={onForwardPress}
          disabled={disabledForward}
        >
          <SvgXml xml={ICONS.arrowRight()} />
        </Pressable>
      </View>

      <View style={styles.dotsContainer}>
        {Array.from({ length: steps }).map((_, index) => (
          <View key={index} style={styles.dotWrapper}>
            <View
              style={[styles.dot, currentStep === index && styles.dotActive]}
            />
            {index < steps - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingBottom: 16,
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
