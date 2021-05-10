import {
  LOAD_MY_PERFORMANCE_BO_EFFORTS,
  LOAD_MY_PERFORMANCE_BO_EFFORTS_FAIL,
  LOAD_MY_PERFORMANCE_BO_EFFORTS_SUCCESS,
  LOAD_MY_PERFORMANCE_BO_SALES,
  LOAD_MY_PERFORMANCE_BO_SALES_FAIL,
  LOAD_MY_PERFORMANCE_BO_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  sales: null,
  efforts: null,
  salesLoading: true,
  effortsLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_BO_SALES:
      return { ...state, salesLoading: true, sales: null };
    case LOAD_MY_PERFORMANCE_BO_SALES_SUCCESS:
      return {
        ...state, salesLoading: false, error: '', sales: payload
      };
    case LOAD_MY_PERFORMANCE_BO_SALES_FAIL:
      return {
        ...state, salesLoading: false, error, sales: null
      };
    case LOAD_MY_PERFORMANCE_BO_EFFORTS:
      return { ...state, effortsLoading: true, efforts: null };
    case LOAD_MY_PERFORMANCE_BO_EFFORTS_SUCCESS:
      return {
        ...state, effortsLoading: false, error: '', efforts: payload
      };
    case LOAD_MY_PERFORMANCE_BO_EFFORTS_FAIL:
      return {
        ...state, effortsLoading: false, error, efforts: null
      };
    default:
      return state;
  }
};
