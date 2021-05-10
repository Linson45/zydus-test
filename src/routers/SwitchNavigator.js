import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Loading from '../containers/LoadingContainer';
import Login from '../containers/LoginContainer';
import Dashboard from '../containers/DashboardContainer';
import SFEContainer from '../containers/DashboardContainer/SFEContainer';
import TplContainer from '../containers/tpl/TplContainer';
import TplWinnerContainer from '../containers/tpl/WinnerContainer';
import TplYourScoreContainer from '../containers/tpl/YourScoreContainer';
import TplRankingDetailContainer from '../containers/tpl/RankingDetailContainer';
import TplUserSelectionContainer from '../containers/tpl/UserSelectionContainer';
import MyPerformanceBoContainer from '../containers/my_performance/BoContainer';
import MyPerformanceMcrCoverageContainer from '../containers/my_performance/McrCoverageContainer';
import MyPerformanceGspComplianceContainer from '../containers/my_performance/GspComplianceContainer';
import MyPerformanceRcpaContainer from '../containers/my_performance/RcpaContainer';
import MyPerformanceBrandWisePrimarySalesContainer from '../containers/my_performance/BrandWisePrimarySalesContainer';
import MyPerformanceBrandWiseSecondarySalesContainer
  from '../containers/my_performance/BrandWiseSecondarySalesContainer';
