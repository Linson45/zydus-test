import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import TplReducer from './tpl/TplReducer';
import TplWinnerReducer from './tpl/TplWinnerReducer';
import TplYourScoreReducer from './tpl/TplYourScoreReducer';
import TplRankingListReducer from './tpl/TplRankingListReducer';
import DivisionReducer from './DivisionReducer';
import SbuReducer from './SbuReducer';
import FilterDivisionReducer from './FilterDivisionReducer';
import EmployeeReducer from './EmployeeReducer';
import MyPerformanceBoReducer from './my_performance/MyPerformanceBoReducer';
import MyPerformanceMcrCoverageReducer from './my_performance/MyPerformanceMcrCoverageReducer';
import MyPerformanceGspComplianceReducer from './my_performance/MyPerformanceGspComplianceReducer';
import MyPerformanceRcpaReducer from './my_performance/MyPerformanceRcpaReducer';
import MyPerformanceBrandWiseSalesReducer from './my_performance/MyPerformanceBrandWiseSalesReducer';
import MyPerformanceSkuWiseSalesReducer from './my_performance/MyPerformanceSkuWiseSalesReducer';
import MyPerformanceAbmReducer from './my_performance/MyPerformanceAbmReducer';
import MyPerformanceAbmSalesReducer from './my_performance/MyPerformanceAbmSalesReducer';
import MyPerformanceJccComplianceReducer from './my_performance/MyPerformanceJccComplianceReducer';
import MyPerformanceJfwBosReducer from './my_performance/MyPerformanceJfwBosReducer';
import MyPerformanceMcrBosReducer from './my_performance/MyPerformanceMcrBosReducer';
import MyPerformanceGspComplianceBosReducer from './my_performance/MyPerformanceGspComplianceBosReducer';
import MyPerformanceRcpaBosReducer from './my_performance/MyPerformanceRcpaBosReducer';
import MyPerformanceCallAvgBosReducer from './my_performance/MyPerformanceCallAvgBosReducer';
import MyPerformanceAbmPcpmReducer from './my_performance/MyPerformanceAbmPcpmReducer';
import MyPerformanceRbmPcpmReducer from './my_performance/MyPerformanceRbmPcpmReducer';
import MyPerformanceZbmPcpmReducer from './my_performance/MyPerformanceZbmPcpmReducer';
import MyPerformanceRbmSalesReducer from './my_performance/MyPerformanceRbmSalesReducer';
import MyPerformanceZbmReducer from './my_performance/MyPerformanceZbmReducer';
import MyPerformanceZbmSalesReducer from './my_performance/MyPerformanceZbmSalesReducer';
import MyPerformanceHoReducer from './my_performance/MyPerformanceHoReducer';
import MyPerformanceHoPcpmReducer from './my_performance/MyPerformanceHoPcpmReducer';
import MyPerformanceSubHoPcpmReducer from './my_performance/MyPerformanceSubHoPcpmReducer';
import MyPerformanceHoSalesReducer from './my_performance/MyPerformanceHoSalesReducer';
import MyPerformanceSubHoSalesReducer from './my_performance/MyPerformanceSubHoSalesReducer';
import MyPerformanceSalesTrendReducer from './my_performance/MyPerformanceSalesTrendReducer';
import MyPerformanceSbus from './my_performance/MyPerformanceSbus';
import MyPerformanceRegions from './my_performance/MyPerformanceRegions';
import RcpaDocListReducer from './rcpa/RcpaDocListReducer';
import RcpaChemistListReducer from './rcpa/RcpaChemistListReducer';
import RcpaAbmBoReducer from './rcpa/RcpaAbmBoReducer';
import RcpaRbmBoReducer from './rcpa/RcpaRbmBoReducer';
import RcpaZbmBoReducer from './rcpa/RcpaZbmBoReducer';
import RcpaProductList from './rcpa/RcpaProductList';
import RcpaSbuReducer from './rcpa/RcpaSbuReducer';
import RcpaRegionReducer from './rcpa/RcpaRegionReducer';
import RcpaLogReducer from './rcpa/RcpaLogReducer';
import RcpaHistoryReducer from './rcpa/RcpaHistoryReducer';
import RcpaPost from './rcpa/RcpaPost';
import DailyPlanBo from './dailyplan/DailyPlanBo';
import DailyPlanBoOfflineReducer from './dailyplan/DailyPlanBoOffline';
import DailyPlanAbmBoReducer from './dailyplan/DailyPlanAbmBoReducer';
import DailyPlanRbmBoReducer from './dailyplan/DailyPlanRbmBoReducer';
import DailyPlanZbmBoReducer from './dailyplan/DailyPlanZbmBoReducer';
import DailyPlanSbuReducer from './dailyplan/DailyPlanSbuReducer';
import DailyPlanRegionReducer from './dailyplan/DailyPlanRegionReducer';
import submittedRcpaReducer from './rcpa/RcpaSubmitedData';
import DailyPlanDoctorDetailsReducer from './dailyplan/DailyPlanDoctorDetailsReducer';
import DailyPlanBoAllDoctorsReducer from './dailyplan/DailyPlanBoAllDoctorsReducer';
import CoachmapBoReducer from './coachmap/CoachmapBoReducer';
import CoachmapSummaryReducer from './coachmap/CoachmapSummaryReducer';
import CoachmapDetailReducer from './coachmap/CoachmapDetailReducer';
import CoachmapAbmReducer from './coachmap/CoachmapAbmReducer';
import TourplanBoReducer from './tourplan/TourplanBoReducer';
import TourplanBoDocListReducer from './tourplan/TourplanBoDocListReducer';
import TourplanBoTpQualityReducer from './tourplan/TourplanBoTpQualityReducer';
import TourplanRoutesReducer from './tourplan/TourplanRoutesReducer';
import TourplanSuggestedDoctorsReducer from './tourplan/TourplanSuggestedDoctorsReducer';
import TourplanAbmReducer from './tourplan/TourplanAbmReducer';
import TourplanBoWiseReoprtReducer from './tourplan/TourplanBoWiseReoprtReducer';
import TourplanTeamWiseReducer from './tourplan/TourplanTeamWiseReducer';
import TourplanRbmReducer from './tourplan/TourplanRbmReducer';
import TourplanZbmReducer from './tourplan/TourplanZbmReducer';
import CoachmapAbmLeaderboardReducer from './coachmap/CoachmapAbmLeaderboardReducer';
import CoachmapRbmReducer from './coachmap/CoachmapRbmReducer';
import RegionReducer from './RegionReducer';
import FilterRbmReducer from './FilterRbmReducer';
import SubmitCoachmapReducer from './coachmap/SubmitCoachmapReducer';
import ActionItemReducer from './action_item/ActionItemReducer';
import ActionItemDetailReducer from './action_item/ActionItemDetailReducer';
import ActionItemEmployeeReducer from './action_item/ActionItemEmployeeReducer';
import TourPlanApproveReducer from './tourplan/TourPlanApproveReducer';
import TourPlanDraftReducer from './tourplan/TourPlanDraftReducer';
import TourPlanReopenReducer from './tourplan/TourPlanReopenReducer';
import TourPlanSubmitReducer from './tourplan/TourPlanSubmitReducer';
import TourPlanManagerListReducer from './tourplan/TourPlanManagerListReducer';
import SubmitActionItemReducer from './action_item/SubmitActionItemReducer';
import AddActionItemReducer from './action_item/AddActionItemReducer';
import CrmRbmHeaderReducer from './crm/CrmRbmHeaderReducer';
import CrmRbmDoctorEffortReducer from './crm/CrmRbmDoctorEffortReducer';
import CrmDoctorDetailReducer from './crm/CrmDoctorDetailReducer';
import CrmRbmPendingApproval from './crm/CrmRbmPendingApproval';
import CrmRbmPendingAction from './crm/CrmRbmPendingAction';
import DashboardSalesReducer from './dashboard/DashboardSalesReducer';
import DashboardScoreReducer from './dashboard/DashboardScoreReducer';
import CrmAbmReducer from './crm/CrmAbmReducer';
import CrmAddDataReducer from './crm/CrmAddDataReducer';
import CrmBoReducer from './crm/CrmBoReducer';
import CrmDoctorReducer from './crm/CrmDoctorReducer';
import CrmEngagementTypeReducer from './crm/CrmEngagementTypeReducer';
import CrmEngagementMasterReducer from './crm/CrmEngagementMasterReducer';
import CrmDivisionReducer from './crm/CrmDivisionReducer';
import CrmDashboardReducer from './crm/CrmDashboardReducer';
import CrmDashboardTop50Reducer from './crm/CrmDashboardTop50Reducer';
import CrmHeaderReducer from './crm/CrmHeaderReducer';
import CrmDoctorEffortReducer from './crm/CrmDoctorEffortReducer';
import CrmPendingApprovalReducer from './crm/CrmPendingApprovalReducer';
import CrmReviewApplicationReducer from './crm/CrmReviewApplicationReducer';
import CrmRedFlagsReducer from './crm/CrmRedFlagsReducer';
import UploadDoctorIDListReducer from './upload_doctor_id/UploadDoctorIDListReducer';
import UploadDoctorDocumentReducer from './upload_doctor_id/UploadDoctorDocumentReducers';
import ActionItemUserSelectionDivReducer from './action_item/ActionItemUserSelectionDiv';
import ActionItemUserSelectionEmployeeReducer from './action_item/ActionItemUserSelectionEmployeeReducer';
import ContentListReducer from './content/ContentListReducer';
import ContentHubReducer from './content_hub/ContentHubReducer';
import ContentHubBrandItemsReducer from './content_hub/ContentHubBrandItemsReducer';
import HelpAddDataReducer from './help/HelpAddDataReducer';
import HelpQueryReducer from './help/HelpQueryReducer';
import MyPerformanceCLMReducer from './my_performance/MyPerformanceCLMReducer';
import LandingPageListReducer from './content/LandingPageListReducer';
import OpenTokScreenReducer from './opentok/OpenTokScreenReducer';
import DailyPlanMyTeam from './dailyplan/DailyPlanMyTeam';
import DailyPlanVirtualDetailingFormReducer from './dailyplan/DailyPlanVirtualDetailingFormReducer';
import SFEReducer from './SFE/SFEReducer';
import TrainingPageListReducer from './content/TrainingPageListReducer';
import ContactChemistReducer from './contact/ContactChemistReducer';
import ContactDoctorReducer from './contact/ContactDoctorReducer';
import LoadCampaingsListReducer from './rx_tracker/LoadCampaingsListReducer';
import LoadRXApprovedListReducer from './rx_tracker/LoadRXApprovedListReducer';
import SubmitChemistReducer from './rx_tracker/SubmitChemistReducer';
import LoadABMApprovedListREducer from './rx_tracker/LoadABMApprovedListREducer';
import SubmitRxUploadReducer from './rx_tracker/SubmitRxUploadReducer';
import LoadPendingRXReducers from './rx_tracker/LoadPendingRXReducers';
import SubmitRxUploadImageReducer from './rx_tracker/SubmitRxUploadReducer';
import GetBoLeaderBoardReducer from './rx_tracker/GetBoLeaderBoardReducer';


