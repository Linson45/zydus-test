import React from 'react';
import {
  ScrollView, Text, View
} from 'react-native';
import styles from './styles';
import ChartView from '../../detailing/Chart';
import { getChartConfig } from '../../../util/ChartUtil';
import { getContactConsumptionData } from '../ContactConsumptionUtil';

export default class ContactDoctorInsightsComponent extends React.Component {
  renderTop() {
    const { doctor } = this.props;
    const { doc_spec } = doctor;
    let { priority_brands } = doctor;

    if (!priority_brands) {
      priority_brands = [];
    }
    const brands = priority_brands.map((brand) => brand.brand_name);
    return (
      <View style={styles.main}>
        <View style={styles.column}>
          <Text style={styles.smallHeading}>SPECIALITY</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{doc_spec}</Text>
          </View>
        </View>

        <View style={styles.column2}>
          <Text style={styles.smallHeading}>PRIORITY BRANDS</Text>
          <View style={styles.row}>
            <Text style={styles.topValue}>{brands.length ? brands.join(' , ') : '--'}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderDivider() {
    return (
      <View style={styles.divider} />
    );
  }

  renderHeading(heading) {
    return (
      <Text style={styles.heading}>{heading}</Text>
    );
  }

  renderContentChart() {
    const { doctor } = this.props;
    let { content_consumptions } = doctor;
    if (content_consumptions && content_consumptions.length) {
      let total = 0;
      content_consumptions.forEach((consumption) => {
        total += consumption.value;
      });
      content_consumptions = content_consumptions.map((consumption) => ({
        ...consumption, value: (consumption.value * 100) / total
      }));
      return (
        <View>
          {this.renderHeading('Content Consumption Pattern')}
          <View style={styles.consumptionContainer}>
            <ChartView
              originWhitelist={['']}
              style={styles.consumptionChart}
              config={getContactConsumptionData(content_consumptions, total)}
              options={getChartConfig()}
            />
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        {this.renderTop()}
        {this.renderDivider()}
        {this.renderContentChart()}
      </ScrollView>
    );
  }
}
