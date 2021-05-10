import { SUBMIT_TOURPLAN, SUBMIT_TOURPLAN_FAIL, SUBMIT_TOURPLAN_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_TOURPLAN:
      return { ...state, loading: true };
    case SUBMIT_TOURPLAN_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case SUBMIT_TOURPLAN_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
