import { LOAD_REGIONS, LOAD_REGIONS_FAIL, LOAD_REGIONS_SUCCESS } from '../actions/RegionActions';
import { MY_PERFORMANCE_RESET_EMPLOYEES } from '../actions';

const INITIAL_STATE = {
  error: null,
  data: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_REGIONS:
      return { ...state, loading: true };
    case LOAD_REGIONS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_REGIONS_FAIL:
      return {
        ...state, loading: false, error, data: []
      };
    case MY_PERFORMANCE_RESET_EMPLOYEES:
      return {
        ...state, loading: false, error: '', data: []
      };
    default:
      return state;
  }
};