export default combineReducers({
  auth: AuthReducer,
  divisions: DivisionReducer,
  filterDivisions: FilterDivisionReducer,
  actionItemUserSelectionDiv: ActionItemUserSelectionDivReducer,
  actionItemUserSelectionEmployee: ActionItemUserSelectionEmployeeReducer,
  filterRegions: RegionReducer,
  filterRbms: FilterRbmReducer,
  employees: EmployeeReducer,
  sbus: SbuReducer,
  tpl: TplReducer,
  tplWinners: TplWinnerReducer,
  tplYourScore: TplYourScoreReducer,
  tplRankingList: TplRankingListReducer,
  myPerformanceClm: MyPerformanceCLMReducer,
  myPerformanceBO: MyPerformanceBoReducer,
  myPerformanceMcrCoverage: MyPerformanceMcrCoverageReducer,
  myPerformanceGspCompliance: MyPerformanceGspComplianceReducer,
  myPerformanceJccCompliance: MyPerformanceJccComplianceReducer,
  myPerformanceJfwBos: MyPerformanceJfwBosReducer,
  myPerformanceRcpa: MyPerformanceRcpaReducer,
  myPerformanceBrandWiseSales: MyPerformanceBrandWiseSalesReducer,
  myPerformanceSkuWiseSales: MyPerformanceSkuWiseSalesReducer,
  myPerformanceAbm: MyPerformanceAbmReducer,
  myPerformanceMcrBos: MyPerformanceMcrBosReducer,
  myPerformanceGspComplianceBos: MyPerformanceGspComplianceBosReducer,
  myPerformanceRcpaBos: MyPerformanceRcpaBosReducer,
  myPerformanceCallAvgBos: MyPerformanceCallAvgBosReducer,
  myPerformanceAbmSales: MyPerformanceAbmSalesReducer,
  myPerformanceRbmSales: MyPerformanceRbmSalesReducer,
  myPerformanceAbmPcpm: MyPerformanceAbmPcpmReducer,
  myPerformanceRbmPcpm: MyPerformanceRbmPcpmReducer,
  myPerformanceZbmPcpm: MyPerformanceZbmPcpmReducer,
  myPerformanceHoPcpm: MyPerformanceHoPcpmReducer,
  myPerformanceSubHoPcpm: MyPerformanceSubHoPcpmReducer,
  myPerformanceZbm: MyPerformanceZbmReducer,
  myPerformanceZbmSales: MyPerformanceZbmSalesReducer,
  myPerformanceHo: MyPerformanceHoReducer,
  myPerformanceHoSales: MyPerformanceHoSalesReducer,
  myPerformanceSubHoSales: MyPerformanceSubHoSalesReducer,
  myPerformanceSalesTrend: MyPerformanceSalesTrendReducer,
  myPerformanceSbus: MyPerformanceSbus,
  myPerformanceRegions: MyPerformanceRegions,
  rcpaDocList: RcpaDocListReducer,
  rcpaChemistList: RcpaChemistListReducer,
  rcpaAbmBOs: RcpaAbmBoReducer,
  rcpaRbmBOs: RcpaRbmBoReducer,
  rcpaZbmBOs: RcpaZbmBoReducer,
  rcpaProductList: RcpaProductList,
  rcpaSbus: RcpaSbuReducer,
  rcpaRegions: RcpaRegionReducer,
  rcpaLogs: RcpaLogReducer,
  rcpaHistory: RcpaHistoryReducer,
  rcpaPost: RcpaPost,
  dailyPlanBo: DailyPlanBo,
  dailyPlanBoOffline:DailyPlanBoOfflineReducer,
  dailyPlanAbmBOs: DailyPlanAbmBoReducer,
  dailyPlanRbmBOs: DailyPlanRbmBoReducer,
  dailyPlanZbmBOs: DailyPlanZbmBoReducer,
  dailyPlanSbus: DailyPlanSbuReducer,
  dailyPlanRegions: DailyPlanRegionReducer,
  dailyPlanMyTeam: DailyPlanMyTeam,
  dailyPlanVirtualDetailingForm: DailyPlanVirtualDetailingFormReducer,
  submittedRcpa: submittedRcpaReducer,
  dailyPlanDoctorDetails: DailyPlanDoctorDetailsReducer,
  dailyPlanBoAllDoctors: DailyPlanBoAllDoctorsReducer,
  coachmapBo: CoachmapBoReducer,
  coachmapSummary: CoachmapSummaryReducer,
  coachmapDetail: CoachmapDetailReducer,
  coachmapAbm: CoachmapAbmReducer,
  tourplanBo: TourplanBoReducer,
  tourPlanBoDocs: TourplanBoDocListReducer,
  tourplanBoTpQuality: TourplanBoTpQualityReducer,
  tourplanRoutes: TourplanRoutesReducer,
  tourplanSuggestedDoctors: TourplanSuggestedDoctorsReducer,
  tourplanAbm: TourplanAbmReducer,
  tourplanBoWiseReport: TourplanBoWiseReoprtReducer,
  tourplanTeamWise: TourplanTeamWiseReducer,
  tourplanRbm: TourplanRbmReducer,
  tourplanZbm: TourplanZbmReducer,
  coachmapAbmLeaderboard: CoachmapAbmLeaderboardReducer,
  coachmapRbm: CoachmapRbmReducer,
  postCoachmap: SubmitCoachmapReducer,
  actionItems: ActionItemReducer,
  actionItemDetail: ActionItemDetailReducer,
  actionItemEmployees: ActionItemEmployeeReducer,
  tourplanManagerList: TourPlanManagerListReducer,
  tourplanSubmit: TourPlanSubmitReducer,
  tourplanReopen: TourPlanReopenReducer,
  tourplanApprove: TourPlanApproveReducer,
  tourplanDraft: TourPlanDraftReducer,
  actionItemSubmit: SubmitActionItemReducer,
  actionItemAdd: AddActionItemReducer,
  crmRbmHeader: CrmRbmHeaderReducer,
  crmRbmDoctorEffort: CrmRbmDoctorEffortReducer,
  crmDoctorDetail: CrmDoctorDetailReducer,
  crmRbmPendingApproval: CrmRbmPendingApproval,
  crmRbmPendingAction: CrmRbmPendingAction,
  dashboardSales: DashboardSalesReducer,
  dashboardScore: DashboardScoreReducer,
  crmAddData: CrmAddDataReducer,
  crmAbm: CrmAbmReducer,
  crmBo: CrmBoReducer,
  crmDoctor: CrmDoctorReducer,
  crmEngagementType: CrmEngagementTypeReducer,
  crmEngagementMaster: CrmEngagementMasterReducer,
  crmDivision: CrmDivisionReducer,
  crmDashboard: CrmDashboardReducer,
  crmDashboardTop50: CrmDashboardTop50Reducer,
  crmHeader: CrmHeaderReducer,
  crmDoctorEffort: CrmDoctorEffortReducer,
  crmPendingApproval: CrmPendingApprovalReducer,
  crmReviewApplication: CrmReviewApplicationReducer,
  crmRedFlags: CrmRedFlagsReducer,
  uploadDoctorIDData: UploadDoctorIDListReducer,
  uploadDoctorID: UploadDoctorDocumentReducer,
  contentList: ContentListReducer,
  landingPageList: LandingPageListReducer,
  trainingPageList: TrainingPageListReducer,
  contentHub: ContentHubReducer,
  contentHubBrandItems: ContentHubBrandItemsReducer,
  helpAddData: HelpAddDataReducer,
  helpQueries: HelpQueryReducer,
  openTokScreen: OpenTokScreenReducer,
  SFEDataReducer: SFEReducer,
  contactChemist: ContactChemistReducer,
  contactDoctor: ContactDoctorReducer,
  campaingsList: LoadCampaingsListReducer,
  approvedList: LoadRXApprovedListReducer,
  SubmitChemist: SubmitChemistReducer,
  LoadABMApproved: LoadABMApprovedListREducer,
  SubmitRxUpload: SubmitRxUploadReducer,
  LoadPendingRX: LoadPendingRXReducers,
  SubmitRxUploadImage: SubmitRxUploadImageReducer,
  getBoLeaderBoard: GetBoLeaderBoardReducer
});
