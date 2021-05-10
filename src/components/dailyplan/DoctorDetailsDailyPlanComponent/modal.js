import React from 'react';
import {
  Image, ImageBackground, TouchableOpacity, View
} from 'react-native';
import { Text } from 'native-base';
import Modal from 'react-native-modal';
import modalStyles from './modalStyles';
import { FontStyle } from '../../../styles/fontsStyles';
import colorsStyles from '../../../styles/colorsStyles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';

export default class ModalComponent extends React.Component {
  renderModal() {
    const { closeModal, data } = this.props;
    if (!data) {
      return <View />;
    }
    const { three_months_data } = data;
    if (!three_months_data) {
      return <View />;
    }
    const { rcpa, sales_planned } = data.three_months_data;
    if (rcpa && sales_planned) {
      return (
        <View>
          <ImageBackground
            style={modalStyles.imageTop}
            source={require('../../../../assets/images/ic_myperformance_list_header.png')}
          >
            <View style={modalStyles.leftTopRow}>
              <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                3 Months Data
              </Text>
            </View>
            <TouchableOpacity style={modalStyles.closeButton} opacity={1} onPress={closeModal}>
              <Image
                style={modalStyles.closeButtonIcon}
                source={require('../../../../assets/images/ic_close.png')}
              />
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ backgroundColor: colorsStyles.white, padding: 10 }}>

            <View style={[modalStyles.topRow, modalStyles.summaryHeader]}>
              <View style={modalStyles.leftTopRow}>
                <Text style={FontStyle.fontLarge}>
                  GSP
                </Text>
              </View>
            </View>
            <View style={[modalStyles.boEffortTop, modalStyles.summaryHeader]}>
              <View style={modalStyles.multivisitText}>
                <Text style={modalStyles.center}>
                  {sales_planned[0].month}
                </Text>
              </View>
              <View style={modalStyles.mcrText}>
                <Text style={modalStyles.center}>
                  {sales_planned[1].month}
                </Text>
              </View>
              <View style={modalStyles.callAvgText}>
                <Text style={modalStyles.center}>
                  {sales_planned[2].month}
                </Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: colorsStyles.black, margin: 10 }} />
            <View style={[modalStyles.boEffortTop, modalStyles.summaryHeader]}>
              <View style={modalStyles.multivisitText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(sales_planned[0].amount)}
                </Text>
              </View>
              <View style={modalStyles.mcrText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(sales_planned[1].amount)}
                </Text>
              </View>
              <View style={modalStyles.callAvgText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(sales_planned[2].amount)}
                </Text>
              </View>
            </View>
            <View style={[modalStyles.topRow, modalStyles.summaryHeader]}>
              <View style={modalStyles.leftTopRow}>
                <Text style={FontStyle.fontLarge}>
                  RCPA
                </Text>
              </View>
            </View>
            <View style={[modalStyles.boEffortTop, modalStyles.summaryHeader]}>
              <View style={modalStyles.multivisitText}>
                <Text style={modalStyles.center}>
                  {rcpa[0].month}
                </Text>
              </View>
              <View style={modalStyles.mcrText}>
                <Text style={modalStyles.center}>
                  {rcpa[1].month}
                </Text>
              </View>
              <View style={modalStyles.callAvgText}>
                <Text style={modalStyles.center}>
                  {rcpa[2].month}
                </Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: colorsStyles.black, margin: 10 }} />
            <View style={[modalStyles.boEffortTop, modalStyles.summaryHeaderBottom]}>
              <View style={modalStyles.multivisitText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(rcpa[0].amount)}
                </Text>
              </View>
              <View style={modalStyles.mcrText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(rcpa[1].amount)}
                </Text>
              </View>
              <View style={modalStyles.callAvgText}>
                <Text style={modalStyles.center}>
                  {priceFormatWithoutDecimal(rcpa[2].amount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { isVisible, closeModal } = this.props;

    return (
      <Modal
        onRequestClose={closeModal}
        isVisible={isVisible}
      >
        {this.renderModal()}
      </Modal>
    );
  }
}
