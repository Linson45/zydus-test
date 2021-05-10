import React from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import ParentView from '../../ParentView';
import Day from '../../calendar/day';
import styles from './styles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import TpQualityModal from './tpqualitymodal';
import DrWiseTpModal from './drwisetpmodal';
import { FontStyle, FSExtraBold } from '../../../styles/fontsStyles';
import DoctorModalComponent from '../BoAddComponent/drModal';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';

const abmConstantStyle = { key: 'abmConstantStyle', color: colorsStyles.light_purple, value: null };
const drConstantStyle = { key: 'drConstantStyle', color: colorsStyles.warning, value: 5 };
const rbmConstantStyle = { key: 'rbmConstantStyle', color: colorsStyles.light_red, value: null };
const offConstantStyle = { key: 'offConstantStyle', color: colorsStyles.yellow, value: null };

const topBg = require('../../../../assets/images/ic_calendar_header_dark.png');

export default class ApproveBoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthCounter: 0,
    };
  }

  renderCalendar() {
    const {
      data, date, changeQuery, openDaysPlan
    } = this.props;
    if (data) {
      const markedDates = {};
      const items = {};
      for (const item of data.items) {
        const date = moment(item.date, 'DD-MMM-YYYY').format('YYYY-MM-DD');
        items[date] = item;
        markedDates[date] = {};
        markedDates[date].dots = [];
        let value = 0;
        if (Array.isArray(item.bo_data)) {
          for (const routeDetails of item.bo_data) {
            if (routeDetails.doc_code) {
              value++;
            }
          }
        }
        markedDates[date].dots.push(
          { ...drConstantStyle, value }
        );
        if (item.rbm_code) {
          markedDates[date].dots.push(
            rbmConstantStyle
          );
        }
        if (item.abm_code) {
          markedDates[date].dots.push(
            abmConstantStyle
          );
        }

        if (markedDates[date].dots.length === 1 && value === 0 && data.status !== 'Pending') {
          markedDates[date].dots = [];
          markedDates[date].dots.push(
            { ...offConstantStyle, value: 'OFF' }
          );
        } else if (markedDates[date].dots.length > 3) {
          const total = markedDates[date].dots.length;
          markedDates[date].dots = markedDates[date].dots.splice(0, 2);
          markedDates[date].dots.push(
            { ...abmConstantStyle, value: `${total - 2}+` }
          );
        }
      }

      return (
        <Calendar
          current={moment(date, 'DD-MMM-YYYY').format('YYYY-MM-DD')}
          onMonthChange={(month) => {
            changeQuery(moment(month.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
          }}
          onDayPress={(day) => {
            openDaysPlan(items[day.dateString], moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
          }}
          onDayLongPress={(day) => {
            openDaysPlan(items[day.dateString], moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
          }}
          hideExtraDays
          renderArrow={(direction) => this.renderArrow(direction)}
          theme={{
            'stylesheet.calendar.main': {
              week: {
                margin: 0,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            },
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 6,
                alignItems: 'center',
                backgroundColor: colorsStyles.gray_coachmapdetails
              },
              monthText: {
                color: colorsStyles.colorPrimary,
                fontSize: 16,
                fontWeight: '300',
                margin: 10,
                fontFamily: 'System'
              }
            }
          }}
          onPressArrowLeft={(subtractMonth, month) => this.subtractMonth(subtractMonth, month)}
          onPressArrowRight={(addMonth, month) => this.addMonth(addMonth, month)}
          markedDates={markedDates}
          markingType="multi-dot"
          dayComponent={({
            date, state, marking, onPress, onLongPress
          }) => (
            <Day
              state={state}
              onPress={onPress}
              onLongPress={onLongPress}
              date={date}
              marking={marking}
            />
          )}
        />
      );
    }
    return null;
  }

  subtractMonth(substractMonth, month) {
    if (moment(String(month), 'DD-MMM-YYYY').date(15).add(-1, 'month').diff(moment().date(15), 'months', true) > -2) {
      substractMonth();
      this.setState({
        monthCounter: this.state.monthCounter - 1
      });
    }
  }

  addMonth(addMonth, month) {
    if (moment(String(month), 'DD-MMM-YYYY').date(15).add(1, 'month').diff(moment().date(15), 'months', true) < 1) {
      addMonth();
      this.setState({
        monthCounter: this.state.monthCounter + 1
      });
    }
  }

  renderArrow(direction) {
    const { date } = this.props;
    if (direction === 'right' && moment(date, 'DD-MMM-YYYY').date(15).add(1, 'month').diff(moment().date(15), 'months', true) < 1) {
      if (this.state.monthCounter >= 1) {
        this.setState({
          monthCounter: 1
        });
        return (
          <Text style={{ color: colorsStyles.gray_coachmapdetails }}>{moment(date, 'DD-MMM-YYYY').add(1, 'M').format('MMM YYYY')}</Text>
        );
      }
      return (
        <Text>
          {moment(date, 'DD-MMM-YYYY').add(1, 'M').format('MMM YYYY')}
        </Text>
      );
    } if (direction === 'left' && moment(date, 'DD-MMM-YYYY').date(15).add(-1, 'month').diff(moment().date(15), 'months', true) > -2) {
      if (this.state.monthCounter <= -1) {
        this.setState({
          monthCounter: -1
        });
        return (
          <Text style={{ color: colorsStyles.gray_coachmapdetails }}>{moment(date, 'DD-MMM-YYYY').add(-1, 'M').format('MMM YYYY')}</Text>
        );
      }
      return (
        <Text>
          {moment(date, 'DD-MMM-YYYY').add(-1, 'M').format('MMM YYYY')}
        </Text>
      );
    }
    return null;
  }

  renderTop() {
    const {
      data, user
    } = this.props;
    if (data) {
      return (
        <ImageBackground source={topBg} style={[styles.imageBgTop]}>
          <View style={[layoutStyles.column, { marginHorizontal: 15, marginVertical: 10 }]}>
            <View style={[layoutStyles.col5]}>
              <View style={[layoutStyles.row]}>
                <View style={[layoutStyles.col7]}>
                  <Text style={[layoutStyles.whiteText, layoutStyles.bold]}>
                    {user.name}
                    {' '}
                    (
                    {user.rep_code}
                    )
                  </Text>
                </View>
                <View style={[layoutStyles.col3, { alignItems: 'flex-end' }]}>
                  <Text style={[layoutStyles.whiteText, FontStyle.fontSmall]}>
                    Status:
                    {' '}
                    {data.status}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[layoutStyles.col5]} />
          </View>
        </ImageBackground>
      );
    }
    return null;
  }

  renderBottom() {
    const {
      data, openDocList, openTpQuality, submitApprove, submitReopen
    } = this.props;
    if (data) {
      return (
        <View style={[layoutStyles.column, { margin: 5 }]}>
          <View style={[layoutStyles.col3, { paddingHorizontal: 15, paddingVertical: 10 }]}>
            <View style={[layoutStyles.row, { verticalAlign: 'center' }]}>
              <View style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: abmConstantStyle.color
              }}
              />
              <Text style={[styles.signDetails]}>ABM</Text>
              <View style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: rbmConstantStyle.color
              }}
              />
              <Text style={[styles.signDetails]}>RBM</Text>
              <View style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: drConstantStyle.color
              }}
              />
              <Text style={[styles.signDetails]}>Selected Doctors</Text>
            </View>
          </View>
          <View style={[layoutStyles.col7]}>
            <View style={[layoutStyles.row, { margin: 15 }]}>
              <View style={[layoutStyles.col5]}>
                <TouchableOpacity
                  opaque={1}
                  onPress={openDocList}
                  style={[styles.buttonBottom]}
                >
                  <Text style={[layoutStyles.whiteText]}>Doc Wise TP</Text>
                </TouchableOpacity>
              </View>
              <View style={[layoutStyles.col5]}>
                <TouchableOpacity
                  opaque={1}
                  onPress={openTpQuality}
                  style={[styles.buttonBottom]}
                >
                  <Text style={[layoutStyles.whiteText]}>Check Tp Quality</Text>
                </TouchableOpacity>
              </View>
            </View>
            {data.status === 'Submitted' ? (
              <View style={[layoutStyles.row, { margin: 15 }]}>
                <View style={[layoutStyles.col5]}>
                  <TouchableOpacity
                    opaque={1}
                    onPress={submitReopen}
                    style={[styles.buttonBottom]}
                  >
                    <Text style={[layoutStyles.whiteText]}>Re-Open</Text>
                  </TouchableOpacity>
                </View>
                <View style={[layoutStyles.col5]}>
                  <TouchableOpacity
                    opaque={1}
                    onPress={submitApprove}
                    style={[styles.buttonBottom]}
                  >
                    <Text style={[layoutStyles.whiteText]}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      );
    }
    return null;
  }

  renderDocDateModal() {
    const {
      isPlannedVisitListOpen, toggleDaysPlan, data, date, selected, toggleDoctorListModal
    } = this.props;
    if (data && selected) {
      let totalDr = 0;

      selected.bo_data.forEach((doc) => {
        if (doc.doc_name) {
          totalDr++;
        }
      });

      return (
        <Modal isVisible={isPlannedVisitListOpen} onRequestClose={toggleDaysPlan}>
          <View style={[styles.modalDrWiseTp]}>
            <ImageBackground
              style={styles.imageTop}
              source={require('../../../../assets/images/ic_myperformance_list_header.png')}
            >
              <View style={modalStyles.leftTopRow}>
                <Text style={[FSExtraBold.fontXLarge, layoutStyles.whiteText]}>
                  {date}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} opacity={1} onPress={toggleDaysPlan}>
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            <View style={[layoutStyles.mv10, layoutStyles.mh15]}>
              {data.approver_name
                ? (
                  <>
                    <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                      <View>
                        <Text style={[FontStyle.fontSmall]}>ABM</Text>
                        <Text style={[FontStyle.fontMedium]}>{data.approver_name}</Text>
                      </View>
                    </View>
                    <View style={layoutStyles.lineStyle} />
                  </>
                )
                : null}
              <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                <View>
                  <Text style={[FontStyle.fontSmall]}>Route</Text>
                  <Text
                    style={[FontStyle.fontMedium]}
                  >
                    {selected.bo_data && selected.bo_data[0] ? selected.bo_data[0].route : ''}
                  </Text>
                </View>
              </View>
              {totalDr ? (
                <>
                  <View style={layoutStyles.lineStyle} />
                  <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                    <View>
                      <TouchableOpacity onPress={toggleDoctorListModal} opaque={1}>
                        <Text
                          style={[FontStyle.fontSmall, { color: colorsStyles.blue }]}
                        >
                          MCR Doctor View
                          All
                        </Text>
                      </TouchableOpacity>
                      <Text style={[FontStyle.fontMedium]}>
                        {totalDr}
                        {' '}
                        Selected
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  render() {
    const {
      loading, tourplanBoTpQuality, isTpQualityOpen, toggleTpQualityModal, tourPlanBoDocs, isDrWiseTpOpen, toggleDrWiseTpModal, selected, isDoctorListOpen, toggleDoctorListModal
    } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
      >
        <ScrollView>
          {this.renderTop()}
          {this.renderCalendar()}
          {this.renderBottom()}
          {this.renderDocDateModal()}
          <TpQualityModal
            tourplanBoTpQuality={tourplanBoTpQuality}
            toggleTpQualityModal={toggleTpQualityModal}
            isTpQualityOpen={isTpQualityOpen}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.props.onRefresh()}
          />
          <DrWiseTpModal
            tourPlanBoDocs={tourPlanBoDocs}
            toggleDrWiseTpModal={toggleDrWiseTpModal}
            isDrWiseTpOpen={isDrWiseTpOpen}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.props.onRefresh()}
          />
          <DoctorModalComponent
            isDoctorListOpen={isDoctorListOpen}
            toggleDoctorListModal={toggleDoctorListModal}
            data={selected && selected.bo_data && selected.bo_data.length > 0 ? selected.bo_data : []}
          />
        </ScrollView>
      </ParentView>
    );
  }
}
