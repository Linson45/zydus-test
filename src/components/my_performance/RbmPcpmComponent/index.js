import React from 'react';
import {
  Body, Container, H3, Icon, ListItem, Right, View
} from 'native-base';
import { ScrollView, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ParentView from '../../ParentView';
import styles from './styles';
import { displayDecimal, numberTransformer } from '../../../util/NumberTrasformer';
import TabStyles from '../../../styles/tabStyles';
import Colors from '../../../styles/colorsStyles';

export default class RbmPcpmComponent extends React.Component {
  renderList() {
    const { data, onItemPress } = this.props;
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((item, index) => {
      const {
        id, section_1, section_2, section_3, section_4, title, secondary_title
      } = item;

      return (
        <ListItem key={id} onPress={() => onItemPress(index)}>
          <Body>
            <Text style={styles.itemHeading}>
              {title}
              {' '}
              {secondary_title}
            </Text>

            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_1.label}</Text>
                <Text style={styles.itemValues}>{numberTransformer(section_1.value, 2)}</Text>

                <Text style={styles.itemMarginTop}>{section_3.label}</Text>
                <Text style={styles.itemValues}>{numberTransformer(section_3.value, 2)}</Text>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_2.label}</Text>
                <Text style={styles.itemValues}>{numberTransformer(section_2.value, 2)}</Text>

                <Text style={styles.itemMarginTop}>{section_4.label}</Text>
                <Text style={styles.itemValues}>
                  {displayDecimal(section_4.value)}
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
    const { loading, data, date_range } = this.props;

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
            <View tabLabel="Area Wise PCPM Sales">
              <ScrollView ref={(scrollView) => this._scrollView = scrollView}>
                {data ? this.renderList() : null}
              </ScrollView>
            </View>
          </ScrollableTabView>
        </Container>
      </ParentView>
    );
  }
}
