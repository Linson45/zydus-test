import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { Role } from '../util/Constants';
import { multisort } from '../util/SortArray';
import Toaster from '../util/Toaster';

export const LOAD_TOURPLAN_BO = 'load_tourplan_bo';
export const LOAD_TOURPLAN_BO_SUCCESS = 'load_tourplan_bo_success';
export const LOAD_TOURPLAN_BO_FAIL = 'load_tourplan_bo_fail';

export const LOAD_TOURPLAN_BO_DOC_LIST = 'load_tourplan_bo_doc_list';
export const LOAD_TOURPLAN_BO_DOC_LIST_SUCCESS = 'load_tourplan_bo_doc_list_success';
export const LOAD_TOURPLAN_BO_DOC_LIST_FAIL = 'load_tourplan_bo_doc_list_fail';

export const LOAD_TOURPLAN_BO_TP_QUALITY = 'load_tourplan_bo_tp_quality';
export const LOAD_TOURPLAN_BO_TP_QUALITY_SUCCESS = 'load_tourplan_bo_tp_quality_success';
export const LOAD_TOURPLAN_BO_TP_QUALITY_FAIL = 'load_tourplan_bo_tp_quality_fail';

export const LOAD_TOURPLAN_ROUTES = 'load_tourplan_routes';
export const LOAD_TOURPLAN_ROUTES_SUCCESS = 'load_tourplan_routes_success';
export const LOAD_TOURPLAN_ROUTES_FAIL = 'load_tourplan_routes_fail';

export const LOAD_TOURPLAN_SUGGESTED_DOCTORS = 'load_tourplan_suggested_routes';
export const LOAD_TOURPLAN_SUGGESTED_DOCTORS_SUCCESS = 'load_tourplan_suggested_routes_success';
export const LOAD_TOURPLAN_SUGGESTED_DOCTORS_FAIL = 'load_tourplan_suggested_routes_fail';

export const LOAD_TOURPLAN_ABM = 'load_tourplan_abm';
export const LOAD_TOURPLAN_ABM_SUCCESS = 'load_tourplan_abm_success';
export const LOAD_TOURPLAN_ABM_FAIL = 'load_tourplan_abm_fail';

export const LOAD_TOURPLAN_BO_WISE_REPORT = 'load_tourplan_bo_wise_report';
export const LOAD_TOURPLAN_BO_WISE_REPORT_SUCCESS = 'load_tourplan_bo_wise_report_success';
export const LOAD_TOURPLAN_BO_WISE_REPORT_FAIL = 'load_tourplan_bo_wise_report_fail';

export const LOAD_TOURPLAN_TEAM_WISE = 'load_tourplan_team_wise';
export const LOAD_TOURPLAN_TEAM_WISE_SUCCESS = 'load_tourplan_team_wise_success';
export const LOAD_TOURPLAN_TEAM_WISE_FAIL = 'load_tourplan_team_wise_fail';

export const LOAD_TOURPLAN_RBM = 'load_tourplan_rbm';
export const LOAD_TOURPLAN_RBM_SUCCESS = 'load_tourplan_rbm_success';
export const LOAD_TOURPLAN_RBM_FAIL = 'load_tourplan_rbm_fail';

export const LOAD_TOURPLAN_ZBM = 'load_tourplan_zbm';
export const LOAD_TOURPLAN_ZBM_SUCCESS = 'load_tourplan_zbm_success';
export const LOAD_TOURPLAN_ZBM_FAIL = 'load_tourplan_zbm_fail';

export const SUBMIT_TOURPLAN = 'submit_tourplan';
export const SUBMIT_TOURPLAN_SUCCESS = 'submit_tourplan_success';
export const SUBMIT_TOURPLAN_FAIL = 'submit_tourplan_fail';

export const SUBMIT_DRAFT = 'submit_draft';
export const SUBMIT_DRAFT_SUCCESS = 'submit_draft_success';
export const SUBMIT_DRAFT_FAIL = 'submit_draft_fail';

export const SUBMIT_APPROVE = 'submit_submit';
export const SUBMIT_APPROVE_SUCCESS = 'submit_submit_success';
export const SUBMIT_APPROVE_FAIL = 'submit_submit_fail';

export const SUBMIT_REOPEN = 'submit_draft';
export const SUBMIT_REOPEN_SUCCESS = 'submit_draft_success';
export const SUBMIT_REOPEN_FAIL = 'submit_draft_fail';

export const GET_MANAGER_LIST = 'get_manager_list';
export const GET_MANAGER_LIST_SUCCESS = 'get_manager_list_success';
export const GET_MANAGER_LIST_FAIL = 'get_manager_list_fail';

