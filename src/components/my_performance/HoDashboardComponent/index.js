import React from 'react';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import {
  Button, Card, CardItem, Icon, Left, Right
} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import ParentView from '../../ParentView';
import styles from './styles';
import LayoutStyles from '../../../styles/layoutStyles';
import { addPercentageSign, numberTransformer } from '../../../util/NumberTrasformer';
import Images from '../../../Constants/imageConstants';
import SalesTrendComponent from '../SalesTrendComponent';
import SelectRbmComponent from '../SelectRbmComponent';
import MonthYearSelectionComponent from '../../Modal/MonthYearSelection';

export default class HoDashboardComponent extends React.Component {
  renderSales() {
    const {
      sales, changeQuery, goToPrimarySales, goToSecondarySales, goToPcpm, aggregatedEfforts, loadSalesTrend, period, month, year, showMonthSelectModal, hideMonthSelectModal, isVisibleMonthSelectModal, loadSbus
    } = this.props;
    if (sales && aggregatedEfforts) {
      let ytdContainerStyle; let mtdContainerStyle; let qtdContainerStyle; let ytdTextStyle; let mtdTextStyle; let
        qtdTextStyle;
      ytdContainerStyle = mtdContainerStyle = qtdContainerStyle = styles.topButtonRight;
      ytdTextStyle = mtdTextStyle = qtdTextStyle = styles.topButtonRightText;

      if (period.toLowerCase() === 'ytd') {
        ytdContainerStyle = styles.topButtonRightSelected;
        ytdTextStyle = styles.topButtonRightTextSelected;
      } else if (period.toLowerCase() === 'qtd') {
        qtdContainerStyle = styles.topButtonRightSelected;
        qtdTextStyle = styles.topButtonRightTextSelected;
      } else if (period.toLowerCase() === 'mtd') {
        mtdContainerStyle = styles.topButtonRightSelected;
        mtdTextStyle = styles.topButtonRightTextSelected;
      }

      return (
        <ScrollView style={styles.topContainer}>
          <View style={LayoutStyles.row}>
            <Left>
              <Button bordered style={styles.topButtonLeft} onPress={() => loadSalesTrend()}>
                <Text style={styles.topButtonLeftText}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="chart-line-variant"
                  />
                </Text>
              </Button>
            </Left>
            <Right>
              <View style={LayoutStyles.rowRev}>
                <TouchableOpacity onPress={showMonthSelectModal}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 5,
                      marginRight: 5
                    }}
                    source={Images.calendarGrayIcon}
                  />
                </TouchableOpacity>
                <MonthYearSelectionComponent
                  month={month}
                  year={year}
                  closeModal={hideMonthSelectModal}
                  changeQuery={changeQuery}
                  lastMonths={9}
                  isVisible={isVisibleMonthSelectModal}
                />
                <Button
                  bordered
                  style={ytdContainerStyle}
                  onPress={() => changeQuery('ytd')}
                >
                  <Text style={ytdTextStyle}>YTD</Text>
                </Button>
                <Button
                  bordered
                  style={qtdContainerStyle}
                  onPress={() => changeQuery('qtd')}
                >
                  <Text style={qtdTextStyle}>QTD</Text>
                </Button>
                <Button
                  bordered
                  style={mtdContainerStyle}
                  onPress={() => changeQuery('mtd')}
                >
                  <Text style={mtdTextStyle}>MTD</Text>
                </Button>
              </View>
            </Right>
          </View>
          <Card style={styles.salesContainer}>
            <CardItem header style={styles.cardTopContainer}>
              <Text style={styles.cardHeader}>Sales Summary</Text>
            </CardItem>
            <CardItem style={styles.cardTopContainer}>

              <TouchableOpacity
                style={styles.primaryCard}
                onPress={() => goToPrimarySales()}
                activeOpacity={1}
              >
                <View style={LayoutStyles.column}>
                  <View style={LayoutStyles.row}>
                    <View style={LayoutStyles.col7}>
                      <Text style={styles.cardFloatLeft}>Primary</Text>
                    </View>
                    <View style={LayoutStyles.col3}>
                      <Text style={styles.cardFloatRight}>
                        {sales.primary_sales.date_range}
                      </Text>
                    </View>
                  </View>
                  <View style={LayoutStyles.row}>
                    <View style={LayoutStyles.col10}>
                      <Text
                        style={styles.cardFloatLeftBold}
                      >
                        {numberTransformer(sales.primary_sales.total_sales)}
                      </Text>
                    </View>
                  </View>
                  <View style={LayoutStyles.row}>
                    <View style={LayoutStyles.col10}>
                      <Text
                        style={styles.cardFloatLeftTiny}
                      >
                        Target
                        {' '}
                        {numberTransformer(sales.primary_sales.sales_target)}
                      </Text>
                    </View>
                  </View>
                  <View style={LayoutStyles.row}>
                    <View style={LayoutStyles.col6}>
                      <Text style={styles.cardFloatLeftTiny}>
                        {sales.primary_sales.sales_growth < 0
                          ? (
                            <Icon
                              active
                              name="md-arrow-dropdown"
                              style={styles.cardFloatLeftTinyIcon}
                            />
                          )
                          : (
                            <Icon
                              active
                              name="md-arrow-dropup"
                              style={styles.cardFloatLeftTinyIcon}
                            />
                          )}
                        {' '}
                        <Text
                          style={styles.cardFloatLeftTiny}
                        >
                          {addPercentageSign(sales.primary_sales.sales_growth)}
                          {' '}
                          gr
                        </Text>
                      </Text>
                    </View>
                    <View style={LayoutStyles.col4}>
                      <Text style={styles.cardFloatRightTiny}>
                        {addPercentageSign(sales.primary_sales.target_achieved)}
                        {' '}
                        Ach
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secCard}
                onPress={() => goToSecondarySales()}
                activeOpacity={1}
              >
                <View style={LayoutStyles.column}>
                  <View style={LayoutStyles.column}>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col7}>
                        <Text style={styles.cardFloatLeft}>Sec</Text>
                      </View>
                      <View style={LayoutStyles.col3}>
                        <Text style={styles.cardFloatRight}>
                          {sales.secondary_sales.date_range}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col10}>
                        <Text
                          style={styles.cardFloatLeftBold}
                        >
                          {numberTransformer(sales.secondary_sales.total_sales)}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row} />
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col10}>
                        <Text style={styles.cardFloatRightTiny}>
                          {addPercentageSign(sales.secondary_sales.target_achieved)}
                          {' '}
                          of
                          {period.toLowerCase() === 'mtd' ? sales.secondary_sales.date_range.substr(0, 3) : 'Pri'}
                          {' '}
                          Sales
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </CardItem>

            <CardItem style={styles.cardTopContainer}>
              <View style={styles.gspCard}>
                <View style={LayoutStyles.column}>
                  <View style={LayoutStyles.column}>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col7}>
                        <Text style={styles.cardFloatLeft}>RCPA</Text>
                      </View>
                      <View style={LayoutStyles.col3}>
                        <Text style={styles.cardFloatRight}>
                          {sales.rcpa_sales.date_range}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col10}>
                        <Text
                          style={styles.cardFloatLeftBold}
                        >
                          {numberTransformer(sales.rcpa_sales.total_sales)}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row} />
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col10}>
                        <Text style={styles.cardFloatRightTiny}>
                          {addPercentageSign(sales.rcpa_sales.target_achieved)}
                          {' '}
                          of Primary
                          Sales
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.rcpaCard}
                onPress={() => goToPcpm()}
                activeOpacity={1}
              >
                <View style={LayoutStyles.column}>
                  <View style={LayoutStyles.column}>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col7}>
                        <Text style={styles.cardFloatLeft}>PCPM</Text>
                      </View>
                      <View style={LayoutStyles.col3}>
                        <Text style={styles.cardFloatRight}>
                          {sales.pcpm_sales.date_range}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col10}>
                        <Text
                          style={styles.cardFloatLeftBold}
                        >
                          {numberTransformer(sales.pcpm_sales.total_sales)}
                        </Text>
                      </View>
                    </View>
                    <View style={LayoutStyles.row} />
                    <View style={LayoutStyles.row}>
                      <View style={LayoutStyles.col6}>
                        <Text style={styles.cardFloatLeftTiny}>
                          {sales.primary_sales.sales_growth < 0
                            ? (
                              <Icon
                                active
                                name="md-arrow-dropdown"
                                style={styles.cardFloatLeftTinyIcon}
                              />
                            )
                            : (
                              <Icon
                                active
                                name="md-arrow-dropup"
                                style={styles.cardFloatLeftTinyIcon}
                              />
                            )}
                          {' '}
                          <Text
                            style={styles.cardFloatLeftTiny}
                          >
                            {addPercentageSign(sales.pcpm_sales.pcpm_growth)}
                            {' '}
                            gr
                          </Text>
                        </Text>
                      </View>
                      <View style={LayoutStyles.col4} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <View style={styles.aggregatedEffortHeader}>
            <ImageBackground source={Images.myPerformanceListHeader} style={styles.headerImageBg}>
              <View style={LayoutStyles.row}>
                <View>
                  <Text style={styles.aggregatedEffortHeaderLeft}>
                    Aggregated BO Efforts
                  </Text>
                </View>
                <Right>
                  <TouchableOpacity style={styles.userButton} onPress={() => loadSbus()} opacity={1}>
                    <Image
                      style={styles.userButtonIcon}
                      source={require('../../../../assets/images/ic_account_box_white_24dp.png')}
                    />
                  </TouchableOpacity>
                </Right>
              </View>
            </ImageBackground>
          </View>

          <View style={LayoutStyles.row}>
            <View style={LayoutStyles.col10}>
              <Card style={styles.circleContainer}>
                <CardItem style={styles.callCoverage}>
                  <ProgressCircle
                    percent={aggregatedEfforts.total_coverage}
                    radius={styles.radius}
                    borderWidth={styles.circleWidth}
                    color={styles.circleColor}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text
                      style={styles.progressCycleText}
                    >
                      {addPercentageSign(aggregatedEfforts.total_coverage)}
                    </Text>
                  </ProgressCircle>
                </CardItem>
                <CardItem style={styles.callCoverage}>
                  <Text style={styles.progressCycleText}>MCR Coverage</Text>
                </CardItem>
              </Card>
            </View>
            <View style={LayoutStyles.col10}>
              <Card style={styles.circleContainer}>
                <CardItem style={styles.callCoverage}>
                  <ProgressCircle
                    percent={aggregatedEfforts.multivisit_compliance}
                    radius={styles.radius}
                    borderWidth={styles.circleWidth}
                    color={styles.circleColor}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text
                      style={styles.progressCycleText}
                    >
                      {addPercentageSign(aggregatedEfforts.multivisit_compliance)}
                    </Text>
                  </ProgressCircle>
                </CardItem>
                <CardItem style={styles.callCoverage}>
                  <Text style={styles.progressCycleText}>Multi-Visit & GSP Compliance</Text>
                </CardItem>
              </Card>
            </View>
            <View style={LayoutStyles.col10}>
              <Card style={styles.circleContainer}>
                <CardItem style={styles.callCoverage}>
                  <ProgressCircle
                    percent={aggregatedEfforts.docs_rcpa}
                    radius={styles.radius}
                    borderWidth={styles.circleWidth}
                    color={styles.circleColor}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text
                      style={styles.progressCycleText}
                    >
                      {addPercentageSign(aggregatedEfforts.docs_rcpa)}
                    </Text>
                  </ProgressCircle>
                </CardItem>
                <CardItem style={styles.callCoverage}>
                  <Text style={styles.progressCycleText}>Avg. % Docs RCPAed</Text>
                </CardItem>
              </Card>
            </View>
          </View>
          <Card>
            <View>
              <CardItem style={styles.callCoverage}>
                <View style={LayoutStyles.col3}>
                  <Image source={Images.accountTie} style={styles.accountTieCss} />
                </View>
                <View style={styles.callAverageBox}>
                  <Text style={styles.cardFloatRightMediumBlue}>
                    {aggregatedEfforts.call_average}
                  </Text>
                  <Text style={styles.cardFloatRightMedium}>
                    Call average
                  </Text>
                </View>
              </CardItem>
            </View>
          </Card>
          <View style={{ height: 30 }} />
        </ScrollView>
      );
    }
    return null;
  }

  renderModal() {
    const { showSalesTrend, hideSalesTrend, salesTrend } = this.props;

    return (
      <SalesTrendComponent
        isVisible={showSalesTrend}
        salesTrend={salesTrend}
        hideSalesTrend={hideSalesTrend}
      />
    );
  }

  renderRbmModal() {
    const {
      showRegionDialog, sbus, regions, hideSbus, selectSbu, goToRbmContainer, region, selectRegion, selectRbm
    } = this.props;
    return (
      <SelectRbmComponent
        isVisible={showRegionDialog}
        sbus={sbus}
        regions={regions}
        hideSbus={hideSbus}
        selectSbu={selectSbu}
        goToRbmContainer={goToRbmContainer}
        region={region}
        selectRegion={selectRegion}
        selectRbm={selectRbm}
      />
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        {this.renderSales()}
        {this.renderModal()}
        {this.renderRbmModal()}
      </ParentView>
    );
  }
}
