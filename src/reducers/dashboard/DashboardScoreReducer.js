import { LOAD_DASHBOARD_RANK, LOAD_DASHBOARD_RANK_FAIL, LOAD_DASHBOARD_RANK_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DASHBOARD_RANK:
      return { ...state, loading: true, data: null };
    case LOAD_DASHBOARD_RANK_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_DASHBOARD_RANK_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
