import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import { Screens } from '../constants';
import { FirstScreen, SelectRoleScreen } from '../../modules/auth';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.First}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name={Screens.First} component={FirstScreen} />
      <RootStack.Screen name={Screens.SelectRole} component={SelectRoleScreen} />
    </RootStack.Navigator>
  );
};
