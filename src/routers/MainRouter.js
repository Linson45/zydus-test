import React, { Component } from 'react';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import SwitchNavigator from './SwitchNavigator';

export default class MainRouter extends Component {
  render() {
    return (
      <Root>
        <StatusBar hidden />
        <SwitchNavigator />
      </Root>
    );
  }
}
