import React from 'react';
import {
  Image, ImageBackground, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Spinner } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import ColorsStyles from '../../../styles/colorsStyles';
import styles from './styles';

export default class SelectRbmComponent extends React.Component {
  renderSbus() {
    const {
      hideSbus, sbus, selectSbu, goToRbmContainer, regions, region, selectRegion
    } = this.props;
    const { loading } = sbus;
    let rbms = [];
    if (region) rbms = region.rbms;

    if (!loading) {
      return (
        <View>
          <ImageBackground
            style={styles.imageTop}
            source={require('../../../../assets/images/ic_myperformance_list_header.png')}
          >
            <TouchableOpacity style={styles.closeButton} onPress={() => hideSbus()} opacity={1}>
              <Image
                style={styles.closeButtonIcon}
                source={require('../../../../assets/images/ic_close.png')}
              />
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ padding: 10, paddingHorizontal: 15 }}>
            <Dropdown
              label="Select Division"
              data={sbus.data}
              valueExtractor={({ sbu_code }) => sbu_code}
              labelExtractor={({ sbu_name }) => sbu_name}
              onChangeText={(value, index, data) => {
                selectSbu(data[index]);
              }}
            />

            <Dropdown
              label="Select Region"
              value={region ? region.region_name : ''}
              data={regions.data}
              valueExtractor={({ region_id }) => region_id}
              labelExtractor={({ region_name }) => region_name}
              onChangeText={(value, index, data) => {
                selectRegion(data[index]);
              }}
            />

            <Dropdown
              label="Select RBM"
              data={rbms}
              valueExtractor={({ rep_code }) => rep_code}
              labelExtractor={({ name }) => name}
              onChangeText={(value, index, data) => {
                goToRbmContainer(data[index]);
                // selectRegion(data[index]);
              }}
            />
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const {
      isVisible, sbus, hideSbus
    } = this.props;
    const { loading } = sbus;

    return (
      <Modal
        isVisible={isVisible}
        onRequestClose={hideSbus}
      >
        <View style={styles.content}>
          {loading ? <Spinner color={ColorsStyles.colorPrimary} /> : null}
          {this.renderSbus()}
        </View>
      </Modal>
    );
  }
}
