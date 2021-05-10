import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ColorStyles from '../../../styles/colorsStyles';
import styles from './styles';
import VideoContainer from '../../../containers/opentok/VideoContainer';

export default class VirtualDetailingVideoComponent extends Component {
  renderVideoContainer() {
    const {
      navigation
    } = this.props;
    return (
      <>
        <VideoContainer navigation={navigation} />
      </>
    );
  }

  renderDoctorDetails() {
    const {
      doctor
    } = this.props;
    return (
      <View style={styles.buttonTextContainer}>
        <Text style={[{
          color: ColorStyles.black,
          fontWeight: '700'
        }]}
        >
          { doctor.doc_name }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {this.renderVideoContainer()}
        {this.renderDoctorDetails()}
      </View>
    );
  }
}
