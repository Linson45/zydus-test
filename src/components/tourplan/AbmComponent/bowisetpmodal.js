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
import { addPercentageSign, priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';

export default class BoWiseTpModal extends React.Component {
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
        const { data } = this.props.tourplanBoWiseReport;
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
      const itemName = data[index].name.trim().toLowerCase();
      const hqName = data[index].hq_name.trim().toLowerCase();
      if (itemName.includes(searchQuery) || hqName.includes(searchQuery)) {
        searchResults.push(data[index]);
      }
    }
    return searchResults;
  }

  renderBo() {
    const { data } = this.props.tourplanBoWiseReport;
    if (data && Array.isArray(data)) {
      const finalData = this.state.searchQuery ? this.state.docList : data;
      return finalData.map((bo, index) => (
        <Card key={`doc-list-modal-${index}`}>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={[LightFontStyle.fontSmall]}>
              <Text
                style={[layoutStyles.grayText, FontStyle.fontMedium]}
              >
                {bo.name}
              </Text>
              {' '}
              (
              {bo.rep_code}
              )
            </Text>
            <Text style={[LightFontStyle.fontSmall]}>
              (
              {bo.group_code}
              ,
              {bo.hq_name}
              )
            </Text>
            <View
              style={{ height: 1, backgroundColor: colorsStyles.gray_login, marginVertical: 5 }}
            />
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  HQ Primary Sales
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {priceFormatWithoutDecimal(bo.hq_primary_sales)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  HQ Primary Sales Achievement
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {addPercentageSign(bo.hq_primary_sales_achievement)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  MCR Coverage
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {bo.mcr_coverage}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  Supercore Compliance
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {(bo.multivisit_compliance)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  Call Average
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {(bo.dr_call_average)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  Total # of plan visit last month
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {(bo.visits_planned_last_month)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  Total # of actual visit last month
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {(bo.actual_visits_last_month)}
                </Text>
              </View>
            </View>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text style={[LightFontStyle.fontSmall]}>
                  # of planned this month
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Text style={[layoutStyles.grayText, layoutStyles.bold]}>
                  {(bo.visits_planned_this_month)}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      ));
    }
    return null;
  }

  render() {
    const { loading, data } = this.props.tourplanBoWiseReport;
    const { isBoWiseTpOpen, toggleBoWiseTpModal } = this.props;
    return (
      <Modal
        isVisible={isBoWiseTpOpen}
        onRequestClose={toggleBoWiseTpModal}
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
                  BO Wise Visit
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleBoWiseTpModal}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            {data
              ? (
                <ScrollView removeClippedSubviews style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
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
                  {this.renderBo()}
                </ScrollView>
              )
              : <View style={{ height: 50 }} />}
          </View>
        </ParentView>
      </Modal>
    );
  }
}
