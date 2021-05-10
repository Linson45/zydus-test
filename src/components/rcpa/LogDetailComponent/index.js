import React from 'react';
import { Body, ListItem, Right } from 'native-base';
import {
  ImageBackground, ScrollView, Text, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyle from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';

export default class RcpaLogDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      collapsibleToggleArray: []
    };
  }

    static navigationOptions = {
      title: 'RCPA View',
    };

    componentDidMount() {
      this.parseData();
    }

    toggleCollapse(position, value) {
      const toggleArray = this.state.collapsibleToggleArray;
      toggleArray[position] = value;
      this.setState({ collapsibleToggleArray: toggleArray });
    }

    renderHeader() {
      const { doctor, chemist } = this.props.navigation.state.params;
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
      const { brands, collapsibleToggleArray } = this.state;
      return brands.map((brand, index) => (
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
              <Text style={styles.headerText}>{brand.brandName}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody style={styles.headerStyle}>
            <ScrollView>
              {this.renderBrandItems(brand.items)}
            </ScrollView>
          </CollapseBody>
        </Collapse>

      ));
    }

    renderBrandItems(items) {
      return items.map((item, index) => {
        const {
          company_name, product_name, quantity, is_master, total, is_total
        } = item;
        let backgroundColor = ColorStyle.white;
        if (index % 2 === 0) backgroundColor = ColorStyle.header_gray;
        else backgroundColor = ColorStyle.white;
        if (is_master) {
          return (
            <View key={index} style={{ ...styles.headerStyle, backgroundColor }}>
              <ListItem>
                <Body>
                  <Text style={styles.masterTitle}>{company_name}</Text>
                  <Text style={styles.secondaryTitle}>{product_name}</Text>
                </Body>
                <Right>
                  <Text>{quantity}</Text>
                </Right>
              </ListItem>
            </View>
          );
        } if (is_total) {
          return (
            <View key={index} style={{ ...styles.totalContainer }}>
              <ListItem style={styles.totalListItem}>
                <Body>
                  <Text style={styles.totalTextLeft}>Total</Text>
                </Body>

                <Right>
                  <Text note style={styles.totalTextRight}>{total}</Text>
                </Right>
              </ListItem>
            </View>
          );
        }
        return (
          <View key={index} style={{ ...styles.headerStyle, backgroundColor }}>
            <ListItem>
              <Body>
                <Text style={styles.primaryTitle}>{company_name}</Text>
                <Text style={styles.secondaryTitle}>{product_name}</Text>
              </Body>
              <Right>
                <Text>{quantity}</Text>
              </Right>
            </ListItem>
          </View>
        );
      });
    }

    parseData() {
      const { details } = this.props.navigation.state.params.log;
      const brandsObj = {};

      details.forEach((item) => {
        let items = brandsObj[item.brand_code];
        if (!items) items = [];
        items.push(item);
        brandsObj[item.brand_code] = items;
      });

      const brands = [];
      const collapsibleToggleArray = [];
      Object.keys(brandsObj).forEach((brandCode) => {
        const brand = {
          brandName: brandsObj[brandCode][0].brand_name,
          items: this.parseBrandItems(brandsObj[brandCode])
        };
        brands.push(brand);
        collapsibleToggleArray.push(true);
      });
      this.setState({ brands, collapsibleToggleArray });
    }

    parseBrandItems(items) {
      const productsDict = {};

      items.forEach((item) => {
        let product = productsDict[item.product_code];
        if (!product) product = {};

        if (item.is_master) {
          product.master = item;
        } else if (item.product_name === 'Other') {
          product.other = item;
        } else {
          let { comps } = product;
          if (!comps) comps = [];
          comps.push(item);
          product.comps = comps;
        }
        productsDict[item.product_code] = product;
      });

      const products = [];
      Object.keys(productsDict).forEach((product_code) => {
        const { master, other, comps } = productsDict[product_code];
        let total = 0;
        if (master) {
          total += master.quantity;
          products.push(master);
        }
        if (comps) {
          comps.forEach((comp) => {
            products.push(comp);
            total += comp.quantity;
          });
        }
        if (other) {
          products.push(other);
          total += other.quantity;
        }
        products.push({
          is_total: true,
          total
        });
      });
      return products;
    }

    render() {
      return (
        <ParentView style={styles.container}>
          <ScrollView>
            {this.renderHeader()}
            {this.renderBrands()}
          </ScrollView>
        </ParentView>
      );
    }
}
