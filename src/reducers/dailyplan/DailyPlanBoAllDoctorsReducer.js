import {
  LOAD_DAILY_PLAN_BO_ALL_DOCTORS,
  LOAD_DAILY_PLAN_BO_ALL_DOCTORS_FAIL,
  LOAD_DAILY_PLAN_BO_ALL_DOCTORS_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_BO_ALL_DOCTORS:
      return { ...state, loading: true, data: null };
    case LOAD_DAILY_PLAN_BO_ALL_DOCTORS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_DAILY_PLAN_BO_ALL_DOCTORS_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
