import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../types';
import { goBack } from '../helpers';

export const useScreenNavigation = <T extends keyof RootStackParamList>() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, T>>();

  return {
    navigation,
    route,
    goBack,
    params: route.params,
  };
};
