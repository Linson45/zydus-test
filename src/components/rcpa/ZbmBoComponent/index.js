import React from 'react';
import {
  Body, Icon, Input, Item, ListItem, Right, Text
} from 'native-base';
import { ImageBackground, ScrollView } from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import ParentView from '../../ParentView';
import styles from './styles';
import ColorStyle from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';

export default class ZbmBoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleToggleArray: new Array(100).fill(true),
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

  renderList(bos) {
    const { onPress } = this.props;
    const { searchQuery } = this.state;
    return bos.map((bo, index) => {
      const { name, hq_name, completion } = bo;
      if (searchQuery) {
        if (name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
          return null;
        }
      }
      const completionStyle = { marginTop: 5 };
      if (completion > 50) {
        completionStyle.color = ColorStyle.green;
      } else {
        completionStyle.color = ColorStyle.red;
      }

      return (
        <ListItem key={index} onPress={() => onPress(bo)}>
          <Body>
            <Text style={styles.name}>{name}</Text>
            <Text note style={styles.secondaryTitle}>
              (BO,
              {hq_name}
              )
            </Text>
            <Text note style={completionStyle}>
              Completion:
              {completion.toFixed(2)}
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

  toggleCollapse(position, value) {
    const toggleArray = this.state.collapsibleToggleArray;
    toggleArray[position] = value;
    this.setState({ collapsibleToggleArray: toggleArray });
  }

  renderCollapse() {
    const { data } = this.props;
    const { collapsibleToggleArray, searchQuery } = this.state;

    if (data && Array.isArray(data)) {
      return data.map(({ region_id, region_name, bos }, index) => (
        <Collapse
          key={region_id}
          onToggle={(isCollapsed) => this.toggleCollapse(index, isCollapsed)}
          isCollapsed={Boolean(searchQuery) || collapsibleToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <ImageBackground
              source={Boolean(searchQuery) || this.state.collapsibleToggleArray[index] ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
              style={styles.headerImageBg}
            >
              <Text style={styles.headerText}>{region_name}</Text>
            </ImageBackground>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {this.renderList(bos)}
            </ScrollView>
          </CollapseBody>
        </Collapse>
      ));
    }
    return null;
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
        <Item style={{
          margin: 5,
          borderColor: ColorStyle.gray_light_1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 10,
          paddingLeft: 25,
          paddingRight: 25,
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
        {this.renderCollapse()}
      </ParentView>
    );
  }
}
