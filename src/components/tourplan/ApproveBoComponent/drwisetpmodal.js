import React from 'react';
import Modal from 'react-native-modal';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import {
  Card, Icon, Input, Item
} from 'native-base';
import styles from './styles';
import ParentView from '../../ParentView';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';

export default class DrWiseTpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      docList: []
    };
  }

  componentDidMount() {
    this.setState({
      searchQuery: null,
      docList: []
    });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        const searchQuery = searchEvent.searchQuery.toLowerCase().trimLeft();
        this.setState({ searchQuery });
        const { data } = this.props.tourPlanBoDocs;
        const searchResults = this.searchArray(searchQuery, data);
        this.setState({
          docList: searchResults
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

  renderDr() {
    const { data } = this.props.tourPlanBoDocs;
    if (data) {
      const finalData = this.state.searchQuery ? this.state.docList : data;
      return finalData.map((doc, index) => {
        if (doc.doc_name) {
          return (
            <Card key={`doc-list-modal-${index}`}>
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
                <View
                  style={{
                    height: 1,
                    backgroundColor: colorsStyles.gray_login,
                    marginVertical: 5
                  }}
                />
                <View style={styles.topRow}>
                  <View style={styles.leftTopRow}>
                    <Text style={[LightFontStyle.fontSmall]}>
                      Sales Planning
                    </Text>
                  </View>
                  <View style={styles.rightTopRow}>
                    <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                      {priceFormatWithoutDecimal(doc.sales_planning)}
                    </Text>
                  </View>
                </View>
                <View style={styles.topRow}>
                  <View style={styles.leftTopRow}>
                    <Text style={[LightFontStyle.fontSmall]}>
                      RCPA Last Month
                    </Text>
                  </View>
                  <View style={styles.rightTopRow}>
                    <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                      {priceFormatWithoutDecimal(doc.last_to_last_month_rcpa)}
                    </Text>
                  </View>
                </View>
                <View style={styles.topRow}>
                  <View style={styles.leftTopRow}>
                    <Text style={[LightFontStyle.fontSmall]}>
                      Market Potential as per GSP
                    </Text>
                  </View>
                  <View style={styles.rightTopRow}>
                    <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                      {priceFormatWithoutDecimal(doc.sales_potential)}
                    </Text>
                  </View>
                </View>
                <View style={styles.topRow}>
                  <View style={styles.leftTopRow}>
                    <Text style={[LightFontStyle.fontSmall]}>
                      Actual visit last month
                    </Text>
                  </View>
                  <View style={styles.rightTopRow}>
                    <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                      {(doc.actual_visits_last_month)}
                    </Text>
                  </View>
                </View>
                <View style={styles.topRow}>
                  <View style={styles.leftTopRow}>
                    <Text style={[LightFontStyle.fontSmall]}>
                      # Visit planned this month
                    </Text>
                  </View>
                  <View style={styles.rightTopRow}>
                    <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                      {(doc.visits_this_month)}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          );
        }
        return null;
      });
    }
    return null;
  }

  render() {
    const { loading, data } = this.props.tourPlanBoDocs;
    const { isDrWiseTpOpen, toggleDrWiseTpModal } = this.props;
    return (
      <Modal
        isVisible={isDrWiseTpOpen}
        onRequestClose={toggleDrWiseTpModal}
      >
        <ParentView
          loading={loading}
          connected={this.props.connected}
          onRefresh={() => this.props.onRefresh()}
        >
          <View style={[styles.modalDrWiseTp]}>
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FontStyle.fontLarge, modalStyles.buttonRightText]}>
                  Doc Wise TP
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleDrWiseTpModal}>
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
                  {this.renderDr()}
                </ScrollView>
              )
              : <View style={{ height: 50 }} />}
          </View>
        </ParentView>
      </Modal>
    );
  }
}
