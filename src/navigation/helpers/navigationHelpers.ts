import { Screens } from '../constants';

import { navigationRef } from '../AppNavigation/AppNavigation';

export const goToScreen = (screen: Screens, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
