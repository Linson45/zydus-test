import api from '../api';
import Urls from '../api/urls';

export const LOAD_CRM_RBM_HEADER = 'load_crm_rbm_header';
export const LOAD_CRM_RBM_HEADER_SUCCESS = 'load_crm_rbm_header_success';
export const LOAD_CRM_RBM_HEADER_FAIL = 'load_crm_rbm_header_fail';

export const LOAD_CRM_RBM_DOCTOR_EFFORT = 'load_crm_rbm_doctor_effort';
export const LOAD_CRM_RBM_DOCTOR_EFFORT_SUCCESS = 'load_crm_rbm_doctor_effort_success';
export const LOAD_CRM_RBM_DOCTOR_EFFORT_FAIL = 'load_crm_rbm_doctor_effort_fail';

export const LOAD_CRM_DOCTOR_DETAIL = 'load_crm_doctor_detail';
export const LOAD_CRM_DOCTOR_DETAIL_SUCCESS = 'load_crm_doctor_detail_success';
export const LOAD_CRM_DOCTOR_DETAIL_FAIL = 'load_crm_doctor_detail_fail';

export const LOAD_CRM_RBM_PENDING_APPROVAL_LIST = 'load_crm_rbm_pending_approval_list';
export const LOAD_CRM_RBM_PENDING_APPROVAL_LIST_SUCCESS = 'load_crm_rbm_pending_approval_list_success';
export const LOAD_CRM_RBM_PENDING_APPROVAL_LIST_FAIL = 'load_crm_rbm_pending_approval_list_fail';

export const LOAD_CRM_RBM_PENDING_ACTION_LIST = 'load_crm_rbm_pending_action_list';
export const LOAD_CRM_RBM_PENDING_ACTION_LIST_SUCCESS = 'load_crm_rbm_pending_action_list_success';
export const LOAD_CRM_RBM_PENDING_ACTION_LIST_FAIL = 'load_crm_rbm_pending_action_list_fail';

export const LOAD_CRM_ABM_LIST = 'load_crm_abm_list';
export const LOAD_CRM_ABM_LIST_SUCCESS = 'load_crm_abm_list_success';
export const LOAD_CRM_ABM_LIST_FAIL = 'load_crm_abm_list_fail';

export const LOAD_CRM_BO_LIST = 'load_crm_bo_list';
export const LOAD_CRM_BO_LIST_SUCCESS = 'load_crm_bo_list_success';
export const LOAD_CRM_BO_LIST_FAIL = 'load_crm_bo_list_fail';

export const LOAD_CRM_DOCTOR_BO_ENGAGEMENT = 'load_crm_doctor_bo_engagement';
export const LOAD_CRM_DOCTOR_BO_ENGAGEMENT_SUCCESS = 'load_crm_doctor_bo_engagement_success';
export const LOAD_CRM_DOCTOR_BO_ENGAGEMENT_FAIL = 'load_crm_doctor_bo_engagement_fail';

export const LOAD_CRM_DOCTOR_LIST = 'load_crm_doctor_list';
export const LOAD_CRM_DOCTOR_LIST_SUCCESS = 'load_crm_doctor_list_success';
export const LOAD_CRM_DOCTOR_LIST_FAIL = 'load_crm_doctor_list_fail';

export const CRM_SELECT_ABM = 'crm_select_abm';
export const CRM_SELECT_BO = 'crm_select_bo';
export const CRM_SELECT_DOCTOR = 'crm_select_doctor';
export const CRM_ADD_PAST_ENGAGEMENT = 'crm_add_past_engagement';
export const CRM_UPDATE_PARAM = 'crm_update_param';
export const CRM_UPDATE_ANSWER = 'crm_update_answer';
export const CRM_UPDATE_ACTION_PLAN = 'crm_update_action_plan';
export const CRM_UPDATE_ENGAGEMENT_DETAIL_PARAM = 'crm_update_engagement_detail_param';

export const LOAD_CRM_ENGAGEMENT_TYPE = 'load_crm_engagement_type';
export const LOAD_CRM_ENGAGEMENT_TYPE_SUCCESS = 'load_crm_engagement_type_success';
export const LOAD_CRM_ENGAGEMENT_TYPE_FAIL = 'load_crm_engagement_type_fail';

