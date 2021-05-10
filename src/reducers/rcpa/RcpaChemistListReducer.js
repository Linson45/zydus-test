import { LOAD_RCPA_CHEMIST_LIST, LOAD_RCPA_CHEMIST_LIST_FAIL, LOAD_RCPA_CHEMIST_LIST_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RCPA_CHEMIST_LIST:
      return { ...state, loading: true, data: [] };
    case LOAD_RCPA_CHEMIST_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_RCPA_CHEMIST_LIST_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
