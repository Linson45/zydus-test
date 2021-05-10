import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import {
  Card, CardItem, Fab, Icon, Right, Input, Item
} from 'native-base';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import moment from 'moment';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';
import {
  getCurrentMonth,
  getCurrentYear,
  getMonthString,
} from '../../../util/dateTimeUtil';

export default class BoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { user_type, rep_code, user_name } = this.props.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.bannerImage}>
          <View style={styles.headerLeft}>
            <Text style={styles.leftUserType}>
              {user_type}
              {' '}
              (
              {rep_code}
              )
            </Text>
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

  renderFab() {
    const logo = require('../../../../assets/images/ic_map_view_coach.png');
    const { gotoSummary } = this.props;
    return (
      <Fab
        direction="up"
        style={{ backgroundColor: ColorStyles.colorPrimary }}
        position="bottomRight"
        onPress={() => gotoSummary({})}
      >
        <Image source={logo} style={styles.logoImage} />
      </Fab>
    );
  }

  renderCollapse() {
    const { data, gotoDetails } = this.props;
    const { searchQuery } = this.state;

    if (data && Array.isArray(data)) {
      return data.map(
        (
          {
            filed_by_desg_desc, filed_by_rep_name, files
          },
          index,
        ) => {
          if (searchQuery) {
            if (filed_by_rep_name) {
              const itemName = filed_by_rep_name.trim().toLowerCase();
              if (itemName.includes(searchQuery)) {
                return (
                  <Collapse key={index}>
                    <CollapseHeader>
                      <Card>
                        <CardItem style={styles.collapseHeader}>
                          <View>
                            <Text>
                              {filed_by_rep_name}
                              {' '}
                              (
                              {files.length}
                              )
                            </Text>
                            <Text style={styles.collapseHeaderSub}>
                              {filed_by_desg_desc}
                            </Text>
                          </View>

                          <Right>
                            <Icon name="down" type="AntDesign" />
                          </Right>
                        </CardItem>
                      </Card>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                      <ScrollView>
                        {Array.isArray(files)
                          ? files.map((file, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => gotoDetails(file)}
                            >
                              <Text style={styles.bodyDate}>
                                {moment(file.filed_date).format(
                                  'DD MMM YYYY',
                                )}
                              </Text>
                            </TouchableOpacity>
                          ))
                          : null}
                      </ScrollView>
                    </CollapseBody>
                  </Collapse>
                );
              }
            }
          } else {
            return (
              <Collapse key={index}>
                <CollapseHeader>
                  <Card>
                    <CardItem style={styles.collapseHeader}>
                      <View>
                        <Text>
                          {filed_by_rep_name}
                          {' '}
                          (
                          {files.length}
                          )
                        </Text>
                        <Text style={styles.collapseHeaderSub}>
                          {filed_by_desg_desc}
                        </Text>
                      </View>

                      <Right>
                        <Icon name="down" type="AntDesign" />
                      </Right>
                    </CardItem>
                  </Card>
                </CollapseHeader>
                <CollapseBody style={styles.collapseBody}>
                  <ScrollView>
                    {Array.isArray(files)
                      ? files.map((file, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => gotoDetails(file)}
                        >
                          <Text style={styles.bodyDate}>
                            {moment(file.filed_date).format('DD MMM YYYY')}
                          </Text>
                        </TouchableOpacity>
                      ))
                      : null}
                  </ScrollView>
                </CollapseBody>
              </Collapse>
            );
          }
          return null;
        },
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
        <View>
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
              marginLeft: 15,
              marginRight: 15,
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
          <View style={styles.collapseParent}>{this.renderCollapse()}</View>
        </View>
        {this.renderFab()}
      </ParentView>
    );
  }
}
