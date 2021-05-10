import moment from 'moment';
import api from '../api';
import Urls from '../api/urls';
import { createCoachMapQuestions, getCoachMapQuestions } from '../local-storage/helper/coachmap';

export const LOAD_BO_COACH_MAP = 'load_bo_coachmap';
export const LOAD_BO_COACH_MAP_SUCCESS = 'load_bo_coachmap_success';
export const LOAD_BO_COACH_MAP_FAIL = 'load_bo_coachmap_fail';

export const LOAD_BO_COACH_QUESTIONS = 'load_bo_questions';
export const LOAD_BO_COACH_QUESTIONS_SUCCESS = 'load_bo_questions_success';
export const LOAD_BO_COACH_QUESTIONS_FAIL = 'load_bo_questions_fail';

export const LOAD_COACH_SUMMARY = 'load_coachmap_summary';
export const LOAD_COACH_SUMMARY_SUCCESS = 'load_coachmap_summary_success';
export const LOAD_COACH_SUMMARY_FAIL = 'load_coachmap_summary_fail';

export const LOAD_COACH_MAP_DETAIL = 'load_coachmap_detail';
export const LOAD_COACH_MAP_DETAIL_SUCCESS = 'load_coachmap_detail_success';
export const LOAD_COACH_MAP_DETAIL_FAIL = 'load_coachmap_detail_fail';

export const LOAD_ABM_COACH_MAP_DETAIL = 'load_abm_coachmap_detail';
export const LOAD_ABM_COACH_MAP_DETAIL_SUCCESS = 'load_abm_coachmap_detail_success';
export const LOAD_ABM_COACH_MAP_DETAIL_FAIL = 'load_abm_coachmap_detail_fail';

export const LOAD_ABM_LEADERBOARD_DETAIL = 'load_abm_leaderboard_detail';
export const LOAD_ABM_LEADERBOARD_DETAIL_SUCCESS = 'load_abm_leaderboard_detail_success';
export const LOAD_ABM_LEADERBOARD_DETAIL_FAIL = 'load_abm_leaderboard_detail_fail';

export const LOAD_RBM_COACH_MAP_DETAIL = 'load_rbm_coachmap_detail';
export const LOAD_RBM_COACH_MAP_DETAIL_SUCCESS = 'load_rbm_coachmap_detail_success';
export const LOAD_RBM_COACH_MAP_DETAIL_FAIL = 'load_rbm_coachmap_detail_fail';

export const POST_COACHMAP = 'post_coachmap';
export const POST_COACHMAP_SUCCESS = 'post_coachmap_success';
export const POST_COACHMAP_FAIL = 'post_coachmap_fail';

