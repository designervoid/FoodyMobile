/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/app';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
