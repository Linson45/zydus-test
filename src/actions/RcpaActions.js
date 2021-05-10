import api from '../api';
import Urls from '../api/urls';
import {
  createRcpaAllDoc,
  createRcpaChemists,
  createRcpaGspDoc,
  createRcpaHistory,
  createRcpaLogs,
  createRcpaMultivisitDoc,
  createRcpaMyBos,
  createRcpaProductMapping,
  getRcpaAllDoc,
  getRcpaChemists,
  getRcpaGspDoc,
  getRcpaHistory,
  getRcpaLogs,
  getRcpaMultivisitDoc,
  getRcpaMyBos,
  getRcpaProductMapping
} from '../local-storage/helper/rcpa';
import Toaster from '../util/Toaster';

export const LOAD_RCPA_DOC_LIST = 'load_rcpa_doc_list';
export const LOAD_RCPA_DOC_LIST_SUCCESS = 'load_rcpa_doc_list_success';
export const LOAD_RCPA_DOC_LIST_FAIL = 'load_rcpa_doc_list_fail';

export const LOAD_RCPA_CHEMIST_LIST = 'load_rcpa_chemist_list';
export const LOAD_RCPA_CHEMIST_LIST_SUCCESS = 'load_rcpa_chemist_list_success';
export const LOAD_RCPA_CHEMIST_LIST_FAIL = 'load_rcpa_chemist_list_fail';

export const LOAD_RCPA_ABM_BO_LIST = 'load_rcpa_abm_bo_list';
export const LOAD_RCPA_ABM_BO_LIST_SUCCESS = 'load_rcpa_abm_bo_list_success';
export const LOAD_RCPA_ABM_BO_LIST_FAIL = 'load_rcpa_abm_bo_list_fail';

export const LOAD_RCPA_RBM_BO_LIST = 'load_rcpa_rbm_bo_list';
export const LOAD_RCPA_RBM_BO_LIST_SUCCESS = 'load_rcpa_rbm_bo_list_success';
export const LOAD_RCPA_RBM_BO_LIST_FAIL = 'load_rcpa_rbm_bo_list_fail';

export const LOAD_RCPA_ZBM_BO_LIST = 'load_rcpa_zbm_bo_list';
export const LOAD_RCPA_ZBM_BO_LIST_SUCCESS = 'load_rcpa_zbm_bo_list_success';
export const LOAD_RCPA_ZBM_BO_LIST_FAIL = 'load_rcpa_zbm_bo_list_fail';

export const LOAD_RCPA_PRODUCT_LIST = 'load_rcpa_product_list';
export const LOAD_RCPA_PRODUCT_LIST_SUCCESS = 'load_rcpa_product_list_success';
export const LOAD_RCPA_PRODUCT_LIST_FAIL = 'load_rcpa_product_list_fail';

export const LOAD_RCPA_SBUS = 'load_rcpa_sbus';
export const LOAD_RCPA_SBUS_SUCCESS = 'load_rcpa_sbus_success';
export const LOAD_RCPA_SBUS_FAIL = 'load_rcpa_sbus_fail';

export const LOAD_RCPA_REGIONS = 'load_rcpa_regions';
export const LOAD_RCPA_REGIONS_SUCCESS = 'load_rcpa_regions_success';
export const LOAD_RCPA_REGIONS_FAIL = 'load_rcpa_regions_fail';
export const RESET_RCPA_RBMS = 'reset_rcpa_regions';

export const LOAD_RCPA_LOGS = 'load_rcpa_logs';
export const LOAD_RCPA_LOGS_SUCCESS = 'load_rcpa_logs_success';
export const LOAD_RCPA_LOGS_FAIL = 'load_rcpa_logs_fail';

export const LOAD_RCPA_HISTORY = 'load_rcpa_history';
export const LOAD_RCPA_HISTORY_SUCCESS = 'load_rcpa_history_success';
export const LOAD_RCPA_HISTORY_FAIL = 'load_rcpa_history_fail';

export const SUBMIT_RCPA = 'submit_rcpa';
export const SUBMIT_RCPA_SUCCESS = 'submit_rcpa_success';
export const SUBMIT_RCPA_FAIL = 'submit_rcpa_fail';

export const GET_SUBMIT_RCPA = 'get_submit_rcpa';
export const GET_SUBMIT_RCPA_SUCCESS = 'get_submit_rcpa_success';
export const GET_SUBMIT_RCPA_FAIL = 'get_submit_rcpa_fail';

export const RESET_GET_SUBMITTED_RCPA = 'reset_get_submitted_rcpa';
export const RESET_PRODUCT_LIST = 'reset_product_list';

