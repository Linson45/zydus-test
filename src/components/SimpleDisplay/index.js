import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SimpleDisplay extends Component {
  renderData() {
    const { data } = this.props;
    const display = JSON.stringify(data);
    return (
      <View>
        <Text>{display}</Text>
      </View>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <Container>
        <Spinner visible={loading} />
        {loading ? null : this.renderData()}
      </Container>
    );
  }
}
