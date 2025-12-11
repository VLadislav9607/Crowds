import { StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { COLORS } from '@styles';

import { TAB_BAR_HEIGHT } from '../constants/tabBar';
import { CustomTabBar } from '../components';

export const useBottomTabBar = () => {
  const tabBarOptions = {
    safeAreaInsets: { bottom: 0 },
    screenOptions: {
      tabBarStyle: styles.tabBarStyle,
    },
    tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
  };

  return { tabBarOptions };
};

const styles = StyleSheet.create({
  tabBarStyle: {
    borderRadius: 41,
    height: TAB_BAR_HEIGHT,
    backgroundColor: COLORS.black,
    borderTopWidth: 0,
    elevation: 0,
  },
});
