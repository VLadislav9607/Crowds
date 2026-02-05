import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

const event = Platform.OS === 'android' ? 'focus' : 'change';

export const useAppIsActive = (callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const appStateRef = useRef(AppState.currentState);
  const handleAppStateChange = useCallback((nextAppState?: AppStateStatus) => {
    // Android 'focus' event calls the handler with no args when app gains focus
    if (nextAppState === undefined) {
      callbackRef.current();
      appStateRef.current = 'active';
      return;
    }
    if (
      appStateRef.current?.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      callbackRef.current();
    }
    appStateRef.current = nextAppState;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(event, handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);
};
