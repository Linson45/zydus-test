import api from '../api';
import Urls from '../api/urls';

export const LOAD_TPL = 'load_tpl';
export const LOAD_TPL_SUCCESS = 'load_tpl_success';
export const LOAD_TPL_FAIL = 'load_tpl_fail';

export const LOAD_TPL_WINNERS = 'load_tpl_winners';
export const LOAD_TPL_WINNERS_SUCCESS = 'load_tpl_winners_success';
export const LOAD_TPL_WINNERS_FAIL = 'load_tpl_winners_fail';

export const LOAD_TPL_YOUR_SCORE = 'load_tpl_your_score';
export const LOAD_TPL_YOUR_SCORE_SUCCESS = 'load_tpl_your_score_success';
export const LOAD_TPL_YOUR_SCORE_FAIL = 'load_tpl_your_score_fail';

export const LOAD_TPL_RANKING_DETAIL = 'load_tpl_ranking_detail';
export const LOAD_TPL_RANKING_DETAIL_SUCCESS = 'load_tpl_ranking_detail_success';
export const LOAD_TPL_RANKING_DETAIL_FAIL = 'load_tpl_ranking_detail_fail';

export const loadTplData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TPL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_TPL_LEADERBOARD_DETAILS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TPL_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TPL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTplWinners = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TPL_WINNERS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_TPL_WINNERS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TPL_WINNERS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TPL_WINNERS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTplYourScore = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TPL_YOUR_SCORE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_TPL_YOUR_SCORE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TPL_YOUR_SCORE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TPL_YOUR_SCORE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadTplRankingDetail = (body) => async (dispatch) => {
  dispatch({ type: LOAD_TPL_RANKING_DETAIL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_TPL_RANKING_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_TPL_RANKING_DETAIL_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_TPL_RANKING_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};
