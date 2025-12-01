import { useEffect, useRef } from 'react';
import { Pressable, Animated, LayoutChangeEvent } from 'react-native';
import { ITabOption } from '../types';
import { styles } from '../styles';

interface ITabProps {
  option: ITabOption;
  isActive: boolean;
  onLayout: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  shouldScroll?: boolean;
  totalOptions?: number;
}

export const Tab = ({
  option,
  isActive,
  onLayout,
  onPress,
  shouldScroll = false,
  totalOptions = 2,
}: ITabProps) => {
  const textColorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(textColorAnim, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isActive, textColorAnim]);

  const textColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4E4E4E', '#FFFFFF'],
  });

  return (
    <Pressable
      onLayout={onLayout}
      style={[styles.tab, shouldScroll ? {} : { flex: 1 / totalOptions }]}
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
    </Pressable>
  );
};
