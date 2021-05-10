import React from 'react';
import {
  Body, Container, H3, Icon, ListItem, Right, View
} from 'native-base';
import { ScrollView, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ParentView from '../../ParentView';
import styles from './styles';
import { numberTransformer } from '../../../util/NumberTrasformer';
import TabStyles from '../../../styles/tabStyles';
import Colors from '../../../styles/colorsStyles';

export default class ZbmPrimarySalesComponent extends React.Component {
  renderTab1List() {
    const { regionWiseSales, onRegionItemPress } = this.props;
    if (!Array.isArray(regionWiseSales)) {
      return null;
    }
    return regionWiseSales.map((item, index) => {
      const {
        id, section_1, section_2, section_3, title
      } = item;
      let valueStyle = { ...styles.itemValues };
      if (section_2.value < 0) valueStyle = { ...valueStyle, color: Colors.red };
      else if (section_2.value < 50) valueStyle = { ...valueStyle, color: Colors.orange };
      else valueStyle = { ...valueStyle, color: Colors.green };

      return (
        <ListItem key={id} onPress={() => onRegionItemPress(index)}>
          <Body>
            <Text style={styles.itemHeading}>{title}</Text>

            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_1.label}</Text>
                <Text
                  style={styles.itemValues}
                >
                  {numberTransformer(section_1.value, 2)}
                  {' '}
                  /
                  {numberTransformer(section_1.value_2, 2)}
                </Text>

                <Text style={styles.itemMarginTop}>{section_3.label}</Text>
                <Text style={styles.itemValues}>
                  {numberTransformer(section_3.value, 2)}
                  {' '}
                  %
                </Text>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_2.label}</Text>
                <Text style={valueStyle}>
                  {numberTransformer(section_2.value, 2)}
                  {' '}
                  %
                </Text>
              </View>
            </View>
          </Body>

          <Right>
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: Colors.black, fontSize: 16 }}
            />
          </Right>

        </ListItem>
      );
    });
  }

  renderTab2List() {
    const { brandWiseSales, onBrandItemPress } = this.props;
    if (!Array.isArray(brandWiseSales)) {
      return null;
    }
    return brandWiseSales.map((item, index) => {
      const {
        id, section_1, section_2, section_3, title
      } = item;
      let valueStyle = { ...styles.itemValues };
      if (section_2.value < 0) valueStyle = { ...valueStyle, color: Colors.red };
      else if (section_2.value < 50) valueStyle = { ...valueStyle, color: Colors.orange };
      else valueStyle = { ...valueStyle, color: Colors.green };

      return (
        <ListItem key={id} onPress={() => onBrandItemPress(index)}>
          <Body>
            <Text style={styles.itemHeading}>{title}</Text>

            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_1.label}</Text>
                <Text
                  style={styles.itemValues}
                >
                  {numberTransformer(section_1.value, 2)}
                  {' '}
                  /
                  {numberTransformer(section_1.value_2, 2)}
                </Text>

                <Text style={styles.itemMarginTop}>{section_3.label}</Text>
                <Text style={styles.itemValues}>
                  {numberTransformer(section_3.value, 2)}
                  {' '}
                  %
                </Text>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_2.label}</Text>
                <Text style={valueStyle}>
                  {numberTransformer(section_2.value, 2)}
                  {' '}
                  %
                </Text>
              </View>
            </View>
          </Body>

          <Right>
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: Colors.black, fontSize: 16 }}
            />
          </Right>

        </ListItem>
      );
    });
  }

  render() {
    const {
      loading, date_range, regionWiseSales, brandWiseSales
    } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container>
          <H3 style={styles.date_heading}>{date_range}</H3>
          <ScrollableTabView
            tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
            tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
            tabBarInactiveTextColor={TabStyles.textStyle.color}
            tabBarActiveTextColor={TabStyles.activeTextStyle.color}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <View tabLabel="Region Wise Sales">
              <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
                {regionWiseSales ? this.renderTab1List() : null}
              </ScrollView>
            </View>
            <View tabLabel="Brand Wise Zone Sales">
              <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
                {brandWiseSales ? this.renderTab2List() : null}
              </ScrollView>
            </View>
          </ScrollableTabView>

        </Container>
      </ParentView>
    );
  }
}
