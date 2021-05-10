import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import styles from './styles';

export default class NoInternetComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/no_internet.jpg')}
          style={styles.noInternetImage}
        />
        <Text style={styles.noConnectionText}>No Internet Connection</Text>
        <TouchableOpacity onPress={() => this.props.onRefresh()}>
          <View style={styles.refreshBtn}>
            <Text style={styles.refreshText}>Refresh</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
