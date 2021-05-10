import {
  LOAD_RBMS, LOAD_RBMS_FAIL, LOAD_RBMS_SUCCESS, MY_PERFORMANCE_RESET_EMPLOYEES
} from '../actions';

const INITIAL_STATE = {
  error: null,
  data: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_RBMS:
      return { ...state, loading: true };
    case LOAD_RBMS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_RBMS_FAIL:
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
