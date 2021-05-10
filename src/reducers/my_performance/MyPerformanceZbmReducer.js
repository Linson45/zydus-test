import {
  LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS,
  LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_FAIL,
  LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_SUCCESS,
  LOAD_MY_PERFORMANCE_ZBM_SALES,
  LOAD_MY_PERFORMANCE_ZBM_SALES_FAIL,
  LOAD_MY_PERFORMANCE_ZBM_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  sales: null,
  aggregatedEfforts: null,
  salesLoading: true,
  aggregatedEffortsLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_ZBM_SALES:
      return { ...state, salesLoading: true, sales: null };
    case LOAD_MY_PERFORMANCE_ZBM_SALES_SUCCESS:
      return {
        ...state, salesLoading: false, error: '', sales: payload
      };
    case LOAD_MY_PERFORMANCE_ZBM_SALES_FAIL:
      return {
        ...state, salesLoading: false, error, sales: null
      };
    case LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS:
      return { ...state, aggregatedEffortsLoading: true, aggregatedEfforts: null };
    case LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_SUCCESS:
      return {
        ...state, aggregatedEffortsLoading: false, error: '', aggregatedEfforts: payload
      };
    case LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_FAIL:
      return {
        ...state, aggregatedEffortsLoading: false, error, aggregatedEfforts: null
      };
    default:
      return state;
  }
};
