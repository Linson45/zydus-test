import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import { Image, TouchableOpacity, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Orientation from 'react-native-orientation';
import {
  addOpenTokData,
  cancelVirtualCall,
  joinVirtualCall,
  loadBoDailyPlan,
  loadBoDailyPlanOffline,
  REFRESH_DAILY_PLAN, resendLink,
  SET_SESSION_DATA_OPENTOK
} from '../../../actions';
import Adapter from '../../../util/Adapter';
import { getPendingActionSummaries, mergeDailyPlan } from '../../../local-storage/helper/dailyplan';
import BoDailyPlanComponent from '../../../components/dailyplan/BoDailyPlanComponent';
import { Role } from '../../../util/Constants';
import NonBoDailyPlanComponent from '../../../components/dailyplan/NonBoDailyPlanComponent';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import { loadVADetailsWithConfig, showcaseStatus } from '../../../util/startDeatiling';
import { isPast, isToday } from '../../../util/dateTimeUtil';
import Toaster from '../../../util/Toaster';

class DailyPlanBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoading: false,
      date: moment().format('DD-MMM-YYYY'),
      me_user_type: null,
      pendingActionSummaries: [],
      isInternetConnected: true,
      isOn: false,
      showCaseDrMapping: {},
      hasVirtualDetailing: true,
      dataForPlan: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let goToAllDoctors = null;
    let onToggleView = null;
    let loadFiveData = null
    let isOn = false;
    const isTablet = DeviceInfo.isTablet();
    const headerTitle = 'Daily Plan';

    if (params) {
      isOn = params.isOn;
      onToggleView = params.onToggleView;
      goToAllDoctors = params.goToAllDoctors;
      // loadFiveData = params.loadFiveData;
    }

    return {
      headerTitle,
      headerRight: (
        <View style={styles.headerButtons}>
          {/* <TouchableOpacity onPress={() => {
            if (loadFiveData) {
              loadFiveData()
            }
          }}
          >
            <Image
              source={Images.ic_sync_red_600_24dp}
              style={styles.up}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
          {isTablet ? (

            <ToggleSwitch
              isOn={isOn}
              onColor={ColorStyles.toggleGreen}
              offColor={ColorStyles.toggleOffColor}
              trackOffStyle={styles.toggle}
              trackOnStyle={styles.toggle}
              thumbOffStyle={styles.toggle}
              size="medium"
              onToggle={(isOn) => {
                onToggleView(isOn);
              }}
            />
          ) : null}

          <TouchableOpacity onPress={() => {
            if (goToAllDoctors) {
              goToAllDoctors();
            }
          }}
          >
            <Image
              source={Images.ic_add_icon}
              style={styles.up}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      goToAllDoctors: this.goToAllDoctors,
      onToggleView: this.onToggleView,
      loadData: this.loadData,
      // loadFiveData: this.loadFiveData
    });
    console.log('Apsel')
    if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.date) {
      const { date } = this.props.navigation.state.params;
      await this.setState({
        date
      });
    }
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this)
    );
    this.loadData();
    const user = await Adapter.getUser();
    const current_orientation = Orientation.getInitialOrientation();

    this.setState({ me_user_type: user.user_type, current_orientation });
    const pendingActionSummaries = await getPendingActionSummaries();
    this.setState({ pendingActionSummaries });

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    this.setState({ current_orientation: orientation });
  };

  onRefresh = () => {
    this.loadData();
  };

  onToggleView = async (isOn) => {
    this.setState({ isOn });
    if (isOn) {
      let showCaseDrMapping = {};
      await Promise.all(this.getPlannedDoctors().map(async (doctor) => {
        const { doc_code, contents } = doctor;
        showCaseDrMapping = await this.isShowCasePresent(doc_code, contents, showCaseDrMapping);
      }));
      this.setState({ showCaseDrMapping });
    }
    this.props.navigation.setParams({
      isOn,
    });
  };

  async isShowCasePresent(doc_code, contents, showCaseDrMapping) {
    const showcaseList = [];
    const nonShowcaseList = [];
    for (const content of contents) {
      const status = await showcaseStatus(doc_code, content.content_id);
      if (status) {
        showcaseList.push(
          content.content_id
        );
      } else {
        nonShowcaseList.push(
          content.content_id
        );
      }
    }
    if (showcaseList.length > 0) {
      showCaseDrMapping[doc_code] = showcaseList;
    } else {
      showCaseDrMapping[doc_code] = nonShowcaseList;
    }
    return showCaseDrMapping;
  }

  onFocus() {
    Adapter.get(REFRESH_DAILY_PLAN).then((r) => {
      if (r) {
        Adapter.set(REFRESH_DAILY_PLAN, false);
        this.onRefresh();
      }
    });
  }

  componentWillUnmount() {
    this.willFocus.remove();
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  async changeQuery(date) {
    await this.setState({
      date
    });
    this.loadData();
  }

  async loadData() {
    const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
    const { date, isOn } = this.state;
    const data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('Data for action', data)
    await this.props.loadBoDailyPlanOffline(data)
    // await this.props.loadBoDailyPlan(data);


    this.onToggleView(isOn);
  }

  goToDoctorDetails(doctor) {
    const { date } = this.state;
    const { user } = this.props.navigation.state.params;
    this.props.navigation.navigate('DailyPlanDoctorDetails', { user, doctor, date });
  }
  // async loadFiveData(user) {
  //   console.log('clicked', user)
  //   var d = new Date();
  //   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   var day = d.getDate();
  //   var month = months[d.getMonth()];
  //   var year = d.getFullYear();
  //   var date = `${day}-${month}-${year}`
  //   const { rep_code, company_code, sbu_code } = user
  //   console.log('came')

  //   var data = {
  //     rep_code,
  //     company_code,
  //     sbu_code,
  //     date
  //   };
  //   console.log('1', day, month, year, date, data)
  //   var dayFull = [data]
  //   var yesterday = new Date(Date.now() - 864e5);
  //   day = yesterday.getDate();
  //   month = months[yesterday.getMonth()];
  //   year = yesterday.getFullYear();
  //   date = `${day}-${month}-${year}`
  //   data = {
  //     rep_code,
  //     company_code,
  //     sbu_code,
  //     date
  //   };
  //   console.log('2', day, month, year, date, data)
  //   dayFull.push(data)
  //   yesterday = new Date(Date.now() - 172800000);
  //   day = yesterday.getDate();
  //   month = months[yesterday.getMonth()];
  //   year = yesterday.getFullYear();
  //   date = `${day}-${month}-${year}`
  //   data = {
  //     rep_code,
  //     company_code,
  //     sbu_code,
  //     date
  //   };
  //   console.log('3', day, month, year, date, data)
  //   dayFull.push(data)
  //   var tomorrow = new Date(Date.now() + 864e5);
  //   day = tomorrow.getDate();
  //   month = months[tomorrow.getMonth()];
  //   year = tomorrow.getFullYear();
  //   date = `${day}-${month}-${year}`
  //   data = {
  //     rep_code,
  //     company_code,
  //     sbu_code,
  //     date
  //   };
  //   console.log('4', day, month, year, date, data)
  //   dayFull.push(data)
  //   tomorrow = new Date(Date.now() + 172800000);
  //   day = tomorrow.getDate();
  //   month = months[tomorrow.getMonth()];
  //   year = tomorrow.getFullYear();
  //   date = `${day}-${month}-${year}`
  //   data = {
  //     rep_code,
  //     company_code,
  //     sbu_code,
  //     date
  //   };
  //   console.log('5', day, month, year, date, data)
  //   dayFull.push(data)
  //   console.log('Date', dayFull)
  //   dayFull.map(async (day) => {
  // //  this.callFunction(day)
  // await this.props.loadBoDailyPlan(day);
  //     console.log('called',day)
  //   })
  // }
  // async callFunction(data){
  //   this.props.loadBoDailyPlan(data)
  // }
  goToAllDoctors = () => {
    const { data } = this.props.dailyPlanBoOffline;
    console.log('Go to prseese')
    const doctors_planned = [];
    if (data && data.doctors_planned) {
      for (const value of data.doctors_planned) {
        doctors_planned.push(
          value.doc_code
        );
      }
    }
    const { user } = this.props.navigation.state.params;
    const { date } = this.state;
    this.props.navigation.navigate('DailyPlanBoAllDoctors', { user, date, doctors_planned });
  };

  onActionPress(actions) {
    const { user } = this.props.navigation.state.params;
    this.props.navigation.navigate('DailyPlanActionDetailsContainer', { user, actions });
  }

  selectDoctor(doctor) {
    const { user } = this.props.navigation.state.params;
    this.props.navigation.navigate('RcpaChemistSelection', { user, doctor });
  }

  gotoSelectContent(doctor) {
    const { date } = this.state;
    const { user } = this.props.navigation.state.params;
    this.props.navigation.navigate('EDetailingBrandDr', { user, doctor, date });
  }

  getPlannedDoctors() {
    if (DeviceInfo.isTablet()) {
      const { pendingActionSummaries } = this.state;
      const { data } = this.props.dailyPlanBoOffline;
      const mergedPlan = mergeDailyPlan(data, pendingActionSummaries);
      let doctorsPlanned = [];
      if (mergedPlan) {
        doctorsPlanned = mergedPlan.doctors_planned;
      }
      const doctors = [];
      doctorsPlanned.forEach((doctor) => {
        if (!doctor.is_completed) {
          doctors.push(doctor);
        }
      });
      return doctors;
    }
    return [];
  }

  getCompletedDoctors() {
    const { pendingActionSummaries } = this.state;
    const { data } = this.props.dailyPlanBoOffline;
    const mergedPlan = mergeDailyPlan(data, pendingActionSummaries);
    let doctorsPlanned = [];
    if (mergedPlan) {
      doctorsPlanned = mergedPlan.doctors_planned;
    }
    const doctors = [];
    doctorsPlanned.forEach((doctor) => {
      if (doctor.is_completed || !DeviceInfo.isTablet()) {
        doctors.push(doctor);
      }
    });
    return doctors;
  }

  getVirtualCallScheduledDoctorCodes = () => {
    const { pendingActionSummaries } = this.state;
    const { data } = this.props.dailyPlanBoOffline;

    const mergedPlan = mergeDailyPlan(data, pendingActionSummaries);
    let doctorsPlanned = [];
    if (mergedPlan) {
      doctorsPlanned = mergedPlan.doctors_planned;
    }
    const doctors = [];
    doctorsPlanned.forEach((doctor) => {
      const { virtual_call_schedule, doc_code } = doctor;
      if (virtual_call_schedule) {
        doctors.push(doc_code);
      }
    });
    if (data) {
      const { virtual_doctor_codes } = data;
      if (virtual_doctor_codes) {
        virtual_doctor_codes.forEach((doc_code) => {
          doctors.push(doc_code);
        });
      }
    }
    return doctors;
  };

  gotoStartDetailing(doctor, position = undefined) {
    const {
      doc_code,
      contents
    } = doctor;
    const { date } = this.state;
    loadVADetailsWithConfig(doc_code, contents).then((brands) => {
      const brandsCloned = [];
      const allVAS = [];
      for (const brand of brands) {
        for (const va of brand.data) {
          const {
            vaPosition,
            in_showcase,
          } = va;
          if (in_showcase) {
            if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
              brandsCloned[vaPosition] = va;
            } else {
              brandsCloned.push(
                va
              );
            }
          }
          allVAS.push(
            va,
          );
        }
      }
      if (brandsCloned.length > 0) {
        const finalVAS = [];
        for (const render of brandsCloned) {
          if (render) {
            finalVAS.push(
              render
            );
          }
        }
        this.props.navigation.navigate('EDetailingWebView', {
          showcase: finalVAS,
          allVAS,
          position,
          doctor,
          date
        });
      } else {
        let finalVAS = allVAS;
        if (typeof position !== 'undefined') {
          finalVAS = [allVAS[position]];
        }
        this.props.navigation.navigate('EDetailingWebView', {
          showcase: finalVAS,
          allVAS,
          doctor,
          date
        });
      }
    });
  }

  goToScheduleVirtualMeeting = (doctor) => {
    const doneDoctors = this.getVirtualCallScheduledDoctorCodes();
    const { date } = this.state;
    const { rep_code } = this.props.navigation.state.params.user;
    console.log(rep_code);
    this.props.navigation.navigate('VirtualCallSchedule', {
      doctor, date, doneDoctors, bo_code: rep_code
    });
  };

  cancelVirtualCall = async (doctor) => {
    this.setState({ hoverLoading: true });
    const { virtual_call_schedule } = doctor;
    if (virtual_call_schedule) {
      let response = await cancelVirtualCall(virtual_call_schedule.session_token);
      if (typeof (response) !== 'string') {
        response = JSON.stringify(response);
      }
      response = response.trim();
      await this.setState({ hoverLoading: false });
      if (response === 'Call Cancelled') {
        Toaster.show('Call Cancelled');
        this.loadData();
        return;
      }
      Toaster.show('Call cancel Failed!');
    }
  };

  resendLink = async (doctor) => {
    const { virtual_call_schedule } = doctor;
    if (virtual_call_schedule) {
      this.setState({ hoverLoading: true });
      const { statusCode, errorMessage } = await resendLink(virtual_call_schedule.session_token);
      await this.setState({ hoverLoading: false });
      if (statusCode === 200) {
        Toaster.show('Link resent');
      } else {
        Toaster.show(errorMessage);
      }
    }
  };

  joinVirtualCall = async (doctor) => {
    const { date } = this.state;
    const { virtual_call_schedule } = doctor;
    if (virtual_call_schedule) {
      this.setState({ hoverLoading: true });
      const { statusCode, errorMessage, data } = await joinVirtualCall(virtual_call_schedule.session_token);
      await this.setState({ hoverLoading: false });
      if (statusCode === 200) {
        this.props.addOpenTokData(SET_SESSION_DATA_OPENTOK, {
          apiKey: data.key,
          sessionId: data.session_id,
          token: data.token,
          name: data.user_name
        });
        this.props.navigation.navigate('VirtualDetailingVideo', { doctor, date });
        return;
      }
      Toaster.show(errorMessage);
    }
  };

  render() {
    const completedHeading = DeviceInfo.isTablet() ? 'COMPLETED DOCTORS' : 'DOCTORS';
    const {
      me_user_type, pendingActionSummaries, showCaseDrMapping, hoverLoading, hasVirtualDetailing
    } = this.state;
    const { loading, data } = this.props.dailyPlanBoOffline;
    console.log('Props Apsel', this.props.isLoading)
    var finalLoading
    if (this.props.isLoading) {
      finalLoading=true
    }else{
      finalLoading=loading
    }
    console.log('data got', data, loading)
    //  if( me_user_type === Role.BO){
    //     const { loading, data } = this.props.dailyPlanBoOffline;
    //     console.log('Data from offline 2',data,loading)
    //     if(!data){
    //       const { loading, data } = this.props.dailyPlanBo;
    //        completeData=data
    //        completeLoading=loading
    //       console.log('Data from online',loading,data)
    //     }else{
    //        completeData=data
    //        completeLoading=loading
    //       console.log('Data from online',loading,data)
    //     }
    //  }else{
    //   const { loading, data } = this.props.dailyPlanBo;
    //   completeData=data
    //        completeLoading=loading
    //        console.log('Data from online others',loading,data)
    //  }

    const changeQuery = this.changeQuery.bind(this);
    const { user_type } = this.props.navigation.state.params.user;
    const goToDoctorDetails = this.goToDoctorDetails.bind(this);
    const onActionPress = this.onActionPress.bind(this);
    const selectDoctor = this.selectDoctor.bind(this);
    const gotoSelectContent = this.gotoSelectContent.bind(this);
    const gotoStartDetailing = this.gotoStartDetailing.bind(this);
    const resendLink = this.resendLink.bind(this);
    const { date, isOn, current_orientation } = this.state;

    if (me_user_type === Role.BO) {
      return (
        <>
          <BoDailyPlanComponent
            hasVirtualDetailing={hasVirtualDetailing}
            hoverLoading={hoverLoading}
            isPast={isPast(date)}
            isToday={isToday(date)}
            current_orientation={current_orientation}
            completedHeading={completedHeading}
            showCaseDrMapping={showCaseDrMapping}
            loading={finalLoading}
            selectedDate={date}
            selectDoctor={selectDoctor}
            user_type={user_type}
            connected={this.state.isInternetConnected}
            data={mergeDailyPlan(data, pendingActionSummaries)}
            changeQuery={changeQuery}
            onDoctorPress={goToDoctorDetails}
            goToAllDoctors={this.goToAllDoctors}
            onActionPress={onActionPress}
            me_user_type={me_user_type}
            onRefresh={() => this.onRefresh()}
            plannedDoctors={this.getPlannedDoctors()}
            completedDoctors={this.getCompletedDoctors()}
            gotoSelectContent={gotoSelectContent}
            gotoStartDetailing={gotoStartDetailing}
            showContents={isOn}
            goToScheduleVirtualMeeting={this.goToScheduleVirtualMeeting}
            cancelVirtualCall={this.cancelVirtualCall}
            joinVirtualCall={this.joinVirtualCall}
            resendLink={resendLink}
          />
        </>
      );
    }
    return (
      <>
        <NonBoDailyPlanComponent
          hasVirtualDetailing={hasVirtualDetailing}
          hoverLoading={hoverLoading}
          isPast={isPast(date)}
          isToday={isToday(date)}
          loading={finalLoading}
          selectedDate={date}
          completedHeading={completedHeading}
          showCaseDrMapping={showCaseDrMapping}
          selectDoctor={selectDoctor}
          user_type={user_type}
          connected={this.state.isInternetConnected}
          data={mergeDailyPlan(data, pendingActionSummaries)}
          changeQuery={changeQuery}
          onDoctorPress={goToDoctorDetails}
          goToAllDoctors={this.goToAllDoctors}
          onActionPress={onActionPress}
          me_user_type={me_user_type}
          gotoSelectContent={gotoSelectContent}
          onRefresh={() => this.onRefresh()}
          plannedDoctors={this.getPlannedDoctors()}
          completedDoctors={this.getCompletedDoctors()}
          showContents={isOn}
          gotoStartDetailing={gotoStartDetailing}
          goToScheduleVirtualMeeting={this.goToScheduleVirtualMeeting}
          cancelVirtualCall={this.cancelVirtualCall}
          joinVirtualCall={this.joinVirtualCall}
          resendLink={resendLink}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dailyPlanBo: state.dailyPlanBo,
  dailyPlanBoOffline: state.dailyPlanBoOffline,
});

export default connect(
  mapStateToProps,
  { loadBoDailyPlan, addOpenTokData, loadBoDailyPlanOffline }
)(DailyPlanBoContainer);
