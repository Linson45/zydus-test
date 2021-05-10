import React from 'react';
import Modal from 'react-native-modal';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon, Input, Item } from 'native-base';
import styles from './styles';
import { FontStyle } from '../../../styles/fontsStyles';
import colorsStyles from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import layoutStyles from '../../../styles/layoutStyles';

export default class RouteModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      routeList: []
    };
  }

  componentDidMount() {
    this.setState({
      searchQuery: null,
      routeList: []
    });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
        const { data } = this.props.tourplanRoutes;
        const searchResults = this.searchArray(searchQuery, data);
        this.setState({
          routeList: searchResults
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
      const itemName = data[index].route.trim().toLowerCase();
      if (itemName.includes(searchQuery)) {
        searchResults.push(data[index]);
      }
    }
    return searchResults;
  }

  renderRoute() {
    const { data } = this.props.tourplanRoutes;
    const { selectRoute, toggleRouteModal } = this.props;
    if (data && Array.isArray(data)) {
      const finalData = this.state.searchQuery ? this.state.routeList : data;
      return finalData.map((route, index) => (
        <View key={index}>
          <TouchableOpacity
            opaque={1}
            onPress={() => {
              selectRoute(route);
              toggleRouteModal();
            }}
            style={[layoutStyles.topRow, layoutStyles.mh10]}
          >
            <View>
              <Text style={[layoutStyles.mv5, FontStyle.fontLarge]}>{route.route}</Text>
            </View>
          </TouchableOpacity>
          <View style={layoutStyles.lineStyle} />
        </View>
      ));
    }
    return null;
  }

  render() {
    const { loading, data } = this.props.tourplanRoutes;
    const { isRouteModalOpen, toggleRouteModal } = this.props;
    return (
      <Modal
        isVisible={isRouteModalOpen}
        onRequestClose={toggleRouteModal}
      >
        <ParentView loading={loading} connected>
          <View style={[styles.modalDrWiseTp]}>
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                  Route List
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleRouteModal}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            {data
              ? (
                <ScrollView
                  removeClippedSubviews
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                >
                  <Item style={{
                    margin: 5,
                    borderColor: colorsStyles.gray_light_1,
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
                        color: colorsStyles.gray_light_1
                      }}
                    />
                    <Input
                      onChangeText={(searchQuery) => this.searchText({ searchQuery })}
                      placeholder="Search"
                    />
                  </Item>
                  {this.renderRoute()}
                </ScrollView>
              )
              : <View style={{ height: 50 }} />}
          </View>
        </ParentView>
      </Modal>
    );
  }
}