import MyPerformanceSkuWisePrimarySalesContainer from '../containers/my_performance/SkuWisePrimarySalesContainer';
import MyPerformanceSkuWiseSecondarySalesContainer from '../containers/my_performance/SkuWiseSecondarySalesContainer';
import MyPerformanceAbmContainer from '../containers/my_performance/AbmContainer';
import MyPerformanceJccComplianceContainer from '../containers/my_performance/JccComplianceContainer';
import MyPerformanceJfwBoListContainer from '../containers/my_performance/JfwBoListContainer';
import MyPerformanceMcrBoListContainer from '../containers/my_performance/McrCoverageBoListContainer';
import MyPerformanceGspComplianceBoListContainer from '../containers/my_performance/GspComplianceBoListContainer';
import MyPerformanceRcpaBoListContainer from '../containers/my_performance/RcpaBoListContainer';
import MyPerformanceCallAvgBoListContainer from '../containers/my_performance/CallAvgBoListContainer';
import MyPerformanceAbmPrimarySalesContainer from '../containers/my_performance/AbmPrimarySalesContainer';
import MyPerformanceAbmSecondarySalesContainer from '../containers/my_performance/AbmSecondarySalesContainer';
import MyPerformanceRbmPrimarySalesContainer from '../containers/my_performance/RbmPrimarySalesContainer';
import MyPerformanceRbmSecondarySalesContainer from '../containers/my_performance/RbmSecondarySalesContainer';
import MyPerformanceAbmPcpmContainer from '../containers/my_performance/AbmPcpmContainer';
import MyPerformanceRbmPcpmContainer from '../containers/my_performance/RbmPcpmContainer';
import MyPerformanceZbmContainer from '../containers/my_performance/ZbmContainer';
import MyPerformanceZbmPcpmContainer from '../containers/my_performance/ZbmPcpmContainer';
import MyPerformanceHoPcpmContainer from '../containers/my_performance/HoPcpmContainer';
import MyPerformanceSubHoPcpmContainer from '../containers/my_performance/SubHoPcpmContainer';
import MyPerformanceZbmPrimarySalesContainer from '../containers/my_performance/ZbmPrimarySalesContainer';
import MyPerformanceZbmSecondarySalesContainer from '../containers/my_performance/ZbmSecondarySalesContainer';
import MyPerformanceHoContainer from '../containers/my_performance/HoContainer';
import MyPerformanceHoPrimarySalesContainer from '../containers/my_performance/HoPrimarySalesContainer';
import MyPerformanceSubHoPrimarySalesContainer from '../containers/my_performance/SubHoPrimarySalesContainer';
import MyPerformanceHoSecondarySalesContainer from '../containers/my_performance/HoSecondarySalesContainer';
import MyPerformanceSubHoSecondarySalesContainer from '../containers/my_performance/SubHoSecondarySalesContainer';
import RcpaDocListContainer from '../containers/rcpa/DocListContainer';
import RcpaChemistSelectionContainer from '../containers/rcpa/ChemistSelectionContainer';
import RcpaAbmBoListContainer from '../containers/rcpa/AbmBoListContainer';
import RcpaRbmBoListContainer from '../containers/rcpa/RbmBoListContainer';
import RcpaZbmBoListContainer from '../containers/rcpa/ZbmBoListContainer';
import RcpaAddView from '../containers/rcpa/RcpaAddViewContainer';
import RcpaHoBoListContainer from '../containers/rcpa/HoBoListContainer';
import RcpaHistoryContainer from '../containers/rcpa/HistoryContainer';
import DailyPlanBoContainer from '../containers/dailyplan/BoContainer';
import DailyPlanAbmBoListContainer from '../containers/dailyplan/AbmBoListContainer';
import DailyPlanRbmBoListContainer from '../containers/dailyplan/RbmBoListContainer';
import DailyPlanZbmBoListContainer from '../containers/dailyplan/ZbmBoListContainer';
import DailyPlanHoBoListContainer from '../containers/dailyplan/HoBoListContainer';
import DailyPlanDoctorDetailsContainer from '../containers/dailyplan/DoctorDetailsContainer';
import DailyPlanBoAllDoctorsContainer from '../containers/dailyplan/BoAllDoctorsContainer';
import DailyPlanPriorityBrandsContainer from '../containers/dailyplan/PriorityBrandsContainer';
import DailyPlanActionDetailsContainer from '../containers/dailyplan/ActionDetailsContainer';
import CoachMapBoContainer from '../containers/coachmap/BoContainer';
import CoachMapSummaryContainer from '../containers/coachmap/SummaryContainer';
import CoachMapDetailContainer from '../containers/coachmap/DetailContainer';
import CoachMapAbmContainer from '../containers/coachmap/AbmContainer';
import CoachMapAbmCoachmapContainer from '../containers/coachmap/AbmCoachmapContainer';
import TourplanBoContainer from '../containers/tourplan/BoContainer';
import TourplanBoAddContainer from '../containers/tourplan/BoAddContainer';
import TourplanBoSuggestedDoctorsContainer from '../containers/tourplan/BoSuggestedDoctorsContainer';
import TourplanAbmContainer from '../containers/tourplan/AbmContainer';
import TourplanTeamContainer from '../containers/tourplan/TeamContainer';
import TourplanAbmAddContainer from '../containers/tourplan/AbmAddContainer';
import TourplanSelectBoContainer from '../containers/tourplan/SelectBoContainer';
import TourplanApproveBoContainer from '../containers/tourplan/ApproveBoContainer';
import TourplanRbmContainer from '../containers/tourplan/RbmContainer';
import TourplanRbmAddContainer from '../containers/tourplan/RbmAddContainer';
import TourplanApproveAbmContainer from '../containers/tourplan/ApproveAbmContainer';
import TourplanZbmContainer from '../containers/tourplan/ZbmContainer';
import TourplanApproveRbmContainer from '../containers/tourplan/ApproveRbmContainer';
import CoachMapAbmLeaderboardContainer from '../containers/coachmap/AbmLeaderboardContainer';
import CoachMapLeadermapSummaryContainer from '../containers/coachmap/LeadermapSummaryContainer';
import CoachMapLeadermapDetailContainer from '../containers/coachmap/LeadermapDetailContainer';
import CoachMapRbmContainer from '../containers/coachmap/RbmContainer';
import CoachMapRbmCoachmapContainer from '../containers/coachmap/RbmCoachmapContainer';
import CoachmapUserSelectionContainer from '../containers/coachmap/UserSelectionContainer';
import AddCoachmapContainer from '../containers/coachmap/AddCoachmapContainer';
import AddCoachmapConfirmationContainer from '../containers/coachmap/AddCoachmapConfirmationContainer';
import AddLeadermapContainer from '../containers/coachmap/AddLeadermapContainer';
import AddLeadermapConfirmationContainer from '../containers/coachmap/AddLeadermapConfirmationContainer';
import ActionItemBoContainer from '../containers/action_item/BoContainer';
import ActionItemDetailContainer from '../containers/action_item/DetailContainer';
import ActionItemAbmContainer from '../containers/action_item/AbmContainer';
import ActionItemRbmContainer from '../containers/action_item/RbmContainer';
import ActionItemZbmContainer from '../containers/action_item/ZbmContainer';
import ActionItemHoContainer from '../containers/action_item/HoContainer';
import ActionItemAddContainer from '../containers/action_item/AddContainer';
import CrmRbmContainer from '../containers/crm/RbmContainer';
import CrmRbmPendingRequestContainer from '../containers/crm/RbmPendingRequestContainer';
import CrmAddSelectDetailContainer from '../containers/crm/AddSelectDetailContainer';
import CrmAbmSelectionContainer from '../containers/crm/AbmSelectionContainer';
import CrmBoSelectionContainer from '../containers/crm/BoSelectionContainer';
import CrmDoctorSelectionContainer from '../containers/crm/DoctorSelectionContainer';
import CrmAddDoctorMetricContainer from '../containers/crm/AddDoctorMetricContainer';
import CrmAddQuestionsContainer from '../containers/crm/AddQuestionsContainer';
import CrmAddEngagementDetailContainer from '../containers/crm/AddEngagementDetailContainer';
import CrmAddReviewContainer from '../containers/crm/AddReviewContainer';
import CrmDivisionHeadContainer from '../containers/crm/DivisionHeadContainer';
import CrmRomeContainer from '../containers/crm/RomeContainer';
import CrmRedFlagContainer from '../containers/crm/RedFlagContainer';
import CrmCoverageContainer from '../containers/crm/CoverageContainer';
import CrmPendingApprovalContainer from '../containers/crm/PendingApprovalContainer';
import CrmReviewApplicationContainer from '../containers/crm/ReviewApplicationContainer';
import CrmSbuHeadContainer from '../containers/crm/SbuHeadContainer';
import CrmCrmHeadContainer from '../containers/crm/CrmHeadContainer';
import UploadDoctorIDContainer from '../containers/upload_doctor_id';
import UploadDocumentDetailsContainer from '../containers/upload_doctor_id/upload_doctor_detail';
import ActionHoUserSelectionContainer from '../containers/action_item/HoUserSelectionContainer';
import TourplanHOContainer from '../containers/tourplan/HoContainer';

