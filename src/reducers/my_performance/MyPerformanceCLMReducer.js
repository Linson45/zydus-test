import {
  LOAD_MY_PERFORMANCE_DETAILING,
  LOAD_MY_PERFORMANCE_DETAILING_FAIL,
  LOAD_MY_PERFORMANCE_DETAILING_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  loading: true,
  error: null,
  myEffort: null,
  effortSummary: null,
  myBrandEffort: [],
  aggregatedEffort: null,
  aggregatedBrandEffort: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_DETAILING:
      return {
        ...state,
        loading: true,
        myEffort: null,
        myBrandEffort: [],
        aggregatedEffort: null,
        aggregatedBrandEffort: [],
      };
    case LOAD_MY_PERFORMANCE_DETAILING_SUCCESS:
      return {
        ...state,
        loading: false,
        myEffort: payload ? payload.myEffort : null,
        myBrandEffort: payload ? payload.myBrandEffort : [],
        aggregatedEffort: payload ? payload.aggregatedEffort : null,
        aggregatedBrandEffort: payload ? payload.aggregatedBrandEffort : [],
        effortSummary: payload ? payload.effortSummary : null,
      };
    case LOAD_MY_PERFORMANCE_DETAILING_FAIL:
      return {
        ...state,
        loading: false,
        myEffort: null,
        myBrandEffort: [],
        aggregatedEffort: null,
        aggregatedBrandEffort: [],
        effortSummary: null
      };
    default:
      return state;
  }
};
