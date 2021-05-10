import { LOAD_DAILY_PLAN_REGIONS, LOAD_DAILY_PLAN_REGIONS_FAIL, LOAD_DAILY_PLAN_REGIONS_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_REGIONS:
      return { ...state, loading: true, data: [] };
    case LOAD_DAILY_PLAN_REGIONS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_DAILY_PLAN_REGIONS_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
