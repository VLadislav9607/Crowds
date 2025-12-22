import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Animated, LayoutChangeEvent } from 'react-native';
import { IAppTabSelectorProps, TabSelectorTheme } from './types';
import { COLORS } from '@styles';

import { styles } from './styles';
import { Tab, TabsLabel } from './ui';

const BORDER_RADIUS = 32;

const INDICATOR_COLORS: Record<TabSelectorTheme, string> = {
  white: COLORS.black,
  black: COLORS.white,
};

const CONTAINER_COLORS: Record<TabSelectorTheme, string> = {
  white: COLORS.white,
  black: COLORS.black,
};  

export const AppTabSelector = <T = string,>({
  options,
  selectedValue,
  onSelect,
  label,
  badgeLabel,
  theme = 'white',
}: IAppTabSelectorProps<T>) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedLeftRadius = useRef(new Animated.Value(BORDER_RADIUS)).current;
  const animatedRightRadius = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabPositions, setTabPositions] = useState<Record<string, number>>({});
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const shouldScroll = options.length > 3;

  useEffect(() => {
    const selectedIndex = options.findIndex(
      option => option.value === selectedValue,
    );

    const selectedKey = String(selectedValue);
    if (
      selectedIndex !== -1 &&
      tabPositions[selectedKey] !== undefined &&
      tabWidths[selectedKey] !== undefined
    ) {
      const targetPosition = tabPositions[selectedKey];
      const targetWidth = tabWidths[selectedKey];

      const isFirst = selectedIndex === 0;
      const isLast = selectedIndex === options.length - 1;

      const leftRadius = isFirst ? BORDER_RADIUS : 0;
      const rightRadius = isLast ? BORDER_RADIUS : 0;

      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: targetPosition,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedWidth, {
          toValue: targetWidth,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedLeftRadius, {
          toValue: leftRadius,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedRightRadius, {
          toValue: rightRadius,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();

      if (shouldScroll && scrollViewRef.current && containerWidth > 0) {
        const tabCenter = targetPosition + targetWidth / 2;
        const scrollPosition = tabCenter - containerWidth / 2;

        scrollViewRef.current.scrollTo({
          x: Math.max(0, scrollPosition),
          animated: true,
        });
      }
    }
  }, [
    options,
    selectedValue,
    tabPositions,
    tabWidths,
    animatedValue,
    animatedWidth,
    animatedLeftRadius,
    animatedRightRadius,
    shouldScroll,
    containerWidth,
  ]);

  const onLayout = (value: string | T) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const key = String(value);
    setTabPositions(prev => ({ ...prev, [key]: x }));
    setTabWidths(prev => ({ ...prev, [key]: width }));
  };

  const renderTabs = () => {
    return options.map((option, index) => {
      const isActive = selectedValue === option.value;
      const key = String(option.value);
      return (
        <Tab
          key={key}
          option={option}
          isActive={isActive}
          onLayout={onLayout(option.value)}
          onPress={() => onSelect(option.value)}
          shouldScroll={shouldScroll}
          totalOptions={options.length}
          index={index}
          theme={theme}
        />
      );
    });
  };

  const tabsContent = (
    <>
      <Animated.View
        style={[
          styles.slidingIndicator,
          {
            width: animatedWidth,
            transform: [{ translateX: animatedValue }],
            borderTopLeftRadius: animatedLeftRadius,
            borderBottomLeftRadius: animatedLeftRadius,
            borderTopRightRadius: animatedRightRadius,
            borderBottomRightRadius: animatedRightRadius,
            backgroundColor: INDICATOR_COLORS[theme],
          },
        ]}
      />
      {renderTabs()}
    </>
  );

  const containerStyle = { backgroundColor: CONTAINER_COLORS[theme] };

  if (shouldScroll) {
    return (
      <View>
        <TabsLabel label={label} badgeLabel={badgeLabel} />
        <View
          onLayout={event => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, containerStyle]}
          >
            {tabsContent}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <>
      <TabsLabel label={label} badgeLabel={badgeLabel} />
      <View style={[styles.container, containerStyle]}>{tabsContent}</View>
    </>
  );
};