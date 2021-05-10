export default class Urls {
  // LOGIN URL
  static LOGIN = '/login/AuthenticateUser';

  // Dashboard Urls
  static GET_DASHBOARD_SCORE = '/GetTeamDivScore';

  static GET_DASHBOARD_SALES = '/home/sales-data';

  static GET_FILTER_DIVISIONS = '/filterdata';

  static GET_FILTER_REGIONS = '/filterdata';

  static GET_FILTER_RBMS = '/filterdata';

  static GET_DIVISIONS = '/GetDivisionsPL';

  static GET_SBUS = '/GetSBUPL';

  static GET_EMPLOYEES = '/GetEmployeeList';

  static GET_ENTIRE_TEAM = '/home/entire-team';

  // TPL Urls
  static GET_TPL_LEADERBOARD_DETAILS = '/GetLeaderboardData';

  static GET_TPL_WINNERS = '/GetWinners';

  static GET_TPL_YOUR_SCORE = '/GetScoreSummary';

  static GET_TPL_RANKING_LIST = '/GetRankingList';

  // MY Performance URLs
  static GET_MY_PERFORMANCE_SALES_TREND = '/Sales/Trend';

  static GET_MY_PERFORMANCE_BO_SALES = '/Dashboard/SalesSummary';

  static GET_MY_PERFORMANCE_BO_EFFORTS = '/Dashboard/Efforts';

  static GET_MY_PERFORMANCE_MCR_COVERAGE = '/TotalDocCoverage';

  static GET_MY_PERFORMANCE_GSP_COMPLIANCE = '/DoctorCompliance';

  static GET_MY_PERFORMANCE_RCPA = '/DoctorRCPA';

  static GET_MY_PERFORMANCE_JCC_COMPLIANCE = '/EffortsMatrics/getJCCcomplience';

  static GET_MY_PERFORMANCE_JFW_BO_LIST = '/EffortsMatrics/getBOList';

  static GET_MY_PERFORMANCE_BRAND_WISE_SALES = '/Sales/BrandWise';

  static GET_MY_PERFORMANCE_SKU_WISE_SALES = '/Sales/SKUWise';

  static GET_MY_PERFORMANCE_PCPM = '/PCPMUserWise';

  static GET_MY_PERFORMANCE_PCPM_DIVISON_WISE = '/PCPMDivisionWise';

  static GET_MY_PERFORMANCE_PCPM_ZONE_WISE = '/Sales/PCPMZoneWise';

  static GET_MY_PERFORMANCE_ABM_SALES = '/Dashboard/SalesSummary';

  static GET_MY_PERFORMANCE_ABM_EFFORTS = '/Dashboard/Efforts';

  static GET_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS =
    '/Dashboard/AggregateEfforts';

  static GET_MY_PERFORMANCE_MCR_BO_LIST = '/EffortsMatrics/getBOList';

  static GET_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST =
    '/EffortsMatrics/getBOList';

  static GET_MY_PERFORMANCE_RCPA_BO_LIST = '/EffortsMatrics/getBOList';

  static GET_MY_PERFORMANCE_CALL_AVG_BO_LIST = '/EffortsMatrics/getBOList';

  static GET_MY_PERFORMANCE_ABM_HQ_WISE_SALES = '/Sales/HQWise';

  static GET_MY_PERFORMANCE_ABM_BRAND_WISE_SALES = '/Sales/BrandWiseSales';

  static GET_MY_PERFORMANCE_RBM_AREA_WISE_SALES = '/Sales/AreaWise';

  static GET_MY_PERFORMANCE_RBM_BRAND_WISE_SALES = '/Sales/BrandWiseSales';

  static GET_MY_PERFORMANCE_ZBM_SALES = '/Dashboard/SalesSummary';

  static GET_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS =
    '/Dashboard/AggregateEfforts';

  static GET_MY_PERFORMANCE_ZBM_REGION_WISE_SALES = '/Sales/RegionWise';

  static GET_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES = '/Sales/BrandWiseSales';

  static GET_MY_PERFORMANCE_HO_SALES = '/Dashboard/SalesSummary';

  static GET_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS =
    '/Dashboard/AggregateEfforts';

  static GET_MY_PERFORMANCE_HO_DIVISION_WISE_SALES = '/Sales/DivisionWise';

  static GET_MY_PERFORMANCE_SUB_HO_DIVISION_WISE_SALES = '/Sales/ZoneWise';

  static GET_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES = '/Sales/BrandWiseSales';

  static GET_MY_PERFORMANCE_SBUS = '/sbumaster';

  static GET_MY_PERFORMANCE_REGIONS = '/FABregionMaster';

  // RCPA URLs

  static GET_RCPA_DOC_LIST = '/doctorAllocation';

  static GET_RCPA_CHEMIST_LIST = '/chemistAllocation';

  static GET_RCPA_ABM_BO_LIST = '/abmmapping';

  static GET_RCPA_RBM_BO_LIST = '/rbmmapping';

  static GET_RCPA_ZBM_BO_LIST = '/zbmmapping';

  static GET_RCPA_PRODUCT_LIST = '/Getproductbrandmapping';

  static GET_RCPA_SBUS = '/sbumaster';

  static GET_RCPA_REGIONS = '/rcpaGetRegion';

  static GET_RCPA_LOGS = '/rcpalog';

  static GET_RCPA_HISTORY = '/DocChemHistory';

  static POST_RCPA_DOC = '/postRcpa';

  // Daily Plan URLs
  static GET_DAILY_PLAN_BO = '/dailyPlan/GetBoDetails';

  static GET_DAILY_PLAN_ABM_BO_LIST = '/dailyPlan/getbodetailsabm';

  static GET_DAILY_PLAN_RBM_BO_LIST = '/dailyPlan/getbodetailsrbm';

  static GET_DAILY_PLAN_ZBM_BO_LIST = '/dailyPlan/getbodetailszbm';

  static GET_DAILY_PLAN_SBUS = '/sbumaster';

  static GET_DAILY_PLAN_REGIONS = '/rcpaGetRegion';

  static GET_PREVIOUS_SUBMITTED_RCPA = '/rcpaCurrentMonthData';

  static GET_DAILY_PLAN_DOCTOR_DETAILS = '/dailyPlan/doctordetails';

  static GET_DAILY_PLAN_BO_ALL_DOCTORS = '/dailyPlan/GetAllDoctorListForABo';

  static POST_COMMENT = '/dailyplan/SubmitComment';

  static POST_STATUS = '/dailyplan/UpdateActionStatus';

  // Coachmap URLs
  static GET_BO_COACHMAP = '/submitted/coach-leader-grow-map';

  static GET_COACHMAP_QUESTIONS = '/template/coach-leader-grow-map';

  static GET_COACHMAP_SUMMARY = '/submitted/coach-leader-grow-map-detail';

  static GET_COACHMAP_ABM_DETAILS = '/submitted/coach-leader-grow-map';

  static GET_COACHMAP_ABM_LEADERBOARD = '/submitted/coach-leader-grow-map';

  static GET_COACHMAP_RBM_DETAILS = '/submitted/coach-leader-grow-map';

  static SUBMIT_COACHMAP = '/submitted/sync-coach-map-data';

  // Tourplan URLs
  static GET_TOURPLAN_BO = '/tourplan/tourplandetails';

  static GET_TOURPLAN_BO_DOC_LIST = '/tourplan/doctorlist';

  static GET_TOURPLAN_BO_TP_QUALITY = '/tourplan/BoEfforts';

  static GET_TOURPLAN_ROUTES = '/tourplan/tourplanroutes';

  static GET_TOURPLAN_SUGGESTED_DOCTORS = '/tourplan/SuggestedDoctorList';

  static GET_TOURPLAN_ABM = '/tourplan/tourplandetails';

  static GET_TOURPLAN_BO_WISE_REPORT = '/tourplan/bowisehqreport';

  static GET_TOURPLAN_TEAM_WISE = '/tourplan/rbmbomapping';

  static GET_TOURPLAN_RBM = '/tourplan/tourplandetails';

  static GET_TOURPLAN_ZBM = '/tourplan/zbmtourplanmapping';

  static GET_MANAGER_LIST = '/tourplan/ManagerList';

  static POST_TOURPLAN_REOPEN = '/tourplan/ReopenTourPlan';

  static POST_TOURPLAN_APPROVE = '/tourplan/ApproveTourPlan';

  static POST_TOURPLAN_SUBMIT = '/tourplan/SubmitTourPlan';

  static POST_TOURPLAN_DRAFT = '/tourplan/SaveAsDraft';

  // Action Item URLs
  static GET_ACTION_ITEMS = '/ActionPlan/getActionPlan';

  static GET_ACTION_ITEM_DETAILS = '/ActionPlan/getActionDetail';

  static GET_ACTION_ITEM_EMPLOYEES = '/ActionPlan/getActionPlanEmployeeList';

  static UPDATE_ACTION_ITEM = '/ActionPlan/actionItemUpdate';

  static ADD_ACTION_ITEM = '/ActionPlan/addActionDetail';

  // CRM URLs
  static GET_CRM_RBM_HEADER = '/CRM/headerDashboard_tile';

  static GET_CRM_RBM_DOCTOR_EFFORTS = '/getDoctorEfforts';

  static GET_CRM_DOCTOR_DETAIL = '/CRM/getDrDetail';

  static GET_CRM_PENDING_APPROVAL = '/getPendingApprovalList';

  static GET_CRM_PENDING_ACTION = '/getPendingActionList';

  static GET_CRM_ABMS = '/CRM/getABM';

  static GET_CRM_BOS = '/CRM/getBO';

  static GET_CRM_DOCTORS = '/doctorAllocation';

  static GET_CRM_BO_DOC_ENGAGEMENTS = '/CRM/getBoDocPastEngagement';

  static GET_CRM_ENGAGEMENT_TYPE = '/CRM/getEngagementType';

  static GET_CRM_DOC_METRIC = '/CRM/getDocMatrics';

  static GET_CRM_QUESTIONS = '/CRM/EngagementReasonsQue';

  static GET_CRM_BRANDS = '/CRM/getBrand';

  static GET_CRM_SPONSORSHIP_TYPES = '/CRM/getSponsorshipType';

  static GET_CRM_DIVISIONS = '/DivisionList';

  static GET_CRM_DASHBOARD = '/CRM/dashboard_tile';

  static GET_CRM_DASHBOARD_TOP_50 = '/gettop50Rxers';

  static GET_CRM_HEADER = '/CRM/headerDashboard_tile';

  static GET_CRM_DOCTOR_EFFORTS = '/getDoctorEfforts';

  static GET_CRM_REVIEW_APPLICATION = '/CRM/reviewAppliction';

  static GET_CRM_REDFLAGS = '/getRedFlagThresholds';

  // SFE Dashboard
  static GET_SFE_AUTH = '/incentive/getIncentiveAuth';

  // Upload Doctor ID List
  static POST_UPLOAD_DOCTOR_ID_LIST = '/getdoctorList/doctorList';

  static POST_UPLOAD_DOCTOR_ID_FILE = '/doctorUpload/doctorSave';

  // Content List
  static GET_CONTENT_LIST = '/content/bocontents';

  static GET_LANDING_PAGE_LIST = '/content/landingpagelist';

  static GET_TRAINING_PAGE_LIST = '/content/trainingpagelist';

  static SHARED_HISTORY_BO = '/e_detailing/bowisedetails';

  static DOWNLOAD_CONTENT = '/file/download';

  static GET_FEEDBACK_CONFIGS = '/survey/allfeedbacksforrep';

  static GET_SURVEY_CONFIGS = '/survey/allsurveysforrep';

  static SYNC_EDETAILING = '/e_detailing/session';

  static GET_EDETAILING_COMPLETED_DOCS = '/e_detailing/completeddoctors';

  static GET_DETAILING_HISTORY = '/e_detailing/edetaileddoctors';

  static GET_ALL_DOCS = '/dailyPlan/GetAllDoctorsForBoLite';

  static GET_ACTIVE_DETAILING_DATA =
    '/content/ActiveContentsSurveysAndFeedbacks';

  // Content Hub
  static GET_BRAND_SPEC_MAPPING = '/brand_detailing/spec_brand_map';

  static GET_LATEST_CASE_STUDIES = '/content/recentcasestudies';

  static GET_BRAND_CONTENT_HUB = '/content/contenthublist';

  static GET_FILE_PREVIEW = '/file/preview';

  static SHARE_CONTENT = '/content/share';

  static SEARCH_CONTENT_HUB = '/content/contenthublist';

  // Help
  static GET_HELP_CATEGORIES = '/query/listcategories';

  static GET_HELP_PRIORITIES = '/query/listpriorities';

  static ADD_QUERY = '/query/listquery';

  static GET_QUERIES = '/query/listqueriesforbo';

  // Dashboard
  static GET_BO_LIST_ABM = '/clm/bolistforabm';

  static GET_BO_LIST_RBM = '/clm/bolistforrbm';

  static GET_ABM_LIST_RBM = '/clm/abmlistforrbm';

  static GET_CLM_EFFORTS = '/clm/efforts';

  static GET_CLM_BRAND_EFFORTS = '/clm/brandwiseefforts';

  static GET_CLM_EFFORT_SUMMARY = '/clm/effortsummary';

  // Virtual Detailing
  static GET_VCALL_SUBJECTS = '/v_detailing/subjectslist';

  static GET_MY_TEAM = '/v_detailing/team';

  static SCHEDULE_VIRTUAL_CALL = '/v_detailing/callschedule';

  static SCHEDULE_VIRTUAL_CALL_SHARE_INVITE = '/crons/shareinvite';

  static GET_VIRTUAL_CALL_SCHEDULE = '/v_detailing/callschedule';

  static CANCEL_VIRTUAL_CALL = '/v_detailing/cancelschedule';

  static JOIN_VIRTUAL_CALL = '/v_detailing/joincall';

  static RESEND_LINK = '/e_detailing/resendinvite';

  static POST_SFE_DATA = '/incentive/getIncentiveAuth';

  static SYNC_VDETAILING = '/v_detailing/vsession';

  // Contact

  static LOAD_CONTACT_CHEMIST = '/contact/chemist';

  static LOAD_CONTACT_DOCTOR = '/contact/doctors';

  // Rx Tracker

  static LOAD_CAMPAINGS_LIST = '/getCampaign';

  static LOAD_RX_APPROVED_LIST = '/doctorlist';

  static LOAD_RX_ABM_APPROVED_LIST = '/apprejdoctor';

  static SUBMIT_CHEMIST_DATA = '/submitdoctor';

  // static SUBMIT_UPLOAD_RX = '/uploadrx';
  static SUBMIT_UPLOAD_RX = '/uploadpos';

  // static LOAD_RX_PENDING = '/pendingrx';
  static LOAD_RX_PENDING = '/pendingrxpos';

  static APPORVED_UPLOAD_RX = '/apprejrx';

  static GET_BO_LEADERBOARD_RX = '/getpoints';
}
