import { LOAD_DAILY_PLAN_MY_TEAM, LOAD_DAILY_PLAN_MY_TEAM_FAIL, LOAD_DAILY_PLAN_MY_TEAM_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_MY_TEAM:
      return { ...state, loading: true, data: null };
    case LOAD_DAILY_PLAN_MY_TEAM_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_DAILY_PLAN_MY_TEAM_FAIL:
      return { ...state, loading: false, error: payload ? payload.error : '' };
    default:
      return state;
  }
};
