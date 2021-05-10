/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
// eslint-disable-next-line import/named
import { bgMessaging } from './src/Firebase/bgMessaging';
import { setupSentry } from './src/util/crash/SentryAdapter';

setupSentry();
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

// eslint-disable-next-line no-undef
if (!__DEV__) {
  // eslint-disable-next-line no-console
  console.log = () => {};
}
