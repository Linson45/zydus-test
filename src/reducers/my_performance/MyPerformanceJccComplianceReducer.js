import {
  LOAD_MY_PERFORMANCE_JCC_COMPLIANCE,
  LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_FAIL,
  LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_JCC_COMPLIANCE:
      return {
        ...state, loading: true, data: [], error: null
      };
    case LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_SUCCESS:
      return {
        ...state, loading: false, data: payload, error: null
      };
    case LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_FAIL:
      return {
        ...state, loading: false, data: [], error
      };
    default:
      return state;
  }
};
