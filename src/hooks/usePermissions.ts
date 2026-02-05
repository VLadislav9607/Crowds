import { isAndroid, isIOS } from '@constants';
import { useCallback } from 'react';
import {
  type Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { requestPermissionAndGetTokens, type PushTokens } from '@services';

export type TUsePermissionsReturnType = {
  isError?: boolean;
  type: (typeof RESULTS)[keyof typeof RESULTS];
  errorMessage?: string;
};

export enum EPermissionTypes {
  CAMERA = 'camera',
  NOTIFICATIONS = 'notifications',
}

export const usePermissions = (typeOfPermission: EPermissionTypes) => {
  const getPermission = useCallback((): Permission => {
    if (!Object.values(EPermissionTypes).includes(typeOfPermission)) {
      throw new Error('Unsupported Type of permission.');
    }

    if (isIOS) {
      switch (typeOfPermission) {
        case EPermissionTypes.CAMERA:
          return PERMISSIONS.IOS.CAMERA;
        case EPermissionTypes.NOTIFICATIONS:
          throw new Error(
            'On iOS, notifications permission is handled via pushNotificationService.',
          );
      }
    }

    if (isAndroid) {
      switch (typeOfPermission) {
        case EPermissionTypes.CAMERA:
          return PERMISSIONS.ANDROID.CAMERA;
        case EPermissionTypes.NOTIFICATIONS:
          return 'android.permission.POST_NOTIFICATIONS' as Permission;
      }
    }

    throw new Error('Unsupported Operating System.');
  }, [typeOfPermission]);

  /**
   * Generic permissions (camera, etc.)
   * Notifications are handled separately.
   */
  const askPermissions =
    useCallback(async (): Promise<TUsePermissionsReturnType> => {
      try {
        const result = await request(getPermission());

        switch (result) {
          case RESULTS.UNAVAILABLE:
            return Promise.reject({ type: RESULTS.UNAVAILABLE });
          case RESULTS.DENIED:
            return Promise.reject({ type: RESULTS.DENIED });
          case RESULTS.BLOCKED:
            return Promise.reject({ type: RESULTS.BLOCKED });
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            return { type: result };
        }
      } catch (e: any) {
        return Promise.reject({
          isError: true,
          errorMessage:
            e?.message ?? 'Something went wrong while asking for permissions.',
        });
      }
    }, [getPermission]);

  /**
   * 🔔 Notifications (canonical entry point)
   * - iOS: Firebase permission + FCM token
   * - Android: POST_NOTIFICATIONS + FCM token
   */
  const askNotificationPermissionAndGetTokens =
    useCallback(async (): Promise<PushTokens | null> => {
      if (isAndroid) {
        const result = await request(
          'android.permission.POST_NOTIFICATIONS' as Permission,
        );

        if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
          return null;
        }
      }

      const { granted, tokens } = await requestPermissionAndGetTokens();
      return granted ? tokens : null;
    }, []);

  return {
    askPermissions,
    askNotificationPermissionAndGetTokens,
  };
};
