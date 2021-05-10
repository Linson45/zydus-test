import React, { Fragment } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Icon, Input, Item } from 'native-base';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import ParentView from '../../ParentView';
import layoutStyles from '../../../styles/layoutStyles';
import {
  FontStyle,
  FSExtraBold,
  FSLight,
  LightFontStyle,
} from '../../../styles/fontsStyles';
import ColorStyle from '../../../styles/colorsStyles';
import styles from '../BoSuggestedDoctorsComponent/styles';
import Images from '../../../Constants/imageConstants';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import TabStyles from '../../../styles/tabStyles';
import { multisort } from '../../../util/SortArray';

class TeamComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRef: '',
      searchQuery: null,
      list: [],
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      searchRef: '',
      searchQuery: null,
      list: [],
    });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
        const { data } = this.props;
        let searchResults = [];
        if (data.bo_list) {
          searchResults = this.searchArray(searchQuery, data.bo_list);
        } else if (searchEvent.ref === 'abm') {
          searchResults = this.searchArray(searchQuery, data.abm_list);
        } else if (searchEvent.ref === 'rbm') {
          searchResults = this.searchArray(searchQuery, data.rbm_list);
        }
        this.setState({
          list: searchResults,
          searchRef: searchEvent.ref,
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
      const itemName = data[index].name.trim().toLowerCase();
      const hqName = data[index].hq_name.trim().toLowerCase();
      if (itemName.includes(searchQuery) || hqName.includes(searchQuery)) {
        searchResults.push(data[index]);
      }
    }
    return searchResults;
  }

  renderBO(list, goto, type) {
    if (Array.isArray(list) && list.length > 0) {
      return list.map((bo, index) => (
        <Card
          key={index}
          containerStyle={{
            borderRadius: 5,
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <TouchableOpacity
            style={[layoutStyles.topRow]}
            opaque={1}
            onPress={() => goto(bo)}
          >
            <View style={[layoutStyles.leftTopRow]}>
              <Text style={[layoutStyles.blackText, FSExtraBold.fontLarge]}>
                {bo.name}
                {' '}
                (
                {bo.rep_code}
                )
              </Text>
              <Text style={[FSLight.fontSmall]}>{bo.hq_name}</Text>
              {type !== 'doc_upload' ? (
                <Text style={[layoutStyles.blackText, FSExtraBold.fontLarge]}>
                  {bo.status}
                </Text>
              ) : null}
            </View>
            <View style={[layoutStyles.rightTopRow]}>
              <View
                style={[
                  { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
                ]}
              >
                <Icon
                  name="rightcircle"
                  type="AntDesign"
                  style={{ color: ColorStyle.black, fontSize: 16 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      ));
    }
    return null;
  }

  renderBoList(bo_list) {
    const { goToBoDetail } = this.props;
    const renderBO = this.renderBO.bind(this);
    if (bo_list) {
      const { searchRef, searchQuery } = this.state;
      const makeCollapseOpenOnSearch = searchQuery && searchRef === 'bo';

      const finalList = {};
      for (const value of bo_list) {
        if (!finalList[value.area_name]) {
          finalList[value.area_name] = [];
        }
        finalList[value.area_name].push(value);
      }
      bo_list = [];
      for (const area_name in finalList) {
        if (finalList.hasOwnProperty(area_name) && finalList[area_name]) {
          multisort(finalList[area_name], ['name'], ['ASC']);
          bo_list.push({
            area_name,
            bos: finalList[area_name],
          });
        }
      }

      multisort(bo_list, ['area_name'], ['ASC']);

      return bo_list.map((bos, index) => (
        <Fragment key={index}>
          <Collapse isCollapsed={makeCollapseOpenOnSearch || undefined}>
            <CollapseHeader>
              <ImageBackground
                style={styles.imageTop}
                source={Images.myPerformanceListHeaderDown}
              >
                <View style={modalStyles.leftTopRow}>
                  <Text
                    style={[FontStyle.fontLarge, modalStyles.buttonRightText]}
                  >
                    {bos.area_name}
                  </Text>
                </View>
              </ImageBackground>
            </CollapseHeader>
            <CollapseBody>
              {' '}
              {renderBO(bos.bos, goToBoDetail)}
            </CollapseBody>
          </Collapse>
          <View style={layoutStyles.lineStyle} />
        </Fragment>
      ));
    }
    return null;
  }

  renderTab() {
    const { data, goToAbmDetail, type } = this.props;
    if (data) {
      const { searchRef, searchQuery, list } = this.state;

      const abmList = searchQuery && searchRef === 'abm' ? list : data.abm_list;
      const boList = searchQuery && searchRef === 'bo' ? list : data.bo_list;

      return (
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={TabStyles.textStyle.color}
          tabBarActiveTextColor={TabStyles.activeTextStyle.color}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="ABM">
            <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
              <Item
                style={{
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
                    color: ColorStyle.gray_light_1,
                  }}
                />
                <Input
                  onChangeText={(searchQuery) => this.searchText({ searchQuery, ref: 'abm' })}
                  placeholder="Search"
                />
              </Item>
              {this.renderBO(abmList, goToAbmDetail, type)}
            </ScrollView>
          </View>
          <View tabLabel="BO">
            <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
              <Item
                style={{
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
                    color: ColorStyle.gray_light_1,
                  }}
                />
                <Input
                  onChangeText={(searchQuery) => this.searchText({ searchQuery, ref: 'bo' })}
                  placeholder="Search"
                />
              </Item>
              {this.renderBoList(boList)}
            </ScrollView>
          </View>
        </ScrollableTabView>
      );
    }
    return null;
  }

  renderList() {
    const { data, goToBoDetail, type } = this.props;
    if (data) {
      if (data.bo_list) {
        return data.bo_list.map((bo, index) => (
          <Card
            key={index}
            containerStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <TouchableOpacity
              style={[layoutStyles.topRow]}
              opaque={1}
              onPress={() => goToBoDetail(bo)}
            >
              <View style={[layoutStyles.leftTopRow]}>
                <Text style={[LightFontStyle.fontSmall]}>
                  <Text style={[layoutStyles.blackText, FontStyle.fontMedium]}>
                    {bo.name}
                  </Text>
                  {' '}
                  (
                  {bo.rep_code}
                  )
                </Text>
                <Text style={[LightFontStyle.fontSmall]}>{bo.hq_name}</Text>
                {type !== 'doc_upload' ? (
                  <Text
                    style={[layoutStyles.blackText, LightFontStyle.fontSmall]}
                  >
                    {bo.status}
                  </Text>
                ) : null}
              </View>
              <View style={[layoutStyles.rightTopRow]}>
                <View
                  style={[
                    {
                      flexGrow: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Icon
                    name="rightcircle"
                    type="AntDesign"
                    style={{ color: ColorStyle.black, fontSize: 16 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        ));
      }
    }
    return null;
  }

  renderData() {
    const { data } = this.props;
    if (data) {
      return (
        <>
          {data.abm_list ? (
            this.renderTab()
          ) : (
            <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
              <Item
                style={{
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
                    color: ColorStyle.gray_light_1,
                  }}
                />
                <Input
                  onChangeText={(searchQuery) => this.searchText({ searchQuery })}
                  placeholder="Search"
                />
              </Item>
              {this.renderList()}
            </ScrollView>
          )}
        </>
      );
    }
    return null;
  }

  render() {
    const { loading } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
      >
        {this.renderData()}
      </ParentView>
    );
  }
}

export default TeamComponent;
