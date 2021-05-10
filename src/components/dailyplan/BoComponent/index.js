import React from 'react';
import {
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {
  Fab, Icon, Input, Item
} from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import styles from './styles';
import Images from '../../../Constants/imageConstants';
import { addPercentageSign, priceFormatWithDecimal, priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ColorStyles from '../../../styles/colorsStyles';
import TabStyles from '../../../styles/tabStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import ParentView from '../../ParentView';
import { Role } from '../../../util/Constants';

export default class BoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      pageNumber: 0,
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      searchQuery: null,
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

  renderTodaySummary() {
    const { data, changeQuery } = this.props;
    if (data) {
      const {
        jfw_abm_name, jfw_rbm_name, pob_amount, date, doctors_planned
      } = data;
      let current_rcpa = 0; let last_month_rcpa = 0; let
        doctor_rcpaed = 0;
      for (const value of doctors_planned) {
        if (value.is_current_month_rcpa) doctor_rcpaed++;
        if (value.sales_planning) current_rcpa += value.sales_planning;
        last_month_rcpa += value.last_month_rcpa;
      }

      return (
        <View style={{ margin: 10 }}>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Text style={[styles.topJfwLabel]}>
                {jfw_rbm_name || jfw_abm_name ? 'JFW With' : ''}
              </Text>
              <Text style={[styles.topJfw]}>
                {jfw_rbm_name ? `${jfw_rbm_name}(RBM)` : jfw_abm_name ? `${jfw_abm_name}(ABM)` : 'No JFW planned for the day.'}
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <View style={styles.rightTopRowTextContainer}>
                  <Text style={styles.rightTopRowText}>
                    {moment(date, 'DD-MMM-YYYY').format('DD-MMM')}
                  </Text>
                </View>
                <DatePicker
                  style={{
                    paddingTop: 2, paddingBottom: 2, margin: 5, width: 30
                  }}
                  iconSource={Images.calendarIcon}
                  hideText
                  mode="date"
                  format="DD-MMM-YYYY"
                  minDate={moment().startOf('month').format('DD-MMM-YYYY')}
                  maxDate={moment().add(1, 'M').endOf('month').format('DD-MMM-YYYY')}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      width: 25,
                      height: 25,
                    },
                    dateTouchBody: {
                      flexDirection: 'row',
                      height: 22,
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                  }}
                  onDateChange={(date) => changeQuery(date)}
                />
              </View>
            </View>
          </View>
          <View style={styles.summaryHeader}>
            <Text style={styles.textSummary}>Summary for todays doctor.</Text>
          </View>
          <View style={[styles.monthRow, styles.summaryHeader]}>
            <View style={styles.currentMonthBox}>
              <Text style={styles.currentMonthText}>
                {' '}
                {priceFormatWithoutDecimal(current_rcpa)}
                {' '}
              </Text>
              <Text style={styles.currentMonthText}>
                {moment(date, 'DD-MMM-YYYY').format('MMMM')}
                {' '}
                GSP
              </Text>
            </View>
            <View style={styles.lastMonthBox}>
              <Text style={styles.currentMonthText}>
                {' '}
                {priceFormatWithoutDecimal(last_month_rcpa)}
                {' '}
              </Text>
              <Text style={styles.currentMonthText}>
                {moment(date, 'DD-MMM-YYYY').subtract(1, 'month').startOf('month').format('MMMM')}
                {' '}
                RCPA
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.rightTopRowText}>
                POB till Date
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <Text style={styles.rightTopRowTextBold}>
                  {priceFormatWithoutDecimal(pob_amount)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.rightTopRowText}>
                Doctor RCPAed
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <View style={styles.rightTopRowContainer}>
                <Text style={styles.rightTopRowTextBold}>
                  {doctor_rcpaed}
                  /
                  {doctors_planned.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  renderDrList() {
    const { data, onDoctorPress, selectDoctor } = this.props;
    const { searchQuery } = this.state;
    const { doctors_planned, date } = data;
    if (doctors_planned) {
      const alreadyRenderedList = {};
      return doctors_planned.map((item, index) => {
        const {
          doc_name, doc_spec, visit_category, sales_planning, is_current_month_rcpa, mcr_no, doc_code
        } = item;
        if (!alreadyRenderedList[doc_code]) {
          if (searchQuery && !doc_name.trim().toLowerCase().includes(searchQuery.trim())) {
            return null;
          }

          const statusStyle = JSON.parse(JSON.stringify(styles.itemValues));
          let statusText = 'Enter RCPA';
          if (!is_current_month_rcpa) {
            statusStyle.color = ColorStyles.blue;
          } else {
            statusStyle.color = ColorStyles.green;
            statusText = 'RCPA Submitted';
          }
          alreadyRenderedList[doc_code] = true;
          return (
            <TouchableOpacity
              style={styles.itemDrList}
              key={index}
              onPress={() => onDoctorPress(item, date)}
              opacity={1}
            >
              <Text note style={styles.itemValues}>
                #
                {mcr_no}
              </Text>
              <View style={styles.topRow}>
                <View style={styles.leftTopRow}>
                  <Text>
                    {doc_name}
                  </Text>
                </View>
                <View style={styles.rightTopRow}>
                  <Text>
                    {priceFormatWithDecimal(sales_planning)}
                  </Text>
                </View>
              </View>
              <View style={styles.topRow}>
                <View style={styles.leftTopRow}>
                  <Text style={styles.rightTopRowText}>
                    {visit_category}
                    ,
                    {doc_spec}
                  </Text>
                </View>
                <View style={styles.rightTopRow}>
                  <Text style={styles.rightTopRowText}>
                    {moment(date, 'DD-MMM-YYYY').format('MMMM')}
                    {' '}
                    GSP
                  </Text>
                </View>
              </View>
              <View style={styles.topRow}>
                <View style={styles.leftTopRow}>
                  <TouchableOpacity
                    opaque={1}
                    onPress={() => {
                      selectDoctor(item);
                    }}
                  >
                    <Text style={statusStyle}>
                      {statusText}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightTopRow}>
                  <Icon
                    name="rightcircleo"
                    type="AntDesign"
                    style={{ color: ColorStyles.gray_dark, fontSize: 16 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }
        return null;
      });
    }
    return null;
  }

  renderAIList() {
    const { data, onActionPress } = this.props;
    if (data) {
      const { action_items } = data;
      return action_items.map((item, index) => {
        const {
          action_plan, problem_description, target_date, assigned_by, action_status_name
        } = item;
        return (
          <TouchableOpacity
            onPress={() => onActionPress(item)}
            opacity={1}
            style={styles.itemDrList}
            key={index}
          >
            <Text>{action_plan}</Text>
            <Text note style={styles.itemValues}>Problem Description:</Text>
            <Text note style={styles.itemValues}>{problem_description}</Text>
            <Text note style={styles.itemValues}>
              Deadline:
              {target_date}
            </Text>
            <Text note style={styles.itemValues}>
              Assigned By:
              {assigned_by}
            </Text>
            <View style={styles.topRow}>
              <View style={styles.leftTopRow}>
                <Text>
                  {action_status_name}
                </Text>
              </View>
              <View style={styles.rightTopRow}>
                <Icon
                  name="rightcircleo"
                  type="AntDesign"
                  style={{ color: ColorStyles.gray_dark, fontSize: 16 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }
    return null;
  }

  renderBoEffort() {
    const { data } = this.props;
    if (data) {
      const {
        dr_call_average, mcr_coverage_old, multivisit_complience, sales_achievement_till_date, sales_achievement_till_date_percent,
        pl_rank, pl_rank_total, jfw_with_abm, jfw_with_rbm, open_action_items, last_reporting_date
      } = data.bo_effort;
      return (
        <View style={[styles.itemDrList, { borderBottomWidth: 0 }]}>
          <View style={[styles.boEffortTop, styles.summaryHeader]}>
            <View style={styles.multivisit}>
              <Text style={styles.currentMonthText}>
                {' '}
                {addPercentageSign(multivisit_complience)}
                {' '}
              </Text>
            </View>
            <View style={styles.mcr}>
              <Text style={styles.currentMonthText}>
                {' '}
                {addPercentageSign(mcr_coverage_old)}
                {' '}
              </Text>
            </View>
            <View style={styles.callAvg}>
              <Text style={styles.currentMonthText}>
                {' '}
                {dr_call_average}
                {' '}
              </Text>
            </View>
          </View>
          <View style={[styles.boEffortTop, styles.summaryHeaderBottom]}>
            <View style={styles.multivisitText}>
              <Text style={styles.center}> Multi-visit & GSP Com. </Text>
            </View>
            <View style={styles.mcrText}>
              <Text style={styles.center}> MCR Cov. </Text>
            </View>
            <View style={styles.callAvgText}>
              <Text style={styles.center}> Call Avg. </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.boEffortText}>
                Sales achievement till date
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text style={styles.rightTopRowTextBold}>
                {priceFormatWithoutDecimal(sales_achievement_till_date)}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow]}>
            <View style={styles.leftTopRow} />
            <View style={styles.rightTopRow}>
              <Text style={[styles.rightTopRowText, LightFontStyle.fontSmall]}>
                {addPercentageSign(sales_achievement_till_date_percent)}
                {' '}
                ach
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader, styles.bgBlue]}>
            <View>
              <Text style={styles.currentMonthText}>
                Premier League rank in Division
              </Text>
              <Text style={styles.currentMonthText}>
                <Text style={{ color: ColorStyles.yellow }}>{pl_rank}</Text>
                {' '}
                /
                {pl_rank_total}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.rightTopRowText}>
                JFW with ABM
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text style={styles.rightTopRowText}>
                {jfw_with_abm}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.rightTopRowText}>
                JFW with RBM
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text style={styles.rightTopRowText}>
                {jfw_with_rbm}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={[styles.rightTopRowTextBold, styles.boEffortText]}>
                Open action item
              </Text>
            </View>
            <View style={styles.rightTopRow}>
              <Text style={[styles.rightTopRowText, styles.boEffortText]}>
                {open_action_items}
              </Text>
            </View>
          </View>
          <View style={[styles.topRow, styles.summaryHeader]}>
            <View style={styles.leftTopRow}>
              <Text style={styles.rightTopRowText}>
                Last Reporting:
                {' '}
                {last_reporting_date}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  renderTabs() {
    const {
      data, user_type, loading, me_user_type
    } = this.props;
    let action_title = 'ACTION ITEM';
    if (Role.isAboveRbm(me_user_type)) action_title = 'BO ACTION SUMMARY';

    if (data) {
      const { doctors_planned, bo_effort, action_items } = data;
      return (
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineDailyPlanStyle}
          tabBarInactiveTextColor={TabStyles.textStyle.color}
          tabBarActiveTextColor={TabStyles.activeTextStyle.color}
          initialPage={0}
          onChangeTab={({ i }) => this.setState({ pageNumber: i })}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{ height: 40 }}
              tabsContainerStyle={{ height: 40 }}
              tabStyle={{ height: 40 }}
              textStyle={{
                fontWeight: 'normal',
                ...FontStyle.fontMedium
              }}
            />
          )}
        >
          <View tabLabel="DOCTORS PLANNED">
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
              {doctors_planned ? this.renderDrList() : null}
              {!loading && doctors_planned.length === 0
                ? (
                  <View style={styles.itemDrList}>
                    <Text note style={styles.itemValues}>No Doctor Planned for the day.</Text>
                  </View>
                )
                : null}
            </ScrollView>
          </View>
          <View tabLabel={action_title}>
            <ScrollView>
              {action_items ? this.renderAIList() : null}
            </ScrollView>
          </View>
          {user_type !== 'BO' ? (
            <View tabLabel="BO EFFORTS">
              <ScrollView>
                {bo_effort ? this.renderBoEffort() : null}
              </ScrollView>
            </View>
          ) : null}
        </ScrollableTabView>
      );
    }
    return null;
  }

  renderFab() {
    const { goToAllDoctors } = this.props;
    return (
      <Fab
        direction="up"
        style={{ backgroundColor: ColorStyles.colorPrimary }}
        position="bottomRight"
        onPress={() => goToAllDoctors({})}
      >
        <Icon name="add" />
      </Fab>
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
        {this.renderTodaySummary()}
        {this.renderTabs()}
        {this.state.pageNumber === 0 ? this.renderFab() : null}
      </ParentView>
    );
  }
}
