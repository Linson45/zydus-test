import React from 'react';
import {
  Image, ImageBackground, Text, TouchableOpacity, View, ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { Card, Spinner } from 'native-base';
import ColorsStyles from '../../../styles/colorsStyles';

import styles from './styles';
import { priceFormatWithDecimal, priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import { getMonthString } from '../../../util/dateTimeUtil';

export default class DoctorDetailComponent extends React.Component {
  renderView() {
    let { data } = this.props;
    if (data) data = data[0];
    if (data) {
      const {
        mcr_no, dr_code, dr_name, spec, market_effort, curr_rome, brands, type_of_engagement,
        type_of_sponsorship, name_of_activity, recommended_by, no_of_red_flag, month, matrics
      } = data;
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.doctorDetail}>Doctor Details: </Text>
          <Text style={styles.mcr}>
            #
            {mcr_no}
          </Text>
          <Text style={styles.name}>
            {dr_name}
            {' '}
            (
            {dr_code}
            )
          </Text>
          <Text style={styles.subText}>{spec}</Text>
          <Text style={styles.subText}>
            Marketing Efforts:
            {priceFormatWithoutDecimal(market_effort)}
          </Text>
          <Text style={styles.subText}>
            Current ROME:
            {curr_rome ? curr_rome.toFixed(8) : '0.0'}
          </Text>

          <Text style={styles.doctorMetric}>Doctor Metrics: </Text>
          <View style={styles.row}>
            <Text style={{ flex: 6 }}>No of Red Flags</Text>
            <View style={styles.flag}>
              <Text style={styles.flagText}>{no_of_red_flag[0]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{no_of_red_flag[1]}</Text>
            </View>

            <View style={styles.flag}>
              <Text style={styles.flagText}>{no_of_red_flag[2]}</Text>
            </View>
          </View>

          <Card>
            <View style={styles.cardHeading}>
              <Text style={{ flex: 6, color: ColorsStyles.white, marginRight: 15 }}>Parameter (Division Norm)</Text>
              <Text style={styles.month}>{getMonthString(month[0])}</Text>
              <Text style={styles.month}>{getMonthString(month[1])}</Text>
              <Text style={styles.month}>{getMonthString(month[2])}</Text>
            </View>

            {
                            matrics.map(({
                              title, subTitle, val1_flag, val2_flag, val3_flag, value1, value2, value3
                            }, index) => {
                              let color_1 = ColorsStyles.gray;
                              let color_2 = ColorsStyles.gray;
                              let color_3 = ColorsStyles.gray;
                              if (val1_flag) color_1 = ColorsStyles.red;
                              if (val2_flag) color_2 = ColorsStyles.red;
                              if (val3_flag) color_3 = ColorsStyles.red;

                              return (
                                <View style={styles.cardRow} key={index}>
                                  <Text style={styles.cardTitle}>
                                    {index !== 0 ? title : 'No. of Red Flags'}
                                    {' '}
                                    {subTitle}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_1 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value1) : value1}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_2 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value2) : value2}
                                  </Text>
                                  <Text style={{ ...styles.cardText, color: color_3 }}>
                                    {index === 1 || index === 2 ? priceFormatWithDecimal(value3) : value3}
                                  </Text>
                                </View>
                              );
                            })
                        }

          </Card>

          <Text style={styles.doctorMetric}>Engagement Details: </Text>
          <View style={styles.modalBrands}>
            {
                            brands.map((brand, index) => (
                              <Text style={styles.modalBrand} key={index}>
                                Focus Brand
                                {index + 1}
                                {' '}
                                (as per GSP):
                                {brand.Name}
                              </Text>
                            ))
                        }
          </View>
          <Text style={styles.engagementDetail}>
            Type Of Engagement:
            {type_of_engagement}
          </Text>
          <Text style={styles.engagementDetail}>
            Type Of Sponsorship:
            {type_of_sponsorship}
          </Text>
          <Text style={styles.engagementDetail}>
            Name Of Activity:
            {name_of_activity}
          </Text>
          <Text style={styles.engagementDetail}>
            Recommended by:
            {recommended_by}
          </Text>
        </ScrollView>
      );
    }
    return null;
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
          <Text style={styles.heading}>Doctor Details</Text>
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
