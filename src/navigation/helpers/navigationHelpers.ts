import { navigationRef } from '../AppNavigation';
import { RootStackParamList } from '../types';

export function goToScreen<T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
): void {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as any)(screen, params);
  }
}

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
