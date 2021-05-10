import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card, Icon, Input, Item, ListItem
} from 'native-base';
import moment from 'moment';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';
import {
  getCurrentMonth,
  getCurrentYear,
  getMonthString,
} from '../../../util/dateTimeUtil';
import Images from '../../../Constants/imageConstants';

export default class RbmCoachmapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      searchQuery: null,
      boList: [],
    };
  }

  componentDidMount() {
    this.setState({
      searchQuery: null,
      boList: [],
    });
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
    const {
      user_title, user_name
    } = this.props.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>{user_title}</Text>
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
    const { selected } = this.state;
    const { data } = this.props;
    if (data) {
      if (selected === 0) {
        return this.renderLeaderMapTeam();
      }
      return this.renderCoachMapTeam();
    }
    return null;
  }

  renderCount() {
    const { selected } = this.state;
    const { data } = this.props;
    if (data) {
      if (selected === 0) {
        return this.renderLeaderMapCount();
      }
      return this.renderCoachMapCount();
    }
    return null;
  }

  renderLeaderMapCount() {
    const { data } = this.props;
    const { leader_map } = data;
    if (leader_map) {
      let pending = 0;
      const draft = 0;
      let submitted = 0;
      leader_map.forEach((bo) => {
        if (bo.status === 'Submitted') submitted += 1;
        else if (bo.status === 'Pending') pending += 1;
      });
      return (
        <View style={styles.headerContainer}>
          <Card style={{ ...styles.countCard, borderLeftColor: ColorStyles.red }}>
            <Text style={{ ...styles.count, color: ColorStyles.red }}>
              {pending}
            </Text>
            <Text style={styles.countText}>Pending</Text>
          </Card>
          <Card
            style={{
              ...styles.countCard,
              borderLeftColor: ColorStyles.gray_light,
            }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.gray_light }}>
              {draft}
            </Text>
            <Text style={styles.countText}>Draft</Text>
          </Card>
          <Card
            style={{ ...styles.countCard, borderLeftColor: ColorStyles.green }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.green }}>
              {submitted}
            </Text>
            <Text style={styles.countText}>Submitted</Text>
          </Card>
        </View>
      );
    }
    return null;
  }

  renderCoachMapCount() {
    const { data } = this.props;
    const { coach_map } = data;
    if (coach_map) {
      let pending = 0;
      const draft = 0;
      let submitted = 0;
      coach_map.forEach((bo) => {
        if (bo.status === 'Submitted') submitted += 1;
        else if (bo.status === 'Pending') pending += 1;
      });
      return (
        <View style={styles.headerContainer}>
          <Card style={{ ...styles.countCard, borderLeftColor: ColorStyles.red }}>
            <Text style={{ ...styles.count, color: ColorStyles.red }}>
              {pending}
            </Text>
            <Text style={styles.countText}>Pending</Text>
          </Card>
          <Card
            style={{
              ...styles.countCard,
              borderLeftColor: ColorStyles.gray_light,
            }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.gray_light }}>
              {draft}
            </Text>
            <Text style={styles.countText}>Draft</Text>
          </Card>
          <Card
            style={{ ...styles.countCard, borderLeftColor: ColorStyles.green }}
          >
            <Text style={{ ...styles.count, color: ColorStyles.green }}>
              {submitted}
            </Text>
            <Text style={styles.countText}>Submitted</Text>
          </Card>
        </View>
      );
    }
    return null;
  }

  renderLeaderMapTeam() {
    const {
      data,
      gotoLeaderboardDetails,
      gotoLeaderboardSummary,
      addLeademap,
    } = this.props;
    const { leader_map } = data;
    const { searchQuery } = this.state;

    if (leader_map && Array.isArray(leader_map)) {
      const leader_map_view = leader_map.map((item, index) => {
        let statusColor = ColorStyles.green;
        if (item.status !== 'Submitted') statusColor = ColorStyles.red;

        if (searchQuery) {
          if (item.hasOwnProperty('uname') && item.uname) {
            const itemName = item.uname.trim().toLowerCase();
            if (itemName.includes(searchQuery)) {
              return (
                <ListItem
                  key={index}
                  onPress={() => gotoLeaderboardDetails(item)}
                  style={styles.row}
                >
                  <View>
                    <Text style={styles.name}>{item.uname}</Text>
                    <Text style={styles.city}>{item.hq_name}</Text>
                    {item.filed_date ? (
                      <Text style={styles.row_date}>
                        {moment(item.filed_date).format('DD MMMM YYYY')}
                      </Text>
                    ) : null}
                    <Text style={{ ...styles.row_date, color: statusColor }}>
                      {item.status}
                    </Text>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.buttonRight}
                      onPress={() => addLeademap(item)}
                    >
                      <Icon
                        name="md-add"
                        type="Ionicons"
                        style={{ color: ColorStyles.white, fontSize: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonLeft}
                      onPress={() => gotoLeaderboardSummary(item)}
                    >
                      <Image
                        source={require('../../../../assets/images/ic_map_view_coach.png')}
                        style={styles.trendIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </ListItem>
              );
            }
          }
        } else {
          return (
            <ListItem
              key={index}
              onPress={() => gotoLeaderboardDetails(item)}
              style={styles.row}
            >
              <View>
                <Text style={styles.name}>{item.uname}</Text>
                <Text style={styles.city}>{item.hq_name}</Text>
                {item.filed_date ? (
                  <Text style={styles.row_date}>
                    {moment(item.filed_date).format('DD MMMM YYYY')}
                  </Text>
                ) : null}
                <Text style={{ ...styles.row_date, color: statusColor }}>
                  {item.status}
                </Text>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonRight}
                  onPress={() => addLeademap(item)}
                >
                  <Icon
                    name="md-add"
                    type="Ionicons"
                    style={{ color: ColorStyles.white, fontSize: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonLeft}
                  onPress={() => gotoLeaderboardSummary(item)}
                >
                  <Image
                    source={require('../../../../assets/images/ic_map_view_coach.png')}
                    style={styles.trendIcon}
                  />
                </TouchableOpacity>
              </View>
            </ListItem>
          );
        }
        return null;
      });
      return (
        <>
          <Item
            style={{
              margin: 5,
              borderColor: ColorStyles.gray_light_1,
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
                color: ColorStyles.gray_light_1,
              }}
            />
            <Input
              onChangeText={(searchQuery) => this.searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {leader_map_view}
        </>
      );
    }
    return null;
  }

  renderCoachMapTeam() {
    const {
      data,
      gotoCoachmapDetails,
      gotoCoachmapSummary,
      openAddCoachmap,
    } = this.props;
    const { coach_map } = data;
    const { searchQuery } = this.state;

    if (coach_map && Array.isArray(coach_map)) {
      const coach_map_view = coach_map.map((item, index) => {
        let statusColor = ColorStyles.green;
        if (item.status !== 'Submitted') statusColor = ColorStyles.red;

        if (searchQuery) {
          if (item.hasOwnProperty('uname') && item.uname) {
            const itemName = item.uname.trim().toLowerCase();
            if (itemName.includes(searchQuery)) {
              return (
                <ListItem
                  key={index}
                  onPress={() => gotoCoachmapDetails(item)}
                  style={styles.row}
                >
                  <View>
                    <Text style={styles.name}>{item.uname}</Text>
                    <Text style={styles.city}>{item.hq_name}</Text>
                    {item.filed_date ? (
                      <Text style={styles.row_date}>
                        {moment(item.filed_date).format('DD MMMM YYYY')}
                      </Text>
                    ) : null}
                    <Text style={{ ...styles.row_date, color: statusColor }}>
                      {item.status}
                    </Text>
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.buttonRight}
                      onPress={() => openAddCoachmap(item)}
                    >
                      <Icon
                        name="md-add"
                        type="Ionicons"
                        style={{ color: ColorStyles.white, fontSize: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonLeft}
                      onPress={() => gotoCoachmapSummary(item)}
                    >
                      <Image
                        source={require('../../../../assets/images/ic_map_view_coach.png')}
                        style={styles.trendIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </ListItem>
              );
            }
          }
        } else {
          return (
            <ListItem
              key={index}
              onPress={() => gotoCoachmapDetails(item)}
              style={styles.row}
            >
              <View>
                <Text style={styles.name}>{item.uname}</Text>
                <Text style={styles.city}>{item.hq_name}</Text>
                {item.filed_date ? (
                  <Text style={styles.row_date}>
                    {moment(item.filed_date).format('DD MMMM YYYY')}
                  </Text>
                ) : null}
                <Text style={{ ...styles.row_date, color: statusColor }}>
                  {item.status}
                </Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonRight}
                  onPress={() => openAddCoachmap(item)}
                >
                  <Icon
                    name="md-add"
                    type="Ionicons"
                    style={{ color: ColorStyles.white, fontSize: 20 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonLeft}
                  onPress={() => gotoCoachmapSummary(item)}
                >
                  <Image
                    source={require('../../../../assets/images/ic_map_view_coach.png')}
                    style={styles.trendIcon}
                  />
                </TouchableOpacity>
              </View>
            </ListItem>
          );
        }
        return null;
      });
      return (
        <>
          <Item
            style={{
              margin: 5,
              borderColor: ColorStyles.gray_light_1,
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
                color: ColorStyles.gray_light_1,
              }}
            />
            <Input
              onChangeText={(searchQuery) => this.searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {coach_map_view}
        </>
      );
    }
    return null;
  }

  renderTabs() {
    return (
      <View style={styles.buttonContainer}>
        {this.renderTab({
          active: this.state.selected === 0,
          orientation: 'LeftButton',
          label: 'Leadermap',
          value: 0,
        })}
        {this.renderTab({
          active: this.state.selected === 1,
          orientation: 'RightButton',
          label: 'Coachmap',
          value: 1,
        })}
      </View>
    );
  }

  renderTab({
    active, orientation, label, value
  }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ selected: value });
        }}
      >
        {active ? (
          <ImageBackground source={Images[orientation]} style={styles.button}>
            <Text style={styles.whiteText}>{label}</Text>
          </ImageBackground>
        ) : (
          <View
            style={[
              styles.inActiveButton,
              orientation === 'LeftButton'
                ? styles.LeftButtonDynamic
                : styles.RightButtonDynamic,
            ]}
          >
            <Text style={styles.blackText}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
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
        {this.renderTabs()}
        <ScrollView>{this.renderTeam()}</ScrollView>
      </ParentView>
    );
  }
}