export const loadManagerList = (body) => async (dispatch) => {
  dispatch({ type: GET_MANAGER_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_MANAGER_LIST,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: GET_MANAGER_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: GET_MANAGER_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const submitTourPlan = (body) => async (dispatch) => {
  dispatch({ type: SUBMIT_TOURPLAN });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.POST_TOURPLAN_SUBMIT,
    data: body
  });

  if (statusCode === 200) {
    const { status, error } = data;
    if (status) {
      Toaster.show('Tour Plan has been submitted for approval.');
      dispatch({ type: SUBMIT_TOURPLAN_SUCCESS, payload: data });
    } else {
      alert(error);
      dispatch({
        type: SUBMIT_TOURPLAN_FAIL,
        payload: { error }
      });
    }
  } else {
    dispatch({
      type: SUBMIT_TOURPLAN_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const submitDraft = (body) => async (dispatch) => {
  dispatch({ type: SUBMIT_DRAFT });

  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.POST_TOURPLAN_DRAFT,
    data: body
  });

  if (statusCode === 200) {
    const { status, message } = data;
    if (status) {
      Toaster.show('Tour Plan Draft has been submitted successfully.');
      dispatch({ type: SUBMIT_DRAFT_SUCCESS, payload: data });
    } else {
      alert(message);
      dispatch({
        type: SUBMIT_DRAFT_FAIL,
        payload: { error: message }
      });
    }
  } else {
    dispatch({
      type: SUBMIT_DRAFT_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const submitApprove = (body) => async (dispatch) => {
  dispatch({ type: SUBMIT_APPROVE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.POST_TOURPLAN_APPROVE,
    data: body
  });

  if (statusCode === 200) {
    Toaster.show('Tour Plan has been approved.');
    dispatch({ type: SUBMIT_APPROVE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: SUBMIT_APPROVE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const submitReopen = (body) => async (dispatch) => {
  dispatch({ type: SUBMIT_REOPEN });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.POST_TOURPLAN_REOPEN,
    data: body
  });

  if (statusCode === 200) {
    Toaster.show('Tour Plan has been reopened.');
    dispatch({ type: SUBMIT_REOPEN_SUCCESS, payload: data });
  } else {
    dispatch({
      type: SUBMIT_REOPEN_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadBoTourPlan = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_BO });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_BO,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_BO_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_BO_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadBoTourPlanDocList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_BO_DOC_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_BO_DOC_LIST,
    params: body
  });

  if (statusCode === 200) {
    try {
      multisort(data, ['mcr_no'], ['ASC']);
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: LOAD_TOURPLAN_BO_DOC_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_BO_DOC_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadBoTourPlanTpQuality = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_BO_TP_QUALITY });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_BO_TP_QUALITY,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_BO_TP_QUALITY_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_BO_TP_QUALITY_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTourPlanRoutes = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_ROUTES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_ROUTES,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_ROUTES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_ROUTES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTourPlanSuggestedDoctors = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_SUGGESTED_DOCTORS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_SUGGESTED_DOCTORS,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_SUGGESTED_DOCTORS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_SUGGESTED_DOCTORS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadAbmTourPlan = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_ABM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_ABM,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_ABM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_ABM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadBoWiseReport = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_BO_WISE_REPORT });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_BO_WISE_REPORT,
    params: body
  });

  if (statusCode === 200) {
    try {
      multisort(data, ['name'], ['ASC']);
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: LOAD_TOURPLAN_BO_WISE_REPORT_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_BO_WISE_REPORT_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTeamWise = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_TEAM_WISE });
  const user = await Adapter.getUser();
  const { user_type } = user;

  let {
    // eslint-disable-next-line prefer-const
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_TEAM_WISE,
    params: body
  });

  if (statusCode === 200) {
    if (user_type === Role.ABM) {
      data = { bo_list: data };
    }
    try {
      multisort(data.bo_list, ['name'], ['ASC']);
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: LOAD_TOURPLAN_TEAM_WISE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_TEAM_WISE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRbmTourPlan = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_RBM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_RBM,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TOURPLAN_RBM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_RBM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadZbmTourPlan = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TOURPLAN_ZBM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_TOURPLAN_ZBM,
    params: body
  });

  if (statusCode === 200) {
    try {
      multisort(data.abm_list, ['name'], ['ASC']);
      multisort(data.rbm_list, ['name'], ['ASC']);
      for (const key in data.bo_list) {
        multisort(data.bo_list[key].bos, ['name'], ['ASC']);
      }
    } catch (e) {
      console.log(e);
    }

    dispatch({ type: LOAD_TOURPLAN_ZBM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TOURPLAN_ZBM_FAIL,
      payload: { error: errorMessage }
    });
  }
};
