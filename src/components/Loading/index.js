import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Text } from 'native-base';
import styles from './styles';

export default class Loading extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.textLogo}>Zydus</Text>
      </Container>
    );
  }
}
