import React, { Component } from 'react';
import { Icon } from 'native-base';

import {
  TouchableOpacity, Alert, Platform, Image, PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import Adapter from '../../util/Adapter';
import { Role } from '../../util/Constants';
import Firebase from '../../util/Firebase';
import Colors from '../../Constants/colorConstants';
import DashboardComponent from '../../components/Dashboard';
import colorsStyles from '../../styles/colorsStyles';
import RealmManager from '../../local-storage/realm-manager';
import {
  arePendingDownloads, DOWNLOAD_DIALOG_DISPLAY,
  loadCoachmapQuestions,
  loadDashboardSalesData,
  loadDashboardScoreData,
} from '../../actions';
import { syncRcpa } from '../../services/SyncRcpa';
import { syncDailyPlanAction } from '../../services/SyncDailyPlanAction';
import { fcmService } from '../../Firebase/FCMService';
import { downloadFeedbackConfigs } from '../../services/DownloadFeedbackConfigs';
import { downloadSurveyConfigs } from '../../services/DownloadSurveyConfigs';
import { syncEDetailingJob } from '../../services/SyncEDetailing';
import { downloadDoctorsList } from '../../services/DownloadDoctorsList';
import { updateActiveData } from '../../services/ResyncActiveContents';
import Images from '../../Constants/imageConstants';
import styles from './styles';
import { downloadDoctorsFullDataList } from '../../services/DownloadDoctorsFullDataList';
import { syncDailyPlanComment } from '../../services/SyncDailyPlanComment';
import { downloadSpecBrandMapping } from '../../services/DownloadSpecBrandMapping';
import { downloadBoList } from '../../services/DownloadBoList';
import { getFirstPendingEDetailingState } from '../../local-storage/helper/detailing';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      isAlertPresent: false,
      date: moment().format('DD-MMM-YYYY'),
      fcmToken: ''
    };
  }

  componentDidMount() {
    Firebase.pushEvent('dashboard_view');
    this.requestReadExternalStorage().then().catch();
    this.requestWriteExternalStorage().then().catch();
    this.props.navigation.setParams({ openDrawer: this.openDrawer.bind(this) });
    this.checkForPendingContents();
    this.loadData();
    updateActiveData();
    syncRcpa();
    syncDailyPlanAction();
    downloadFeedbackConfigs();
    downloadSurveyConfigs();
    syncEDetailingJob();
    downloadDoctorsList();
    downloadDoctorsFullDataList();
    syncDailyPlanComment();
    downloadSpecBrandMapping();
    downloadBoList();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    this.props.navigation.setParams({
      handleDownloadRedirect: () => { this.handleDownloadRedirect(this.props.navigation); },
      handleSyncDetailing: () => { this.props.navigation.navigate('SyncEDetailing'); }
    });
    setTimeout(() => {
      this.checkForPendingEdetailingState();
    }, 1000);
  }

  checkForPendingEdetailingState = async () => {
    if (DeviceInfo.isTablet()) {
      const showPopup = await getFirstPendingEDetailingState();
      if (showPopup) {
        this.setState({ isAlertPresent: true });
        this.showPendingFeedbackOfEdetailing();
      }
    }
  };

  showPendingFeedbackOfEdetailing() {
    Alert.alert(
      'Incomplete E-detailing',
      'There is an incomplete e-detailing',
      [
        {
          text: 'Submit E-detailing',
          onPress: async () => {
            await this.setState({ isAlertPresent: false });
            this.props.navigation.navigate('PendingEDetailing');
          },
        },
      ],
      { cancelable: false },
    );
  }

  checkForPendingContents = async () => {
    if (DeviceInfo.isTablet()) {
      const displayTime = await Adapter.get(DOWNLOAD_DIALOG_DISPLAY);
      if (!displayTime) {
        const showPopup = await arePendingDownloads();
        if (showPopup) {
          this.showPendingDownloadPopup();
        }
        return;
      }
      const diff = moment().unix() - displayTime;
      if (diff < 0) {
        return;
      }
      const showPopup = await arePendingDownloads();
      if (showPopup) {
        this.showPendingDownloadPopup();
      }
    }
  };

  showPendingDownloadPopup() {
    if (this.state.isAlertPresent) {
      return;
    }
    Alert.alert(
      'Download Contents',
      'There are some pending downloads',
      [
        {
          text: 'Cancel',
          onPress: () => {
            Adapter.set(DOWNLOAD_DIALOG_DISPLAY, moment().unix());
          },
        },
        {
          text: 'Download',
          onPress: () => {
            Adapter.set(DOWNLOAD_DIALOG_DISPLAY, moment().unix());
            this.props.navigation.navigate('ContentList');
          },
        },
      ],
      { cancelable: false },
    );
  }

  requestReadExternalStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read Storage',
          message:
                'Zydus App needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alert('Please provide READ/WRITE access in order to App work properly.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestWriteExternalStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Storage',
          message:
                'Zydus App needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alert('Please provide READ/WRITE access in order to App work properly.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  handleDownloadRedirect(navigation) {
    navigation.navigate('ContentList');
  }

  onRegister(token) {
    console.log('[NotificationFCM] onRegister', token);
  }

  onNotification(notify) {
    console.log('[NotificationFCM] onNotification', notify);
    // For Android
    const channelObj = {
      channelId: 'zydus-hybrid',
      channelName: 'Zydus Frontline',
      channelDes: 'Zydus Frontline Hybrid App channel',
    };
    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._notificationId,
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel,
      data: {},
      colorBgIcon: '#1A243B',
      largeIcon: 'ic_launcher_round',
      smallIcon: 'ic_launcher_round',
      vibrate: true,
    };

    const notification = fcmService.buildNotification(buildNotify);
    fcmService.displayNotification(notification);
  }

  onOpenNotification(token) {
    console.log('[NotificationFCM] onNotificationOpen', token);
  }

  loadData = async () => {
    const userDetails = await Adapter.getUser();
    const fcmToken = await firebase.messaging().getToken();
    this.setState({
      userDetails,
      fcmToken
    });
    const { date } = this.state;
    const {
      company_code, sbu_code, rep_code, user_type
    } = userDetails;
    const month = moment(date, 'DD-MMM-YYYY').format('M');
    const year = moment(date, 'DD-MMM-YYYY').format('YYYY');

    Promise.all([
      DeviceInfo.getReadableVersion(),
      DeviceInfo.getBaseOs(),
      DeviceInfo.getSystemVersion(),
      DeviceInfo.getModel(),
      DeviceInfo.getMaxMemory(),
      DeviceInfo.getTotalDiskCapacity(),
      DeviceInfo.getFreeDiskStorage(),
    ])
      .then((response) => {
        // let dimensionObj = Dimensions.get('window');
        const data = {
          group_code: user_type,
          rep_code,
          month,
          year,
          app_details: {
            rep_code,
            app_version: response[0].substring(0, response[0].length - 2),
            platform: Platform.OS, // response[1],
            os_version: response[2],
            device_model: response[3],
            fcm_token: this.state.fcmToken, // get fcm token from firebase
            device_RAM: response[4],
            device_ROM: response[5],
            resolution: '',
            serial_no: '', // ios doesn't support serial number
            free_ROM: response[6],
          },
        };
        this.props.loadDashboardSalesData(data);
      })
      .catch(() => {
        const data = {
          group_code: user_type,
          rep_code,
          month,
          year,
          app_details: {
            rep_code,
            app_version: '',
            platform: '',
            os_version: '',
            device_model: '',
            fcm_token: '', // get fcm token from firebase
            device_RAM: '',
            device_ROM: '',
            resolution: '',
            serial_no: '',
            free_ROM: '',
          },
        };
        this.props.loadDashboardSalesData(data);
      });
    const data = {
      company_code,
      sbu_code,
      rep_code,
      user_type,
    };
    this.props.loadDashboardScoreData(data);
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: null,
      headerStyle: styles.headerStyle,
      headerBackground: null,
      headerLeft: (
        <TouchableOpacity
          onPress={navigation.openDrawer}
        >
          <Image
            source={Images.ham}
            style={styles.ham}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <>
          <TouchableOpacity
            opaque={1}
            style={{ backgroundColor: 'transparent', padding: 10, color: Colors.white }}
            onPress={() => {
              params.handleSyncDetailing();
            }}
            color="#fff"
          >
            <Icon name="refresh" type="SimpleLineIcons" style={{ color: colorsStyles.white, fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            opaque={1}
            style={{ backgroundColor: 'transparent', padding: 10, color: Colors.white }}
            onPress={() => {
              console.log('Icon clicked top right');
            }}
            color="#fff"
          >
            <Icon
              name="bell-outline"
              type="MaterialCommunityIcons"
              style={{ color: colorsStyles.white, fontSize: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            opaque={1}
            style={{ backgroundColor: 'transparent', padding: 10, color: Colors.white }}
            onPress={() => {
              params.handleDownloadRedirect();
            }}
            color="#fff"
          >
            <Icon
              name="download"
              type="MaterialCommunityIcons"
              style={{ color: colorsStyles.white, fontSize: 20 }}
            />
          </TouchableOpacity>
        </>
      )
    };
  };

  async openTpl() {
    const user = await Adapter.getUser();
    if (Role.isNonHOUser(user.user_type)) {
      this.props.navigation.navigate('Tpl', { user });
    } else {
      this.props.navigation.navigate('TplUserSelection');
    }
  }

  async openMyPerformance() {
    const user = await Adapter.getUser();
    const { user_type } = user;
    if (user_type === Role.BO) {
      this.props.navigation.navigate('MyPerformanceBO', { user });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('MyPerformanceAbm', { user });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('MyPerformanceRbm', { user });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('MyPerformanceZbm', { user });
    } else {
      this.props.navigation.navigate('MyPerformanceHo', { user });
    }
  }

  async openRcpa() {
    const user = await Adapter.getUser();
    const { user_type } = user;
    if (user_type === Role.BO) {
      this.props.navigation.navigate('RcpaDocList', { user });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('RcpaAbmBoList', { user });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('RcpaRbmBoList', { user });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('RcpaZbmBoList', { user });
    } else {
      this.props.navigation.navigate('RcpaHoBoList', { user });
    }
  }

  async openDailyPlan() {
    const user = await Adapter.getUser();
    const { user_type } = user;
    if (user_type === Role.BO) {
      this.props.navigation.navigate('DailyPlanBo', { user });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('DailyPlanAbmBoList', { user });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('DailyPlanRbmBoList', { user });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('DailyPlanZbmBoList', { user });
    } else {
      this.props.navigation.navigate('DailyPlanHoBoList', { user });
    }
  }

  async openCoachmap() {
    const user = await Adapter.getUser();
    const {
      rep_code, company_code, sbu_code, user_type
    } = user;
    this.props.loadCoachmapQuestions({
      rep_code,
      company_code,
      sbu_code,
      status: 'Y',
      desig_group_code: user_type,
    });

    if (user_type === Role.BO) {
      this.props.navigation.navigate('CoachMapBo', { user });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('CoachMapAbm', { user });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('CoachMapRbm', { user });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('CoachmapUserSelection', { user });
    } else {
      this.props.navigation.navigate('CoachmapUserSelection', { user });
    }
  }

  async openTourplan() {
    const user = await Adapter.getUser();
    const { user_type } = user;

    if (user_type === Role.BO) {
      this.props.navigation.navigate('TourplanBo', { user });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('TourplanAbm', { user });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('TourplanRbm', { user });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('TourplanZbm', { user });
    } else {
      this.props.navigation.navigate('TourplanHO', { user });
    }
  }

  async openActionItems() {
    const employees = await Adapter.getUser();
    const { user_type } = employees;

    if (user_type === Role.BO) {
      this.props.navigation.navigate('ActionItemBo', { employees });
    } else if (user_type === Role.ABM) {
      this.props.navigation.navigate('ActionItemAbm', { employees });
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('ActionItemRbm', { employees });
    } else if (user_type === Role.ZBM) {
      this.props.navigation.navigate('ActionItemZbm', { employees });
    } else {
      employees.user_type = Role.HO;
      this.props.navigation.navigate('ActionHoUserSelection', { employees });
    }
  }

  async openCrm() {
    const user = await Adapter.getUser();
    const { user_type, trinity_designation_code } = user;
    user.division_code = user.sbu_code;

    if (user_type === Role.BO) {
    } else if (user_type === Role.ABM) {
    } else if (user_type === Role.RBM) {
      this.props.navigation.navigate('CrmRbm', { user });
    } else if (user_type === Role.ZBM) {
    } else if (trinity_designation_code === Role.DIVISION_HEAD) {
      this.props.navigation.navigate('CrmDivisionHead', { user });
    } else if (trinity_designation_code === Role.SBU_HEAD) {
      this.props.navigation.navigate('CrmSbuHead', { user });
    } else if (trinity_designation_code === Role.CRM) {
      this.props.navigation.navigate('CrmCrmHead', { user });
    }
  }

  async openSFE() {
    //    const user = await Adapter.getUser();
    //    const {user_type} = user;
    if (!this.state.userDetails || !this.state.userDetails.rep_code) {
      console.log('Rep_code not set');
      return;
    }
    fetch(
      'https://mobility.zydusfrontline.com/api/incentive/getIncentiveAuth',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rep_code: this.state.userDetails.rep_code,
        }),
      },
    )
      .then((val) => val.json())
      .then((data) => {
        // console.warn(data)
        // navigation.navigate('WebView', {data});

        this.props.navigation.navigate('SFEContainer', { data });
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert('Something went wrong');
      });

    // this.props.navigation.navigate('ActionItemBo', {user});
  }

  async openTraining() {
    // this.props.navigation.navigate('Training');
    this.props.navigation.navigate('TrainingList');
  }

  gotoBrandDetailing() {
    this.props.navigation.navigate('BrandEDetailing');
  }

  async openContentHub() {
    this.props.navigation.navigate('ContentTabHub');
  }

  openDrawer() {
    // this.drawer.toggle();
  }

  logout = async () => {
    await Adapter.logout();
    RealmManager.getInstance().logout();
    this.props.navigation.navigate('Auth');
  };

  async uploadDoctorID() {
    const user = await Adapter.getUser();
    this.props.navigation.navigate('UploadDoctorID', { user });
  }

  render() {
    const { userDetails } = this.state;
    const openTpl = this.openTpl.bind(this);
    const openMyPerformance = this.openMyPerformance.bind(this);
    const openRcpa = this.openRcpa.bind(this);
    const openDailyPlan = this.openDailyPlan.bind(this);
    const openCoachmap = this.openCoachmap.bind(this);
    const openTourplan = this.openTourplan.bind(this);
    const openActionItems = this.openActionItems.bind(this);
    const openCrm = this.openCrm.bind(this);
    const openSFE = this.openSFE.bind(this);
    const uploadDoctorID = this.uploadDoctorID.bind(this);
    const openTraining = this.openTraining.bind(this);
    const gotoBrandDetailing = this.gotoBrandDetailing.bind(this);
    const openContentHub = this.openContentHub.bind(this);
    const { dashboardScore, dashboardSales } = this.props;
    global.logoutMethod = this.logout;

    if (userDetails) {
      return (
        <DashboardComponent
          dashboardScore={dashboardScore}
          dashboardSales={dashboardSales}
          userDetails={userDetails}
          openRcpa={openRcpa}
          openTpl={openTpl}
          openMyPerformance={openMyPerformance}
          openDailyPlan={openDailyPlan}
          openCoachmap={openCoachmap}
          openTourplan={openTourplan}
          openActionItems={openActionItems}
          openCrm={openCrm}
          openSFE={openSFE}
          gotoBrandDetailing={gotoBrandDetailing}
          uploadDoctorID={uploadDoctorID}
          openTraining={openTraining}
          openContentHub={openContentHub}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dashboardSales: state.dashboardSales,
  dashboardScore: state.dashboardScore,
});

export default connect(
  mapStateToProps,
  {
    loadCoachmapQuestions,
    loadDashboardScoreData,
    loadDashboardSalesData,
  },
)(DashboardContainer);
