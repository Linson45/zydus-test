import { LOAD_TOURPLAN_ABM, LOAD_TOURPLAN_ABM_FAIL, LOAD_TOURPLAN_ABM_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TOURPLAN_ABM:
      return { ...state, loading: true, data: null };
    case LOAD_TOURPLAN_ABM_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TOURPLAN_ABM_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
