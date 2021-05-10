import { LOAD_FILTER_DIVISIONS, LOAD_FILTER_DIVISIONS_FAIL, LOAD_FILTER_DIVISIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_FILTER_DIVISIONS:
      return { ...state, loading: true };
    case LOAD_FILTER_DIVISIONS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_FILTER_DIVISIONS_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
