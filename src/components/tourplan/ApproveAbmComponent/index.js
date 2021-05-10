import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import ParentView from '../../ParentView';
import styles from './styles';
import modalStyles from '../../dailyplan/DoctorDetailsComponent/modalStyles';
import { FontStyle, FSExtraBold } from '../../../styles/fontsStyles';
import layoutStyles from '../../../styles/layoutStyles';
import colorsStyles from '../../../styles/colorsStyles';
import AbmDayComponent from '../../calendar/AbmDay';

const abmConstantStyle = {
  key: 'abmConstantStyle',
  color: colorsStyles.dark_pink,
  value: null,
};
const rbmConstantStyle = {
  key: 'rbmConstantStyle',
  color: colorsStyles.rasberry,
  value: null,
};
const offConstantStyle = {
  key: 'offConstantStyle',
  color: colorsStyles.yellow,
  value: null,
};

const topBg = require('../../../../assets/images/ic_calendar_header_dark.png');

class ApproveAbmComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthCounter: 0,
    };
  }

  renderTop() {
    const { data, user } = this.props;
    if (data) {
      return (
        <ImageBackground source={topBg} style={[styles.imageBgTop]}>
          <View
            style={[
              layoutStyles.column,
              { marginHorizontal: 15, marginVertical: 10 },
            ]}
          >
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
    const { data, submitApprove, submitReopen } = this.props;
    if (data) {
      return (
        <View style={[layoutStyles.column, { margin: 5 }]}>
          <View
            style={[
              layoutStyles.col3,
              { paddingHorizontal: 15, paddingVertical: 10 },
            ]}
          >
            <View style={[layoutStyles.row, { verticalAlign: 'center' }]}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: abmConstantStyle.color,
                }}
              />
              <Text style={[styles.signDetails]}>ABM JFW with BO</Text>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: rbmConstantStyle.color,
                }}
              />
              <Text style={[styles.signDetails]}>RBM JFW with BO</Text>
            </View>
          </View>
          {data.status === 'Submitted' ? (
            <View style={[layoutStyles.col7]}>
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
            </View>
          ) : null}
        </View>
      );
    }
    return null;
  }

  renderDocDateModal() {
    const {
      isPlannedVisitListOpen,
      toggleDaysPlan,
      data,
      date,
      selected,
    } = this.props;
    if (data && selected) {
      return (
        <Modal
          isVisible={isPlannedVisitListOpen}
          onRequestClose={toggleDaysPlan}
        >
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
              <TouchableOpacity
                style={styles.closeButton}
                opacity={1}
                onPress={toggleDaysPlan}
              >
                <Image
                  style={styles.closeButtonIcon}
                  source={require('../../../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            <View style={[layoutStyles.mv10, layoutStyles.mh15]}>
              {selected.rbm_name ? (
                <>
                  <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                    <View>
                      <Text style={[FontStyle.fontSmall]}>
                        {selected.rbm_name}
                        {' '}
                        (RBM) JFW with BO
                      </Text>
                      {selected.bo_names.map((name, index) => (
                        <Text
                          key={`bo-${index}`}
                          style={[FontStyle.fontMedium]}
                        >
                          {name}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                    <View>
                      <Text style={[FontStyle.fontSmall]}>
                        Comment by
                        {selected.rbm_name}
                        {' '}
                        (RBM)
                      </Text>
                      <Text style={[FontStyle.fontMedium]}>
                        {selected.rbm_comment}
                      </Text>
                    </View>
                  </View>
                  <View style={layoutStyles.lineStyle} />
                </>
              ) : null}

              <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                <View>
                  <Text style={[FontStyle.fontSmall]}>Route</Text>
                  <Text style={[FontStyle.fontMedium]}>{selected.route}</Text>
                </View>
              </View>
              {selected.bo_names ? (
                <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                  <View>
                    <Text style={[FontStyle.fontSmall]}>ABM JFW with BO</Text>
                    {selected.bo_names.map((name, index) => (
                      <Text
                        key={`bo-${index}`}
                        style={[FontStyle.fontMedium]}
                      >
                        {name}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}
              <View style={[layoutStyles.topRow, layoutStyles.mv5]}>
                <View>
                  <Text style={[FontStyle.fontSmall]}>Comment by ABM</Text>
                  <Text style={[FontStyle.fontMedium]}>
                    {selected.abm_comment}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  subtractMonth(substractMonth, month) {
    if (
      moment(String(month), 'DD-MMM-YYYY')
        .date(15)
        .add(-1, 'month')
        .diff(moment().date(15), 'months', true) > -2
    ) {
      substractMonth();
      this.setState({
        monthCounter: this.state.monthCounter - 1,
      });
    }
  }

  addMonth(addMonth, month) {
    if (
      moment(String(month), 'DD-MMM-YYYY')
        .date(15)
        .add(1, 'month')
        .diff(moment().date(15), 'months', true) < 1
    ) {
      addMonth();
      this.setState({
        monthCounter: this.state.monthCounter + 1,
      });
    }
  }

  renderArrow(direction) {
    const { date } = this.props;
    if (
      direction === 'right'
      && moment(date, 'DD-MMM-YYYY')
        .date(15)
        .diff(moment().date(15), 'months', true) < 0.99
    ) {
      if (this.state.monthCounter >= 1) {
        this.setState({
          monthCounter: 1,
        });
        return (
          <Text style={{ color: colorsStyles.gray_coachmapdetails }}>
            {moment(date, 'DD-MMM-YYYY')
              .add(1, 'M')
              .format('MMM YYYY')}
          </Text>
        );
      }
      return (
        <Text>
          {moment(date, 'DD-MMM-YYYY')
            .add(1, 'M')
            .format('MMM YYYY')}
        </Text>
      );
    }
    if (
      direction === 'left'
      && moment(date, 'DD-MMM-YYYY')
        .date(15)
        .diff(moment().date(15), 'months', true) > -0.9956311929012346
    ) {
      if (this.state.monthCounter <= -1) {
        this.setState({
          monthCounter: -1,
        });
        return (
          <Text style={{ color: colorsStyles.gray_coachmapdetails }}>
            {moment(date, 'DD-MMM-YYYY')
              .add(-1, 'M')
              .format('MMM YYYY')}
          </Text>
        );
      }
      return (
        <Text>
          {moment(date, 'DD-MMM-YYYY')
            .add(-1, 'M')
            .format('MMM YYYY')}
        </Text>
      );
    }
    return null;
  }

  renderCalendar() {
    const {
      data, date, changeQuery, openDaysPlan
    } = this.props;
    if (data) {
      const markedDates = {};
      const items = {};
      let minDate = data.dcr_start_date;
      minDate = moment(minDate)
        .add(0, 'day')
        .format('YYYY-MM-DD');
      for (const item of data.items) {
        const date = moment(item.date, 'DD-MMM-YYYY').format('YYYY-MM-DD');
        items[date] = item;
        markedDates[date] = {};
        markedDates[date].dots = [];
        if (item.rbm_code && item.rbm_jfw_bo_names) {
          for (const name of item.rbm_jfw_bo_names) {
            const minDateForName = moment(item.date, 'DD-MMM-YYYY').format(
              'YYYY-MM-DD',
            );
            if (minDateForName >= minDate) {
              markedDates[date].dots.push({ ...abmConstantStyle, value: name });
            }
          }
        }
        if (item.bo_names) {
          for (const name of item.bo_names) {
            markedDates[date].dots.push({ ...rbmConstantStyle, value: name });
          }
        }

        if (
          markedDates[date].dots.length === 0
          && data.status !== 'Pending'
          && items[date].date >= minDate
        ) {
          markedDates[date].dots.push({ ...offConstantStyle, value: 'OFF' });
        } else if (markedDates[date].dots.length > 3) {
          const total = markedDates[date].dots.length;
          markedDates[date].dots = markedDates[date].dots.splice(0, 2);
          markedDates[date].dots.push({
            ...abmConstantStyle,
            value: `${total - 2}+`,
          });
        }
      }

      return (
        <Calendar
          current={moment(date, 'DD-MMM-YYYY').format('YYYY-MM-DD')}
          minDate={minDate}
          onMonthChange={(month) => {
            changeQuery(
              moment(month.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
            );
          }}
          onDayPress={(day) => {
            openDaysPlan(
              items[day.dateString],
              moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
            );
          }}
          onDayLongPress={(day) => {
            openDaysPlan(
              items[day.dateString],
              moment(day.dateString, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
            );
          }}
          hideExtraDays
          renderArrow={(direction) => this.renderArrow(direction)}
          theme={{
            'stylesheet.calendar.main': {
              week: {
                margin: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 6,
                alignItems: 'center',
                backgroundColor: colorsStyles.gray_coachmapdetails,
              },
              monthText: {
                color: colorsStyles.colorPrimary,
                fontSize: 16,
                fontWeight: '300',
                margin: 10,
                fontFamily: 'System',
              },
            },
          }}
          onPressArrowLeft={(subtractMonth, month) => this.subtractMonth(subtractMonth, month)}
          onPressArrowRight={(addMonth, month) => this.addMonth(addMonth, month)}
          markedDates={markedDates}
          markingType="multi-dot"
          dayComponent={({
            date, state, marking, onPress, onLongPress
          }) => (
            <AbmDayComponent
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

  render() {
    const { loading } = this.props;
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
        </ScrollView>
      </ParentView>
    );
  }
}

export default ApproveAbmComponent;
