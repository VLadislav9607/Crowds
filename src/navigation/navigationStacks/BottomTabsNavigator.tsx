import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import { Role } from '@modules/common';

import { BottomTabsConfig } from '../constants';
import { useBottomTabBar } from '../hooks';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  const { tabBarOptions } = useBottomTabBar();

  const role = Role.ORGANIZATION;
  const screensByRole = BottomTabsConfig[role];

  return (
    <Tab.Navigator initialRouteName={screensByRole[0].name} {...tabBarOptions}>
      {screensByRole.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => renderTabBarIcon(tab.icon, focused),
            tabBarLabel: () => null,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const renderTabBarIcon = (
  icon: (opacity: number) => string,
  focused: boolean,
) => {
  return (
    <SvgXml
      xml={icon(focused ? 1 : 0.3)}
      width={20}
      height={20}
      style={{ marginTop: 8 }}
    />
  );
};