export const loadCoachmapBo = (body) => async (dispatch) => {
  dispatch({ type: LOAD_BO_COACH_MAP });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_BO_COACHMAP,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_BO_COACH_MAP_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_BO_COACH_MAP_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCoachmapQuestions = (body) => async (dispatch) => {
  dispatch({ type: LOAD_BO_COACH_QUESTIONS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_COACHMAP_QUESTIONS,
    data: body
  });

  if (statusCode === 200) {
    createCoachMapQuestions(body.desig_group_code, data);
    dispatch({ type: LOAD_BO_COACH_QUESTIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_BO_COACH_QUESTIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadCoachmapSummary = (body, user_type) => async (dispatch) => {
  dispatch({ type: LOAD_COACH_SUMMARY });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_COACHMAP_SUMMARY,
    data: body
  });

  if (statusCode === 200) {
    const groups = await getCoachMapQuestions(user_type);
    dispatch({ type: LOAD_COACH_SUMMARY_SUCCESS, payload: parseCoachSummaryData(data, groups) });
  } else {
    dispatch({
      type: LOAD_COACH_SUMMARY_FAIL,
      payload: { error: errorMessage }
    });
  }
};

function parseCoachSummaryData(data, groups) {
  return groups.map((group) => {
    group.questions = group.questions.map((question) => {
      const dates = data.map((date) => {
        const { filed_by_rep_name, filed_data } = date;
        let { filed_date } = date;
        filed_date = moment(filed_date.split(' ')[0], 'MM/DD/YYYY').format('DD MMM');
        let result_skill_map_rating_id = null; let result_skill_map_remark = null;
        let result_skill_map_rating_score = null;
        filed_data.forEach(({ skill_map_group_id, skill_map }) => {
          if (group.skill_map_group_id === skill_map_group_id) {
            skill_map.forEach(({ skill_map_id, skill_map_rating_id, skill_map_remark }) => {
              if (question.skill_map_id === skill_map_id) {
                result_skill_map_rating_id = skill_map_rating_id;
                result_skill_map_remark = skill_map_remark;
              }
            });
          }
        });

        question.options.forEach(({ skill_map_rating_id, skill_map_rating_score }) => {
          if (skill_map_rating_id === result_skill_map_rating_id) result_skill_map_rating_score = skill_map_rating_score;
        });

        return {
          filed_date,
          filed_by_rep_name,
          skill_map_remark: result_skill_map_remark,
          skill_map_rating_score: result_skill_map_rating_score
        };
      });
      delete question.options;
      question.dates = dates;
      return question;
    });
    return group;
  });
}

export const loadCoachmapDetails = (body, user_type, filed_date, filed_by_rep_code) => async (dispatch) => {
  dispatch({ type: LOAD_COACH_MAP_DETAIL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_COACHMAP_SUMMARY,
    data: body
  });

  if (statusCode === 200) {
    const groups = await getCoachMapQuestions(user_type);
    dispatch({
      type: LOAD_COACH_MAP_DETAIL_SUCCESS,
      payload: parseCoachmapDetails(data, groups, filed_date, filed_by_rep_code)
    });
  } else {
    dispatch({
      type: LOAD_COACH_MAP_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

function parseCoachmapDetails(response, groups, filed_date, filed_by_rep_code) {
  let data = null;
  response.forEach((detail) => {
    if (detail.filed_by_rep_code === filed_by_rep_code && detail.filed_date === filed_date) data = detail;
  });
  if (!data) return data;
  const questionJson = {};
  data.filed_data.forEach(({ skill_map }) => {
    skill_map.forEach(({ skill_map_id, skill_map_rating_id }) => {
      questionJson[skill_map_id] = skill_map_rating_id;
    });
  });

  return groups.map((group) => {
    group.questions = group.questions.map((question) => {
      let result_skill_map_rating_score = null; let
        result_skill_map_rating_remark = null;
      question.options.forEach(({ skill_map_rating_id, skill_map_rating_score, skill_map_rating_title }) => {
        if (skill_map_rating_id === questionJson[question.skill_map_id]) {
          result_skill_map_rating_score = skill_map_rating_score;
          result_skill_map_rating_remark = skill_map_rating_title;
        }
      });
      delete question.options;
      question.skill_map_rating_score = result_skill_map_rating_score;
      question.skill_map_rating_title = result_skill_map_rating_remark;
      return question;
    });
    return group;
  });
}

export const loadAbmCoachmapDetails = (body) => async (dispatch) => {
  dispatch({ type: LOAD_ABM_COACH_MAP_DETAIL });
  const {
    rep_code, company_code, sbu_code, status, desig_group_code
  } = body;

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_ENTIRE_TEAM,
    data: body
  });

  if (statusCode === 200) {
    const abmData = await api({
      method: 'POST',
      url: Urls.GET_COACHMAP_ABM_DETAILS,
      data: {
        rep_code, company_code, sbu_code, status, desig_group_code
      }
    });
    dispatch({ type: LOAD_ABM_COACH_MAP_DETAIL_SUCCESS, payload: parseAbmData(abmData.data, data) });
  } else {
    dispatch({
      type: LOAD_ABM_COACH_MAP_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

function parseAbmData(data, bos) {
  const dataJson = {};
  data.forEach((abm) => {
    dataJson[abm.filed_for_rep_code] = abm;
  });
  return bos.map((bo) => {
    const abmData = dataJson[bo.rep_code];
    bo.status = 'Pending';
    if (abmData) {
      bo.status = 'Submitted';
      return { ...bo, ...abmData };
    }
    return bo;
  });
}

export const loadAbmLeaderboardDetails = (body, user_type) => async (dispatch) => {
  dispatch({ type: LOAD_ABM_LEADERBOARD_DETAIL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_COACHMAP_ABM_LEADERBOARD,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_ABM_LEADERBOARD_DETAIL_SUCCESS, payload: parseAbmLeaderboardData(data, user_type) });
  } else {
    dispatch({
      type: LOAD_ABM_LEADERBOARD_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

function parseAbmLeaderboardData(data, filed_for_rep_code) {
  const result = [];
  data.forEach((abm) => {
    if (abm.filed_for_rep_code === filed_for_rep_code) result.push(abm);
  });
  const dataJson = {};
  result.forEach((abm) => {
    const { filed_by_rep_code } = abm;
    let files = dataJson[filed_by_rep_code];
    if (!files) files = [];
    files.push(abm);
    dataJson[filed_by_rep_code] = files;
  });
  return Object.keys(dataJson).map((filed_by_rep_code) => ({
    filed_by_rep_code,
    filed_by_rep_name: dataJson[filed_by_rep_code][0].filed_by_rep_name,
    filed_by_user_type: dataJson[filed_by_rep_code][0].filed_by_user_type,
    files: dataJson[filed_by_rep_code]
  }));
}

export const loadRbmCoachmapDetails = (body) => async (dispatch) => {
  dispatch({ type: LOAD_RBM_COACH_MAP_DETAIL });
  const {
    rep_code, company_code, sbu_code, status, desig_group_code
  } = body;

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_ENTIRE_TEAM,
    data: body
  });

  if (statusCode === 200) {
    const rbmData = await api({
      method: 'POST',
      url: Urls.GET_COACHMAP_RBM_DETAILS,
      data: {
        rep_code, company_code, sbu_code, status, desig_group_code
      }
    });
    dispatch({ type: LOAD_RBM_COACH_MAP_DETAIL_SUCCESS, payload: parseRbmData(rbmData.data, data) });
  } else {
    dispatch({
      type: LOAD_RBM_COACH_MAP_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

function parseRbmData(data, bos) {
  const dataJson = {};
  data.forEach((abm) => {
    dataJson[abm.filed_for_rep_code] = abm;
  });
  return bos.map((bo) => {
    const abmData = dataJson[bo.rep_code];
    bo.status = 'Pending';
    if (abmData) {
      bo.status = 'Submitted';
      return { ...bo, ...abmData };
    }
    return bo;
  });
}

export const submitCoachmap = (body) => async (dispatch) => {
  dispatch({ type: POST_COACHMAP });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.SUBMIT_COACHMAP,
    data: body
  });

  if (statusCode === 200) {
    dispatch({
      type: POST_COACHMAP_SUCCESS,
      payload: data
    });
  } else {
    dispatch({
      type: POST_COACHMAP_FAIL,
      payload: { error: errorMessage }
    });
  }
};
