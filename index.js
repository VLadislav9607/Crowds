/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  setBackgroundMessageHandler,
  setForegroundMessageHandler,
  setNotifeeBackgroundEventHandler,
} from './src/services';

setBackgroundMessageHandler();
setForegroundMessageHandler();
setNotifeeBackgroundEventHandler();

AppRegistry.registerComponent(appName, () => App);
