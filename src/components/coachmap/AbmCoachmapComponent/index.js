import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import {
  Card, Icon, Input, Item, ListItem
} from 'native-base';
import moment from 'moment';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';
import { getCurrentMonth, getCurrentYear, getMonthString } from '../../../util/dateTimeUtil';

export default class AbmCoachmapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      list: []
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      searchQuery: null,
      list: []
    });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
        const { data } = this.props;
        const searchResults = this.searchArray(searchQuery, data);
        this.setState({
          list: searchResults,
        });
      }
    }
  }

  searchArray(searchQuery, data) {
    if (data.length < 1) {
      return [];
    }
    const searchResults = [];
    for (let index = 0; index < data.length; index++) {
      const itemName = data[index].uname.trim().toLowerCase();
      if (itemName.includes(searchQuery)) {
        searchResults.push(data[index]);
      }
    }
    return searchResults;
  }

  renderHeader() {
    const { user_type, user_name } = this.props.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>{user_type}</Text>
            <Text style={styles.leftUserName}>{user_name}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.date}>
              {getMonthString(getCurrentMonth())}
              {' '}
              {getCurrentYear()}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTeam() {
    const {
      data, gotoDetails, gotoSummary, openAddCoachmap
    } = this.props;
    if (data) {
      const bos = this.state.searchQuery ? this.state.list : data;

      if (!Array.isArray(bos)) {
        return null;
      }

      return bos.map((item, index) => {
        let statusColor = ColorStyles.green;
        if (item.status !== 'Submitted') statusColor = ColorStyles.red;
        return (
          <ListItem key={index} onPress={() => gotoDetails(item)} style={styles.row}>
            <View>
              <Text style={styles.name}>{item.uname}</Text>
              <Text style={styles.city}>{item.hq_name}</Text>
              {item.filed_date ? (
                <Text
                  style={styles.row_date}
                >
                  {moment(item.filed_date).format('DD MMMM YYYY')}
                </Text>
              ) : null}
              <Text style={{ ...styles.row_date, color: statusColor }}>{item.status}</Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.buttonRight} onPress={() => openAddCoachmap(item)}>
                <Icon name="md-add" type="Ionicons" style={{ color: ColorStyles.white, fontSize: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLeft} onPress={() => gotoSummary(item)}>
                <Image source={require('../../../../assets/images/ic_map_view_coach.png')} style={styles.trendIcon} />
              </TouchableOpacity>
            </View>

          </ListItem>
        );
      });
    }
    return null;
  }

  renderCount() {
    const { data } = this.props;
    if (data) {
      let pending = 0; const draft = 0; let
        submitted = 0;
      data.forEach((bo) => {
        if (bo.status === 'Submitted') submitted += 1;
        else if (bo.status === 'Pending') pending += 1;
      });
      return (
        <View style={styles.headerContainer}>
          <Card style={{
            ...styles.countCard, borderColor: ColorStyles.red, borderTopWidth: 0, borderBottomWidth: 0
          }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.red }}>{pending}</Text>
            <Text style={styles.countText}>Pending</Text>
          </Card>
          <Card style={{
            ...styles.countCard, borderColor: ColorStyles.gray_light, borderTopWidth: 0, borderBottomWidth: 0
          }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.gray_light }}>{draft}</Text>
            <Text style={styles.countText}>Draft</Text>
          </Card>
          <Card style={{
            ...styles.countCard, borderColor: ColorStyles.green, borderTopWidth: 0, borderBottomWidth: 0
          }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.green }}>{submitted}</Text>
            <Text style={styles.countText}>Submitted</Text>
          </Card>
        </View>
      );
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
      >
        {this.renderHeader()}
        {this.renderCount()}
        <ScrollView>
          <Item style={{
            margin: 5,
            borderColor: ColorStyles.gray_light_1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: 15,
            marginRight: 15
          }}
          >
            <Icon
              name="ios-search"
              style={{
                color: ColorStyles.gray_light_1
              }}
            />
            <Input
              onChangeText={(searchQuery) => this.searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {this.renderTeam()}
        </ScrollView>
      </ParentView>
    );
  }
}
