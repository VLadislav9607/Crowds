import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

import { COLORS } from '@styles';

const BOTTOM_TAB_HEIGHT = 51;

const renderTabBar = (props: any) => <BottomTabBar {...props} />;

export const useBottomTabBar = () => {
  const { bottom } = useSafeAreaInsets();

  const tabBarOptions = {
    safeAreaInsets: { bottom: 0 },
    screenOptions: {
      tabBarStyle: [styles.tabBarStyle, { marginBottom: bottom + 15 }],
    },
    tabBar: renderTabBar,
  };

  return { tabBarOptions };
};

const styles = StyleSheet.create({
  tabBarStyle: {
    marginHorizontal: 20,
    borderRadius: 41,
    height: BOTTOM_TAB_HEIGHT,
    backgroundColor: COLORS.black,
  },
});
