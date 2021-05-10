import React from 'react';
import {
  Body, Container, Content, H3, Icon, Input, Item, ListItem, Right, Text, View
} from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import { numberTransformer } from '../../../util/NumberTrasformer';
import Colors from '../../../styles/colorsStyles';
import LayoutStyle from '../../../styles/layoutStyles';

export default class BrandWisePrimarySalesComponent extends React.Component {
  renderList(data, onItemPress) {
    if (!Array.isArray(data)) {
      return null;
    }
    return data.map((item, index) => {
      const {
        id, section_1, section_2, section_3, title
      } = item;
      let valueStyle = { ...styles.itemValues };
      if (section_2.value < 0) valueStyle = { ...valueStyle, color: Colors.red };
      else if (section_2.value < 50) valueStyle = { ...valueStyle, color: Colors.orange };
      else valueStyle = { ...valueStyle, color: Colors.green };

      return (
        <ListItem key={id} onPress={() => onItemPress(index)}>
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
                  {section_3.value}
                  {' '}
                  %
                </Text>
              </View>

              <View style={styles.rowItem}>
                <Text style={styles.itemValues}>{section_2.label}</Text>
                <Text style={valueStyle}>
                  {section_2.value}
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
      loading, data, date_range, connected, onItemPress, _onChangeSearchText
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <Container style={{ padding: 10 }}>
          <H3 style={styles.date_heading}>{date_range}</H3>
          <Item style={LayoutStyle.searchBar}>
            <Icon name="ios-search" style={LayoutStyle.searchBarIcon} />
            <Input
              onChangeText={(searchQuery) => _onChangeSearchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          <Content>
            <ScrollView>
              {data ? this.renderList(data, onItemPress) : null}
            </ScrollView>
          </Content>
        </Container>
      </ParentView>
    );
  }
}
