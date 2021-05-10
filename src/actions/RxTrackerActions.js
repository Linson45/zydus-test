import api from '../api';
import Urls from '../api/urls';
import { GET_MANAGER_LIST_FAIL } from './TourplanActions';
import {
  createCampaingsList,
  createApprovedBoDocList,
  createRxUploadData,
  getCampaingsList,
  getDoctorsList,
  getChemistList,
  getApprovedDoctors,
  getRxPendingRecords,
  createApprovedList,
  getApprovedDrList,
  createRxTrackerList,
  getRxTrackerList,
  getRxSave

} from '../local-storage/helper/Rx';

export const CAMPAINGS_LIST = 'campaings_list';
export const CAMPAINGS_LIST_SUCCESS = 'campaings_list_success';
export const CAMPAINGS_LIST_FAILED = 'campaings_list_fail';

export const RX_APPROVED_LIST = 'rx_approved_list';
export const RX_APPROVED_LIST_SUCCESS = 'rx_approved_list_success';
export const RX_APPROVED_LIST_FAILED = 'rx_approved_list_fail';

export const RX_PENDING_LIST = 'rx_pending_list';
export const RX_PENDING_LIST_SUCCESS = 'rx_pending_list_success';
export const RX_PENDING_LIST_FAILED = 'rx_pending_list_fail';

export const ABM_RX_APPROVED_LIST = 'abm_rx_approved_list';
export const ABM_RX_APPROVED_LIST_SUCCESS = 'abm_rx_approved_list_success';
export const ABM_RX_APPROVED_LIST_FAILED = 'abm_rx_approved_list_fail';

export const POST_CHEMIST_LIST = 'post_chemist_list';
export const POST_CHEMIST_LIST_SUCCESS = 'post_chemist_list_success';
export const POST_CHEMIST_FAILED = 'post_chemist_list_fail';

export const POST_RX_LIST = 'post_rx_list';
export const POST_RX_SUCCESS = 'post_rx_success';
export const POST_RX_FAILED = 'post_rx_fail';

export const SAVE_RX_LIST = 'save_rx_list';
export const SAVE_RX_SUCCESS = 'save_rx_success';
export const PSAVE_RX_FAILED = 'save_rx_fail';

export const POST_RX_APPROVAL_LIST = 'post_rx_upload_list';
export const POST_RX_APPROVAL_LIST_SUCCESS = 'post_rx_upload_success';
export const POST_RX_APPROVAL_LIST_FAILED = 'post_rx_upload_fail';

export const GET_BO_LEADERBOARD = 'get_bo_leaderboard_list';
export const GET_BO_LEADERBOARD_SUCCESS = 'get_bo_leaderboard_success';
export const GET_BO_LEADERBOARD_FAILED = 'get_bo_leaderboard_fail';

export const loadCampaingsList = body => async dispatch => {
  const { localDocs } = body;
  dispatch({ type: CAMPAINGS_LIST });
  if (localDocs && localDocs.length) {
    dispatch({ type: CAMPAINGS_LIST_SUCCESS, payload: localDocs });
    return;
  }
  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.LOAD_CAMPAINGS_LIST,
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  if (statusCode === 200) {
    //console.log('sonali:statusCode === 200')

    dispatch({ type: CAMPAINGS_LIST_SUCCESS, payload: data });
    createCampaingsList(data, body);
  }
  else {
    const items = await getCampaingsList(body);
    if (items.length) {
      //console.log('sonali:CAMPAINGS_LIST_SUCCESS')

      dispatch({ type: CAMPAINGS_LIST_SUCCESS, payload: items });
      return;
    }
    else {
      dispatch({
        type: CAMPAINGS_LIST_FAILED,
        payload: { error: errorMessage },
      });
    }
  }

};

export const loadApprovedList = body => async dispatch => {
  const { localDocs } = body;
  dispatch({ type: RX_APPROVED_LIST });
  if (localDocs && localDocs.length) {
    dispatch({ type: RX_APPROVED_LIST_SUCCESS, payload: localDocs });
    return;
  }
  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.LOAD_RX_APPROVED_LIST,
    data: body,
  });

  if (statusCode === 200) {
    createApprovedList(data, body.campaign_code);

    dispatch({ type: RX_APPROVED_LIST_SUCCESS, payload: data });
    // createApprovedBoDocList(body.campaign_code, data);
  } else {

    const items = await getApprovedDrList(body.campaign_code);
    //console.log(' sonali getApprovedDrList:', (items))
    if (items.length) {
      dispatch({ type: RX_APPROVED_LIST_SUCCESS, payload: items });
      return;
    }
    else{
    dispatch({
      type: RX_APPROVED_LIST_FAILED,
      payload: { error: errorMessage },
    });
  }
  }
};

