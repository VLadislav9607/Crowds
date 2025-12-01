import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@styles';

import { BottomTabScreensList, Screens } from '../constants';
import { BottomStackScreenParams, BottomTabScreenType } from '../types';

const Tab = createBottomTabNavigator<BottomStackScreenParams>();

const BOTTOM_TAB_HEIGHT = 51;

export const BottomTabsNavigator = () => {
  const { bottom } = useSafeAreaInsets();

  const [initialRouteName] = useState<keyof BottomStackScreenParams | ''>(
    Screens.Home,
  );

  if (!initialRouteName) return <></>;

  return (
    <Tab.Navigator
      key={initialRouteName}
      initialRouteName={initialRouteName}
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        tabBarStyle: [
          styles.tabBarStyle,
          {
            marginBottom: bottom + 15,
          },
        ],
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Group screenOptions={{ headerShown: false }}>
        {BottomTabScreensList.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }: { focused: boolean }) =>
                renderTabBarIcon(tab, focused),
              tabBarLabel: () => null,
            }}
          />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
};

const renderTabBarIcon = (tab: BottomTabScreenType, isFocused: boolean) => {
  return (
    <SvgXml
      xml={tab.icon(isFocused ? 1 : 0.3)}
      width={20}
      height={20}
      style={styles.tabBarIcon}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarStyle: {
    marginHorizontal: 20,
    borderRadius: 41,
    height: BOTTOM_TAB_HEIGHT,
    backgroundColor: COLORS.black,
  },
  tabBarIcon: {
    marginTop: 8,
  },
});
