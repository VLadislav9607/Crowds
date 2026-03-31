import { CommonActions, StackActions } from '@react-navigation/native';
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

export function replaceScreen<T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(screen as string, params));
  }
}

export function resetToScreen<T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen as string, params }],
      }),
    );
  }
}