export const LOAD_CRM_DOC_METRIC = 'load_crm_doc_metric';
export const LOAD_CRM_DOC_METRIC_SUCCESS = 'load_crm_doc_metric_success';
export const LOAD_CRM_DOC_METRIC_FAIL = 'load_crm_doc_metric_fail';

export const LOAD_CRM_QUESTIONS = 'load_crm_questions';
export const LOAD_CRM_QUESTIONS_SUCCESS = 'load_crm_questions_success';
export const LOAD_CRM_QUESTIONS_FAIL = 'load_crm_questions_fail';

export const LOAD_CRM_ENGAGEMENT_MASTER = 'load_crm_engagement_master';
export const LOAD_CRM_ENGAGEMENT_MASTER_SUCCESS = 'load_crm_engagement_master_success';
export const LOAD_CRM_ENGAGEMENT_MASTER_FAIL = 'load_crm_engagement_master_fail';

export const LOAD_CRM_DIVISIONS = 'load_crm_divisions';
export const LOAD_CRM_DIVISIONS_SUCCESS = 'load_crm_divisions_success';
export const LOAD_CRM_DIVISIONS_FAIL = 'load_crm_divisions_fail';

export const LOAD_CRM_DASHBOARD = 'load_crm_dashboard';
export const LOAD_CRM_DASHBOARD_SUCCESS = 'load_crm_dashboard_success';
export const LOAD_CRM_DASHBOARD_FAIL = 'load_crm_dashboard_fail';

export const LOAD_CRM_DASHBOARD_TOP_50 = 'load_crm_dashboard_top_50';
export const LOAD_CRM_DASHBOARD_TOP_50_SUCCESS = 'load_crm_dashboard_top_50_success';
export const LOAD_CRM_DASHBOARD_TOP_50_FAIL = 'load_crm_dashboard_top_50_fail';

export const LOAD_CRM_HEADER = 'load_crm_header';
export const LOAD_CRM_HEADER_SUCCESS = 'load_crm_header_success';
export const LOAD_CRM_HEADER_FAIL = 'load_crm_header_fail';

export const LOAD_CRM_DOCTOR_EFFORT = 'load_crm_doctor_effort';
export const LOAD_CRM_DOCTOR_EFFORT_SUCCESS = 'load_crm_doctor_effort_success';
export const LOAD_CRM_DOCTOR_EFFORT_FAIL = 'load_crm_doctor_effort_fail';

export const LOAD_CRM_PENDING_APPROVAL = 'load_crm_pending_approval';
export const LOAD_CRM_PENDING_APPROVAL_SUCCESS = 'load_crm_pending_approval_success';
export const LOAD_CRM_PENDING_APPROVAL_FAIL = 'load_crm_pending_approval_fail';

export const LOAD_CRM_REVIEW_APPLICATION = 'load_crm_review_application';
export const LOAD_CRM_REVIEW_APPLICATION_SUCCESS = 'load_crm_review_application_success';
export const LOAD_CRM_REVIEW_APPLICATION_FAIL = 'load_crm_review_application_fail';

export const LOAD_CRM_REDFLAGS = 'load_crm_redflags';
export const LOAD_CRM_REDFLAGS_SUCCESS = 'load_crm_redflags_success';
export const LOAD_CRM_REDFLAGS_FAIL = 'load_crm_redflags_fail';

