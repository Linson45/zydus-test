import {
  LOAD_MY_PERFORMANCE_REGIONS,
  LOAD_MY_PERFORMANCE_REGIONS_FAIL,
  LOAD_MY_PERFORMANCE_REGIONS_SUCCESS,
  MY_PERFORMANCE_RESET_REGIONS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_REGIONS:
      return {
        ...state, loading: true, data: [], error: null
      };
    case LOAD_MY_PERFORMANCE_REGIONS_SUCCESS:
      return {
        ...state, loading: false, data: payload, error: null
      };
    case LOAD_MY_PERFORMANCE_REGIONS_FAIL:
      return {
        ...state, loading: false, data: [], error
      };
    case MY_PERFORMANCE_RESET_REGIONS:
      return {
        ...state, loading: false, data: [], error: null
      };
    default:
      return state;
  }
};
