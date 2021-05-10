import { LOAD_RCPA_HISTORY, LOAD_RCPA_HISTORY_FAIL, LOAD_RCPA_HISTORY_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RCPA_HISTORY:
      return { ...state, loading: true, data: [] };
    case LOAD_RCPA_HISTORY_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_RCPA_HISTORY_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
