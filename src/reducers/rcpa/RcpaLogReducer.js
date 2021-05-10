import {
  LOAD_RCPA_CHEMIST_LIST, LOAD_RCPA_LOGS, LOAD_RCPA_LOGS_FAIL, LOAD_RCPA_LOGS_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RCPA_CHEMIST_LIST:
      return { ...state, data: [] };
    case LOAD_RCPA_LOGS:
      return { ...state, loading: true, data: [] };
    case LOAD_RCPA_LOGS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_RCPA_LOGS_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
