import React from 'react';
import {
  ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyle from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';

export default class HistoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      collapsibleToggleArray: new Array(100).fill(true)
    };
  }

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderHeader() {
    const { doctor, chemist } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.ChemistSelectionBanner}
          resizeMode="stretch"
          style={styles.bannerStyle}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.year}>
              {getFullMonthString(getCurrentMonth())}
              {' '}
              {getCurrentYear()}
            </Text>
          </View>
        </ImageBackground>

        <Text style={styles.doctorName}>
          {doctor.doc_name}
          {' '}
          (Doctor)
        </Text>
        <Text style={styles.chemistName}>
          {chemist.chemist_name}
          {' '}
          (Chemist)
        </Text>
      </View>
    );
  }

  renderBrands() {
    const { data } = this.props;
    const { collapsibleToggleArray } = this.state;
    if (data && Array.isArray(data)) {
      return data.map((brand, index) => (
        <Collapse
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          style={styles.collapse}
          isCollapsed={collapsibleToggleArray[index]}
          key={index}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
            >
              <Text style={styles.headerText}>{brand.brand_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody style={styles.headerStyle}>
            <ScrollView>
              {this.renderBrandItems(this.parseItems(brand.products))}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
  }

  parseItems(items) {
    const products = [];

    items.forEach(({
      product_code, product_name, quantity1, quantity2, quantity3, date1, date2, date3, competitions
    }) => {
      let total1 = 0; let total2 = 0; let
        total3 = 0;
      products.push({
        is_master: true,
        product_name,
        product_code,
        company_name: 'Zydus',
        quantity1,
        quantity2,
        quantity3,
        date1,
        date2,
        date3
      });
      total1 += this.zero(quantity1);
      total2 += this.zero(quantity2);
      total3 += this.zero(quantity3);
      competitions.forEach(({
        product_code, product_name, quantity1, quantity2, quantity3, company_name
      }) => {
        products.push({
          is_master: false,
          product_name,
          product_code,
          company_name,
          quantity1,
          quantity2,
          quantity3
        });
        total1 += this.zero(quantity1);
        total2 += this.zero(quantity2);
        total3 += this.zero(quantity3);
      });
      products.push({
        is_master: false,
        is_total: true,
        total1,
        total2,
        total3
      });
    });
    return products;
  }

  zero(value) {
    if (value) return value;
    return 0;
  }

  dashIfZero(value) {
    if (value) return value;
    return '--';
  }

  renderBrandItems(items) {
    return items.map((item, index) => {
      const {
        company_name, product_name, quantity1, quantity2, quantity3, is_master, total1, total2, total3,
        is_total, date1, date2, date3
      } = item;
      let backgroundColor = ColorStyle.white;
      if (index % 2 === 0) backgroundColor = ColorStyle.header_gray;
      else backgroundColor = ColorStyle.white;
      if (is_master) {
        return (
          <View key={index}>
            <View style={{ ...styles.itemContainer, backgroundColor }}>
              <View style={{ flex: 1 }} />
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{date1}</Text>
                <Text style={styles.date}>{date2}</Text>
                <Text style={styles.date}>{date3}</Text>
              </View>
            </View>

            <View style={{ ...styles.itemContainer, backgroundColor }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.masterTitle}>{company_name}</Text>
                <Text style={styles.secondaryTitle}>{product_name}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={{ flex: 1 }}>{this.dashIfZero(quantity1)}</Text>
                <Text style={{ flex: 1 }}>{this.dashIfZero(quantity2)}</Text>
                <Text style={{ flex: 1 }}>{this.dashIfZero(quantity3)}</Text>
              </View>
            </View>
          </View>
        );
      } if (is_total) {
        return (
          <View key={index} style={{ ...styles.totalContainer }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalTextLeft}>Total</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.totalTextRight}>{this.dashIfZero(total1)}</Text>
              <Text style={styles.totalTextRight}>{this.dashIfZero(total2)}</Text>
              <Text style={styles.totalTextRight}>{this.dashIfZero(total3)}</Text>
            </View>
          </View>
        );
      }
      return (
        <View key={index} style={{ ...styles.itemContainer, backgroundColor }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.primaryTitle}>{company_name}</Text>
            <Text style={styles.secondaryTitle}>{product_name}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={{ flex: 1 }}>{this.dashIfZero(quantity1)}</Text>
            <Text style={{ flex: 1 }}>{this.dashIfZero(quantity2)}</Text>
            <Text style={{ flex: 1 }}>{this.dashIfZero(quantity3)}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    const { loading, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <ScrollView>
          {this.renderHeader()}
          {this.renderBrands()}
        </ScrollView>
      </ParentView>
    );
  }
}