export const postABMApprovedList = body => async dispatch => {
  dispatch({ type: ABM_RX_APPROVED_LIST });

  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.LOAD_RX_ABM_APPROVED_LIST,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({ type: ABM_RX_APPROVED_LIST_SUCCESS, payload: data });
    // createApprovedBoDocList(body.campaign_code, data);
  } else {
    dispatch({
      type: ABM_RX_APPROVED_LIST_FAILED,
      payload: { error: errorMessage },
    });
  }
};

export const submitUploadRx = body => async dispatch => {
  dispatch({ type: POST_RX_LIST });

  const { statusCode, errorMessage, data, flag } = await api({
    method: 'POST',
    url: Urls.SUBMIT_UPLOAD_RX,
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  if (statusCode === 200) {
    dispatch({ type: POST_RX_SUCCESS, payload: data });
    // createApprovedBoDocList(body.campaign_code, data);
  } else {
    dispatch({
      type: POST_RX_FAILED,
      payload: { error: errorMessage },
    });
  }
};

// export const saveUploadRx = body => async dispatch => {
//   dispatch({type: SAVE_RX_LIST});
//   console.log('Body of Saved data', body);
//   dispatch({type: SAVE_RX_SUCCESS, payload: data});
//   createRxUploadData(body.dr_code, data);

//   // if (statusCode === 200) {
//   //   dispatch({type: POST_RX_SUCCESS, payload: data});
//   //   // createApprovedBoDocList(body.campaign_code, data);
//   // } else {
//   //   dispatch({
//   //     type: POST_RX_FAILED,
//   //     payload: {error: errorMessage},
//   //   });
// };

export const loadPendingRxList = body => async dispatch => {
  const { localDocs } = body;
  dispatch({ type: RX_PENDING_LIST });
  // if (localDocs && localDocs.length) {
  //   dispatch({type: RX_PENDING_LIST_SUCCESS, payload: localDocs});
  //   return;
  // }
  const {
    campaign_code,
    rep_code,
  } = body
  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.LOAD_RX_PENDING,
    data: body,
  });

  if (statusCode === 200) {
    createRxTrackerList(data, body)
    var items = await getRxSave(campaign_code, rep_code)
     items=items.concat(data)
    console.log('data in actions', items, data)
    dispatch({ type: RX_PENDING_LIST_SUCCESS, payload: items });
  } else {
    const items = await getRxTrackerList(body);
    var itemsFull = await getRxSave(campaign_code, rep_code)
    itemsFull=itemsFull.concat(items)
    //console.log(' sonali get:', JSON.stringify(items))
    if (itemsFull.length) {
      dispatch({ type: RX_PENDING_LIST_SUCCESS, payload: itemsFull });
      return;
    }
    dispatch({ type: RX_PENDING_LIST_FAILED, payload: { error: errorMessage }, });
  }
};

export const postABMUploadList = body => async dispatch => {
  dispatch({ type: POST_RX_APPROVAL_LIST });

  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.APPORVED_UPLOAD_RX,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({ type: POST_RX_APPROVAL_LIST_SUCCESS, payload: data });
    // createApprovedBoDocList(body.campaign_code, data);
  } else {
    dispatch({
      type: POST_RX_APPROVAL_LIST_FAILED,
      payload: { error: errorMessage },
    });
  }
};

export const getBoLeaderBoardList = body => async dispatch => {
  dispatch({ type: GET_BO_LEADERBOARD });

  const { statusCode, errorMessage, data } = await api({
    method: 'POST',
    url: Urls.GET_BO_LEADERBOARD_RX,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({ type: GET_BO_LEADERBOARD_SUCCESS, payload: data });
  } else {
    dispatch({
      type: GET_BO_LEADERBOARD_FAILED,
      payload: { error: errorMessage },
    });
  }
};
