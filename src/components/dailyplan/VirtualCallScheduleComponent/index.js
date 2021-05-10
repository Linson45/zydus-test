import React from 'react';

import {
  Image, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { formatTime } from '../../../util/dateTimeUtil';
import VirtualCallSubjectModalComponent from '../VirtualCallSubjectModalComponent';

export default class VirtualCallSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePickerVisible: false,
    };
  }

  renderSubjectDropDown() {
    const { subjects, selectedSubject, setContainerState } = this.props;
    if (subjects) {
      return (
        <View>
          <Text style={styles.heading}>Subject</Text>
          <TouchableOpacity
            style={styles.valueContainer}
            onPress={() => {
              setContainerState('isSubjectModalVisible', true);
            }}
          >
            <Text>{selectedSubject || 'Select subject'}</Text>
            <Image style={styles.dropdownIcon} source={Images.DropDown} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderSubjectCustomLine() {
    const { selectedSubject, customSubject, setContainerState } = this.props;
    if (selectedSubject && selectedSubject === 'Custom') {
      return (
        <View>
          <Text style={styles.heading}>Custom Subject Line</Text>
          <TextInput
            style={styles.subjectInput}
            value={customSubject}
            placeholder="Enter Custom Subject Line"
            onChangeText={(text) => setContainerState('customSubject', text)}
          />
        </View>
      );
    }
    return null;
  }

  renderSubjectSheet() {
    const {
      subjects, setContainerState, isSubjectModalVisible, selectSubject
    } = this.props;
    return (
      <VirtualCallSubjectModalComponent
        isVisible={isSubjectModalVisible}
        subjects={subjects}
        onSubmit={(subject) => {
          selectSubject(subject);
        }}
        onClose={() => {
          setContainerState('isSubjectModalVisible', false);
        }}
      />
    );
  }

  renderDateTime() {
    const { selectedTime, date } = this.props;
    return (
      <View style={styles.row}>
        <View style={[styles.halfContainer, { marginRight: 25 }]}>
          <Text style={styles.heading}>Select Date</Text>
          <View style={styles.disabledContainer}>
            <Text>{date}</Text>
            <Image style={styles.calendarIcon} source={Images.calendar} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.halfContainer}
          onPress={() => {
            this.setState({ timePickerVisible: true });
          }}
        >
          <Text style={styles.heading}>Select Time</Text>
          <View style={styles.valueContainer}>
            <Text>{selectedTime ? formatTime(selectedTime) : 'Select Time'}</Text>
            <Image style={styles.calendarIcon} source={Images.clock} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderTimePicker() {
    const { timePickerVisible } = this.state;
    const { setContainerState } = this.props;
    return (
      <DateTimePickerModal
        headerTextIOS="Pick a time"
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={(date) => {
          const d = moment(date);
          setContainerState('selectedTime', `${d.hour()}-${d.minute()}`);
          this.setState({ timePickerVisible: false });
        }}
        onCancel={() => {
          this.setState({ timePickerVisible: false });
        }}
      />
    );
  }

  renderAddParticipant() {
    const { goToAddParticipants } = this.props;
    return (
      <TouchableOpacity
        style={[styles.valueContainer, styles.addParticipantsContainer]}
        onPress={goToAddParticipants}
      >
        <Text>Add Participants</Text>
        <Image style={styles.addIcon} source={Images.ic_add_icon} />
      </TouchableOpacity>
    );
  }

  renderTeam() {
    const { deleteParticipant } = this.props;
    let { team } = this.props;
    if (!team) {
      team = [];
    }
    return team.map((user) => {
      const {
        name, rep_code, mobile, email
      } = user;
      return (
        <View style={styles.participantContainer}>
          <View>
            <Text style={styles.participantName}>{name}</Text>
            <Text style={styles.participantEmail}>{email || '-'}</Text>
            <Text style={styles.participantEmail}>{mobile || '-'}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            deleteParticipant('team', rep_code);
          }}
          >
            <Text style={styles.participantRemove}>Remove</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  renderDoctors() {
    const { deleteParticipant } = this.props;
    let { doctors } = this.props;
    if (!doctors) {
      doctors = [];
    }
    return doctors.map((user) => {
      const {
        doc_name, doc_code, mobile_no, email
      } = user;
      return (
        <View style={styles.participantContainer}>
          <View>
            <Text style={styles.participantName}>{doc_name}</Text>
            <Text style={styles.participantEmail}>{email || '-'}</Text>
            <Text style={styles.participantEmail}>{mobile_no || '-'}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            deleteParticipant('doctor', doc_code);
          }}
          >
            <Text style={styles.participantRemove}>Remove</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  renderButtons() {
    const { schedule, scheduleNow } = this.props;
    return (
      <View style={styles.bottomView}>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.startButton} onPress={scheduleNow}>
            <Text style={styles.startButtonText}>Start Meeting Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton} onPress={schedule}>
            <Text style={styles.scheduleButtonText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      loading, hoverLoading
    } = this.props;

    return (
      <ParentView
        hoverLoading={hoverLoading}
        connected
        loading={loading}
      >
        {this.renderTimePicker()}
        <ScrollView contentContainerStyle={styles.container}>
          {this.renderSubjectDropDown()}
          {this.renderSubjectCustomLine()}
          {this.renderSubjectSheet()}
          {this.renderDateTime()}
          {this.renderAddParticipant()}
          {this.renderTeam()}
          {this.renderDoctors()}
        </ScrollView>
        {this.renderButtons()}
      </ParentView>
    );
  }
}
