import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Alert } from 'react-native';
import api from '../../../api';
import Urls from '../../../api/urls';
import Adapter from '../../../util/Adapter';
import VirtualCallSchedule from '../../../components/dailyplan/VirtualCallScheduleComponent';
import {
  deleteVirtualDetailingFormItem,
  setVirtualDetailingForm,
  scheduleVirtualCall,
  REFRESH_DAILY_PLAN, addOpenTokData
} from '../../../actions';
import Toaster from '../../../util/Toaster';
import { isFutureTime, isToday } from '../../../util/dateTimeUtil';

class VirtualCallScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hoverLoading: false,
      subjects: [],
      selectedSubject: null,
      customSubject: '',
      isSubjectModalVisible: false,
    };
  }

    static navigationOptions = {
      title: 'Schedule Meeting',
    };

    async componentDidMount() {
      this.props.setVirtualDetailingForm([], []);
      const me = await Adapter.getUser();
      const {
        company_code, sbu_code
      } = me;
      let { data } = await api({
        method: 'GET',
        url: Urls.GET_VCALL_SUBJECTS,
        params: { company_code, sbu_code },
      });
      if (data) {
        data = data.map(({ subject }) => subject);
      }
      data.push('Custom');
      this.setState({ subjects: data, loading: false });
    }

    setContainerState = (key, value) => {
      const state = { ...this.state };
      state[key] = value;
      this.setState(state);
    };

    goToAddParticipants = async () => {
      const { doneDoctors, doctor } = this.props.navigation.state.params;
      const user = await Adapter.getUser();
      this.props.navigation.navigate('VirtualCallAddUser', { user, doneDoctors, doctor });
    };

    schedule = async () => {
      const response = await this.createCall();
      if (!response) {
        return;
      }
      const { statusCode, errorMessage } = response;

      if (statusCode === 200) {
        Toaster.show('Call scheduled');
        await Adapter.set(REFRESH_DAILY_PLAN, true);
        this.props.navigation.goBack();
        return;
      }
      Toaster.show(errorMessage || 'Call schedule Failed!');
    };

    scheduleNow = () => {
      Alert.alert(
        'Confirm Schedule',
        'Are you sure you want to schedule your meeting now?',
        [
          {
            text: 'Cancel'
          },
          {
            text: 'Confirm',
            onPress: async () => {
              const current = new moment();
              await this.setState({ selectedTime: `${current.get('hour')}-${current.get('minute')}` });
              const response = await this.createCall();
              if (!response) {
                return;
              }
              const { statusCode, errorMessage } = response;
              if (statusCode === 200) {
                Toaster.show('Call scheduled');
                await Adapter.set(REFRESH_DAILY_PLAN, true);
                this.props.navigation.goBack();
              } else {
                Toaster.show(errorMessage || 'Call schedule Failed!');
              }
            },
          },
        ]
      );
    };

    createCall = async () => {
      const me = await Adapter.getUser();
      const { selectedSubject, customSubject, selectedTime } = this.state;
      if (!selectedSubject) {
        Toaster.show('Please select subject');
        return null;
      }
      if (selectedSubject === 'Custom' && !customSubject) {
        Toaster.show('Please enter customer subject');
        return null;
      }
      if (!selectedTime) {
        Toaster.show('Please select time');
        return null;
      }
      const { team, doctors } = this.props;
      const { doctor, date, bo_code } = this.props.navigation.state.params;

      const doc_codes = doctors.map((doctor) => doctor.doc_code);
      doc_codes.push(doctor.doc_code);

      const rep_codes = team.map((user) => user.rep_code);
      console.log('bo_code');
      console.log(bo_code);
      if (bo_code) {
        rep_codes.push(
          bo_code
        );
      }

      const time = moment(selectedTime, 'HH:mm');
      const callDate = new moment(date);
      callDate.set({
        hour: time.get('hour'),
        minute: time.get('minute'),
        second: 0
      });

      const future = isFutureTime(callDate);
      if (!future) {
        Toaster.show('Can not schedule call in past time');
        return null;
      }
      const body = {
        subject: selectedSubject !== 'Custom' ? selectedSubject : customSubject,
        date: callDate.format('DD-MMM-YYYY HH:mm'),
        doc_codes,
        rep_codes,
        scheduled_by: me.rep_code,
      };
      this.setState({ hoverLoading: true });
      const response = await scheduleVirtualCall(body);
      await this.setState({ hoverLoading: false });
      return response;
    };

    selectSubject = (selectedSubject) => {
      this.setState({
        selectedSubject, isSubjectModalVisible: false
      });
    };

    render() {
      const {
        loading, subjects, selectedSubject, customSubject, selectedTime, hoverLoading, isSubjectModalVisible
      } = this.state;
      const { team, doctors, deleteVirtualDetailingFormItem } = this.props;
      const { doctor, date } = this.props.navigation.state.params;

      return (
        <VirtualCallSchedule
          isToday={isToday(date)}
          hoverLoading={hoverLoading}
          date={date}
          loading={loading}
          subjects={subjects}
          selectedSubject={selectedSubject}
          customSubject={customSubject}
          selectedTime={selectedTime}
          setContainerState={this.setContainerState}
          doctor={doctor}
          goToAddParticipants={this.goToAddParticipants}
          team={team}
          doctors={doctors}
          deleteParticipant={deleteVirtualDetailingFormItem}
          schedule={this.schedule}
          scheduleNow={this.scheduleNow}
          isSubjectModalVisible={isSubjectModalVisible}
          selectSubject={this.selectSubject}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  team: state.dailyPlanVirtualDetailingForm.team,
  doctors: state.dailyPlanVirtualDetailingForm.doctors,
});

export default connect(
  mapStateToProps,
  {
    deleteVirtualDetailingFormItem, setVirtualDetailingForm, addOpenTokData
  }
)(VirtualCallScheduleContainer);
