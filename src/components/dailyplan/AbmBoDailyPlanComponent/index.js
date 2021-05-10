import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ParentView from '../../ParentView';
import styles from './styles';

import Colors from '../../../styles/colorsStyles';

export default class AbmBoDailyPlanComponent extends React.Component {
  renderCalendar() {
    const { changeQuery, date } = this.props;
    return (
      <CalendarStrip
        scrollable
        style={styles.calendar}
        selectedDate={date}
        calendarHeaderStyle={styles.calendarHeader}
        highlightDateNameStyle={styles.calendarDateName}
        highlightDateNumberStyle={styles.calendarDateNumber}
        onDateSelected={(date) => {
          changeQuery(date.format('DD-MMM-YYYY'));
        }}
      />
    );
  }

  renderLoader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.gray} style={styles.loader} />;
    }
    return null;
  }

  renderJfw() {
    const { data, onPress } = this.props;
    const jfwData = [];
    if (data) {
      data.forEach((doctor) => {
        const { is_jfw } = doctor;
        if (is_jfw) {
          jfwData.push(doctor);
        }
      });
      return (
        <View style={styles.otherMembersContainer}>
          {jfwData.map((jfw) => {
            const { name, hq_name, doctor_count } = jfw;

            return (
              <TouchableOpacity
                style={styles.jfwView}
                key={name}
                onPress={() => onPress(jfw)}
              >
                <View style={styles.jfwLeft}>
                  <Text style={styles.boName}>{name}</Text>
                  <Text style={styles.boHq}>{`BO, ${hq_name}`}</Text>
                </View>
                <View style={styles.jfwRight}>
                  <View style={styles.row}>
                    <Text>{`Doctors Planned: ${doctor_count}`}</Text>
                    <Text style={styles.topJfwLabel}>JFW</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return null;
  }

  renderData() {
    const { data, onPress } = this.props;
    const bos = [];
    if (data) {
      data.forEach((doctor) => {
        const { is_jfw } = doctor;
        if (!is_jfw) {
          bos.push(doctor);
        }
      });
      return (
        <View style={styles.otherMembersContainer}>
          <Text style={styles.otherMembersHeading}>OTHER TEAM MEMBERS</Text>
          {bos.map((bo) => {
            const { name, hq_name, doctor_count } = bo;

            return (
              <TouchableOpacity
                style={styles.doctorView}
                key={name}
                onPress={() => onPress(bo)}
              >
                <View style={styles.doctorLeft}>
                  <Text style={styles.boName}>{name}</Text>
                  <Text style={styles.boHq}>{`BO, ${hq_name}`}</Text>
                </View>
                <View style={styles.doctorRight}>
                  <Text>{`Doctors Planned: ${doctor_count}`}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return null;
  }

  renderBlankSpace() {
    return <View style={styles.blank} />;
  }

  render() {
    const { loading } = this.props;

    return (
      <ParentView
        connected
        onRefresh={() => this.props.onRefresh()}
        style={styles.container}
      >
        {this.renderCalendar()}
        <ScrollView>
          {this.renderLoader()}
          {loading ? null : this.renderJfw()}
          {this.renderBlankSpace()}

          {loading ? null : this.renderData()}
        </ScrollView>
      </ParentView>
    );
  }
}
