import api from '../api';
import Urls from '../api/urls';

export const LOAD_REGIONS = 'load_regions';
export const LOAD_REGIONS_SUCCESS = 'load_regions_success';
export const LOAD_REGIONS_FAIL = 'load_regions_fail';

export const LOAD_RBMS = 'load_rbms';
export const LOAD_RBMS_SUCCESS = 'load_rbms_success';
export const LOAD_RBMS_FAIL = 'load_rbms_fail';

export const loadFilterRegions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_REGIONS });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_FILTER_REGIONS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_REGIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_REGIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadFilterRbms = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RBMS });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_FILTER_RBMS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_RBMS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_RBMS_FAIL,
      payload: { error: errorMessage }
    });
  }
};
