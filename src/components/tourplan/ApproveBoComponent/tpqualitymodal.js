import React from 'react';
import Modal from 'react-native-modal';
import {
  Image, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import styles from './styles';
import ParentView from '../../ParentView';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import { FontStyle } from '../../../styles/fontsStyles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import { addPercentageSign } from '../../../util/NumberTrasformer';

export default class TpQualityModal extends React.Component {
  render() {
    const { loading, data } = this.props.tourplanBoTpQuality;
    const { isTpQualityOpen, toggleTpQualityModal } = this.props;

    return (
      <Modal isVisible={isTpQualityOpen} onRequestClose={toggleTpQualityModal}>
        <ParentView
          loading={loading}
          connected={this.props.connected}
          onRefresh={() => this.props.onRefresh()}
        >
          <View style={[styles.content]}>
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                  Tour Plan Quality Parameters
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleTpQualityModal}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            {data
              ? (
                <View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontMedium]}>
                        Description
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontMedium]}>
                        BO wise visit details
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontMedium]}>
                        Minimum
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.leftBorder]}>
                      <Text style={[FontStyle.fontSmall]}>
                        % Multi-Visit Compliance
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text
                        style={[layoutStyles.bold, FontStyle.fontSmall, { color: data.multivisit_compliance >= data.compliance_threshold ? colorsStyles.green : colorsStyles.red }]}
                      >
                        {addPercentageSign(data.multivisit_compliance)}
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontSmall]}>
                        {addPercentageSign(data.compliance_threshold)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.leftBorder]}>
                      <Text style={[FontStyle.fontSmall]}>
                        MCR Coverage
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text
                        style={[layoutStyles.bold, FontStyle.fontSmall, { color: data.mcr_compliance >= data.mcr_coverage_threshold ? colorsStyles.green : colorsStyles.red }]}
                      >
                        {addPercentageSign(data.mcr_compliance)}
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontSmall]}>
                        {addPercentageSign(data.mcr_coverage_threshold)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.leftBorder]}>
                      <Text style={[FontStyle.fontSmall]}>
                        % GSP Doc Coverage
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text
                        style={[layoutStyles.bold, FontStyle.fontSmall, { color: data.gsp_compliance >= data.gsp_threshold ? colorsStyles.green : colorsStyles.red }]}
                      >
                        {addPercentageSign(data.gsp_compliance)}
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontSmall]}>
                        {addPercentageSign(data.gsp_threshold)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.leftBorder]}>
                      <Text style={[FontStyle.fontSmall]}>
                        % JCC ABM
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text
                        style={[layoutStyles.bold, FontStyle.fontSmall, { color: data.jcc_abm >= data.jcc_abm_threshold ? colorsStyles.green : colorsStyles.red }]}
                      >
                        {addPercentageSign(data.jcc_abm)}
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontSmall]}>
                        {addPercentageSign(data.jcc_abm_threshold)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[layoutStyles.col6, styles.leftBorder]}>
                      <Text style={[FontStyle.fontSmall]}>
                        % JCC RBM
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text
                        style={[layoutStyles.bold, FontStyle.fontSmall, { color: data.jcc_rbm >= data.jcc_rbm_threshold ? colorsStyles.green : colorsStyles.red }]}
                      >
                        {addPercentageSign(data.jcc_rbm)}
                      </Text>
                    </View>
                    <View style={[layoutStyles.col3, styles.border]}>
                      <Text style={[layoutStyles.bold, FontStyle.fontSmall]}>
                        {addPercentageSign(data.jcc_rbm_threshold)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : <View style={{ height: 50 }} />}
          </View>
        </ParentView>
      </Modal>
    );
  }
}
