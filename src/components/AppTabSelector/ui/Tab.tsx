import { useEffect, useRef } from 'react';
import { Pressable, Animated, LayoutChangeEvent } from 'react-native';
import { ITabOption, TabSelectorTheme, TabSelectorVariant } from '../types';
import { styles } from '../styles';
import { COLORS } from '@styles';

interface ITabProps<T = string> {
  option: ITabOption<T>;
  isActive: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  shouldScroll?: boolean;
  totalOptions?: number;
  index?: number;
  theme?: TabSelectorTheme;
  variant?: TabSelectorVariant;
}

const THEME_COLORS = {
  white: {
    inactive: COLORS.dark_gray,
    active: COLORS.white,
    border: COLORS.black_50,
    badge: {
      inactive: { bg: COLORS.black_10, text: COLORS.dark_gray },
      active: { bg: COLORS.white, text: COLORS.black },
    },
  },
  black: {
    inactive: COLORS.white,
    active: COLORS.black,
    border: COLORS.white,
    badge: {
      inactive: { bg: COLORS.white_30, text: COLORS.white },
      active: { bg: COLORS.main, text: COLORS.white },
    },
  },
};

export const Tab = <T = string,>({
  option,
  isActive,
  onLayout,
  onPress,
  shouldScroll = false,
  totalOptions = 2,
  index = 0,
  theme = 'white',
  variant = 'default',
}: ITabProps<T>) => {
  const animValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const colors = THEME_COLORS[theme];
  const isPill = variant === 'pill';

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isActive, animValue]);

  const textColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.inactive, colors.active],
  });

  const badgeBgColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.badge.inactive.bg, colors.badge.active.bg],
  });

  const badgeTextColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.badge.inactive.text, colors.badge.active.text],
  });

  const isFirst = index === 0;
  const isLast = index === totalOptions - 1;

  const tabStyle = isPill ? styles.tabPill : styles.tab;

  return (
    <Pressable
      onLayout={onLayout}
      style={[
        tabStyle,
        !isPill && { borderColor: colors.border },
        shouldScroll ? { paddingHorizontal: 12 } : { flex: 1 / totalOptions },
        !isPill && isFirst && styles.firstTab,
        !isPill && isLast && styles.lastTab,
      ]}
      onPress={onPress}
    >
      <Animated.Text
        style={[
          styles.tabText,
          {
            color: textColor,
          },
        ]}
      >
        {option.label}
      </Animated.Text>

      {option.badge !== undefined && (
        <Animated.View
          style={[styles.badge, { backgroundColor: badgeBgColor }]}
        >
          <Animated.Text style={[styles.badgeText, { color: badgeTextColor }]}>
            {option.badge}
          </Animated.Text>
        </Animated.View>
      )}
    </Pressable>
  );
};
