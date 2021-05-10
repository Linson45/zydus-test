import { LOAD_TOURPLAN_ROUTES, LOAD_TOURPLAN_ROUTES_FAIL, LOAD_TOURPLAN_ROUTES_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TOURPLAN_ROUTES:
      return { ...state, loading: true, data: null };
    case LOAD_TOURPLAN_ROUTES_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TOURPLAN_ROUTES_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
