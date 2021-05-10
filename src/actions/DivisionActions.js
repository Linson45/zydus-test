import api from '../api';
import Urls from '../api/urls';

export const LOAD_DIVISIONS = 'load_divisions';
export const LOAD_DIVISIONS_SUCCESS = 'load_divisions_success';

export const LOAD_FILTER_DIVISIONS = 'load_filter_divisions';
export const LOAD_FILTER_DIVISIONS_SUCCESS = 'load_filter_divisions_success';
export const LOAD_FILTER_DIVISIONS_FAIL = 'load_filter_divisions_fail';

export const loadDivisions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_DIVISIONS });

  const { statusCode, data } = await api({
    method: 'POST',
    url: Urls.GET_DIVISIONS,
    data: body

  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_DIVISIONS_SUCCESS, payload: data });
  }
};

export const loadFilterDivisions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_FILTER_DIVISIONS });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_FILTER_DIVISIONS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_FILTER_DIVISIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_FILTER_DIVISIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};