import ImageHeader from '../components/HeaderImage';
import RcpaLogDetailComponent from '../components/rcpa/LogDetailComponent';
import Colors from '../styles/colorsStyles';
import TrainingComponent from '../components/training/TrainingComponent';
import ContentListContainer from '../containers/detailing/ContentListContainer';
import EDetailingWebViewContainer from '../containers/detailing/E-DetailingWebViewContainer';
import EDetailingBrandDrContainer from '../containers/detailing/E-DetailingBrandDrContainer';
import VisualAidContainer from '../containers/detailing/VisualAidContainer';
import BrandEDetailingContainer from '../containers/detailing/BrandEDetailingContainer';
import ContentHubContainer from '../containers/content_hub/ContentHubContainer';
import ContentHubBrandContainer from '../containers/content_hub/ContentHubBrandContainer';
import ContentHubDetailContainer from '../containers/content_hub/ContentHubDetailContainer';
import ContentHubPreviewComponent from '../components/content_hub/ContentHubPreviewComponent';
import styles from './styles';
import DailyPlanContainer from '../containers/tabs/DailyPlanContainer';
import PerformanceContainer from '../containers/tabs/PerformanceContainer';
import ContentTabHubContainer from '../containers/tabs/ContentHubContainer';
import ContactTabContainer from '../containers/tabs/ContactContainer';
import ContentHubSearchContainer from '../containers/content_hub/ContentHubSearchContainer';
import FAQComponent from '../components/faq/FAQComponent';
import Images from '../Constants/imageConstants';
import HelpContainer from '../containers/help/HelpContainer';
import MyPerformanceRbmContainer from '../containers/my_performance/RbmContainer';
import PendingEDetailingContainer from '../containers/detailing/PendingEdetailingContainer';
import VirtualCallScheduleContainer from '../containers/dailyplan/VirtualCallScheduleContainer';
import VirtualDetailingVideoContainer from '../containers/detailing/VirtualDetailingVideoContainer';