export const loadCrmRbmHeader = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_RBM_HEADER });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_RBM_HEADER,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_RBM_HEADER_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_RBM_HEADER_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmRbmDoctorEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_RBM_DOCTOR_EFFORT });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_RBM_DOCTOR_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_RBM_DOCTOR_EFFORT_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_RBM_DOCTOR_EFFORT_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDoctorDetail = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DOCTOR_DETAIL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DOCTOR_DETAIL,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DOCTOR_DETAIL_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DOCTOR_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmRbmPendingApprovalList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_RBM_PENDING_APPROVAL_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_PENDING_APPROVAL,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_RBM_PENDING_APPROVAL_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_RBM_PENDING_APPROVAL_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmRbmPendingActionList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_RBM_PENDING_ACTION_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_PENDING_ACTION,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_RBM_PENDING_ACTION_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_RBM_PENDING_ACTION_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmAbmList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_ABM_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_ABMS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_ABM_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_ABM_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmBoList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_BOS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDoctorList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DOCTOR_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_CRM_DOCTORS,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DOCTOR_LIST_SUCCESS, payload: data.multivisit });
  } else {
    dispatch({
      type: LOAD_CRM_DOCTOR_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const crmSelectAbm = (abm) => async (dispatch) => {
  dispatch({ type: CRM_SELECT_ABM, payload: abm });
};

export const crmSelectBo = (bo) => async (dispatch) => {
  dispatch({ type: CRM_SELECT_BO, payload: bo });
};

export const crmSelectDoctor = (doctor) => async (dispatch) => {
  dispatch({ type: CRM_SELECT_DOCTOR, payload: doctor });
};

export const crmAddPastEngagement = (engagement) => async (dispatch) => {
  dispatch({ type: CRM_ADD_PAST_ENGAGEMENT, payload: engagement });
};

export const crmUpdateParam = (params) => async (dispatch) => {
  dispatch({ type: CRM_UPDATE_PARAM, payload: params });
};

export const loadCrmBoDocPastEngagement = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DOCTOR_BO_ENGAGEMENT });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_BO_DOC_ENGAGEMENTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DOCTOR_BO_ENGAGEMENT_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DOCTOR_BO_ENGAGEMENT_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmEngagementType = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_ENGAGEMENT_TYPE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_ENGAGEMENT_TYPE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_ENGAGEMENT_TYPE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_ENGAGEMENT_TYPE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDocMetric = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DOC_METRIC });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DOC_METRIC,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DOC_METRIC_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DOC_METRIC_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmQuestions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_QUESTIONS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_QUESTIONS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_QUESTIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_QUESTIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const crmUpdateAnswer = (id, type, answer) => async (dispatch) => {
  dispatch({ type: CRM_UPDATE_ANSWER, payload: { id, type, answer } });
};

export const crmUpdateActionPlan = (answer) => async (dispatch) => {
  dispatch({ type: CRM_UPDATE_ACTION_PLAN, payload: answer });
};

export const loadCrmEngagementMaster = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_ENGAGEMENT_MASTER });
  let engagement_types = [];
  let brands = [];
  let sponsorships = [];

  const engagement_types_response = await api({
    method: 'POST',
    url: Urls.GET_CRM_ENGAGEMENT_TYPE,
    data: body
  });
  if (engagement_types_response.data) engagement_types = engagement_types_response.data;

  const brands_response = await api({
    method: 'POST',
    url: Urls.GET_CRM_BRANDS,
    data: body
  });
  if (brands_response.data) brands = brands_response.data;

  const sponsorships_response = await api({
    method: 'POST',
    url: Urls.GET_CRM_SPONSORSHIP_TYPES,
    data: body
  });
  if (sponsorships_response.data) sponsorships = sponsorships_response.data;

  dispatch({ type: LOAD_CRM_ENGAGEMENT_MASTER_SUCCESS, payload: { sponsorships, engagement_types, brands } });
};

export const crmUpdateEngagementDetail = (body) => async (dispatch) => {
  dispatch({ type: CRM_UPDATE_ENGAGEMENT_DETAIL_PARAM, payload: body });
};

export const loadCrmDivisions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DIVISIONS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DIVISIONS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DIVISIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DIVISIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDashboard = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DASHBOARD });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DASHBOARD,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DASHBOARD_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DASHBOARD_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDashboardTop50 = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DASHBOARD_TOP_50 });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DASHBOARD_TOP_50,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DASHBOARD_TOP_50_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DASHBOARD_TOP_50_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmHeader = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_HEADER });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_HEADER,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_HEADER_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_HEADER_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmDoctorEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_DOCTOR_EFFORT });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_DOCTOR_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_DOCTOR_EFFORT_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_DOCTOR_EFFORT_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmPendingApproval = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_PENDING_APPROVAL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_PENDING_APPROVAL,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_PENDING_APPROVAL_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_PENDING_APPROVAL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmReviewApplication = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_REVIEW_APPLICATION });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_REVIEW_APPLICATION,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_REVIEW_APPLICATION_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_REVIEW_APPLICATION_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCrmRedFlags = (body) => async (dispatch) => {
  dispatch({ type: LOAD_CRM_REDFLAGS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_CRM_REDFLAGS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_CRM_REDFLAGS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_CRM_REDFLAGS_FAIL,
      payload: { error: errorMessage }
    });
  }
};
