import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Body, Card, CardItem } from 'native-base';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import colorsStyles from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

class PriorityBrandsComponent extends React.Component {
  renderTopData() {
    const { doctor, brands } = this.props;
    if (doctor) {
      const {
        doc_name, doc_spec, visit_category, sales_planning, last_month_rcpa, mcr_no
      } = doctor;
      let potential = 0;
      const brandRenderData = brands.map((item, index) => {
        const {
          product_potential, product_name, is_promoted, product_target, product_rcpa
        } = item;
        let { mkt_rate } = item;
        potential += product_potential;
        if (!mkt_rate) mkt_rate = 0;

        return (
          <Card>
            <View key={index} style={{ paddingTop: 10 }}>
              <View>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Text style={{ fontSize: 14, color: colorsStyles.gray, marginBottom: 5 }}>{product_name}</Text>
                  <Text style={{ fontSize: 13, color: colorsStyles.gray_light_1 }}>
                    Promoted -
                    <Text style={{ fontSize: 14, color: colorsStyles.gray }}>{is_promoted}</Text>
                  </Text>
                </View>
                <View style={{
                  marginTop: 10,
                  height: 1,
                  backgroundColor: colorsStyles.gray,
                  marginVertical: 0,
                }}
                />
                <View style={[styles.boEffortTop, styles.summaryHeader]}>
                  <View style={styles.potentialText}>
                    <Text style={styles.number}>{(mkt_rate ? product_potential / mkt_rate : -1).toFixed()}</Text>
                    <Text style={styles.text}>Potential</Text>
                    <Text style={styles.textBottom}>(In Unit)</Text>
                  </View>
                  <View style={styles.potentialText}>
                    <Text style={styles.number}>{(mkt_rate ? product_target / mkt_rate : -1).toFixed()}</Text>
                    <Text style={styles.text}>Plan</Text>
                    <Text style={styles.textBottom}>(In Unit)</Text>
                  </View>
                  <View style={styles.potentialTextLast}>
                    <Text style={styles.number}>{(mkt_rate ? product_rcpa / mkt_rate : 0).toFixed()}</Text>
                    <Text style={styles.text}>Last Month RCPA</Text>
                    <Text style={styles.textBottom}>(In Unit)</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        );
      });

      return (
        <>
          <Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
            <CardItem>
              <Body style={{ flexDirection: 'column' }}>
                <Text style={{ marginHorizontal: 5, fontSize: 14, color: colorsStyles.gray }}>
                  {doc_name}
                  <Text note>
                    {' '}
                    ( MCR #
                    {mcr_no}
                    {' '}
                    )
                  </Text>
                </Text>

                <Text style={{
                  marginHorizontal: 5,
                  fontSize: 12,
                  color: colorsStyles.gray_light_1,
                  marginTop: 5,
                  marginBottom: 5
                }}
                >
                  {visit_category}
                  , (
                  {doc_spec}
                  )
                </Text>

                <Text style={{
                  marginHorizontal: 5, fontSize: 14, color: colorsStyles.gray, marginBottom: 5
                }}
                >
                  New Prescriber -
                </Text>

                <View style={[styles.boEffortTop, styles.summaryHeader]}>
                  <View style={styles.multivisit}>
                    <Text
                      style={styles.currentMonthText}
                    >
                      {' '}
                      {priceFormatWithoutDecimal(potential)}
                      {' '}

                    </Text>
                  </View>
                  <View style={styles.mcr}>
                    <Text
                      style={styles.currentMonthText}
                    >
                      {' '}
                      {priceFormatWithoutDecimal(sales_planning)}
                      {' '}

                    </Text>
                  </View>
                  <View style={styles.callAvg}>
                    <Text
                      style={styles.currentMonthText}
                    >
                      {' '}
                      {priceFormatWithoutDecimal(last_month_rcpa)}
                      {' '}

                    </Text>
                  </View>
                </View>
                <View style={[styles.boEffortTop, styles.summaryHeaderBottom]}>
                  <View style={styles.multivisitText}>
                    <Text style={[styles.center, LightFontStyle.fontSmall]}>
                      {' '}
                      Doctor
                      Potential
                      {' '}
                    </Text>
                  </View>
                  <View style={styles.mcrText}>
                    <Text style={[styles.center, LightFontStyle.fontSmall]}> Doctor Plan </Text>
                  </View>
                  <View style={styles.callAvgText}>
                    <Text style={[styles.center, LightFontStyle.fontSmall]}>
                      {' '}
                      Last Month
                      RCPA
                      {' '}
                    </Text>
                  </View>
                </View>

                <Text style={{
                  marginHorizontal: 5, fontSize: 14, color: colorsStyles.gray, marginTop: 5
                }}
                >
                  Share Target
                </Text>
              </Body>
            </CardItem>
          </Card>
          <View style={{ margin: 10, marginHorizontal: 15 }}>
            <View>
              <Text>SKU</Text>
            </View>
            {brandRenderData}
          </View>
        </>
      );
    }
    return null;
  }

  render() {
    return (
      <ScrollView>
        {this.renderTopData()}
      </ScrollView>
    );
  }
}

export default PriorityBrandsComponent;
