import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { Spinner } from 'native-base';
import ColorsStyles from '../../../styles/colorsStyles';

import { getMonthString } from '../../../util/dateTimeUtil';
import styles from './styles';
import { transform } from '../../../util/NumberTrasformer';
import Images from '../../../Constants/imageConstants';

export default class SalesTrendComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  renderTabs() {
    const { hideSalesTrend, effortSummary } = this.props;
    const { data, loading } = this.props.salesTrend;
    const { sales_summary, rcpa, sales_plan } = data;
    let salesButtonStyle; let rcpaButtonStyle; let gspButtonStyle; let
      detailingButtonStyle;
    salesButtonStyle = rcpaButtonStyle = gspButtonStyle = detailingButtonStyle = styles.topButton;
    let salesButtonTextStyle; let rcpaButtonTextStyle; let gspButtonTextStyle; let
      detailingButtonTextStyle;
    salesButtonTextStyle = rcpaButtonTextStyle = gspButtonTextStyle = detailingButtonTextStyle = styles.topButtonText;

    const { selectedTab } = this.state;
    if (selectedTab === 0) {
      salesButtonStyle = styles.topButtonSelected;
      salesButtonTextStyle = styles.topButtonSelectedText;
    } else if (selectedTab === 1) {
      rcpaButtonStyle = styles.topButtonSelected;
      rcpaButtonTextStyle = styles.topButtonSelectedText;
    } else if (selectedTab === 2) {
      gspButtonStyle = styles.topButtonSelected;
      gspButtonTextStyle = styles.topButtonSelectedText;
    } else if (selectedTab === 3) {
      detailingButtonStyle = styles.topButtonSelected;
      detailingButtonTextStyle = styles.topButtonSelectedText;
    }

    if (!loading) {
      return (
        <View>
          <View style={styles.headerRow}>
            <View style={styles.rowRev}>
              <TouchableOpacity style={salesButtonStyle} onPress={() => this.setState({ selectedTab: 0 })}>
                <Text style={salesButtonTextStyle}>Sales Summary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={rcpaButtonStyle} onPress={() => this.setState({ selectedTab: 1 })}>
                <Text style={rcpaButtonTextStyle}>RCPA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={gspButtonStyle} onPress={() => this.setState({ selectedTab: 2 })}>
                <Text style={gspButtonTextStyle}>GSP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={detailingButtonStyle} onPress={() => this.setState({ selectedTab: 3 })}>
                <Text style={detailingButtonTextStyle}>Detailing</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowRev}>
              <TouchableOpacity style={styles.closeButton} onPress={hideSalesTrend}>
                <Image source={Images.ic_close} style={styles.closeButtonIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {selectedTab === 0 ? this.renderTab(sales_summary) : null}
          {selectedTab === 1 ? this.renderTab(rcpa) : null}
          {selectedTab === 2 ? this.renderTab(sales_plan) : null}
          {selectedTab === 3 ? this.renderDetailing(effortSummary) : null}
        </View>
      );
    }
    return null;
  }

  renderTab(data) {
    const { months, rows } = data;
    const headings = ['', getMonthString(+months[0]), getMonthString(+months[1]), getMonthString(+months[2])];
    const displayRows = rows.map((row) => {
      const displayRow = [row.label];
      row.data.forEach(({ value, type }) => {
        displayRow.push(transform(value, type, 1));
      });
      return displayRow;
    });

    const rowColors = [ColorsStyles.white, ColorsStyles.header_gray];
    return (
      <View style={styles.tab}>
        <View style={styles.heading}>
          <Text style={styles.headingTextLeft}>{headings[0]}</Text>
          <Text style={styles.blankColumn} />
          <Text style={styles.headingText}>{headings[1]}</Text>
          <Text style={styles.blankColumn} />
          <Text style={styles.headingText}>{headings[2]}</Text>
          <Text style={styles.blankColumn} />
          <Text style={styles.headingText}>{headings[3]}</Text>
        </View>
        {displayRows.map((row, index) => (
          <View key={index} style={{ ...styles.row, backgroundColor: rowColors[index % 2] }}>
            <Text style={styles.textLeft}>{row[0]}</Text>
            <Text style={styles.blankColumn} />
            <Text style={styles.text}>{row[1]}</Text>
            <Text style={styles.blankColumn} />
            <Text style={styles.text}>{row[2]}</Text>
            <Text style={styles.blankColumn} />
            <Text style={styles.text}>{row[3]}</Text>
          </View>
        ))}
      </View>
    );
  }

    toFixed = (value) => {
      try {
        value = +value;
        return value.toFixed(2);
      } catch (e) {
        return 0;
      }
    };

    renderDetailing(data) {
      if (data) {
        return (
          <ScrollView contentContainerStyle={styles.tab}>
            <View style={styles.heading}>
              <View style={styles.headingTextLeft} />
              <Text style={styles.blankColumn} />
              <Text style={styles.headingText}>{getMonthString(+data[0].month)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.headingText}>{getMonthString(+data[1].month)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.headingText}>{getMonthString(+data[2].month)}</Text>
            </View>

            <Text style={styles.subHeading}>Visit 1 (%)</Text>
            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>E-Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].e_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].e_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].e_detail.v1)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Virtual Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].virtual_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].virtual_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].virtual_detail.v1)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Physical Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].physical_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].physical_detail.v1)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].physical_detail.v1)}</Text>
            </View>

            <Text style={styles.subHeading}>Visit 2 (%)</Text>
            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>E-Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].e_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].e_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].e_detail.v2)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Virtual Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].virtual_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].virtual_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].virtual_detail.v2)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Physical Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].physical_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].physical_detail.v2)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].physical_detail.v2)}</Text>
            </View>

            <Text style={styles.subHeading}>Visit 3 (%)</Text>
            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>E-Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].e_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].e_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].e_detail.v3)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Virtual Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].virtual_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].virtual_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].virtual_detail.v3)}</Text>
            </View>

            <View style={styles.detailingRow}>
              <Text style={styles.textLeft}>Physical Detailing</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[0].physical_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[1].physical_detail.v3)}</Text>
              <Text style={styles.blankColumn} />
              <Text style={styles.text}>{this.toFixed(data[2].physical_detail.v3)}</Text>
            </View>
          </ScrollView>
        );
      }
      return null;
    }

    render() {
      const { isVisible, salesTrend, hideSalesTrend } = this.props;
      const { loading } = salesTrend;

      return (
        <Modal isVisible={isVisible} onRequestClose={hideSalesTrend}>
          <View style={styles.container}>
            <View style={styles.content}>
              {loading ? <Spinner color={ColorsStyles.colorPrimary} /> : null}
              {this.renderTabs()}
            </View>
          </View>
        </Modal>
      );
    }
}
