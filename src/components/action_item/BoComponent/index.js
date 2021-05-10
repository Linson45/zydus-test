import React, { Component } from 'react';
import {
  Body, Card, Icon, ListItem, Item, Input
} from 'native-base';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ParentView from '../../ParentView';
import Colors from '../../../styles/colorsStyles';

class BoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      searchQuery: null,
    };
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
      }
    }
  }

  renderHeader() {
    const { data } = this.props;
    if (data) {
      let {
        yetToStartItems,
        onTrackItems,
        delayedItems,
        completedActions,
      } = data;
      if (!yetToStartItems) yetToStartItems = [];
      if (!onTrackItems) onTrackItems = [];
      if (!delayedItems) delayedItems = [];
      if (!completedActions) completedActions = [];
      return (
        <View style={styles.headerImg}>
          <View style={styles.cardTopContainer}>
            <Card
              style={{ ...styles.card, borderLeftColor: Colors.gray_light_1 }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ selectedIndex: 0 })}
              >
                <Text
                  style={{
                    ...styles.number,
                    color: Colors.gray_light_1,
                  }}
                >
                  {yetToStartItems.length}
                </Text>
                <Text style={styles.numberText}>Yet to Start</Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, borderLeftColor: Colors.blue_light }}>
              <TouchableOpacity
                onPress={() => this.setState({ selectedIndex: 1 })}
              >
                <Text style={{ ...styles.number, color: Colors.blue_light }}>
                  {onTrackItems.length}
                </Text>
                <Text style={styles.numberText}>On Track</Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View style={styles.cardBottomContainer}>
            <Card style={{ ...styles.card, borderLeftColor: Colors.red_light }}>
              <TouchableOpacity
                onPress={() => this.setState({ selectedIndex: 2 })}
              >
                <Text style={{ ...styles.number, color: Colors.red_light }}>
                  {delayedItems.length}
                </Text>
                <Text style={styles.numberText}>Delayed</Text>
              </TouchableOpacity>
            </Card>

            <Card style={{ ...styles.card, borderLeftColor: Colors.green }}>
              <TouchableOpacity
                onPress={() => this.setState({ selectedIndex: 3 })}
              >
                <Text style={{ ...styles.number, color: Colors.green }}>
                  {completedActions.length}
                </Text>
                <Text style={styles.numberText}>Completed</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      );
    }
    return null;
  }

  renderList() {
    const { data } = this.props;

    if (data) {
      const { selectedIndex } = this.state;
      const { searchQuery } = this.state;

      const {
        yetToStartItems,
        onTrackItems,
        delayedItems,
        completedActions,
      } = data;
      let items = [];
      if (selectedIndex === 0) items = yetToStartItems;
      else if (selectedIndex === 1) items = onTrackItems;
      else if (selectedIndex === 2) items = delayedItems;
      else if (selectedIndex === 3) items = completedActions;

      if (items && items.length && Array.isArray(items)) {
        return (
          <ScrollView style={styles.listParent}>
            {items.map((item) => {
              if (searchQuery) {
                if (
                  item.assignedBy.hasOwnProperty('user')
                  && item.assignedBy.user
                ) {
                  const itemName = item.assignedBy.user.trim().toLowerCase();
                  if (itemName.includes(searchQuery)) {
                    return this.renderItem(item);
                  }
                }
              } else {
                return this.renderItem(item);
              }
              return null;
            })}
          </ScrollView>
        );
      }
      return <Text style={styles.noData}>No Data Available</Text>;
    }
    return null;
  }

  getStatusColor(status) {
    if (!status) status = '';
    status = status.toLowerCase();
    if (status === 'approved') return Colors.sky_blue;
    if (status === 'in progress') return Colors.sky_blue;
    if (status === 'delayed') return Colors.red;
    if (status === 'submitted') return Colors.colorPrimary;
    if (status === 'completed') return Colors.green;
    if (status === 'on track') return Colors.sky_blue;
    if (status === 'new') return Colors.sky_blue;
    return Colors.text_dark_gray;
  }

  renderItem(item) {
    const { gotoDetails } = this.props;
    const {
      summary,
      problemDesc,
      assignedBy,
      targetClosureDate,
      actionStatus,
    } = item;
    return (
      <ListItem onPress={() => gotoDetails(item)}>
        <Body>
          <Text style={styles.rowHeading}>{summary}</Text>
          <Text style={styles.problemHeading}>Problem Description:</Text>
          <Text style={styles.problem}>{problemDesc}</Text>
          <Text style={styles.problemHeading}>Created By:</Text>
          <Text style={styles.problem}>{assignedBy.user}</Text>
          <Text style={styles.deadline}>
            Deadline:
            {targetClosureDate}
          </Text>
          <View style={styles.lastRow}>
            <Text
              style={{
                ...styles.status,
                color: this.getStatusColor(actionStatus),
              }}
            >
              {actionStatus}
            </Text>
            <Icon name="rightcircle" type="AntDesign" style={styles.arrow} />
          </View>
        </Body>
      </ListItem>
    );
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
        <ImageBackground
          source={Images.ic_bg_main_1}
          style={styles.headerImg}
          resizeMode="stretch"
        >
          {this.renderHeader()}
        </ImageBackground>
        <Text style={styles.heading}>Action Summary</Text>
        <Item
          style={{
            margin: 5,
            borderColor: Colors.gray_light_1,
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
              color: Colors.gray_light_1,
            }}
          />
          <Input
            onChangeText={(searchQuery) => this.searchText({ searchQuery })}
            placeholder="Search"
          />
        </Item>
        {this.renderList()}
      </ParentView>
    );
  }
}

export default BoComponent;
