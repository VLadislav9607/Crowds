import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, TouchableOpacity, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

import { AppText } from '@ui';

import { styles, MENU_WIDTH } from './styles';
import { usePopupMenuStore } from './usePopupMenuStore';
import { IPopupMenuProviderProps, IPopupPosition } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 16;

const getMenuPosition = (position: IPopupPosition) => {
  const wouldOverflowRight =
    position.x + MENU_WIDTH > SCREEN_WIDTH - SCREEN_PADDING;

  return {
    top: position.y + 20,
    left: wouldOverflowRight ? undefined : position.x,
    right: wouldOverflowRight ? SCREEN_PADDING : undefined,
  };
};

export const PopupMenuProvider = ({ children }: IPopupMenuProviderProps) => {
  const { visible, items, position, onSelect, hidePopup } = usePopupMenuStore();

  const [mounted, setMounted] = useState(false);

  const cachedPosition = useMemo(() => position, [position]);
  const cachedItems = useMemo(() => items, [items]);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.92);

  const animateIn = useCallback(() => {
    opacity.value = withTiming(1, {
      duration: 160,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.back(1.4)),
    });
  }, [opacity, scale]);

  const animateOutAndThen = useCallback(
    (after: () => void) => {
      opacity.value = withTiming(0, {
        duration: 120,
        easing: Easing.in(Easing.cubic),
      });

      scale.value = withTiming(
        0.92,
        {
          duration: 140,
          easing: Easing.in(Easing.cubic),
        },
        () => {
          runOnJS(after)();
        },
      );
    },
    [opacity, scale],
  );

  useEffect(() => {
    if (visible) {
      setMounted(true);
      animateIn();
      return;
    }

    if (!visible && mounted) {
      animateOutAndThen(() => {
        setMounted(false);
      });
    }
  }, [visible, mounted, animateIn, animateOutAndThen]);

  const requestClose = useCallback(() => {
    if (!mounted) return;

    animateOutAndThen(() => {
      setMounted(false);
      hidePopup();
    });
  }, [mounted, animateOutAndThen, hidePopup]);

  const handleItemPress = useCallback(
    (item: (typeof items)[0]) => {
      item.onPress?.();
      onSelect?.(item);
      requestClose();
    },
    [onSelect, requestClose],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const menuPosition = getMenuPosition(cachedPosition);
  const renderItems = mounted ? cachedItems : [];

  return (
    <View style={styles.root}>
      {children}

      <View style={styles.portal} pointerEvents={mounted ? 'auto' : 'none'}>
        <Pressable style={styles.overlay} onPress={requestClose}>
          <Animated.View
            style={[
              styles.menuContainer,
              animatedStyle,
              {
                top: menuPosition.top,
                left: menuPosition.left,
                right: menuPosition.right,
              },
            ]}
          >
            {renderItems.map((item, index) => (
              <View key={item.value}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => handleItemPress(item)}
                >
                  <AppText typography="regular_14" color="typography_black">
                    {item.label}
                  </AppText>
                </TouchableOpacity>

                {index < renderItems.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};
