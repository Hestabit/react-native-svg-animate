/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Async from './src/Async';
import Delayed from './src/Delayed';
import OneByOne from './src/OneByOne';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Delayed);
