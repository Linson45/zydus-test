import React from 'react';
import {
  Body, Icon, Input, Item, ListItem, Right, Text
} from 'native-base';
import { ScrollView } from 'react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyle from '../../../styles/colorsStyles';

export default class AbmBoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        this.setState({ searchQuery: searchEvent.searchQuery });
      }
    }
  }

  renderList() {
    const { data, onPress } = this.props;
    const { searchQuery } = this.state;
    return data.map((bo, index) => {
      const { name, hq_name } = bo;
      let { completion } = bo;

      if (searchQuery) {
        if (name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
          return null;
        }
      }

      if (!completion) completion = 0;

      const completionStyle = { marginTop: 5 };
      if (completion > 50) {
        completionStyle.color = ColorStyle.green;
      } else {
        completionStyle.color = ColorStyle.red;
      }

      return (
        <ListItem
          key={index}
          onPress={() => onPress(bo)}
          bordered
          style={{
            marginLeft: 0,
          }}
        >
          <Body>
            <Text style={styles.name}>{name}</Text>
            <Text note style={styles.secondaryTitle}>
              (BO,
              {hq_name}
              )
            </Text>
            <Text note style={completionStyle}>
              Completion:
              {completion}
              {' '}
              %
            </Text>
          </Body>

          <Right>
            <Icon
              name="rightcircle"
              type="AntDesign"
              style={{ color: ColorStyle.black, fontSize: 16 }}
            />
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    const { loading, data, connected } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        <ScrollView style={{
          paddingHorizontal: 15
        }}
        >
          <Item style={{
            margin: 5,
            borderColor: ColorStyle.gray_light_1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          >
            <Icon
              name="ios-search"
              style={{
                color: ColorStyle.gray_light_1
              }}
            />
            <Input
              onChangeText={(searchQuery) => this.searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {data ? this.renderList() : null}
        </ScrollView>
      </ParentView>
    );
  }
}