export const loadRcpaDocList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_DOC_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_DOC_LIST,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_DOC_LIST_SUCCESS, payload: data });
    const { gsp, multivisit, all } = data;
    createRcpaGspDoc(body.rep_code, gsp);
    createRcpaMultivisitDoc(body.rep_code, multivisit);
    createRcpaAllDoc(body.rep_code, all);
  } else {
    const gsp = await getRcpaGspDoc(body.rep_code);
    const multivisit = await getRcpaMultivisitDoc(body.rep_code);
    const all = await getRcpaAllDoc(body.rep_code);
    if (gsp.length || multivisit.length || all.length) {
      dispatch({ type: LOAD_RCPA_DOC_LIST_SUCCESS, payload: { gsp, multivisit, all } });
      return;
    }
    dispatch({
      type: LOAD_RCPA_DOC_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaChemistList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_CHEMIST_LIST });
  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_CHEMIST_LIST,
    params: body
  });

  if (statusCode === 200) {
    createRcpaChemists(body.doc_code, data);
    dispatch({ type: LOAD_RCPA_CHEMIST_LIST_SUCCESS, payload: data });
  } else {
    const chemists = await getRcpaChemists(body.doc_code);
    if (chemists && chemists.length) {
      dispatch({ type: LOAD_RCPA_CHEMIST_LIST_SUCCESS, payload: chemists });
      return;
    }
    dispatch({
      type: LOAD_RCPA_CHEMIST_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaAbmBOs = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_ABM_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_ABM_BO_LIST,
    params: body
  });

  if (statusCode === 200) {
    createRcpaMyBos(data);
    dispatch({ type: LOAD_RCPA_ABM_BO_LIST_SUCCESS, payload: data });
  } else {
    const bos = await getRcpaMyBos();
    if (bos && bos.length) {
      dispatch({ type: LOAD_RCPA_ABM_BO_LIST_SUCCESS, payload: bos });
      return;
    }
    dispatch({
      type: LOAD_RCPA_ABM_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaRbmBOs = (company_code, sbu_code, region_code) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_RBM_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_RBM_BO_LIST,
    params: {
      company_code,
      sbu_code,
      region_code
    }
  });

  if (statusCode === 200) {
    createRcpaMyBos(data);
    dispatch({ type: LOAD_RCPA_RBM_BO_LIST_SUCCESS, payload: data });
  } else {
    const bos = await getRcpaMyBos();
    if (bos && bos.length) {
      dispatch({ type: LOAD_RCPA_RBM_BO_LIST_SUCCESS, payload: bos });
      return;
    }
    dispatch({
      type: LOAD_RCPA_RBM_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaZbmBOs = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_ZBM_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_ZBM_BO_LIST,
    params: body
  });

  if (statusCode === 200) {
    createRcpaMyBos(data);
    dispatch({ type: LOAD_RCPA_ZBM_BO_LIST_SUCCESS, payload: data });
  } else {
    const bos = await getRcpaMyBos();
    if (bos && bos.length) {
      dispatch({ type: LOAD_RCPA_ZBM_BO_LIST_SUCCESS, payload: bos });
      return;
    }
    dispatch({
      type: LOAD_RCPA_ZBM_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaProductList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_PRODUCT_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_PRODUCT_LIST,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_PRODUCT_LIST_SUCCESS, payload: data });
    createRcpaProductMapping(body.sbu_code, data);
  } else {
    const brands = await getRcpaProductMapping(body.sbu_code);
    if (brands && brands.length) {
      dispatch({ type: LOAD_RCPA_PRODUCT_LIST_SUCCESS, payload: brands });
      return;
    }
    dispatch({
      type: LOAD_RCPA_PRODUCT_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaSbus = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_SBUS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_SBUS,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_SBUS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_RCPA_SBUS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaRegions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_REGIONS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_REGIONS,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_REGIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_RCPA_REGIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const resetRcpaRegions = () => async (dispatch) => {
  dispatch({ type: RESET_RCPA_RBMS });
};

export const loadRcpaLogs = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_LOGS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_LOGS,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_LOGS_SUCCESS, payload: data });
    createRcpaLogs(body.doc_code, body.chemist_code, data);
  } else {
    const logs = await getRcpaLogs(body.doc_code, body.chemist_code);
    if (logs && logs.length) {
      dispatch({ type: LOAD_RCPA_LOGS_SUCCESS, payload: logs });
      return;
    }
    dispatch({
      type: LOAD_RCPA_LOGS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadRcpaHistory = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RCPA_HISTORY });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_RCPA_HISTORY,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RCPA_HISTORY_SUCCESS, payload: data });
    createRcpaHistory(body.rep_code, body.doc_code, body.chem_code, data);
  } else {
    const brands = await getRcpaHistory(body.rep_code, body.doc_code, body.chem_code);
    if (brands && brands.length) {
      dispatch({ type: LOAD_RCPA_HISTORY_SUCCESS, payload: brands });
      return;
    }
    dispatch({
      type: LOAD_RCPA_HISTORY_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const submitRcpa = (body) => async (dispatch) => {
  dispatch({ type: SUBMIT_RCPA });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.POST_RCPA_DOC,
    data: body
  });

  if (statusCode === 200) {
    Toaster.show('RCPA has been submitted successfully.');
    dispatch({ type: SUBMIT_RCPA_SUCCESS, payload: data });
  } else {
    dispatch({
      type: SUBMIT_RCPA_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const resetProductList = () => async (dispatch) => {
  dispatch({ type: RESET_PRODUCT_LIST });
};

export const getSubmittedRcpa = (body) => async (dispatch) => {
  dispatch({ type: GET_SUBMIT_RCPA });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_PREVIOUS_SUBMITTED_RCPA,
    params: body
  });

  if (statusCode === 200) {
    dispatch({ type: GET_SUBMIT_RCPA_SUCCESS, payload: data });
  } else {
    dispatch({
      type: GET_SUBMIT_RCPA_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const resetSubmittedRcpa = () => async (dispatch) => {
  dispatch({ type: RESET_GET_SUBMITTED_RCPA });
};