import Sidebar from '../components/Sidebar';
import VirtualCallAddUserContainer from '../containers/dailyplan/VirtualCallAddUserContainer';
import VDetailingWebViewContainer from '../containers/detailing/V-DetailingWebViewContainer';
import UploadDoctorListContainer from '../containers/upload_doctor_id/Doctor_lists';
import TrainingListContainer from '../containers/Training/TrainingListContainer';
import TrainingWebViewContainer from '../containers/Training/TrainingWebViewContainer';
import ContentDoctorDetailContainer from '../containers/contact/ContentDoctorDetailContainer';
import ChatContainer from '../containers/detailing/ChatContainer';
import SyncEDetailingComponent from '../components/detailing/SyncEDetailingComponent';
import CampaingsListContainer from '../containers/rx_tracker/CampaingsContainer';
import RxDocListContainer from '../containers/rx_tracker/RxDocListContainer';
import RxChemistSelectionContainer from '../containers/rx_tracker/AddEditRxContainer';
import ABMBoListContainer from '../containers/rx_tracker/ABMBoListContainer';
import ABMRxDocListContainer from '../containers/rx_tracker/ABMRxDocListContainer';
import RxAbmSubmitApprovelsContainer from '../containers/rx_tracker/RxAbmSubmitApprovalsContainer';
import RxUploadContainer from '../containers/rx_tracker/RxUploadContainer';
import RxAbmSubmitApprovelContainer from '../containers/rx_tracker/RxAbmUploadApprovalContainer';
import BoLeaderBoardContainer from '../containers/rx_tracker/BoLeaderBoardContainer';
import IncompleteRxEditContainer from '../containers/rx_tracker/IncompleteRxEditContainer.js';
const contentHeaderStyle = {
  headerTitleStyle: styles.headerLeftTitle,
  headerVisible: false,
  headerBackground: null,
  headerTintColor: Colors.black,
  headerStyle: {
    height: 70,
    backgroundColor: Colors.white,
  },
  headerBackTitle: null,
  headerLayoutPreset: 'left',
};

const contentHeaderStyleNoBack = {
  headerTitleStyle: styles.headerLeftTitleNoBack,
  headerVisible: false,
  headerBackground: null,
  headerTintColor: Colors.black,
  headerStyle: {
    height: 70,
    backgroundColor: Colors.white,
  },
  headerBackTitle: null,
  headerLayoutPreset: 'left',
};

