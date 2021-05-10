import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Image, TouchableOpacity, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Adapter from '../../../util/Adapter';
import { Role } from '../../../util/Constants';
import DailyPlanBoContainer from '../../dailyplan/BoContainer';
import DailyPlanAbmBoListContainer from '../../dailyplan/AbmBoListContainer';
import DailyPlanRbmBoListContainer from '../../dailyplan/RbmBoListContainer';
import DailyPlanZbmBoListContainer from '../../dailyplan/ZbmBoListContainer';
import DailyPlanHoBoListContainer from '../../dailyplan/HoBoListContainer';
import ColorStyles from '../../../styles/colorsStyles';
import Images from '../../../Constants/imageConstants';
import styles from '../styles';
import { connect } from 'react-redux';
import {
  addOpenTokData,
  cancelVirtualCall,
  joinVirtualCall,
  loadBoDailyPlan,
  loadBoDailyPlanOffline,
  REFRESH_DAILY_PLAN, resendLink,
  SET_SESSION_DATA_OPENTOK,
  loadBoDailyPlanFiveTimes
} from '../../../actions';
class DailyPlanContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user');
    const { params } = navigation.state;
console.log('params',navigation)
    let headerTitle = null;
    let headerRight = null;
    if (user) {
      const { user_type } = user;
      if (user_type === Role.BO) {
        headerTitle = 'Daily Plan';
        let goToAllDoctors = null;
        let onToggleView = null;
        let isOn = false;
        const isTablet = DeviceInfo.isTablet();
        if (params) {
          isOn = params.isOn;
          onToggleView = params.onToggleView;
          goToAllDoctors = params.goToAllDoctors;
          loadFiveData=params.loadFiveData
        }
        headerRight = (
          <View style={styles.headerButtons}>
            {user_type === Role.BO ? <TouchableOpacity onPress={()=>{
             if(loadFiveData){
               loadFiveData(user)
             }}}
            > 
              <Image
                source={Images.ic_sync_red_600_24dp}
                style={styles.up}
                resizeMode="contain"
              />
            </TouchableOpacity> : null}

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
          );
        } else if (user_type === Role.ABM) {
          headerTitle = 'My Plan';
        } else if (user_type === Role.RBM) {
          headerTitle = 'My Plan';
        } else if (user_type === Role.ZBM) {
          headerTitle = 'My Plan';
        } else {
          headerTitle = 'Select BO';
        }
      }
      return {
        headerTitle,
        headerRight,
        headerLeft: (
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Image
              source={Images.ham}
              style={styles.ham}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      };
    };

    constructor(props) {
      super(props);
      this.state = {
        user: {},
        loading:false,
      };
    }

  async componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this.openDrawer ,loadFiveData:this.loadFiveData});
    await this.setUser().then().catch();
    console.log('User', this.props)
    // this.loadFiveData = this.loadFiveData.bind(this);

  }
async loadFiveData(user) {
    console.log('clicked', user)
    var d = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var date = `${day}-${month}-${year}`
    const { rep_code, company_code, sbu_code } = user
    console.log('came')

    var data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('1', day, month, year, date, data)
    var dayFull = [data]
    var yesterday = new Date(Date.now() - 864e5);
    day = yesterday.getDate();
    month = months[yesterday.getMonth()];
    year = yesterday.getFullYear();
    date = `${day}-${month}-${year}`
    data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('2', day, month, year, date, data)
    dayFull.push(data)
    yesterday = new Date(Date.now() - 172800000);
    day = yesterday.getDate();
    month = months[yesterday.getMonth()];
    year = yesterday.getFullYear();
    date = `${day}-${month}-${year}`
    data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('3', day, month, year, date, data)
    dayFull.push(data)
    var tomorrow = new Date(Date.now() + 864e5);
    day = tomorrow.getDate();
    month = months[tomorrow.getMonth()];
    year = tomorrow.getFullYear();
    date = `${day}-${month}-${year}`
    data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('4', day, month, year, date, data)
    dayFull.push(data)
    tomorrow = new Date(Date.now() + 172800000);
    day = tomorrow.getDate();
    month = months[tomorrow.getMonth()];
    year = tomorrow.getFullYear();
    date = `${day}-${month}-${year}`
    data = {
      rep_code,
      company_code,
      sbu_code,
      date
    };
    console.log('5', day, month, year, date, data)
    dayFull.push(data)
    console.log('Date', dayFull)
    // dayFull.map(async (day) => {
  //  this.callFunction(day)
  console.log('Day await',day)
  await loadBoDailyPlanFiveTimes(dayFull)
    //   console.log('called',day)
    // })
  }
  async setUser() {
    const user = await Adapter.getUser();
    this.props.navigation.setParams({ user });
    await this.setState({
      user
    });
  }

    openDrawer = () => {
      this.drawer.toggle();
    };

    renderScreen() {
      const { user } = this.state;
      if (!user) {
        return null;
      }
      const { user_type } = user;
      let screen = null;
      if (user_type) {
        if (user_type === Role.BO) {
          screen = <DailyPlanBoContainer navigation={this.props.navigation} isLoading={this.state.loading}/>;
        } else if (user_type === Role.ABM) {
          screen = <DailyPlanAbmBoListContainer navigation={this.props.navigation} />;
        } else if (user_type === Role.RBM) {
          screen = <DailyPlanRbmBoListContainer navigation={this.props.navigation} />;
        } else if (user_type === Role.ZBM) {
          screen = <DailyPlanZbmBoListContainer navigation={this.props.navigation} />;
        } else {
          screen = <DailyPlanHoBoListContainer navigation={this.props.navigation} />;
        }
      }
      return screen;
    }

    render() {
      return (
        this.renderScreen()
      );
    }
}
const mapStateToProps = (state) => ({
  dailyPlanBo: state.dailyPlanBo,
  // dailyPlanBoOffline: state.dailyPlanBoOffline,
});

// export default DailyPlanContainer;
export default connect(
  mapStateToProps,
  { loadBoDailyPlan}
)(DailyPlanContainer);
