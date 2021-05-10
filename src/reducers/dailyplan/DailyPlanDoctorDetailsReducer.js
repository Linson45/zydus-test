import {
  LOAD_DAILY_PLAN_DOCTOR_DETAILS,
  LOAD_DAILY_PLAN_DOCTOR_DETAILS_FAIL,
  LOAD_DAILY_PLAN_DOCTOR_DETAILS_SUCCESS,
  SUBMIT_DAILYPLAN_COMMENT,
  SUBMIT_DAILYPLAN_COMMENT_FAIL,
  SUBMIT_DAILYPLAN_COMMENT_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
  submitting: false,
  saved: false
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_DOCTOR_DETAILS:
      return {
        ...state, loading: true, data: null, submitting: false, saved: false
      };
    case LOAD_DAILY_PLAN_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload, submitting: false, saved: false
      };
    case LOAD_DAILY_PLAN_DOCTOR_DETAILS_FAIL:
      return {
        ...state, loading: false, error: payload.error, submitting: false, saved: false
      };
    case SUBMIT_DAILYPLAN_COMMENT:
      return { ...state, submitting: true, saved: false };
    case SUBMIT_DAILYPLAN_COMMENT_SUCCESS:
      return { ...state, submitting: false, saved: true };
    case SUBMIT_DAILYPLAN_COMMENT_FAIL:
      return { ...state, submitting: false, saved: true };
    default:
      return state;
  }
};