const AppStack = createStackNavigator(
  {
    Dashboard,
    SFEContainer,
    Tpl: TplContainer,
    TplWinners: TplWinnerContainer,
    TrainingWebView: {
      screen: TrainingWebViewContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    TrainingList: {
      screen: TrainingListContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    TplYourScore: TplYourScoreContainer,
    TplRankingDetail: TplRankingDetailContainer,
    TplUserSelection: TplUserSelectionContainer,
    RcpaDocList: RcpaDocListContainer,
    RcpaChemistSelection: RcpaChemistSelectionContainer,
    RcpaAbmBoList: RcpaAbmBoListContainer,
    RcpaRbmBoList: RcpaRbmBoListContainer,
    RcpaZbmBoList: RcpaZbmBoListContainer,
    RcpaAddView,
    RcpaHoBoList: RcpaHoBoListContainer,
    RcpaLogDetail: RcpaLogDetailComponent,
    RcpaHistory: RcpaHistoryContainer,
    PendingEDetailing: {
      screen: PendingEDetailingContainer,
      navigationOptions: () => ({
        header: null,
      }),
    },
    CoachMapBo: CoachMapBoContainer,
    CoachMapSummary: CoachMapSummaryContainer,
    CoachMapDetail: CoachMapDetailContainer,
    CoachMapAbm: CoachMapAbmContainer,
    CoachMapAbmCoachmap: CoachMapAbmCoachmapContainer,
    TourplanBo: TourplanBoContainer,
    TourplanBoAdd: TourplanBoAddContainer,
    TourplanBoSuggestedDoctors: TourplanBoSuggestedDoctorsContainer,
    TourplanAbm: TourplanAbmContainer,
    TourplanTeam: TourplanTeamContainer,
    TourplanAbmAdd: TourplanAbmAddContainer,
    TourplanSelectBo: TourplanSelectBoContainer,
    TourplanApproveBo: TourplanApproveBoContainer,
    TourplanRbm: TourplanRbmContainer,
    TourplanRbmAdd: TourplanRbmAddContainer,
    TourplanApproveAbm: TourplanApproveAbmContainer,
    TourplanZbm: TourplanZbmContainer,
    TourplanApproveRbm: TourplanApproveRbmContainer,
    CoachMapAbmLeaderboard: CoachMapAbmLeaderboardContainer,
    CoachMapLeadermapSummary: CoachMapLeadermapSummaryContainer,
    CoachMapLeadermapDetail: CoachMapLeadermapDetailContainer,
    CoachMapRbm: CoachMapRbmContainer,
    CoachMapRbmCoachmap: CoachMapRbmCoachmapContainer,
    CoachmapUserSelection: CoachmapUserSelectionContainer,
    AddCoachmap: AddCoachmapContainer,
    AddCoachmapConfirmation: AddCoachmapConfirmationContainer,
    AddLeadermap: AddLeadermapContainer,
    AddLeadermapConfirmation: AddLeadermapConfirmationContainer,
    ActionItemBo: ActionItemBoContainer,
    ActionItemDetail: ActionItemDetailContainer,
    ActionItemAbm: ActionItemAbmContainer,
    ActionItemRbm: ActionItemRbmContainer,
    ActionItemZbm: ActionItemZbmContainer,
    ActionItemHo: ActionItemHoContainer,
    ActionItemAdd: ActionItemAddContainer,
    CrmRbm: CrmRbmContainer,
    CrmRbmPendingRequest: CrmRbmPendingRequestContainer,
    CrmAddSelectDetail: CrmAddSelectDetailContainer,
    CrmAbmSelection: CrmAbmSelectionContainer,
    CrmBoSelection: CrmBoSelectionContainer,
    CrmDoctorSelection: CrmDoctorSelectionContainer,
    CrmAddDoctorMetric: CrmAddDoctorMetricContainer,
    CrmAddQuestions: CrmAddQuestionsContainer,
    CrmAddEngagementDetail: CrmAddEngagementDetailContainer,
    CrmAddReview: CrmAddReviewContainer,
    CrmDivisionHead: CrmDivisionHeadContainer,
    CrmRome: CrmRomeContainer,
    CrmRedFlag: CrmRedFlagContainer,
    CrmCoverage: CrmCoverageContainer,
    CrmPendingApproval: CrmPendingApprovalContainer,
    CrmReviewApplication: CrmReviewApplicationContainer,
    CrmSbuHead: CrmSbuHeadContainer,
    CrmCrmHead: CrmCrmHeadContainer,
    UploadDoctorID: UploadDoctorIDContainer,
    UploadDocumentDetail: UploadDocumentDetailsContainer,
    CampaingsList: CampaingsListContainer,
    RxDocList: RxDocListContainer,
    RxChemistSelection: RxChemistSelectionContainer,
    ABMBoList: ABMBoListContainer,
    ABMRxDocList: ABMRxDocListContainer,
    ActionHoUserSelection: ActionHoUserSelectionContainer,
    RxAbmSubmitApprovels: RxAbmSubmitApprovelsContainer,
    RxUpload: RxUploadContainer,
    RxAbmSubmitApprovel: RxAbmSubmitApprovelContainer,
    Training: TrainingComponent,
    UploadDoctorList: UploadDoctorListContainer,
    TourplanHO: TourplanHOContainer,
    BoLeaderBoard: BoLeaderBoardContainer,
    IncompleteRxEdit:IncompleteRxEditContainer,
    Faq: {
      screen: FAQComponent,
      navigationOptions: () => contentHeaderStyle,
    },
    ContentList: {
      screen: ContentListContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    EDetailingBrandDr: {
      screen: EDetailingBrandDrContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    VisualAid: {
      screen: VisualAidContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    BrandEDetailing: {
      screen: BrandEDetailingContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    EDetailingWebView: {
      screen: EDetailingWebViewContainer,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Help: {
      screen: HelpContainer,
      navigationOptions: () => contentHeaderStyle,
    },
  SyncEDetailing: {
    screen: SyncEDetailingComponent,
    navigationOptions: () => (contentHeaderStyle),
  },
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      headerVisible: false,
      headerBackground: <ImageHeader />,
      headerTitleStyle: {color: '#fff'},
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#482c80',
      },
      headerBackTitle: null,
    },
  },
);

AppStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const dailyPlanNavigator = createStackNavigator({
  DailyPlan: {
    screen: DailyPlanContainer,
    navigationOptions: () => (contentHeaderStyleNoBack),
  },
  DailyPlanBo: {
    screen: DailyPlanBoContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanAbmBoList: {
    screen: DailyPlanAbmBoListContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanRbmBoList: {
    screen: DailyPlanRbmBoListContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanZbmBoList: {
    screen: DailyPlanZbmBoListContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanHoBoList: {
    screen: DailyPlanHoBoListContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanDoctorDetails: {
    screen: DailyPlanDoctorDetailsContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanBoAllDoctors: {
    screen: DailyPlanBoAllDoctorsContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanPriorityBrandsContainer: {
    screen: DailyPlanPriorityBrandsContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  DailyPlanActionDetailsContainer: {
    screen: DailyPlanActionDetailsContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  ContentList: {
    screen: ContentListContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  EDetailingBrandDr: {
    screen: EDetailingBrandDrContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  VisualAid: {
    screen: VisualAidContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  BrandEDetailing: {
    screen: BrandEDetailingContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  EDetailingWebView: {
    screen: EDetailingWebViewContainer,
    navigationOptions: () => ({
      header: null
    })
  },
  VirtualCallSchedule: {
    screen: VirtualCallScheduleContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  VirtualCallAddUser: {
    screen: VirtualCallAddUserContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  VirtualDetailingVideo: {
    screen: VirtualDetailingVideoContainer,
    navigationOptions: () => ({
      header: null
    })
  },
  VDetailingWebView: {
    screen: VDetailingWebViewContainer,
    navigationOptions: () => ({
      header: null
    })
  },
  ContentTabHub: {
    screen: ContentTabHubContainer,
    navigationOptions: () => (contentHeaderStyleNoBack),
  },
  ContentHub: {
    screen: ContentHubContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  ContentHubBrand: {
    screen: ContentHubBrandContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  ContentHubDetail: {
    screen: ContentHubDetailContainer,
    navigationOptions: () => (contentHeaderStyle),
  },
  ContentHubPreview: {
    screen: ContentHubPreviewComponent,
    navigationOptions: () => (contentHeaderStyle),
  },
  ContentHubSearch: {
    screen: ContentHubSearchContainer,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ChatContainer: {
    screen: ChatContainer,
    navigationOptions: () => ({
      header: null,
    }),
  }
}, {
  initialRouteName: 'DailyPlan',
  defaultNavigationOptions: {
    headerVisible: false,
    headerBackTitle: null,
  },
});

dailyPlanNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const performanceStack = createStackNavigator(
  {
    Performance: {
      screen: PerformanceContainer,
      navigationOptions: () => contentHeaderStyleNoBack,
    },
    MyPerformanceBO: MyPerformanceBoContainer,
    MyPerformanceMcrCoverage: MyPerformanceMcrCoverageContainer,
    MyPerformanceGspCompliance: MyPerformanceGspComplianceContainer,
    MyPerformanceRcpa: MyPerformanceRcpaContainer,
    MyPerformanceBrandWisePrimarySales: MyPerformanceBrandWisePrimarySalesContainer,
    MyPerformanceBrandWiseSecondarySales: MyPerformanceBrandWiseSecondarySalesContainer,
    MyPerformanceSkuWisePrimarySales: MyPerformanceSkuWisePrimarySalesContainer,
    MyPerformanceSkuWiseSecondarySales: MyPerformanceSkuWiseSecondarySalesContainer,
    MyPerformanceAbm: MyPerformanceAbmContainer,
    MyPerformanceRbm: {
      screen: MyPerformanceRbmContainer,
      navigationOptions: () => contentHeaderStyleNoBack,
    },
    MyPerformanceZbm: MyPerformanceZbmContainer,
    MyPerformanceJccCompliance: MyPerformanceJccComplianceContainer,
    MyPerformanceJfwBoList: MyPerformanceJfwBoListContainer,
    MyPerformanceMcrBoList: MyPerformanceMcrBoListContainer,
    MyPerformanceGspComplianceBoList: MyPerformanceGspComplianceBoListContainer,
    MyPerformanceRcpaBoList: MyPerformanceRcpaBoListContainer,
    MyPerformanceCallAvgBoList: MyPerformanceCallAvgBoListContainer,
    MyPerformanceAbmPrimarySales: MyPerformanceAbmPrimarySalesContainer,
    MyPerformanceAbmSecondarySales: MyPerformanceAbmSecondarySalesContainer,
    MyPerformanceRbmPrimarySales: MyPerformanceRbmPrimarySalesContainer,
    MyPerformanceRbmSecondarySales: MyPerformanceRbmSecondarySalesContainer,
    MyPerformanceZbmPrimarySales: MyPerformanceZbmPrimarySalesContainer,
    MyPerformanceZbmSecondarySales: MyPerformanceZbmSecondarySalesContainer,
    MyPerformanceAbmPcpm: MyPerformanceAbmPcpmContainer,
    MyPerformanceRbmPcpm: MyPerformanceRbmPcpmContainer,
    MyPerformanceZbmPcpm: MyPerformanceZbmPcpmContainer,
    MyPerformanceHoPcpm: MyPerformanceHoPcpmContainer,
    MyPerformanceSubHoPcpm: MyPerformanceSubHoPcpmContainer,
    MyPerformanceHo: MyPerformanceHoContainer,
    MyPerformanceHoPrimarySales: MyPerformanceHoPrimarySalesContainer,
    MyPerformanceSubHoPrimarySales: MyPerformanceSubHoPrimarySalesContainer,
    MyPerformanceHoSecondarySales: MyPerformanceHoSecondarySalesContainer,
    MyPerformanceSubHoSecondarySales: MyPerformanceSubHoSecondarySalesContainer,
  },
  {
    initialRouteName: 'Performance',
    defaultNavigationOptions: {
      headerVisible: false,
      headerBackTitle: null,
    },
  },
);

performanceStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const contentHubStack = createStackNavigator(
  {
    ContentTabHub: {
      screen: ContentTabHubContainer,
      navigationOptions: () => contentHeaderStyleNoBack,
    },
    ContentHub: {
      screen: ContentHubContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    ContentHubBrand: {
      screen: ContentHubBrandContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    ContentHubDetail: {
      screen: ContentHubDetailContainer,
      navigationOptions: () => contentHeaderStyle,
    },
    ContentHubPreview: {
      screen: ContentHubPreviewComponent,
      navigationOptions: () => contentHeaderStyle,
    },
    ContentHubSearch: {
      screen: ContentHubSearchContainer,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'ContentTabHub',
    defaultNavigationOptions: {
      headerVisible: false,
      headerBackTitle: null,
    },
  },
);

contentHubStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const contactStack = createStackNavigator(
  {
    Contact: {
      screen: ContactTabContainer,
      navigationOptions: () => contentHeaderStyleNoBack,
    },
    ContentDoctorDetail: {
      screen: ContentDoctorDetailContainer,
      navigationOptions: () => contentHeaderStyle,
    },
  },
  {
    initialRouteName: 'Contact',
    defaultNavigationOptions: {
      headerVisible: false,
      headerBackground: <ImageHeader />,
      headerTitleStyle: {color: '#fff'},
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#482c80',
      },
      headerBackTitle: null,
    },
  },
);

contactStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const AuthStack = createStackNavigator(
  {
    Login,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: () => ({
        tabBarLabel: 'Home',
      }),
    },
    DailyPlan: {
      screen: dailyPlanNavigator,
      navigationOptions: () => ({
        tabBarLabel: 'Daily Plan',
      }),
    },
    Performance: {
      screen: performanceStack,
      navigationOptions: () => ({
        tabBarLabel: 'Performance',
      }),
    },
    Content: {
      screen: contentHubStack,
      navigationOptions: () => ({
        tabBarLabel: 'Content Hub',
      }),
    },
    Contact: {
      screen: contactStack,
      navigationOptions: () => ({
        tabBarLabel: 'Contact',
      }),
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.contentBlue,
      tabStyle: {},
    },
    defaultNavigationOptions: ({navigation}) => ({
      // eslint-disable-next-line no-unused-vars
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let image;
        if (routeName === 'Home') {
          image = Images.bottom_home;
        } else if (routeName === 'DailyPlan') {
          image = Images.bottom_dailyplan;
        } else if (routeName === 'Performance') {
          image = Images.bottom_performance;
        } else if (routeName === 'Content') {
          image = Images.bottom_content;
        } else if (routeName === 'Contact') {
          image = Images.bottom_contact;
        }

        return (
          <Image
            source={image}
            style={[
              styles.bottomIcon,
              {tintColor: focused ? Colors.contentBlue : 'gray'},
            ]}
          />
        );
      },
    }),
  },
);

const MainDrawer = createDrawerNavigator(
  {
    MainTabs: TabNavigator,
  },
  {
    contentComponent: Sidebar,
    hideStatusBar: true,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Loading,
    Auth: AuthStack,
    App: MainDrawer,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
