import { LOAD_TOURPLAN_BO, LOAD_TOURPLAN_BO_FAIL, LOAD_TOURPLAN_BO_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TOURPLAN_BO:
      return { ...state, loading: true, data: null };
    case LOAD_TOURPLAN_BO_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TOURPLAN_BO_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
