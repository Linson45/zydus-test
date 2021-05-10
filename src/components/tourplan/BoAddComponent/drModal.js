import React from 'react';
import Modal from 'react-native-modal';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon, Input, Item } from 'native-base';
import styles from './styles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import colorsStyles from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import layoutStyles from '../../../styles/layoutStyles';

export default class DoctorModalComponent extends React.Component {
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
        const { data } = this.props;
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
      if (data.hasOwnProperty(index) && data[index] && data[index].hasOwnProperty('doc_name') && data[index].doc_name) {
        const itemName = data[index].doc_name.trim().toLowerCase();
        if (itemName.includes(searchQuery)) {
          searchResults.push(data[index]);
        }
      }
    }
    return searchResults;
  }

  renderRoute() {
    const { data } = this.props;
    if (data && Array.isArray(data)) {
      const finalData = this.state.searchQuery ? this.state.routeList : data;
      return finalData.map((doc, index) => {
        if (doc.hasOwnProperty('doc_code') && doc.doc_code) {
          return (
            <View key={index}>
              <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <Text style={[LightFontStyle.fontSmall]}>
                  #
                  {' '}
                  {doc.mcr_no}
                </Text>
                <Text style={[LightFontStyle.fontSmall]}>
                  <Text
                    style={[layoutStyles.grayText, FontStyle.fontMedium]}
                  >
                    {doc.doc_name}
                  </Text>
                  {' '}
                  (
                  {doc.doc_code}
                  )
                </Text>
                <Text style={[LightFontStyle.fontSmall]}>
                  {doc.doc_spec}
                  {' '}
                  (
                  {doc.visit_category}
                  )
                </Text>
              </View>
              <View style={layoutStyles.lineStyle} />
            </View>
          );
        }
        return null;
      });
    }
    return null;
  }

  render() {
    const { isDoctorListOpen, toggleDoctorListModal, data } = this.props;
    return (
      <Modal
        isVisible={isDoctorListOpen}
        onRequestClose={toggleDoctorListModal}
      >
        <ParentView loading={false}>
          <View style={[styles.modalDrWiseTp]}>
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                  Doctor List
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleDoctorListModal}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            {data
              ? (
                <ScrollView
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                  removeClippedSubviews
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
