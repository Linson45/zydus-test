import { Image } from 'react-native';
import React from 'react';
import styles from './styles';

class ImageHeader extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/ic_rcpa_list_header.png')}
        style={styles.absoluteFill}
      />
    );
  }
}

export default ImageHeader;
