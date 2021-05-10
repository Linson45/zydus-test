import React from 'react';
import {
  Image, ImageBackground, Text, TouchableOpacity, View, ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { Input, Spinner } from 'native-base';
import ColorsStyles from '../../../styles/colorsStyles';

import styles from './styles';

export default class RedFlagComponent extends React.Component {
  renderView() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.potentialLabel}>Rxers Market Potential:</Text>
        <Input
          style={styles.potentialInput}
          placeholder=""
        />

        <View style={styles.row}>
          <Text style={{
            flex: 1, justifyContent: 'center', textAlignVertical: 'center', alignItems: 'center'
          }}
          >
            ROME
          </Text>
          <Input
            style={styles.potentialInput}
            placeholder=""
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    const {
      isVisible, hideModal, loading
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        onRequestClose={hideModal}
      >
        <ImageBackground
          style={styles.imageTop}
          source={require('../../../../assets/images/ic_myperformance_list_header.png')}
        >
          <Text style={styles.heading}>Update Red Flag Thresholds</Text>
          <TouchableOpacity style={styles.closeButton} onPress={hideModal} opacity={1}>
            <Image
              style={styles.closeButtonIcon}
              source={require('../../../../assets/images/ic_close.png')}
            />
          </TouchableOpacity>

        </ImageBackground>
        <View style={{ ...styles.content }}>
          {loading
            ? <Spinner color={ColorsStyles.colorPrimary} />
            : this.renderView()}
        </View>
      </Modal>
    );
  }
}
