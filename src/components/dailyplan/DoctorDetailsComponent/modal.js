import React from 'react';
import {
  Image, ImageBackground, TouchableOpacity, View
} from 'react-native';
import { Text } from 'native-base';
import Modal from 'react-native-modal';
import modalStyles from './modalStyles';
import styles from './styles';
import { FontStyle } from '../../../styles/fontsStyles';
import colorsStyles from '../../../styles/colorsStyles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';

export default class ModalComponent extends React.Component {
  renderModal() {
    const { closeModal, data } = this.props;
    const { rcpa, sales_planned } = data.three_months_data;
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

          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={FontStyle.fontLarge}>
                GSP
              </Text>
            </View>
          </View>
          <View style={[styles.boEffortTop, styles.summaryHeader]}>
            <View style={styles.multivisitText}>
              <Text style={styles.center}>
                {sales_planned[0].month}
              </Text>
            </View>
            <View style={styles.mcrText}>
              <Text style={styles.center}>
                {sales_planned[1].month}
              </Text>
            </View>
            <View style={styles.callAvgText}>
              <Text style={styles.center}>
                {sales_planned[2].month}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: colorsStyles.black, margin: 10 }} />
          <View style={[styles.boEffortTop, styles.summaryHeader]}>
            <View style={styles.multivisitText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(sales_planned[0].amount)}
              </Text>
            </View>
            <View style={styles.mcrText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(sales_planned[1].amount)}
              </Text>
            </View>
            <View style={styles.callAvgText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(sales_planned[2].amount)}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={FontStyle.fontLarge}>
                RCPA
              </Text>
            </View>
          </View>
          <View style={[styles.boEffortTop, styles.summaryHeader]}>
            <View style={styles.multivisitText}>
              <Text style={styles.center}>
                {rcpa[0].month}
              </Text>
            </View>
            <View style={styles.mcrText}>
              <Text style={styles.center}>
                {rcpa[1].month}
              </Text>
            </View>
            <View style={styles.callAvgText}>
              <Text style={styles.center}>
                {rcpa[2].month}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: colorsStyles.black, margin: 10 }} />
          <View style={[styles.boEffortTop, styles.summaryHeaderBottom]}>
            <View style={styles.multivisitText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(rcpa[0].amount)}
              </Text>
            </View>
            <View style={styles.mcrText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(rcpa[1].amount)}
              </Text>
            </View>
            <View style={styles.callAvgText}>
              <Text style={styles.center}>
                {priceFormatWithoutDecimal(rcpa[2].amount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
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
