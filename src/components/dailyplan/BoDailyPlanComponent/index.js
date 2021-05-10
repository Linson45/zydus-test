import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import styles from './styles';
import { priceFormatWithoutDecimal } from '../../../util/NumberTrasformer';
import ParentView from '../../ParentView';
import ColorStyles from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';

export default class BoDailyPlanComponent extends React.Component {
  renderCalendar() {
    const { changeQuery, selectedDate } = this.props;
    return (
      <CalendarStrip
        scrollable
        style={styles.calendar}
        selectedDate={selectedDate}
        calendarHeaderStyle={styles.calendarHeader}
        highlightDateNameStyle={styles.calendarDateName}
        highlightDateNumberStyle={styles.calendarDateNumber}
        onDateSelected={(date) => {
          changeQuery(date.format('DD-MMM-YYYY'));
        }}
      />
    );
  }

  renderLocation() {
    const { data } = this.props;
    if (data) {
      let { routes } = data;
      if (!routes) {
        routes = '';
      }
      return (
        <View style={styles.locationContainer}>
          <Text style={styles.locationName}>{routes}</Text>
        </View>
      );
    }
    return null;
  } 

  renderGsp() {
    const { data } = this.props;
    if (data) {
      const { date, doctors_planned } = data;
      let current_rcpa = 0;
      let last_month_rcpa = 0;
      for (const value of doctors_planned) {
        if (value.sales_planning) current_rcpa += value.sales_planning;
        last_month_rcpa += value.last_month_rcpa;
      }

      return (
        <View style={styles.gspViewContainer}>
          <View style={styles.gspContainer}>
            <Text style={styles.gspValue}>
              {priceFormatWithoutDecimal(current_rcpa)}
            </Text>
            <Text style={styles.gspSub}>
              /
              {moment(date, 'DD-MMM-YYYY').format('MMMM')}
              {' '}
              GSP
            </Text>
          </View>
          <View style={styles.rcpaContainer}>
            <Text style={styles.gspValue}>
              {priceFormatWithoutDecimal(last_month_rcpa)}
            </Text>
            <Text style={styles.gspSub}>
              /
              {moment(date, 'DD-MMM-YYYY')
                .subtract(1, 'month')
                .startOf('month')
                .format('MMMM')}
              {' '}
              RCPA
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  renderDoctorPlannedHeading() {
    const { data, plannedDoctors } = this.props;
    if (data && plannedDoctors && plannedDoctors.length) {
      const { jfw_abm_name, jfw_rbm_name } = data;
      return (
        <View style={styles.doctorPlannedHeadingContainer}>
          <Text style={styles.doctorPlannedHeading}>DOCTORS PLANNED</Text>
          {jfw_abm_name ? (
            <Text style={styles.topJfwLabel}>JFW (ABM)</Text>
          ) : null}
          {jfw_rbm_name ? (
            <Text style={styles.topJfwLabel}>JFW (RBM)</Text>
          ) : null}
        </View>
      );
    }
    return null;
  }

  renderDoctorCompletedHeading() {
    const { data, completedDoctors, completedHeading } = this.props;
    if (data && completedDoctors && completedDoctors.length) {
      return (
        <View style={styles.doctorPlannedHeadingContainer}>
          <Text style={styles.doctorPlannedHeading}>{completedHeading}</Text>
        </View>
      );
    }
    return null;
  }

  renderPlannedDoctors() {
    const {
      data,
      onDoctorPress,
      gotoSelectContent,
      gotoStartDetailing,
      current_orientation,
      isToday,
    } = this.props;
    const { plannedDoctors } = this.props;
    if (data && plannedDoctors && plannedDoctors.length) {
      return plannedDoctors.map((doctor) => {
        const {
          doc_code,
          doc_name,
          doc_spec,
          sales_planning,
          contents,
          visit_category,
        } = doctor;
        return (
          <View key={doc_code} style={styles.doctorRow}>
            <TouchableOpacity
              style={styles.doctor}
              onPress={() => onDoctorPress(doctor)}
            >
              {current_orientation === 'PORTRAIT' ? (
                <View style={styles.doctorLeft}>
                  <Text style={styles.doctorName}>{doc_name}</Text>
                  <Text style={styles.doctorSpec}>
                    {doc_spec}
                    {' '}
                    /
                    {visit_category}
                  </Text>
                  <Text style={styles.doctorGsp}>
                    {priceFormatWithoutDecimal(sales_planning)}
                    {' '}
                    GSP
                  </Text>
                </View>
              ) : (
                <View style={styles.doctorLeftLandscape}>
                  <View style={styles.doctorLeftLandscapeName}>
                    <Text style={styles.doctorName}>{doc_name}</Text>
                    <Text style={styles.doctorSpec}>
                      {doc_spec}
                      {' '}
                      /
                      {visit_category}
                    </Text>
                  </View>
                  <View style={styles.doctorLeftLandscapeGsp}>
                    <Text style={styles.doctorGspLandscape}>
                      {priceFormatWithoutDecimal(sales_planning)}
                      {' '}
                      GSP
                    </Text>
                  </View>
                </View>
              )}
              <View
                style={[
                  styles.doctorRight,
                  DeviceInfo.isTablet() ? styles.row : {},
                ]}
              >
                {this.renderVirtualCallButton(doctor)}
                <TouchableOpacity
                  style={styles.selectContentButton}
                  onPress={() => gotoSelectContent(doctor)}
                >
                  <Image
                    source={Images.select_content}
                    style={styles.startDetailingIcon}
                  />
                  <Text style={styles.startDetailingText}>Select Content</Text>
                </TouchableOpacity>
                { isToday
                  ? this.shouldShowStartDetailing(doctor) ? (
                    <TouchableOpacity style={styles.startDetailingButton} onPress={() => gotoStartDetailing(doctor)}>
                      <Text style={styles.startDetailingText}>Start Detailing</Text>
                    </TouchableOpacity>
                  )
                    : (
                      <TouchableOpacity style={styles.startDetailingButtonDisabled}>
                        <Text style={styles.startDetailingTextDisabled}>Start Detailing</Text>
                      </TouchableOpacity>
                    )
                  : null }
                {this.renderMoreButton(doctor)}
              </View>
            </TouchableOpacity>
            {this.renderContents(contents, doctor)}
          </View>
        );
      });
    }
    return null;
  }

  formatVirtualStartTime = (date) => {
    try {
      const splits = date.split(' ');
      const timeSplits = splits[1].split('.');
      return `${timeSplits[0]}:${timeSplits[1]} ${splits[2]}`;
    } catch (e) {
      return '';
    }
  };

  // added sonali CR
  shouldShowStartDetailing(doctor) {
    const { virtual_call_schedule } = doctor;
    if (virtual_call_schedule) {
      return false;
    }
    return true;
  }

  // end CR */
  renderVirtualCallButton(doctor) {
    const {
      goToScheduleVirtualMeeting,
      joinVirtualCall,
      isPast,
      hasVirtualDetailing,
    } = this.props;
    const { virtual_call_schedule } = doctor;
    if (isPast || !hasVirtualDetailing) {
      return null;
    }
    if (virtual_call_schedule) {
      const { start_time } = virtual_call_schedule;
      return (
        <View style={styles.virtualCallButtonRow}>
          <Text style={styles.virtualCallTime}>
            {this.formatVirtualStartTime(start_time)}
          </Text>
          <TouchableOpacity
            style={styles.virtualCallJoinButton}
            onPress={() => {
              joinVirtualCall(doctor);
            }}
          >
            <Text style={styles.virtualCallJoinText}>Join</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.virtualCallScheduleButton}
        onPress={() => {
          goToScheduleVirtualMeeting(doctor);
        }}
      >
        <Image
          source={Images.ic_virtual_call}
          style={styles.virtualCallScheduleIcon}
        />
        <Text style={styles.virtualCallScheduleText}>Schedule</Text>
      </TouchableOpacity>
    );
  }

  renderMoreButton(doctor) {
    const {
      cancelVirtualCall,
      isPast,
      hasVirtualDetailing,
      resendLink,
    } = this.props;
    const { virtual_call_schedule } = doctor;
    if (isPast || !hasVirtualDetailing) {
      return null;
    }

    if (virtual_call_schedule) {
      return (
        <Menu>
          <MenuTrigger>
            <Image
              style={styles.moreIcon}
              resizeMode="contain"
              source={Images.ic_more}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Resend Link',
                  'Are you sure you want to resend the link for this call?',
                  [
                    {
                      text: 'No',
                      style: 'destructive',
                    },
                    {
                      text: 'Yes! Send Link',
                      onPress: () => {
                        resendLink(doctor)
                          .then()
                          .catch((err) => console.log(err));
                      },
                    },
                  ],
                );
              }}
            >
              <Text style={styles.cancelButton}>Resend Link</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Cancel Call',
                  'Are you sure you want to cancel this call?',
                  [
                    {
                      text: 'No',
                    },
                    {
                      text: 'Yes! Cancel',
                      style: 'destructive',
                      onPress: () => {
                        cancelVirtualCall(doctor);
                      },
                    },
                  ],
                );
              }}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      );
    }

    return (
      <Image
        style={styles.moreIconDisabled}
        resizeMode="contain"
        source={Images.ic_more}
      />
    );
  }

  renderContents(contents, doctor) {
    const {
      showContents,
      gotoStartDetailing,
      showCaseDrMapping,
      isToday,
    } = this.props;
    if (showContents && contents && contents.length) {
      let contentsToBeShown = [];
      if (
        showCaseDrMapping
        && Object.keys(showCaseDrMapping)
        && Object.keys(showCaseDrMapping).length > 0
      ) {
        const { doc_code } = doctor;
        contentsToBeShown = showCaseDrMapping[doc_code];
      }
      return (
        <ScrollView
          style={styles.contentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {contents.map((content, index) => {
            const {
              content_id, title, thumbnail_location, name
            } = content;
            if (
              contentsToBeShown
              && contentsToBeShown.length > 0
              && contentsToBeShown.indexOf(content_id) < 0
            ) {
              return null;
            }
            return (
              <TouchableOpacity
                style={styles.content}
                key={content_id}
                onPress={() => {
                  if (isToday) {
                    gotoStartDetailing(doctor, index);
                  }
                }}
              >
                <FastImage
                  source={{ uri: `file://${thumbnail_location}` }}
                  style={styles.contentThumbnail}
                />
                <Text style={styles.contentTitle}>{name || title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
    return null;
  }

  renderCompletedDoctors() {
    const {
      data, completedDoctors, selectDoctor, onDoctorPress
    } = this.props;
    if (data && completedDoctors && completedDoctors.length) {
      return completedDoctors.map((doctor) => {
        const {
          doc_code, doc_name, doc_spec, visit_category
        } = doctor;
        return (
          <View key={doc_code} style={styles.doctorRow}>
            <TouchableOpacity
              style={styles.doctor}
              onPress={() => onDoctorPress(doctor)}
            >
              <View style={styles.doctorLeft}>
                <Text style={styles.doctorName}>{doc_name}</Text>
                <Text style={styles.doctorSpec}>
                  {doc_spec}
                  {' '}
                  /
                  {visit_category}
                </Text>
              </View>
              <View style={styles.rcpaRight}>
                <TouchableOpacity
                  style={styles.startDetailingButton}
                  onPress={() => selectDoctor(doctor)}
                >
                  <Text style={styles.startDetailingText}>RCPA</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    }
    return null;
  }

  renderLoader() {
    const { loading } = this.props;
    if (loading) {
      return (
        <ActivityIndicator color={ColorStyles.gray} style={styles.loader} />
      );
    }
    return null;
  }

  renderBlankSpace() {
    return <View style={styles.blank} />;
  }

  render() {
    const { loading, hoverLoading } = this.props;

    return (
      <ParentView
        hoverLoading={hoverLoading}
        style={styles.container}
        connected
      >
        {this.renderCalendar()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderLoader()}
          {loading ? null : this.renderLocation()}
          {loading ? null : this.renderGsp()}
          {loading ? null : this.renderBlankSpace()}
          {loading ? null : this.renderDoctorPlannedHeading()}
          {loading ? null : this.renderPlannedDoctors()}
          {loading ? null : this.renderDoctorCompletedHeading()}
          {loading ? null : this.renderCompletedDoctors()}
        </ScrollView>
      </ParentView>
    );
  }
}
