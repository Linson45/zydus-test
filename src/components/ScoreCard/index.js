import React from 'react';
import {
  Image, Text, TouchableOpacity, View
} from 'react-native';
import styles from './styles';

export default (props) => {
  const { score, total, division } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image style={styles.image} source={require('../../../assets/images/ranking.png')} />
      <View>
        <View style={styles.scoreText}>
          <Text style={styles.score}>{score}</Text>
          <Text>/</Text>
          <Text>{total || 0}</Text>
        </View>
        <Text>{division}</Text>
      </View>
    </TouchableOpacity>
  );
};
