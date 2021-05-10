import api from '../api';
import Urls from '../api/urls';

export const LOAD_DASHBOARD_SALES = 'LOAD_DASHBOARD_SALES';
export const LOAD_DASHBOARD_SALES_SUCCESS = 'LOAD_DASHBOARD_SALES_SUCCESS';
export const LOAD_DASHBOARD_SALES_FAIL = 'LOAD_DASHBOARD_SALES_FAIL';

export const LOAD_DASHBOARD_RANK = 'LOAD_DASHBOARD_RANK';
export const LOAD_DASHBOARD_RANK_SUCCESS = 'LOAD_DASHBOARD_RANK_SUCCESS';
export const LOAD_DASHBOARD_RANK_FAIL = 'LOAD_DASHBOARD_RANK_FAIL';

export const loadDashboardSalesData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_DASHBOARD_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_DASHBOARD_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_DASHBOARD_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_DASHBOARD_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadDashboardScoreData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_DASHBOARD_RANK });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_DASHBOARD_SCORE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_DASHBOARD_RANK_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_DASHBOARD_RANK_FAIL,
      payload: { error: errorMessage }
    });
  }
};
