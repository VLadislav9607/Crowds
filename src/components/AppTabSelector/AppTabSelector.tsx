import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Animated, LayoutChangeEvent } from 'react-native';
import { IAppTabSelectorProps } from './types';

import { styles } from './styles';
import { Tab, TabsLabel } from './ui';

export const AppTabSelector = ({
  options,
  selectedValue,
  onSelect,
  label,
  badgeLabel,
}: IAppTabSelectorProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabPositions, setTabPositions] = useState<Record<string, number>>({});
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const shouldScroll = options.length > 3;

  useEffect(() => {
    const selectedIndex = options.findIndex(
      option => option.value === selectedValue,
    );

    if (
      selectedIndex !== -1 &&
      tabPositions[selectedValue] !== undefined &&
      tabWidths[selectedValue] !== undefined
    ) {
      const targetPosition = tabPositions[selectedValue];
      const targetWidth = tabWidths[selectedValue];

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
    shouldScroll,
    containerWidth,
  ]);

  const onLayout = (value: string) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabPositions(prev => ({ ...prev, [value]: x }));
    setTabWidths(prev => ({ ...prev, [value]: width }));
  };

  const renderTabs = () => {
    return options.map(option => {
      const isActive = selectedValue === option.value;
      return (
        <Tab
          key={option.value}
          option={option}
          isActive={isActive}
          onLayout={onLayout(option.value)}
          onPress={() => onSelect(option.value)}
          shouldScroll={shouldScroll}
          totalOptions={options.length}
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
          },
        ]}
      />
      {renderTabs()}
    </>
  );

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
            contentContainerStyle={styles.scrollContent}
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
      <View style={styles.container}>{tabsContent}</View>
    </>
  );
};
