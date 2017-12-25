/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Home from './src/pages/home'
import DragView from './src/pages/dragView'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  DragView: {
    screen: DragView
  }
})

export default class App extends Component {
  render () {
    return <RootNavigator/>
  }
}
